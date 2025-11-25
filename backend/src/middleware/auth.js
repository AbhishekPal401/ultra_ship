import jwt from "jsonwebtoken";
import { createRBACEngine } from "../utils/ruleEngine.js";
import { GraphQLError } from "graphql";

const UNAUTHENTICATED_CODE = "UNAUTHENTICATED";
const FORBIDDEN_CODE = "FORBIDDEN";

export function buildContext({ req }) {
  const token = req.headers.authorization?.replace("Bearer ", "") || null;
  const engine = createRBACEngine();

  let user = null;

  try {
    if (token) {
      user = jwt.verify(token, process.env.APP_SECRET);
    }
  } catch (_) {
    user = null;
  }

  return {
    user,
    isAuthenticated() {
      if (!user)
        throw new GraphQLError(
          "You must be logged in to perform this action.",
          {
            extensions: {
              code: UNAUTHENTICATED_CODE,
              http: { status: 401 },
            },
          }
        );
    },
    async checkPermission(permissionEventType) {
      if (!user) {
        throw new GraphQLError("Authentication required.", {
          extensions: {
            code: UNAUTHENTICATED_CODE,
            http: { status: 401 },
          },
        });
      }

      console.log("user in context", user);

      const result = await engine.run({ role: user.role });
      console.log("result", result);
      console.log("permissionEventType", permissionEventType);

      const granted = result.events.some(
        (event) => event.type === permissionEventType
      );

      if (!granted) {
        throw new GraphQLError("You do not have the necessary permissions.", {
          extensions: {
            code: FORBIDDEN_CODE,
            http: { status: 403 },
          },
        });
      }
    },
  };
}
