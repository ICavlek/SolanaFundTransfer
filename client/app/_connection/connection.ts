import { Connection } from "@solana/web3.js";
import { ConnectionError } from "../_error/error";

export function getConnection(solanaNetwork: string): Connection {
    if ((solanaNetwork !== 'devnet') && (solanaNetwork !== 'mainnet')) {
        throw new ConnectionError();
    }
    return new Connection(
        `https://api.${solanaNetwork}.solana.com`, 'confirmed'
    );
}