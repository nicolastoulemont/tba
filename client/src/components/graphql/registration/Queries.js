import gql from 'graphql-tag';

export const GET_EVENT_REGISTRATIONS = gql`
  query Event($id: ID!) {
    event(id: $id) {
      id
      registrations {
        id
        userId
        creator {
          avatar
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

export const GET_EVENT_REGISTRATIONS_IDS = gql`
  query Event($id: ID!) {
    event(id: $id) {
      id
      registrations {
        id
        userId
      }
    }
  }
`;
