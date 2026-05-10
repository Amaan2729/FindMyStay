require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlRoot = require("./graphql/resolvers");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend working");
});

if (process.env.DISABLE_BACKEND_ROUTES !== "true") {
  const authFirebaseRoutes = require("./routes/authFirebase");
  const bookingRoutes = require("./routes/booking");

  app.use("/api/auth", authFirebaseRoutes);
  app.use("/api", bookingRoutes);


  app.use(
    "/graphql",
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: graphqlRoot,
      graphiql: true,
    })
  );
}

module.exports = app;
