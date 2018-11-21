// eslint-disable
// this is an auto generated file. This will be overwritten

export const createEvent = `mutation CreateEvent(
  $name: String!
  $when: String!
  $where: String!
  $description: String!
) {
  createEvent(
    name: $name
    when: $when
    where: $where
    description: $description
  ) {
    id
    name
    where
    when
    description
    comments {
      items {
        eventId
        commentId
        content
        createdAt
      }
      nextToken
    }
  }
}
`;
export const deleteEvent = `mutation DeleteEvent($id: ID!) {
  deleteEvent(id: $id) {
    id
    name
    where
    when
    description
    comments {
      items {
        eventId
        commentId
        content
        createdAt
      }
      nextToken
    }
  }
}
`;
export const commentOnEvent = `mutation CommentOnEvent($eventId: ID!, $content: String!, $createdAt: String!) {
  commentOnEvent(eventId: $eventId, content: $content, createdAt: $createdAt) {
    eventId
    commentId
    content
    createdAt
  }
}
`;
