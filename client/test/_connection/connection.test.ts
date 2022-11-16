import { getConnection } from "../../app/_connection/connection";
import { ClientBaseError } from "../../app/_error/error";

describe('getConnection test suite', () => {
    test('mainnet connection', () => {
        getConnection('mainnet');
    });

    test('devnet connection', () => {
        getConnection('mainnet');
    });

    test('wrong connection', () => {
        const t = () => {
            getConnection('dinamo');
        };
        expect(t).toThrow(ClientBaseError);
    });
});