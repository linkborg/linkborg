import {User} from "next-auth";

export interface SiteCreateRequest {
	user: User;
	name: string;
	subdomain: string;
	description?: string;
	logo?: string;
	image?: string;
	analytics_code?: string;
	theme?: string;
	layout?: string;
}

export interface SiteUpdateRequest {
	id: string;
	name?: string;
	description?: string;
	logo?: string;
	image?: string;
	subdomain?: string;
	analytics_code?: string;
	theme?: string;
	layout?: string;
}

export interface SiteDeleteRequest {
	id: string;
	userId?: string;
}