export const getPopular = (endpoint: string) => ({
  endpoint,
	name: `getPopular`,
  query: `query getPopular($boards: [ID]!) {
	popular(boards: $boards) {
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
		board {
			id
			title
		}
	}
}`,
  variables: `{
	"boards": ["3","a","adv","an","asp","biz","c","cgl","ck","cm","co","diy","fa","fit","g","gd","his","int","jp","k","lgbt","lit","m","mlp","mu","n","news","o","out","p","po","qa","qst","sci","sp","tg","toy","trv","tv","v","vg","vip","vp","vr","w","wsg","wsr","x"]
}`
});
