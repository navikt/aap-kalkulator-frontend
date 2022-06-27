import { gql } from "graphql-tag";

export const GET_QUESTIONS = gql`
  {
    questions {
      id
      title
    }
  }
`;
