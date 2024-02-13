export const bookingSchemas = /* Graphql */ `
    enum BookingStatus {
        COMPLETED
        CANCELLED
    }

    type Booking {
      _id: ID!
      createdBy: User!
      event: Event!
      status: BookingStatus!
      createdAt: String!
      updatedAt: String!
    }

    input BookEventInput {
      event: ID!
      createdBy: ID!
      status: BookingStatus
    }

    type Query {
      bookings: [Booking!]!
    }

    type Mutation {
      bookEvent(data: BookEventInput!): Booking!
      cancelEvent(eventID: ID!): Event
    }
`;
