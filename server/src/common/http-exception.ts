import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server';

    // add message of exception
    message = message instanceof Object ? message.message : message;

    if (message instanceof Array) {
      for (let i = 0; i < message.length; i++) {
        if (message[i].split(' ')[0].includes('.')) {
          const customMessage = message[i].split('.');
          customMessage[0] = customMessage[0].split('.')[2];
          message[i] = customMessage.join(' ');
        }
      }
    }

    response.status(status).send({
      statusCode: status,
      timestamps: new Date().toUTCString(),
      path: request.url,
      message,
    });
  }
}
