import { defineStore } from 'pinia';
import { ArticleInterface, SourceInterface, UserInterface, UserPrefsInterface } from '~/interfaces/response';

export const useNewsGatorStore = defineStore({
	id: 'articles-store',
	state: () => {
		return {
			articles: [] as ArticleInterface[],
			categories: [] as string[],
			sources: [] as SourceInterface[],
			countries: [] as string[],
			preferences: {} as UserPrefsInterface,
			user: {} as UserInterface,
			token: '' as string,
		};
	},
	persist: true,
	actions: {
		async fetchArticles() {
			const { data }: any = await useFetch('http://newsgator.test/api/articles?country=in&page_size=8');

			if (data.value) {
				this.articles = data?.value?.data?.articles;
			}
		},
		async fetchCategories() {
			const { data }: any = await useFetch('http://newsgator.test/api/articles/categories');
			if (data.value) {
				this.categories = data?.value?.data;
			}
		},
		async fetchSources() {
			const { data }: any = await useFetch('http://newsgator.test/api/articles/sources');
			if (data.value) {
				this.sources = data?.value?.data.sources;
			}
		},
		async fetchCountries() {
			const { data }: any = await useFetch('http://newsgator.test/api/articles/countries');
			if (data.value) {
				this.countries = data?.value?.data;
			}
		},
		async fetchUserPreferences() {
			const { data }: any = await useFetch('http://newsgator.test/api/user/preferences', {
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

			const { data }: any = await useFetch('http://newsgator.test/api/auth/login', {
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

			const { data }: any = await useFetch('http://newsgator.test/api/user/preferences', {
				method: 'POST',
				body: body,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: 'Bearer ' + this.token,
				},
			});

			this.preferences = {
				categories: payload.categories,
				sources: payload.sources,
			};
		},

		async register(payload: { email: string; password: string }) {
			const body = new URLSearchParams();
			body.append('email', payload.email);
			body.append('password', payload.password);

			const { data }: any = await useFetch('http://newsgator.test/api/auth/register', {
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
			}
		},
	},
});
