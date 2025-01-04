import { HttpStatus } from "@nestjs/common";

export const HttpResponseProvider = {
    provide: 'HttpResponse',
    useValue: {
        success: (data: any, message: string = 'Success', statusCode: HttpStatus = HttpStatus.OK) => ({
            success: true,
            statusCode,
            message,
            data,
        }),
        notFound: (message: string = 'Not found', statusCode: HttpStatus = HttpStatus.NOT_FOUND) => ({
            success: false,
            statusCode,
            message,
        }),
        error: (message: string = 'Error', statusCode: HttpStatus = HttpStatus.BAD_REQUEST) => ({
            success: false,
            statusCode,
            message,
        }),
    },
};