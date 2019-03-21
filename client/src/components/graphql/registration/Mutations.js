import gql from 'graphql-tag';

export const ADD_REGISTRATION = gql`
  mutation AddRegistration($user_ID: String!, $event_ID: String!) {
    addRegistration(user_ID: $user_ID, event_ID: $event_ID) {
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
