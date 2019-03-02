import { gql } from 'graphql-tag';

export const GET_USER_FULL_PROFILE = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      avatar
      profile {
        id
        name
        position
        organisation
        interestOne
        interestTwo
        interestThree
        bio
        twitter
        linkedin
      }
    }
  }
`;
