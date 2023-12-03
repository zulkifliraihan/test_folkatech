import GlobalHelper from "../helpers/GlobalHelper";
import ProductInterface from "../repository/ProductRepository/ProductInterface";
import ServiceType from "../types/ServiceType";
import ProductValidation from '../validation/ProductValidation';

const globalHelper = new GlobalHelper()

class ProductService {
    constructor(
        private ProductRepository: ProductInterface,
    ) {}

    async getData(): Promise<ServiceType> {
        const products = await this.ProductRepository.getData()
    
        const returnData: ServiceType = {
            status: true,
            response: "get",
            data: products,
        };
      
          return returnData;
    }

    async createData(data: any): Promise<ServiceType> {

        let returnData
        const { error } = ProductValidation.createProduct.validate(data, {abortEarly: false})

        if (error) {
            const errors = error.details.map((err) => err.message);

            returnData = {
                status: false,
                response: "validation",
                errors: errors,
            };

            return returnData
        }

        const files = data.files

        data.price = parseFloat(data.price)
        data.store_id = parseInt(data.store_id)
        data.stock = parseInt(data.stock)

        delete data.files

        let product: any = await this.ProductRepository.createData(data)

        if (files.length > 0) {
            await Promise.all(
                files.map(async (item: any) => {
                    await globalHelper.uploadFile(item.originalname, item.buffer, item.mimetype, item.size, "Product", product.id);
                })
            )
        }

        product = await this.ProductRepository.detailData(product.id)

        returnData = {
            status: true,
            response: "created",
            data: product,
        };
      
        return returnData;
    }

    async detailData(id: number): Promise<ServiceType> {
        const product = await this.ProductRepository.detailData(id)

        let returnData
        if (product) {
            returnData = {
                status: true,
                response: "get",
                data: product,
            };
        }
        else {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Product Not Found",
            };
        }
      
        return returnData;
    }

    async updateData(id: number, data: any): Promise<ServiceType> {

        const { error } = ProductValidation.updateProduct.validate(data, {abortEarly: false})

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
        const checkProduct = await this.ProductRepository.detailData(id)
        
        if (!checkProduct) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Product Not Found",
                errors: null
            };
            return returnData
        }

        const files = data.files

        if (data.price) data.price = parseFloat(data.price)
        if (data.store_id) data.store_id = parseInt(data.store_id)
        if (data.stock) data.stock = parseInt(data.stock)

        delete data.files

        // if (files.length > 0) {
        //     data.media = {
        //         set: []
        //     }
        // }

        console.log(data)

        let product = await this.ProductRepository.updateData(id, data)
        console.log(product)
        if (files.length > 0) {
            product.media.forEach(async(item: any) => {
                await this.ProductRepository.deleteMedia(item.id)
            })
            await Promise.all([
                ...files.map(async (item: any) => {
                    await globalHelper.uploadFile(item.originalname, item.buffer, item.mimetype, item.size, "Product", product.id);
                }),
            ]);
            
          }
          

        product = await this.ProductRepository.detailData(product.id)

        returnData = {
            status: true,
            response: "updated",
            data: product,
        };
      
        return returnData;
    }

    async deleteData(id: number): Promise<ServiceType> {
        const checkProduct = await this.ProductRepository.detailData(id)
        
        let returnData
        if (!checkProduct) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Product Not Found",
                errors: null
            };
            return returnData
        }

        const products = await this.ProductRepository.deleteData(id)

        if (products) {
            returnData = {
                status: true,
                response: "deleted",
                data: products,
            };
        }
        else {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Product Not Found",
            };
        }
      
        return returnData;
    }
}

export default ProductService
