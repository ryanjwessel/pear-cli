import gitlog from "gitlog";
import dateFn from "date-fns";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import { markdownTable } from "markdown-table";
import { getContributors } from "../contributors.js";
import { Matrix, Commit, CommitWithPair } from "./types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CO_AUTHORS = "Co-authors: ";

const initializeMatrix = () => {
    const contributors = getContributors().filter(
        (contributor) => contributor && contributor.length > 0
    );

    return contributors.reduce((matrix, contributor) => {
        matrix[contributor] = {};

        contributors
            .filter((pair) => pair !== contributor)
            .forEach((pair) => {
                matrix[contributor][pair] = { count: 0, lastPair: -1 };
            });

        return matrix;
    }, {} as Matrix);
};

const coAuthors = (body: string) => {
    const names = body.match(/Co-authors: (.+)/);
    if (names === null) return [];
    return names[1].split(",").map((name) => name.trim());
};

const getPairingHistory = async (options: { after: string }) => {
    // @ts-ignore
    const commits: Commit[] = await gitlog.gitlogPromise({
        repo: __dirname,
        number: 500,
        after: options.after,
        fields: ["hash", "authorName", "authorDate", "body"] as const,
    });
    return commits
        .map((commit) => ({ commit, pairs: coAuthors(commit.body) }))
        .flatMap<CommitWithPair>(
            ({ commit: { authorName, authorDate, hash }, pairs }) =>
                pairs.map((pair: string) => ({
                    authorName,
                    authorDate,
                    pair,
                    hash,
                }))
        );
};

const validatePairCommits = (commit: CommitWithPair, matrix: Matrix) => {
    const { authorName, pair, hash } = commit;
    const warnings: string[] = [];
    if (authorName === pair) {
        warnings.push(
            `Don't include yourself in the "${CO_AUTHORS}" line, ${authorName}. See commit ${hash}`
        );
    }
    if (!(authorName in matrix)) {
        warnings.push(
            `${authorName} is not a known contributor. See commit ${hash}`
        );
    }
    if (!(pair in matrix)) {
        warnings.push(`${pair} is not a known contributor. See commit ${hash}`);
    }
    warnings.forEach((warning) => console.warn(warning));
    return warnings.length === 0;
};

const updatePairMetrics = (matrix: Matrix, commit: CommitWithPair) => {
    console.log("updating metrics");
    console.log(matrix);
    console.log(commit);
    const { authorDate, authorName, pair } = commit;
    const date = dateFn.parseISO(authorDate.split(" ")[0]);
    if (!dateFn.isEqual(matrix[authorName][pair].lastPair, date)) {
        matrix[authorName][pair].count += 1;
        matrix[pair][authorName].count += 1;
    }
    matrix[authorName][pair].lastPair = date;
    matrix[pair][authorName].lastPair = date;
    return matrix;
};

const addPairingData = async (matrix: Matrix, options: { after: string }) => {
    try {
        const commits = await getPairingHistory(options);

        return commits
            .filter((commit) => validatePairCommits(commit, matrix))
            .reduce(updatePairMetrics, matrix);
    } catch (error) {
        console.error(chalk.redBright(error));
        throw new Error(
            "Sorry, we were unable to generate a pairing matrix for your team."
        );
    }
};

const generateTableFrom = (matrix: Matrix) => {
    const table: Record<string, Record<string, number>> = {};

    for (const [contributor, pairs] of Object.entries(matrix)) {
        table[contributor] = {};
        for (const [pair, stats] of Object.entries(pairs)) {
            table[contributor][pair] = stats.count;
        }
    }
    return table;
};

const outputMarkdownTable = (table: Record<string, Record<string, number>>) => {
    const matrix = [["", ...Object.keys(table)]];

    Object.keys(table).forEach((contributor, cIndex) => {
        let row = [contributor];

        Object.keys(table[contributor]).forEach((pair, pIndex) => {
            if (pIndex < cIndex) {
                row.push(table[contributor][pair].toString());
            } else {
                row.push("");
            }
        });
        matrix.push(row);
    });

    return markdownTable(matrix);
};

const createFileFrom = (matrix: Matrix) => {
    fs.writeFileSync(
        "./.pear/matrix.md",
        outputMarkdownTable(generateTableFrom(matrix)),
        {
            encoding: "utf-8",
        }
    );
};

export const matrix = async (options: { after: string }) => {
    const matrix = await addPairingData(initializeMatrix(), options);
    createFileFrom(matrix);
};
