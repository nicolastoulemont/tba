const { gql } = require('apollo-server-express');

module.exports = {
  ErrorType: gql`
    type Error {
      path: String
      message: String
    }
  `
};
