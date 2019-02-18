import { gql } from 'apollo-boost';

export const GET_EVENT_COMMENTS = gql`
  query Event($id: ID!) {
    event(id: $id) {
      id
      comments {
        id
        userId
        text
        creator {
          avatar
          profile {
            id
            name
          }
        }
      }
    }
  }
`;
