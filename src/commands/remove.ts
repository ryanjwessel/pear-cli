import { getContributors, writeContributors } from "../contributors";

export const remove = (removal: string) => {
  const contributors = getContributors().filter(
    (contributor) => contributor !== removal
  );
  writeContributors(contributors);
};
