import { getConnection } from "../../app/_connection/connection";
import { ClientBaseError } from "../../app/_error/error";

describe('getConnection test suite', () => {
    test('first test', () => {
        try {
            const connection = getConnection('mainnet');
        } catch (e) {
            if (e instanceof ClientBaseError) {
                console.log(e.message);
            } else {
                throw e;
            }
        }
    });
});