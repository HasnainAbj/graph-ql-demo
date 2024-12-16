import { registerDecorator, ValidationOptions } from 'class-validator';

/**
 * For validating date-time difference
 * difference between given two date-time(timestamps) must be 4-12 hours
 * @param property to compare current value with this property's value
 * @param validationOptions
 */
export function IsValidPassword(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsValidPassword',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          if (!value) {
            return false;
          }

          const hasNumber = new RegExp(/[0-9]/).test(value);
          const hasLower = new RegExp(/[a-z]/).test(value);
          const hasUpper = new RegExp(/[A-Z]/).test(value);
          const hasSpecial = new RegExp(/[!#@$%^&*)(+=._-]/).test(value);

          const count = [hasNumber, hasLower, hasUpper, hasSpecial].filter(
            (v) => v,
          ).length;

          if (count >= 2) {
            return true;
          } else {
            return false;
          }
        },
      },
    });
  };
}
