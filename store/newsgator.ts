import { defineStore } from 'pinia';
import { ArticleInterface, SourceInterface, UserInterface, UserPrefsInterface } from '~/interfaces/response';

export const useNewsGatorStore = defineStore({
	id: 'articles-store',
	state: () => {
		return {
			filteredArticles: [] as ArticleInterface[],
			articles: [] as ArticleInterface[],
			categories: [] as string[],
			sources: [] as SourceInterface[],
			countries: [] as string[],
			preferences: {
				category: '',
				sources: '',
			} as UserPrefsInterface,
			user: {} as UserInterface,
			token: '' as string,
		};
	},
	persist: true,
	actions: {
		async fetchArticles() {
			let query = '';

			if (this.preferences?.category) {
				query += `category=${this.preferences?.category}`;
			} else if (this.preferences?.sources) {
				query += `sources=${this.preferences?.sources}`;
			}

			const { data, refresh }: any = await useFetch(`http://newsgator.rohitb.me:3123/api/articles?country=in&page_size=8&${query}`, {
				cache: 'no-cache',
			});

			const loadPost = () => {
				refresh();
			};

			loadPost();

			if (data?.value?.data?.articles) {
				this.articles = data?.value?.data?.articles;
			}
		},
		async fetchFilteredArticles(query: string) {
			const { data }: any = await useFetch(`http://newsgator.rohitb.me:3123/api/articles?country=in&page_size=8&${query}`, {
				cache: 'no-cache',
			});

			if (data?.value?.data?.articles) {
				this.filteredArticles = data?.value?.data?.articles;
			}
		},
		async fetchCategories() {
			const { data }: any = await useFetch('http://newsgator.rohitb.me:3123/api/articles/categories', {
				cache: 'no-cache',
			});
			if (data?.value?.data) {
				this.categories = data?.value?.data;
			}
		},
		async fetchSources() {
			const { data }: any = await useFetch('http://newsgator.rohitb.me:3123/api/articles/sources', {
				cache: 'no-cache',
			});
			if (data.value) {
				this.sources = data?.value?.data.sources;
			}
		},
		async fetchCountries() {
			const { data }: any = await useFetch('http://newsgator.rohitb.me:3123/api/articles/countries', {
				cache: 'no-cache',
			});
			if (data.value) {
				this.countries = data?.value?.data;
			}
		},
		async fetchUserPreferences() {
			const { data }: any = await useFetch('http://newsgator.rohitb.me:3123/api/user/preferences', {
				cache: 'no-cache',
				headers: {
					Authorization: 'Bearer ' + this.token,
				},
			});
			if (data.value) {
				this.preferences = data?.value?.data;
			}
		},

		async login(payload: { email: string; password: string }) {
			const body = new URLSearchParams();
			body.append('email', payload.email);
			body.append('password', payload.password);

			const { data }: any = await useFetch('http://newsgator.rohitb.me:3123/api/auth/login', {
				cache: 'no-cache',
				method: 'POST',
				body: body,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});

			if (data.value) {
				this.token = data?.value?.data?.token;
				this.user = {
					email: data?.value?.data?.email,
					name: data?.value?.data?.name,
				};
				return true;
			} else {
				return false;
			}
		},

		async logout() {
			this.token = '';
			this.user = {} as UserInterface;
		},

		async savePrefs(payload: { categories: string; sources: string }) {
			console.log('🚀 ~ savePrefs ~ payload:', payload);
			const body = new URLSearchParams();
			body.append('categories', payload.categories);
			body.append('sources', payload.sources);

			const { data }: any = await useFetch('http://newsgator.rohitb.me:3123/api/user/preferences', {
				cache: 'no-cache',
				method: 'POST',
				body: body,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: 'Bearer ' + this.token,
				},
			});

			this.preferences = {
				category: payload.categories,
				sources: payload.sources,
			};
		},

		async register(payload: { email: string; password: string; name: string }) {
			const body = new URLSearchParams();
			body.append('name', payload.name);
			body.append('email', payload.email);
			body.append('password', payload.password);

			const { data, error }: any = await useFetch('http://newsgator.rohitb.me:3123/api/auth/register', {
				cache: 'no-cache',
				method: 'POST',
				body: body,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});
			if (data?.value?.data?.errors) {
				return false;
			} else {
				return true;
			}
		},
	},
});
