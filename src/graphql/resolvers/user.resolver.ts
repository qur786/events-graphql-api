import { hash } from "bcrypt";
import { UserModal, type User } from "../../model/user.modal.js";

type CreateUserInput = Omit<User, "_id" | "events">;

export const userResolvers = {
  Query: {
    users: async () => {
      const users = await UserModal.find().populate("events");
      return users;
    },
  },
  Mutation: {
    createUser: async (
      _parent: unknown,
      { data: { email, password } }: { data: CreateUserInput }
    ) => {
      const existingUser = await UserModal.findOne({ email });
      if (existingUser) {
        throw new Error("User email already exists.");
      }
      const hashedPassword = await hash(password, 10);
      const user = new UserModal({
        email,
        password: hashedPassword,
      });
      const result = await user.save();
      return result;
    },
  },
};
