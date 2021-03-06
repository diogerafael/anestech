import { ValidationError, SequelizeValidationError: } from "sequelize";
import ApiError, { APIError } from '@src/util/erros/api-erros';
export abstract class BaseController {
    protected sendCreateUpdateErrorResponse(
        res: any,
        error: ValidationError | Error
    ): void {
        if (error instanceof ValidationError) {
            const clientErrors = this.handleClientErrors(error);
            res.status(clientErrors.code)
                .send({ code: clientErrors.code, error: clientErrors.error });
        }
        else if (error instanceof SequelizeValidationError) {
            const clientErrors = this.handleClientErrorsSeq(error);
            res.status(clientErrors.code)
                .send({ code: clientErrors.code, error: clientErrors.error });
        }
        else {
            res.status(500).send({ code: 500, error: 'Something went wrong!' });
        }
    }


    private handleClientErrors(
        error: ValidationError
    ): { code: number; error: string } {
        const duplicatedKindErrors = Object.values(error.errors).filter(
            (err: any) => err.validatorKey === ValidationError
        );
        if (duplicatedKindErrors.length) {
            return { code: 409, error: error.message };
        }
        return { code: 422, error: error.message };
    }


    private handleClientErrorsSeq(
        error: SequelizeValidationError
    ): { code: number; error: string } {
        const duplicatedKindErrors = Object.values(error.errors).filter(
            (err: any) => err.validatorKey === ValidationError
        );
        if (duplicatedKindErrors.length) {
            return { code: 409, error: error.message };
        }
        return { code: 422, error: error.message };
    }


    protected sendErrorResponse(res: any, apiError: APIError): Response {
        return res.status(apiError.code).send(ApiError.format(apiError));
    }



}