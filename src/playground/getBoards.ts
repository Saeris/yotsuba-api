export const getBoards = (endpoint: string) => ({
  endpoint,
	name: `getBoards`,
  query: `query getBoards {
	boards {
		id
		title
		description
		pages
		worksafe
		category {
			id
			boards {
				id
			}
		}
	}
}`
});
