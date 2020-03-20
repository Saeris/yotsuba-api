import truncate from "truncate-html";
import { Post } from "../models";
import { Resolver } from "./shared";

export const teaser: Resolver = ({ content }, { length }) =>
  truncate(content, length, { excludes: [`a`, `span`] });

// TODO: parse thread replies text for quotelinks that mention this post's id
export const quotes: Resolver = ({ id, thread }) =>
  thread.posts.filter(
    (post: Post) => post.content && post.content.indexOf(`${id}`) > 0
  ) || [];

export const board: Resolver = ({ board: id }, _, { dataSources }) =>
  // @ts-ignore
  console.log(id) || dataSources.Yotsuba.board({ id }); // eslint-disable-line no-console
