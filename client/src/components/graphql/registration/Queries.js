import { gql } from 'graphql-tag';

export const GET_EVENT_REGISTRATIONS = gql`
  query Event($id: ID!) {
    event(id: $id) {
      id
      registrations {
        id
        userId
        creator {
          profile {
            name
            position
            organisation
          }
        }
      }
    }
  }
`;
