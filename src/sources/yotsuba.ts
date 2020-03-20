import { RESTDataSource } from "apollo-datasource-rest";
import { Categories } from "../data";
import { Board, Post, Thread } from "../models";
import { shuffle } from "../utils";

type APIRequest<Params = Record<any, any>, Result = any> = (
  params: Params
) => Promise<Result>;

interface ByID {
  id: string;
}

interface ByBoard {
  board: string;
}

export class Yotsuba extends RESTDataSource {
  // 4chan API Documentation
  // https://github.com/4chan/4chan-API
  baseURL = `https://a.4cdn.org/`;

  categories = () => Categories;

  board: APIRequest<ByID> = async ({ id }) => {
    const boards = await this.boards();
    return boards.find(board => board.id === id);
  };

  boards = async (): Promise<Board[]> => {
    const { boards }: { boards: { board: string }[] } = await this.get(
      `boards.json`
    );
    // remove the "Flash" board because we don't support flash content
    return boards
      .filter(({ board }) => board !== `f`)
      .map((board: any) => new Board(board));
  };

  popular: APIRequest<{ boards: string[] }> = ({ boards }) =>
    Promise.all(
      // randomize the boards
      shuffle(boards)
        // pick the first 8
        .slice(0, 8)
        // fetch catalog for each of those boards
        .map(async board => {
          const catalog = await this.catalog({ board });
          // flatten the catalog to get it's threads
          const { no: id } = shuffle(
            this.allThreads(catalog)
              // exclude threads that don't have an attachment
              .filter(({ fsize }: { fsize: number }) => fsize)
              // rank threads by # of replies
              .sort((a: { replies: number }, b: { replies: number }) =>
                a.replies < b.replies ? 1 : -1
              )
              // take the top 5
              .slice(0, 5)
          )[0];

          // return the first thread
          return this.thread({ board, id });
        }) // 16 requests
    );

  archive: APIRequest<ByBoard> = ({ board }) =>
    this.get(`${board}/archive.json`);

  catalog: APIRequest<ByBoard> = ({ board }) =>
    this.get(`${board}/catalog.json`);

  allThreads = <RawThread = { no: string; fsize: number; replies: number }>(
    catalog: { threads: RawThread[] }[]
  ): RawThread[] =>
    catalog.reduce(
      (all, { threads }) => [...all, ...threads],
      [] as RawThread[]
    );

  threads: APIRequest<ByBoard, Thread[]> = async ({ board }) => {
    const catalog = await this.catalog({ board });
    return Promise.all(
      this.allThreads(catalog).map(({ no }: { no: string }) =>
        this.thread({ board, id: no })
      )
    );
  };

  thread: APIRequest<{ board: string; id: string }, Thread> = async ({
    board,
    id
  }) => {
    const {
      posts: [op, ...replies]
    } = await this.get(`${board}/thread/${id}.json`);
    return new Thread({
      board,
      ...op,
      op: new Post({ board, ...op }),
      posts: replies.map((post: any) => new Post({ board, ...post }))
    });
  };

  page: APIRequest<{ board: string; number: number }, Thread[]> = async ({
    board,
    number
  }) => {
    const catalog = await this.catalog({ board });
    const threads =
      number === 0 ? this.allThreads(catalog) : catalog[number - 1].threads;
    return threads.map(({ no }: { no: string }) =>
      this.thread({ board, id: no })
    );
  };
}
