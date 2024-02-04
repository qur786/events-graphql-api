export const userSchemas = /* Graphql */ `
    type User {
      _id: ID!
      email: String!
      password: String
      events: [Event!]!
    }

    input CreateUserInput {
      email: String!
      password: String!
    }

    type Query {
      users: [User!]!
    }

    type Mutation {
      createUser(data: CreateUserInput!): User
    }
`;
