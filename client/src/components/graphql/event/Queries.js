import { gql } from 'apollo-boost';

export const GET_DAY_EVENTS = gql`
  query Onedayevents(
    $day: String!
    $interestOne: String!
    $interestTwo: String
    $interestThree: String
  ) {
    onedayevents(
      day: $day
      interestOne: $interestOne
      interestTwo: $interestTwo
      interestThree: $interestThree
    ) {
      id
      userId
      name
      ispublic
      categoryOne
      categoryTwo
      categoryThree
      location
      startDate
      startTime
      endDate
      endTime
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
`;

export const GET_EVENTS = gql`
  {
    events {
      id
      userId
      name
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
  }
`;

export const GET_EVENT = gql`
  query Event($id: ID!) {
    event(id: $id) {
      id
      userId
      ispublic
      name
      description
      location
      categoryOne
      categoryTwo
      categoryThree
      startDate
      startTime
      endDate
      endTime
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
`;
