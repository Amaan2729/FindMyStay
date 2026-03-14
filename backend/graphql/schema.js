const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Booking {
  id: ID!
  name: String!
  email: String!
  phone: String!
  hotel_name: String!
  checkin: String!
  checkout: String!
  guests: Int!
  rooms: Int!
  total_price: Int!
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

module.exports = schema;