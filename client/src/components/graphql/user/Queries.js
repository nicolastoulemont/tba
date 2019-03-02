import gql from 'graphql-tag';

export const LOGGED_USER = gql`
  {
    currentuser {
      id
      avatar
      profile {
        name
        interestOne
        interestTwo
        interestThree
      }
    }
  }
`;

export const LOGGED_USER_ID = gql`
  {
    currentuser {
      id
    }
  }
`;

export const GET_USER_EVENTS = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      events {
        id
        name
        location
        startDate
        startTime
        endDate
        endTime
      }
    }
  }
`;

export const GET_USER_REGISTRATIONS = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      registrations {
        id
        event {
          id
          name
          location
          startDate
          startTime
          endDate
          endTime
        }
      }
    }
  }
`;

export const GET_USER_COMMENTS = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      comments {
        id
        text
        event {
          id
          name
        }
        comment {
          userId
          text
          creator {
            profile {
              name
            }
          }
        }
      }
    }
  }
`;

export const GET_USER_LIKES = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      likes {
        id
        event {
          id
          name
          ispublic
        }
        comment {
          id
          userId
          creator {
            profile {
              name
            }
          }
        }
      }
    }
  }
`;
