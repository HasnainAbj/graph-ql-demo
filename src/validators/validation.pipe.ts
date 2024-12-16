import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: {
        target: false,
        value: false,
      },
    });

    if (errors.length > 0) {
      const firstErrorMessage = this.getFirstError(errors[0]); //constraints[Object.keys(constraints)[0]];
      throw new BadRequestException({ message: firstErrorMessage });
    }
    return object;
  }

  private getFirstError(error: ValidationError): string {
    if (error.constraints) {
      return error.constraints[Object.keys(error.constraints)[0]];
    } else if (error.children) {
      return this.getFirstError(error.children[0]);
    } else {
      return 'Validation error';
    }
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
