import { getContributors, writeContributors } from "../contributors.js";

export const add = (addition: string) => {
  const contributors = getContributors();
  contributors.push(addition);
  writeContributors(contributors);
};
