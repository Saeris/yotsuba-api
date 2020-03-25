export const getPage = (endpoint: string) => ({
  endpoint,
	name: `getPage`,
  query: `query getPage($board: ID! $number: Int!) {
	page(board: $board number: $number) {
		id
		topic
		op {
			subject
			content
			attachment {
				url
				thumbnail
				filename
				extension
				filesize(convertTo: kB)
				width
				height
				thumbnailWidth
				thumbnailHeight
			}
		}
	}
}`,
  variables: `{
	"board": "a",
	"number": 1
}`
});
