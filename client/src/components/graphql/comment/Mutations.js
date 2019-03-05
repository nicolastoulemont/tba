import gql from 'graphql-tag';

export const ADD_COMMENT = gql`
  mutation AddComment(
    $userId: String!
    $eventId: String
    $commentId: String
    $pollId: String
    $text: String!
  ) {
    addComment(
      userId: $userId
      eventId: $eventId
      commentId: $commentId
      pollId: $pollId
      text: $text
    ) {
      id
    }
  }
`;

export const EDIT_COMMENT = gql`
  mutation UpdateComment($_id: ID!, $text: String) {
    updateComment(_id: $_id, text: $text) {
      id
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($_id: ID!, $userId: String!, $eventId: String!) {
    deleteComment(_id: $_id, userId: $userId, eventId: $eventId) {
      id
    }
  }
`;
