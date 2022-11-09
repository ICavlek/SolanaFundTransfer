import { Connection } from "@solana/web3.js";

export function getConnection(solanaNetwork: string): Connection {
    return new Connection(
        `https://api.${solanaNetwork}.solana.com`, 'confirmed'
    );
}