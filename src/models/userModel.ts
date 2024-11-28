import Joi from 'joi'
import { ValidationError } from './exceptions';

class UserModel {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    password?: string;
    role?: string;
    token?: string;


    constructor(um: any) {
        this.id = um.id;
        this.first_name = um.first_name;
        this.last_name = um.last_name;
        this.email = um.email;
        this.password = um.password;
        this.role = um.role;
        this.token = um.token;
    }


    private static validateSchema = Joi.object({
        id: Joi.number().optional(),
        first_name: Joi.string().required().min(2).max(50),
        last_name: Joi.string().required().min(2).max(50),
        email: Joi.string().required().email(),
        role: Joi.string().optional(),
        password: Joi.string().required().min(4),
        token: Joi.string().optional(),
    })

    validate(): void {
        const res = UserModel.validateSchema.validate(this);
        if (res.error) {
            throw new ValidationError(res.error.details[0].message)
        }
    }
}

export default UserModel;