import { registerDecorator, ValidationOptions, matches } from 'class-validator';

/**
 * For validate email
 * @param validationOptions
 */
export function validateEmail(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'validateEmail',
      target: object.constructor,
      propertyName,
      constraints: [propertyName],
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (!value) {
            return false;
          }
          if (typeof value !== 'string') {
            return false;
          }

          // const regex = /\S+@\S+\.\S+/;
          // const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          const emailregex =
            /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,10}\.[0-9]{1,10}\.)|(([\w-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,10})(\]?)$/;

          const isValid = matches(value, emailregex);
          if (!isValid) {
            return false;
          }

          return true;
        },
      },
    });
  };
}
