export const schemas = /* Graphql */ `
    type Event {
      _id: ID!
      title: String!
      description: String!
      date: String!
    }

    type Query {
      event(id: ID!): Event
      events: [Event!]!
    }
`;
