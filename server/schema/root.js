const { gql } = require('apollo-server-express');

module.exports = {
  rootQuery: gql`
    type Query {
      _empty: String
    }

    type Mutation {
      _empty: String
    }

    type Subscription {
      _empty: String
    }
  `
};
