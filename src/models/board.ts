/* eslint-disable camelcase */
import { Categories } from "../data";

export class Board {
  id: string;
  title: string;
  description: string;
  category: typeof Categories[0] | undefined;
  pages: number;
  perPage: number;
  worksafe: boolean;
  spoilers: boolean;
  anonymous: boolean;
  userIDs: boolean;
  countryFlags: boolean;
  bumpLimit: number;
  imageLimit: number;
  cooldowns: {
    images: number;
    replies: number;
    threads: number;
  };

  charLimit: number;
  filesizeLimit: number;
  webmDurationLimit: number;
  webmFilesizeLimit: number;

  constructor({
    board,
    title,
    meta_description,
    pages,
    per_page,
    ws_board = true,
    spoilers = false,
    forced_anon = false,
    userIDs = false,
    country_flags = false,
    bump_limit,
    image_limit,
    cooldowns,
    max_comment_chars,
    max_filesize,
    max_webm_duration,
    max_webm_filesize
  }: Record<any, any>) {
    // General
    this.id = board;
    this.title = title;
    this.description = meta_description
      .replace(/&quot;/g, `\\"`)
      .replace(/&amp;/g, `&`);
    this.category = Categories.find(category =>
      category.boards.includes(board)
    );
    this.pages = pages;
    this.perPage = per_page;
    // threads: [Thread]!

    // Flags
    this.worksafe = !!ws_board;
    this.spoilers = !!spoilers;
    this.anonymous = !!forced_anon;
    this.userIDs = !!userIDs;
    this.countryFlags = !!country_flags;

    // Post Limits
    this.bumpLimit = bump_limit;
    this.imageLimit = image_limit;
    this.cooldowns = cooldowns;
    this.charLimit = max_comment_chars;
    this.filesizeLimit = max_filesize;
    this.webmDurationLimit = max_webm_duration;
    this.webmFilesizeLimit = max_webm_filesize;
  }
}
