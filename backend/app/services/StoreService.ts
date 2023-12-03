import bcrypt from 'bcrypt';
import StoreInterface from "../repository/StoreRepository/StoreInterface";
import ServiceType from "../types/ServiceType";
import StoreValidation from '../validation/StoreValidation';
import 'moment-timezone';

class StoreService {
    constructor(
        private StoreRepository: StoreInterface,
    ) {}

    async getData(): Promise<ServiceType> {
        const stores = await this.StoreRepository.getData()
    
        const returnData: ServiceType = {
            status: true,
            response: "get",
            data: stores,
        };
      
          return returnData;
    }

    async createData(data: any): Promise<ServiceType> {

        let returnData
        const { error } = StoreValidation.createStore.validate(data, {abortEarly: false})

        if (error) {
            const errors = error.details.map((err) => err.message);

            returnData = {
                status: false,
                response: "validation",
                errors: errors,
            };

            return returnData
        }

        const Store = await this.StoreRepository.createData(data)

        returnData = {
            status: true,
            response: "created",
            data: Store,
        };
      
        return returnData;
    }

    async detailData(id: number): Promise<ServiceType> {
        const stores = await this.StoreRepository.detailData(id)

        let returnData
        if (stores) {
            returnData = {
                status: true,
                response: "get",
                data: stores,
            };
        }
        else {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Store Not Found",
            };
        }
      
        return returnData;
    }

    async updateData(id: number, data: any): Promise<ServiceType> {

        const { error } = StoreValidation.updateStore.validate(data, {abortEarly: false})

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
        const checkStore = await this.StoreRepository.detailData(id)
        
        if (!checkStore) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Store Not Found",
                errors: null
            };
            return returnData
        }

        const dataStore: object = {
            name: data.name ?? undefined
        }

        const Store = await this.StoreRepository.updateData(id, dataStore)

        returnData = {
            status: true,
            response: "updated",
            data: Store,
        };
      
        return returnData;
    }

    async deleteData(id: number): Promise<ServiceType> {
        const checkStore = await this.StoreRepository.detailData(id)
        
        let returnData
        if (!checkStore) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Store Not Found",
                errors: null
            };
            return returnData
        }

        const stores = await this.StoreRepository.deleteData(id)

        if (stores) {
            returnData = {
                status: true,
                response: "deleted",
                data: stores,
            };
        }
        else {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Store Not Found",
            };
        }
      
        return returnData;
    }
}

export default StoreService
