export interface ApiResponseInterface {
	message: string;
	data: any;
	error: boolean;
	errors: any;
}

export interface ArticleInterface {
	source: Source;
	author: undefined | string;
	title: string;
	description: undefined | string;
	url: string;
	urlToImage: undefined | string;
	publishedAt: string;
	content: undefined | string;
}

export interface Source {
	id: null | string;
	name: string;
}

export interface UserInterface {
	email: string;
	name: string;
}

export interface SourceInterface {
	category: string;
	country: string;
	description: string;
	id: string;
	language: string;
	name: string;
	url: string;
}

export interface UserPrefsInterface {
	category: string;
	sources: string;
}

export interface QueryInterface {
	q?: string;
	sources?: string;
	category?: string;
}
