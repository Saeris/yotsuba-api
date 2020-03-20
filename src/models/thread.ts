/* eslint-disable camelcase */
import { Board } from "./board";
import { Post } from "./post";

export class Thread {
  id: string;
  topic: string;
  op: Thread;
  posts: Post[];
  images: number;
  replies: number;
  board: Board;
  archivedOn: number | null;
  sticky: boolean;
  closed: boolean;
  archived: boolean;

  constructor({
    no,
    semantic_url = ``,
    op,
    posts,
    images = 1,
    replies = 1,
    board,
    archived_on = null,
    sticky = false,
    closed = false,
    archived = false
  }: Record<any, any>) {
    this.id = no;
    this.topic = semantic_url;
    this.op = { ...op, thread: this };
    this.posts = posts.map((post: Post) => ({ ...post, thread: this }));
    // latestReplies = [Post]!

    // Metadata
    this.images = images;
    this.replies = replies;
    this.board = board;
    this.archivedOn = archived_on;

    // Flags
    this.sticky = sticky;
    this.closed = closed;
    this.archived = archived;
  }
}
