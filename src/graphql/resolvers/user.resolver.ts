import { hash } from "bcrypt";
import { UserModel, type User } from "../../model/user.modal.js";

type CreateUserInput = Omit<User, "_id" | "events">;

export const userResolvers = {
  Query: {
    users: async () => {
      const users = await UserModel.find().populate("events");
      return users;
    },
  },
  Mutation: {
    createUser: async (
      _parent: unknown,
      { data: { email, password } }: { data: CreateUserInput }
    ) => {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        throw new Error("User email already exists.");
      }
      const hashedPassword = await hash(password, 10);
      const user = new UserModel({
        email,
        password: hashedPassword,
      });
      const result = await user.save();
      return result;
    },
  },
};
