import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthService {
  async comparePassword(plain, hashed) {
    return bcrypt.compare(plain, hashed);
  }

  generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      process.env.APP_SECRET,
      { expiresIn: "7d" }
    );
  }
}

export default new AuthService();
