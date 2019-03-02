import gql from 'graphql-tag';

export const ADD_REGISTRATION = gql`
  mutation AddRegistration($userId: String!, $eventId: String!) {
    addRegistration(userId: $userId, eventId: $eventId) {
      success
      errors {
        path
        message
      }
      registration {
        id
      }
    }
  }
`;

export const DELETE_REGISTRATION = gql`
  mutation DeleteRegistration($_id: ID!) {
    deleteRegistration(_id: $_id) {
      id
    }
  }
`;
