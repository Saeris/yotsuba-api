import { Resolver } from "./shared";

export const threads: Resolver = ({ id }, _, { dataSources }) =>
  // @ts-ignore
  console.log({ id }) || dataSources.Yotsuba.catalog({ board: id }); // eslint-disable-line no-console
