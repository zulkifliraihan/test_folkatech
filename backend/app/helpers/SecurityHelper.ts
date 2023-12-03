
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWTSecret: any = process.env.JWT_SECRET

class SecurityHelper {
    hashPassword(password: string) {
        const hash = bcrypt.hashSync(password, 10);

        return hash
    }

    async checkPassword(reqPass: string, userPass: string) {
        
        const checkPassword = await bcrypt.compare(reqPass, userPass)

        return checkPassword
    }

    generateToken(data: any) {

        const token = jwt.sign({
            data: data,
        }, JWTSecret, {
            expiresIn: '2h'
        })

        return token
    }

    verifyToken(token: string) {
        const verify = jwt.verify(token, JWTSecret)
        
        return verify
    }
}

export default SecurityHelper
 