import { Resolver } from "./shared";

export const board: Resolver = ({ board: id }, _, { dataSources }) =>
  // @ts-ignore
  console.log({ id }) || dataSources.Yotsuba.board({ id }); // eslint-disable-line no-console

export const posts: Resolver = ({ posts: all }, { latest }) =>
  latest ? all.slice(-5) : all;
