import { Connection } from "@solana/web3.js";
import { ClientBaseError } from "../_error/error";

export function getConnection(solanaNetwork: string): Connection {
    if (solanaNetwork === 'devnet' || solanaNetwork === 'mainnet') {
        return new Connection(
            `https://api.${solanaNetwork}.solana.com`, 'confirmed'
        );
    }
    throw new ClientBaseError('Wrong network specified. Should be devnet or mainnet.');
}