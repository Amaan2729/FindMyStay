const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Booking {
    id: ID!
    name: String!
    email: String!
    phone: String!
    hotelName: String
    checkin: String!
    checkout: String!
    guests: Int!
    rooms: Int!
    totalPrice: Int
  }

  type Query {
    bookings: [Booking]
    booking(id: ID!): Booking
  }

  type Mutation {
    createBooking(
      name: String!
      email: String!
      phone: String!
      hotelName: String!
      checkin: String!
      checkout: String!
      guests: Int!
      rooms: Int!
      totalPrice: Int!
    ): Booking
  }
`);