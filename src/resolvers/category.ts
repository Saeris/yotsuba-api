import { Resolver } from "./shared";

export const boards: Resolver = async ({ boards: ids }, _, { dataSources }) => {
  const all = await dataSources.Yotsuba.boards();
  return all.filter(({ id }) => ids.includes(id));
};
