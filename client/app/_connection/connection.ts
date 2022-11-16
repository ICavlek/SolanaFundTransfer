import { Connection } from "@solana/web3.js";
import { ConnectionError } from "../_error/error";

export function getConnection(solanaNetwork: string): Connection {
    if (solanaNetwork === 'devnet' || solanaNetwork === 'mainnet') {
        return new Connection(
            `https://api.${solanaNetwork}.solana.com`, 'confirmed'
        );
    }
    throw new ConnectionError();
}