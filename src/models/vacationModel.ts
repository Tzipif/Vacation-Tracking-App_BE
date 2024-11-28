import Joi from 'joi'
import { ValidationError } from './exceptions';

class VacationModel {
    id?: number;
    destination: string;
    description: string;
    start_vocation: Date;
    end_vocation: Date;
    price: number;
    url_image?: string;
    followers_count?: number;

    constructor(vm: any) {
        this.id = vm.id
        this.destination = vm.destination
        this.description = vm.description
        this.start_vocation = vm.start_vocation
        this.end_vocation = vm.end_vocation
        this.price = vm.price
        this.url_image = vm.url_image
        this.followers_count = vm.followers_count
    }


    private static validateSchema = Joi.object({
        id: Joi.number().optional(),
        destination: Joi.string().min(3).max(225).required(),
        description: Joi.string().required(),
        start_vocation: Joi.date().iso().min('now').required(),
        end_vocation: Joi.date().iso().min(Joi.ref('start_vocation')).required(),
        price: Joi.number().positive().max(10000).required(),
        url_image: Joi.string().optional(),
        followers_count: Joi.number().optional().positive()
    })

    validate(): void {
        const res = VacationModel.validateSchema.validate(this);
        if (res.error) {
            throw new ValidationError(res.error.details[0].message)
        }
    }
}

export default VacationModel;