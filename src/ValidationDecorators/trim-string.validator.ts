import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";


@ValidatorConstraint({ name: 'noLeadingTrailingSpaces', async: false })
export class NoLeadingTrailingSpaces implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (!text) return false;
    return text === text.trim(); // убираем пробелы в начале и конце
  }

  defaultMessage(args: ValidationArguments) {
    return 'Поле не должно содержать пробелы в начале или конце';
  }
}