import { UserType } from "@prisma/client";

export class CustomerInfo{
    id!: string;
    name!: string;
    userType!: UserType;
    message?: string;
    token?: string;
}