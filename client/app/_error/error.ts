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

export class NoFileError extends ClientBaseError {
    constructor(filePath: string) {
        super(`File ${filePath} does not exist`);
        Object.setPrototypeOf(this, NoFileError.prototype);
    }
}