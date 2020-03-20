/* eslint-disable camelcase */
import sanitizeHtml from "sanitize-html";
import { Board } from "./board";
import { Thread } from "./thread";

const parsePost = (post: string | null): string | null =>
  post
    ? sanitizeHtml(post, {
        allowedTags: [
          `blockquote`,
          `span`,
          `p`,
          `a`,
          `b`,
          `i`,
          `s`,
          `strong`,
          `em`,
          `strike`,
          `hr`,
          `br`,
          `table`,
          `thead`,
          `tbody`,
          `tr`,
          `th`,
          `td`,
          `pre`
        ],
        allowedAttributes: {
          a: [`class`, `alt`, `href`, `name`, `target`],
          span: [`class`]
        },
        allowedClasses: {
          a: [`quotelink`],
          span: [`quote`]
        },
        // Lots of these won't come up by default because we don't allow them
        selfClosing: [`br`, `hr`],
        // URL schemes we permit
        allowedSchemes: [`http`, `https`, `#`],
        allowedSchemesAppliedToAttributes: [`href`],
        allowProtocolRelative: true
      })
    : null;

export class Post {
  id: string | null;
  resto: string;
  isOp: boolean;
  author: string;
  userID: string | null;
  title: string | null;
  tripcode: string | null;
  subject: string | null;
  content: string | null;
  attachment: {
    id: string;
    url: string;
    thumbnail: string;
    filename: string | null;
    extension: string | null;
    filesize: number | null;
    md5: string | null;
    width: number | null;
    height: number | null;
    thumbnailWidth: number | null;
    thumbnailHeight: number | null;
  } | null;

  board: Board;
  country: string | null;
  countryCode: string | null;
  thread: Thread;
  timestamp: Date;
  fileDeleted?: boolean;
  spoiler?: boolean;

  constructor({
    board,
    no,
    resto,
    name = `Anonymous`,
    id = null,
    capcode = null,
    trip = null,
    sub = null,
    com = null,
    tim = null,
    filename = null,
    ext = null,
    fsize = null,
    md5 = null,
    w = null,
    h = null,
    tn_w = null,
    tn_h = null,
    country = null,
    country_name = null,
    thread,
    time,
    filedeleted = false,
    spoiler = false
  }: Record<any, any>) {
    this.id = no; // 9001
    this.resto = resto; // Needed to resolve Thread
    this.isOp = !resto;
    // Author Details
    this.author = name; // moot
    this.userID = id; // Mod, Admin, Manager, Developer, Founder
    this.title = capcode;
    this.tripcode = trip; // !Ep8pui8Vw2

    // Contents
    this.subject = sub;
    this.content = parsePost(com);

    // Attachment
    this.attachment = tim
      ? {
          id: `${board}-${tim}`,
          url: `https://i.4cdn.org/${board}/${tim}${ext}`,
          thumbnail: `https://i.4cdn.org/${board}/${tim}s.jpg`,
          filename,
          extension: ext,
          filesize: fsize,
          md5,
          width: w,
          height: h,
          thumbnailWidth: tn_w,
          thumbnailHeight: tn_h
        }
      : null;

    // Metadata
    this.board = board;
    this.country = country_name;
    this.countryCode = country;
    this.thread = thread;
    // quotes(board: ID!): [Post]!
    this.timestamp = new Date(time * 1000);

    // Flags
    this.fileDeleted = filedeleted;
    this.spoiler = spoiler;
  }
}
