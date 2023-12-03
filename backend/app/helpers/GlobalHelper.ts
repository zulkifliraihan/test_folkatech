import minioConfig from "../../config/minio";
import prisma from "../../config/prisma";

class GlobalHelper {
    async uploadFile(fileName: string, file: any, mimetype?: string, size?: string, model?: string, modelId?: number) {
        let returnData
        const minioClient = minioConfig

        const MINIO_BUCKET_NAME: string = process.env.MINIO_BUCKET_NAME || ''
        const MINIO_ENDPOINT: string = process.env.MINIO_ENDPOINT || ''
        const MINIO_PORT: string = process.env.MINIO_PORT || ''

        await minioClient.putObject(MINIO_BUCKET_NAME, fileName, file, function (err: any, objInfo: any) {
            if (err) {
              return console.log(err)
            }

            returnData = objInfo
        })

        if (model && modelId) {
            console.log("In If Model")
            const urlFileMinio = `https://${MINIO_ENDPOINT}:${MINIO_PORT}/${MINIO_BUCKET_NAME}/${fileName}`
            const dataMedia: any = {
                model_id: modelId,
                model_type: model,
                filename: fileName,
                mime_type: mimetype,
                size: size,
                url: urlFileMinio
            }

            console.log(dataMedia)

            await prisma.media.create({
                data: dataMedia
            })
        }

        return returnData
    }
}

export default GlobalHelper