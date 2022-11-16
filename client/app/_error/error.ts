export class ClientBaseError extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, ClientBaseError.prototype);
    }
}

export class ConnectionError extends ClientBaseError {
    constructor() {
        super('Wrong network specified. Should be devnet or mainnet.');
        Object.setPrototypeOf(this, ConnectionError.prototype);
    }
}