import { gql } from 'apollo-boost';

export const ADD_COMMENT = gql`
  mutation AddComment(
    $userId: String!
    $eventId: String
    $pollId: String
    $text: String!
  ) {
    addComment(
      userId: $userId
      eventId: $eventId
      pollId: $pollId
      text: $text
    ) {
      id
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($_id: ID!) {
    deleteComment(_id: $_id) {
      id
    }
  }
`;
