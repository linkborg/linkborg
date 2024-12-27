import {User} from "next-auth";

export interface LinkCreateRequest {
	title: string;
	slug: string;
	longurl: string;
	siteId: string;
}

export interface LinkUpdateRequest {
	id: string;
	title: string;
	slug: string;
	longurl: string;
	siteId: string;
}

export interface LinkDeleteRequest {
	id: string;
}