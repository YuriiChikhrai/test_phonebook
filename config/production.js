module.exports = {
  mongodb: {
    uri: "mongodb://localhost:27017/contactbook_production",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  },
};
