const mongoose = require("mongoose");

const username = "practice-user-01";
const password = "test123";
const dbname = "shopit01";

const connectDatabase = () => {
  mongoose
    .connect(
      `mongodb+srv://${username}:${password}@cluster0.rej7x.mongodb.net/${dbname}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((con) => {
      console.log(`MongoDB atlas connected...`);
    });
};

module.exports = connectDatabase;
