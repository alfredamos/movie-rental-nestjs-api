import { Injectable, ExecutionContext, CanActivate, Param, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { UserType } from "@prisma/client";
import { CustomerInfo } from "src/models/customer-info.model";
import {UuidTool} from "uuid-tool"

@Injectable()
export class CanModifyGuard implements CanActivate{
    constructor(       
        private prisma: PrismaService){}

    async canActivate(context: ExecutionContext): Promise<boolean>{       
        const request = context.switchToHttp().getRequest();

        const {id} = request.params;

        const rental = await this.prisma.rental.findUnique({
           where: {id}, 
        })

        if(!rental){
            throw new BadRequestException("There is no rental.");
        }
        
        const customerInfo: CustomerInfo = request.user;

        if(!customerInfo){
            throw new UnauthorizedException("You are not authorized to perform this task.");
        } 

        const customerIdFromCustomerInfo = customerInfo.id;
        const customerIdFromRental = rental?.customerId;

        const isEqual = UuidTool.compare(customerIdFromCustomerInfo, customerIdFromRental);
        
        if(isEqual || customerInfo?.userType === UserType.Admin){
            return true;
        }       

       return false;
    }

}