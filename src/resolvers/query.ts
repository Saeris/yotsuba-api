import { extname } from "path";
import fetch from "isomorphic-fetch";
import { Resolver } from "./shared";
import { any, range } from "../utils";

export const banners: Resolver = async () => {
  const images = await Promise.all(
    range(249, 1).map(i =>
      // replace with Promise.any() once added to TypeScript
      any(
        [`.gif`, `.jpg`, `.png`].map(ext =>
          fetch(`http://s.4cdn.org/image/title/${i}${ext}`)
        )
      )
    )
  );
  return images.map(({ url }) => ({
    url,
    extension: extname(new URL(url).pathname)
  }));
};

export const popular: Resolver = (_, { boards }, { dataSources }) =>
  dataSources.Yotsuba.popular({ boards });

export const boards: Resolver = (_, __, { dataSources }) =>
  dataSources.Yotsuba.boards();

export const threads: Resolver = (_, { board }, { dataSources }) =>
  // @ts-ignore
  console.log({ board }) || dataSources.Yotsuba.threads({ board }); // eslint-disable-line no-console

export const thread: Resolver = (_, { board, id }, { dataSources }) =>
  // @ts-ignore
  console.log({ board, id }) || dataSources.Yotsuba.thread({ board, id }); // eslint-disable-line no-console

export const page: Resolver = (_, { board, number }, { dataSources }) =>
  // @ts-ignore
  console.log({ board, number }) || dataSources.Yotsuba.page({ board, number }); // eslint-disable-line no-console
