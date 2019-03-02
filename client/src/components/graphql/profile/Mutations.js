import { gql } from 'apollo-boost';

export const CREATE_PROFILE = gql`
  mutation AddProfile(
    $userId: String!
    $name: String!
    $position: String!
    $organisation: String
    $interestOne: String!
    $interestTwo: String
    $interestThree: String
    $bio: String
    $twitter: String
    $linkedin: String
  ) {
    addProfile(
      userId: $userId
      name: $name
      position: $position
      organisation: $organisation
      interestOne: $interestOne
      interestTwo: $interestTwo
      interestThree: $interestThree
      bio: $bio
      twitter: $twitter
      linkedin: $linkedin
    ) {
      profile {
        id
        userId
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

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $_id: ID!
    $name: String
    $organisation: String
    $position: String
    $interestOne: String!
    $interestTwo: String
    $interestThree: String
    $bio: String
    $twitter: String
    $linkedin: String
  ) {
    updateProfile(
      _id: $_id
      name: $name
      organisation: $organisation
      position: $position
      interestOne: $interestOne
      interestTwo: $interestTwo
      interestThree: $interestThree
      bio: $bio
      twitter: $twitter
      linkedin: $linkedin
    ) {
      success
      profile {
        id
        name
        organisation
        position
        interestOne
        interestTwo
        interestThree
        bio
        twitter
        linkedin
      }
      error
    }
  }
`;
