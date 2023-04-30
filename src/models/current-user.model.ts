import { Gender } from "@prisma/client";

export class CurrentUserDto{
      name:string;
      email: string;
      phone: string;
      gender: Gender;
      isGold?: boolean;
}