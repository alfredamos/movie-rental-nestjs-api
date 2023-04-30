import { UserType } from "@prisma/client";
import { CurrentUserDto } from "./current-user.model";

export class CustomerInfo{
    id!: string;
    name!: string;
    userType!: UserType;
    message?: string;
    token?: string;
    user?: CurrentUserDto;
    isLoggedIn?: boolean;
}