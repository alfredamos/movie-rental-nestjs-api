import {Reflector} from "@nestjs/core";
import { Injectable, ExecutionContext, CanActivate, Param, UnauthorizedException} from '@nestjs/common';
import { UserType } from "@prisma/client";
import { CustomerInfo } from "src/models/customer-info.model";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const isPublic = this.reflector.getAllAndOverride<boolean>("isPublic", [
            context.getClass(),
            context.getHandler()
        ])

        if(isPublic) return true;

        const roles = this.reflector.get<string[]>("roles", context.getHandler());

        if(!roles) return false;

        const request = context.switchToHttp().getRequest();

        const customerInfo: CustomerInfo = request.user;        
       
        if(!customerInfo){
            throw new UnauthorizedException("You are not authorized to perform this task.");
        }

        return this.matchRoles(roles, customerInfo?.userType);
    }

    matchRoles(roles: string[], userType: UserType): boolean{
        return roles.includes(userType)
    }
}