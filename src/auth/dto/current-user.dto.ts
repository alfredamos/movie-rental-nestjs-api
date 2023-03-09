import { UserType } from "@prisma/client";

export class CurrentUserDto{
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    userType?: UserType;
}