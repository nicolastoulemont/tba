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
