import { DecimalSeparator } from './types';
import { decimalSeparators } from './decimalSeparators';
import { NumberValidator } from './numberValidator';

export class DecimalSeparatorGuesser {
    static guess(value: string): DecimalSeparator {
        const pointCount = value.split(decimalSeparators.point).length - 1;
        const commaCount = value.split(decimalSeparators.comma).length - 1;

        if (pointCount === 0 && commaCount === 0) {
            return decimalSeparators.point;
        }

        const canBeInteger = NumberValidator.canBeInteger(value);

        if (pointCount > 0 && commaCount === 0) {
            return this.selectDecimalSeparator(!canBeInteger, decimalSeparators.point, decimalSeparators.comma);
        }

        if (commaCount > 0 && pointCount === 0) {
            return this.selectDecimalSeparator(!canBeInteger, decimalSeparators.comma, decimalSeparators.point);
        }

        return this.selectDecimalSeparator(
            this.lastPosition(value, decimalSeparators.point) > this.lastPosition(value, decimalSeparators.comma),
            decimalSeparators.point,
            decimalSeparators.comma
        );
    }

    private static selectDecimalSeparator(condition: boolean, trueOption: DecimalSeparator, falseOption: DecimalSeparator): DecimalSeparator {
        return condition ? trueOption : falseOption;
    }

    private static lastPosition(string: string, separator: DecimalSeparator): number {
        const lastPosition = string.lastIndexOf(separator);
        return lastPosition !== -1 ? lastPosition : -1;
    }
}