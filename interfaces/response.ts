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
