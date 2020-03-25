export const getThread = (endpoint: string) => ({
  endpoint,
	name: `getThread`,
  query: `query getThread($board: ID!, $id: ID!, $latest: Boolean!) {
	thread(board: $board, id: $id) {
		id
		topic
		replies
		images
		sticky
		closed
		op {
			...PostContent
		}
		posts(latest: $latest) {
			...PostContent
		}
	}
}

fragment PostContent on Post {
	id
	isOp
	author
	subject
	content
	timestamp(format: "hh:mm:ssa MMMM do, y (iii)")
	board {
		id
	}
	thread {
		id
	}
	attachment {
		url
		thumbnail
		filename
		extension
		filesize
		width
		height
		thumbnailWidth
		thumbnailHeight
	}
}`,
  variables: `{
	"board": "p",
	"id": "1971605",
	"latest": true
}`
});
