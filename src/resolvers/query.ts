import fetch from "isomorphic-fetch";
import { Resolver } from "./shared";
import { range } from "../utils";

export const banners: Resolver = async () => {
  const images: { url: string; extension: string }[] = [];
  await Promise.all(
    range(249, 1).map(i =>
      [`.gif`, `.jpg`, `.png`]
        .map(ext =>
          fetch(`http://s.4cdn.org/image/title/${i}${ext}`).then(res => {
            if (res.ok) {
              images.push({
                url: `http://s.4cdn.org/image/title/${i}${ext}`,
                extension: ext
              });
            }
            return res;
          })
        )
        .flat()
    )
  );
  return images;
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
