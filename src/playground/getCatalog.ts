export const getCatalog = (endpoint: string) => ({
  endpoint,
	name: `getCatalog`,
  query: `query getCatalog($board: ID! $number: Int!) {
	page(board: $board number: $number) {
		id
		images
		replies
		op {
			id
			subject
			teaser
			attachment {
				thumbnail
			}
		}
	}
}`,
  variables: `{
	"board": "a",
	"number": 1
}`
});
