import gql from 'graphql-tag';

export const ADD_REPORT = gql`
  mutation AddReport(
    $userId: String!
    $text: String!
    $eventId: String
    $pollId: String
    $commentId: String
    $organisationId: String
  ) {
    addReport(
      userId: $userId
      text: $text
      eventId: $eventId
      pollId: $pollId
      commentId: $commentId
      organisationId: $organisationId
    ) {
      success
      errors {
        path
        message
      }
      report {
        id
      }
    }
  }
`;
