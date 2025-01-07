import { Global, HttpStatus, Injectable } from '@nestjs/common';

@Global() // Jadikan provider ini global
@Injectable() // Deklarasikan sebagai provider
export class HttpResponseProvider {
    success(
        data: any,
        message: string = 'Success',
        statusCode: HttpStatus = HttpStatus.OK,
    ) {
        return {
            success: true,
            statusCode,
            message,
            data,
        };
    }

    notFound(
        message: string = 'Not found',
        statusCode: HttpStatus = HttpStatus.NOT_FOUND,
    ) {
        return {
            success: false,
            statusCode,
            message,
            data: null,
        };
    }

    error(
        message: string = 'Error',
        statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    ) {
        return {
            success: false,
            statusCode,
            message,
            data: null,
        };
    }
}