import { GraphQLError } from 'graphql';

export const formatterErrors = (error: GraphQLError): any => {
  return {
    error: error.extensions,
    code: error.message,
  };
};
