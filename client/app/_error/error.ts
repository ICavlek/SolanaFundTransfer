export class ClientBaseError extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, ClientBaseError.prototype);
    }
}