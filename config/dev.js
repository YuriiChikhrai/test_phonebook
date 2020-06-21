module.exports = {
  mongodb: {
    uri: "mongodb://localhost:27017/contactbook",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  },
};
