import { loadFiles } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

export default async function buildSchema() {
  const typeDefs = await loadFiles("src/**/*.graphql", {
    useRequire: false,
    ignoreIndex: true,
  });

  const resolvers = await loadFiles("src/**/*.resolvers.js", {
    useRequire: false,
    ignoreIndex: true,
  });

  return makeExecutableSchema({
    typeDefs: mergeTypeDefs(typeDefs),
    resolvers: mergeResolvers(resolvers),
  });
}
