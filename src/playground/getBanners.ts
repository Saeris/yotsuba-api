export const getBanners = (endpoint: string) => ({
  endpoint,
	name: `getBanners`,
  query: `query getBanners {
	banners {
		url
		extension
	}
}`
});
