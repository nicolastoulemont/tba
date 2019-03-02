import { gql } from 'apollo-boost';

export const ADD_LIKE = gql`
  mutation AddLike(
    $userId: String!
    $eventId: String
    $pollId: String
    $commentId: String
  ) {
    addLike(
      userId: $userId
      eventId: $eventId
      pollId: $pollId
      commentId: $commentId
    ) {
      success
      errors {
        path
        message
      }
      like {
        id
      }
    }
  }
`;

export const DELETE_LIKE = gql`
  mutation DeleteLike($_id: ID!) {
    deleteLike(_id: $_id) {
      id
    }
  }
`;
