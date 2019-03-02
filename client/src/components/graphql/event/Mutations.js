import gql from 'graphql-tag';

export const CREATE_EVENT = gql`
  mutation AddEvent(
    $userId: String!
    $name: String!
    $description: String!
    $ispublic: Boolean!
    $categoryOne: String!
    $categoryTwo: String
    $categoryThree: String
    $location: String!
    $startDate: String
    $startTime: String
    $endDate: String
    $endTime: String
  ) {
    addEvent(
      userId: $userId
      name: $name
      description: $description
      ispublic: $ispublic
      categoryOne: $categoryOne
      categoryTwo: $categoryTwo
      categoryThree: $categoryThree
      location: $location
      startDate: $startDate
      startTime: $startTime
      endDate: $endDate
      endTime: $endTime
    ) {
      success
      event {
        id
        userId
        name
        description
        ispublic
        categoryOne
        categoryTwo
        categoryThree
        location
        startDate
        startTime
        endDate
        endTime
      }
      errors {
        path
        message
      }
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $_id: ID!
    $name: String!
    $description: String!
    $ispublic: Boolean!
    $categoryOne: String!
    $categoryTwo: String
    $categoryThree: String
    $location: String!
    $startDate: String
    $startTime: String
    $endDate: String
    $endTime: String
  ) {
    updateEvent(
      _id: $_id
      name: $name
      description: $description
      ispublic: $ispublic
      categoryOne: $categoryOne
      categoryTwo: $categoryTwo
      categoryThree: $categoryThree
      location: $location
      startDate: $startDate
      startTime: $startTime
      endDate: $endDate
      endTime: $endTime
    ) {
      success
      event {
        id
        name
        description
        ispublic
        categoryOne
        categoryTwo
        categoryThree
        location
        startDate
        startTime
        endDate
        endTime
      }
      errors {
        path
        message
      }
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($_id: ID!) {
    deleteEvent(_id: $_id) {
      success
      errors {
        path
        message
      }
    }
  }
`;
