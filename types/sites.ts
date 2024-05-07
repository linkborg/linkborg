import {User} from "next-auth";

export interface SiteCreateRequest {
	user: User;
	name: string;
	subdomain: string;
}