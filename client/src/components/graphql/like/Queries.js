import { gql } from 'apollo-boost';

export const GET_EVENT_LIKES = gql`
  query Event($id: ID!) {
    event(id: $id) {
      id
      likes {
        id
        userId
      }
    }
  }
`;

export const GET_COMMENT_LIKES = gql`
  query Comment($id: ID!) {
    comment(id: $id) {
      likes {
        id
        userId
      }
    }
  }
`;
