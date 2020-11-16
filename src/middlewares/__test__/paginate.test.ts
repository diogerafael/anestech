import AuthService from "@src/services/auth";
import { paginateMiddleware } from "../paginate";

describe('PaginateMiddleware', () => {
    it('should verify a query param limit', () => {
        const reqFake = {
        };
        const resFake = {};
        const nextFake = jest.fn();

        paginateMiddleware(reqFake, resFake, nextFake);

        //verifica se funcao foi passada
        expect(nextFake).toHaveBeenCalled();
    });

});