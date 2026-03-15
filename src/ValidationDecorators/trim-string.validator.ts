import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'noLeadingTrailingSpaces', async: false })
export class NoLeadingTrailingSpaces implements ValidatorConstraintInterface {
  validate(text: string) {
    if (!text) return false;
    return text === text.trim(); // убираем пробелы в начале и конце
  }

  defaultMessage() {
    return 'Поле не должно содержать пробелы в начале или конце';
  }
}
