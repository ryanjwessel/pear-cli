# 🍐 Pear CLI

Pear CLI is a frictionless tool for tracking pair programming activity on teams.

## Getting Started

### Installation

```sh
yarn add pear-cli --dev
npm install pear-cli --save-dev
```

### Initial setup

```sh
npx pear init
```

You will be prompted to add the names of your project contributors, which will be stored in `./.pear/contributors`.

#### Required Git Hooks Setup

`npx pear init` will also generate a `./.pear/pear.sh` file. You need to call this from your `prepare-commit-msg` file, like so:

```sh
source ./.pear/pear.sh
```

This project uses [`husky`](https://github.com/typicode/husky) to manage Git hooks, but you are free to use whatever Git hooks setup that you like.

For an example, refer to `.husky/prepare-commit-msg` in this repository.

### Starting a pairing session

```sh
npx pear start
```

You will be prompted to choose your pairing partners from your project's known contributors, and this session will be saved in `./.pear/session`.

**Note: Don't choose yourself from this list. Only select who you are pairing with.**

All of your commits will be appended with `Co-authors: ${pair1,..pairN}`.

### Ending a pairing session

```sh
npx pear end
```

This will delete `./.pear/session`, and your commits will no longer be appended with the `Co-authors:` tag.

### Generate a pairing matrix

```sh
npx pear matrix

# Supports optional `after` parameter, defaults to last 3 months.
npx pear matrix --after "6 months ago"
npx pear matrix -a "6 months ago" # Short-hand
```

If you'd like to track your pairing history on your team, you can use this command to generate a Markdown table that highlights the number of days each of your teammates has paired with one another. 

This will be stored in `./.pear/matrix.md`.