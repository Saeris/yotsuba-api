import gql from "graphql-tag";
import { makeExecutableSchema, IResolvers } from "graphql-tools";
import {
  Numbers,
  Dates,
  Strings,
  convertBinary
} from "@saeris/graphql-directives";
import {
  DateTimeScalar,
  DateTime,
  EmailAddressScalar,
  EmailAddress,
  URLScalar,
  URL
} from "@saeris/graphql-scalars";
import { types } from "./types";
import { resolvers } from "./resolvers";

// TODO: Re-Write Schema Definition to remove makeExecutableSchema entirely
// to conform to Apollo Server's standard implementation
const cacheControlTypes = gql`
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
  ) on FIELD_DEFINITION | OBJECT | INTERFACE
`;

const schemaDirectives = {
  ...Numbers,
  ...Dates,
  ...Strings,
  convertBinary
};

const directives = Object.values(schemaDirectives).map(directive =>
  directive.declaration()
);

export const schema = makeExecutableSchema({
  typeDefs: [
    ...Object.values(types),
    DateTimeScalar,
    EmailAddressScalar,
    URLScalar,
    cacheControlTypes,
    convertBinary.declaration(),
    ...directives
  ],
  schemaDirectives,
  resolvers: {
    DateTime,
    EmailAddress,
    URL,
    ...(resolvers as IResolvers<any, any>)
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  inheritResolversFromInterfaces: true
});
