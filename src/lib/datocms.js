import { GraphQLClient } from "graphql-request";

export const request = ({ query, variables, includeDrafts, excludeInvalid }) => {
  const headers = {
    authorization: `Bearer ${import.meta.env.VITE_DATOCMS_API_TOKEN}`,
  };

  if (excludeInvalid) {
    headers['X-Exclude-Invalid'] = 'true';
  }

  if (includeDrafts) {
    headers['X-Include-Drafts'] = 'true';
  }

  const client = new GraphQLClient('https://graphql.datocms.com', { headers });
  return client.request(query, variables);
};
