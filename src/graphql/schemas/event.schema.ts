export const eventSchemas = /* Graphql */ `
    type Event {
      _id: ID!
      title: String!
      description: String!
      date: String!
      createdBy: User!
    }

    input CreateEventInput {
      title: String!
      description: String!
      date: String!
      createdBy: ID!
    }

    type Query {
      event(id: ID!): Event
      events: [Event!]!
    }

    type Mutation {
      createEvent(data: CreateEventInput!): Event
    }
`;
