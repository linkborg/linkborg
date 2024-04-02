import {Session, User} from "next-auth";

declare module "next-auth" {
    
    interface Session {
        id: string;
        sessionToken: string;
        user: User;
        expires: Date;
    }
    
    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        access_token?: string;
        refresh_token?: string;
        user?: User
    }
}