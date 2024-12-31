export interface LinkCreateRequest {
	title: string;
	description?: string;
	slug: string;
	longurl: string;
	siteId: string;
}

export interface LinkUpdateRequest {
	id: string;
	title?: string;
	description?: string; 
	slug?: string;
	longurl?: string;
	siteId?: string;
}

export interface LinkDeleteRequest {
	id: string;
	siteId?: string;
}