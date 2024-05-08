import {User} from "next-auth";

export interface LinkCreateRequest {
	title: string;
	slug: string;
	siteId: string;
}