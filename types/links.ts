import {User} from "next-auth";

export interface LinkCreateRequest {
	title: string;
	slug: string;
	longurl: string;
	siteId: string;
}