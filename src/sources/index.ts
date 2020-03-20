import { DataSources } from "apollo-server-core/dist/graphqlOptions";
import { Context } from "../server";
import { Yotsuba } from "./yotsuba";

export interface Sources extends DataSources<Context> {
  Yotsuba: Yotsuba;
}

export const dataSources = (): Sources => ({
  Yotsuba: new Yotsuba()
});
