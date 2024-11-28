import { StatusCode } from "./statusEnum";

export abstract class AppExcption {
    readonly message: string
    readonly status: number

    constructor(message:string, status: StatusCode) {
        this.message = message;
        this.status = status;
    }
}

export class ValidationError extends AppExcption {
    constructor(message: string) {
        super(message, StatusCode.BadRequest);
    }
}

export class NotFoundError extends AppExcption {
    constructor(message: string) {
        super(message, StatusCode.NotFound);
    }
}

export class UnauthorizedError extends AppExcption {
    constructor(message: string){
        super(message, StatusCode.Unauthorized);
    }
}