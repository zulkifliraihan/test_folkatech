
import { PrismaClient } from "@prisma/client";
import prismaHelper from "../app/helpers/prismaHelper";

const prisma = new PrismaClient()

/***********************************/
/* SOFT DELETE MIDDLEWARE */
/***********************************/

prisma.$use(async (params, next) => {
    const modelName = params.model
    if (params.action === 'delete' || params.action === 'deleteMany') {

      params.action = 'update';
      if (params.args.data) {
        params.args.data.updatedAt = new Date();
        params.args.data.deletedAt = new Date();
      }
      else {
        params.args.data = { 
            updatedAt: new Date(),
            deletedAt: new Date(),
        };
      }

      if (params.args.include) {
        const includeKeys = Object.keys(params.args.include);
        let foreignId = modelName?.toLowerCase() + '_id'

        for (const key of includeKeys) {
        
            if (params.args.include[key] === true) {

                foreignId = key == 'media' ? 'model_id' : foreignId

                params.args.data[key] = { 
                    updateMany: {
                        where: {
                            [foreignId]: params.args.where.id,
                        },                        
                        data: {
                            updatedAt: new Date(),
                            deletedAt: new Date()
                        }
                    } 
                };
            }
        }
      }
    }
    
    if (params.action === 'findUnique' || params.action === 'findFirst') {

      const checkUniqueColumns = await prismaHelper.checkUniqueColumns(params.model)

      if (!checkUniqueColumns) {

          params.action = 'findFirst';
          params.args.where = {
            ...params.args.where,
            deletedAt: null,
          };
      }
    }
    
    if (params.action === 'findMany') {
        // Find many queries
        if (params.args) {
            params.args.where = {
                ...params.args.where,
                deletedAt: null,
            };
            
            if(params.args.include) {
                console.log(params)
                const includeKeys = Object.keys(params.args.include);
                for (const key of includeKeys) {
                    if (params.args.include[key] === true && key != 'store') {
                        params.args.include[key] = {
                            where: {
                                deletedAt: null,
                            },
                        };
                    }
                }
            }
            
        } else {
            params['args'] = { 
                where: {
                    deletedAt: null 
                }
            }
        }
    }

    if (params.action === 'update' || params.action === 'updateMany') {
        params.action = 'update';
        if (params.args.data) {
            params.args.data.updatedAt = new Date();
        } else {
            params.args.data = { updatedAt: new Date() };
        }
    }
    
    return next(params);
});
  
export default prisma
    