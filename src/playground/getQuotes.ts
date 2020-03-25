export const getQuotes = (endpoint: string) => ({
  endpoint,
	name: `getQuotes`,
  query: `query getQuotes($board: ID!, $id: ID!) {
	thread(board: $board, id: $id) {
		op {
			id
			quotes {
				id
			}
		}
	}
}`,
  variables: `{
	"board": "3",
	"id": 561987
}`
});
