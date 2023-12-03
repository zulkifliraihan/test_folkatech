import bcrypt from 'bcrypt';
import RoleInterface from "../repository/RoleRepository/RoleInterface";
import ServiceType from "../types/ServiceType";
import RoleValidation from '../validation/RoleValidation';
import 'moment-timezone';

class RoleService {
    constructor(
        private roleRepository: RoleInterface,
    ) {}

    async getData(): Promise<ServiceType> {
        const roles = await this.roleRepository.getData()
    
        const returnData: ServiceType = {
            status: true,
            response: "get",
            data: roles,
        };
      
          return returnData;
    }

    async createData(data: any): Promise<ServiceType> {

        let returnData
        const { error } = RoleValidation.createRole.validate(data, {abortEarly: false})

        if (error) {
            const errors = error.details.map((err) => err.message);

            returnData = {
                status: false,
                response: "validation",
                errors: errors,
            };

            return returnData
        }

        const dataRole: object = {
            name: data.name
        }

        const role = await this.roleRepository.createData(dataRole)

        returnData = {
            status: true,
            response: "created",
            data: role,
        };
      
        return returnData;
    }

    async detailData(id: number): Promise<ServiceType> {
        const roles = await this.roleRepository.detailData(id)

        let returnData
        if (roles) {
            returnData = {
                status: true,
                response: "get",
                data: roles,
            };
        }
        else {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Role Not Found",
            };
        }
      
        return returnData;
    }

    async updateData(id: number, data: any): Promise<ServiceType> {

        const { error } = RoleValidation.updateRole.validate(data, {abortEarly: false})

        let returnData
        if (error) {
            const errors = error.details.map((err) => err.message);

            returnData = {
                status: false,
                response: "validation",
                errors: errors,
            };

            return returnData
        }
        const checkRole = await this.roleRepository.detailData(id)
        
        if (!checkRole) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Role Not Found",
                errors: null
            };
            return returnData
        }

        const dataRole: object = {
            name: data.name ?? undefined
        }

        const role = await this.roleRepository.updateData(id, dataRole)

        returnData = {
            status: true,
            response: "updated",
            data: role,
        };
      
        return returnData;
    }

    async deleteData(id: number): Promise<ServiceType> {
        const checkRole = await this.roleRepository.detailData(id)
        
        let returnData
        if (!checkRole) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Role Not Found",
                errors: null
            };
            return returnData
        }

        const roles = await this.roleRepository.deleteData(id)

        if (roles) {
            returnData = {
                status: true,
                response: "deleted",
                data: roles,
            };
        }
        else {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Role Not Found",
            };
        }
      
        return returnData;
    }
}

export default RoleService
