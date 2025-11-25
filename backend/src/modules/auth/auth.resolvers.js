import authService from "../auth/auth.service.js";
import userService from "../user/user.service.js";

export default {
  Mutation: {
    login: async (_, { data }) => {
      const { email, password } = data;

      const user = userService.findUserByEmail(email);
      if (!user) throw new Error("Invalid email");

      const isMatch = await authService.comparePassword(
        password,
        user.password
      );

      if (!isMatch) throw new Error("Invalid password");

      const token = authService.generateToken(user);

      return { token, user };
    },
  },
};
