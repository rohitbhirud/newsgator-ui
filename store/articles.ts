import { defineStore } from 'pinia';
import { ArticleInterface } from '~/interfaces/response';

export const useArticlesStore = defineStore({
	id: 'articles-store',
	state: () => {
		return {
			articles: [] as ArticleInterface[],
		};
	},
	actions: {
		async fetchArticles() {
			const { data }: any = await useFetch('http://newsgator.test/api/articles?country=in&page_size=8');
			if (data.value) {
				this.articles = data?.value?.data?.articles;
			}
		},
	},
});
