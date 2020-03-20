import { Resolver } from "./shared";

export const filename: Resolver = ({ filename: name, extension }, { full }) =>
  full ? `${name}${extension}` : name;
