import gql from 'graphql-tag';

export const GET_EVENT_COMMENTS = gql`
  query Event($id: ID!) {
    event(id: $id) {
      id
      comments {
        id
        userId
        text
        edited
        moderated
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

export const GET_COMMENT_COMMENTS = gql`
  query Comment($id: ID!) {
    comment(id: $id) {
      comments {
        id
        userId
        text
        edited
        moderated
        creator {
          avatar
          profile {
            name
          }
        }
      }
    }
  }
`;
