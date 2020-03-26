import { Config } from "apollo-server-core";
import { getBoards } from "./getBoards";
import { getThread } from "./getThread";
import { getPage } from "./getPage";
import { getBanners } from "./getBanners";
import { getPopular } from "./getPopular";
import { getCatalog } from "./getCatalog";
import { getQuotes } from "./getQuotes";

const isDev = !!process.env.OFFLINE

const endpoint = `${
  process.env.OFFLINE ? `http://localhost:1337/` : `${process.env.URL}/`
}${process.env.NETLIFY ? `.netlify/functions/scryfall-api/` : `dev`}`

export const playground: Config["playground"] = {
  settings: {
    // @ts-ignore
    "schema.polling.enable": isDev,
    // @ts-ignore
    "schema.polling.interval": 15000
  },
  tabs: [
    getBoards,
    getThread,
    getPage,
    getBanners,
    getPopular,
    getCatalog,
    getQuotes
  ].map(fn => fn(endpoint))
};
