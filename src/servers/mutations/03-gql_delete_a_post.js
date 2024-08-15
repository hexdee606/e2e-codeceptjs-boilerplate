module.exports = {
    mutation: `mutation (
  $id: ID!
) {
  deletePost(id: $id)
}`
};