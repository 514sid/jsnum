import { decimalSeparators } from './decimalSeparators';
import { DecimalSeparatorGuesser } from './decimalSeparatorGuesser';
import { DecimalSeparator } from './types';

export class Num {
    public static float(value: string | number, decimalSeparator: DecimalSeparator | null = null): number {
        return Num.floatOrInt(value, decimalSeparator, true);
    }

    public static int(value: string | number, decimalSeparator: DecimalSeparator | null = null): number {
        return Num.floatOrInt(value, decimalSeparator);
    }

    private static floatOrInt(value: string | number, decimalSeparator: DecimalSeparator | null = null, returnFloat: boolean = false): number {
        if (typeof value === 'string') {
            let cleanedValue = Num.cleanValue(value, decimalSeparator);

            if (cleanedValue === '') {
                return returnFloat ? 0.0 : 0;
            }

            if (cleanedValue.charAt(0) === decimalSeparators.comma || cleanedValue.charAt(0) === decimalSeparators.point) {
                cleanedValue = '0' + cleanedValue;
            }

            const numericValue = returnFloat ? parseFloat(cleanedValue) : parseInt(cleanedValue, 10);

            return value.charAt(0) === '-' ? -numericValue : numericValue;
        }

        if (typeof value === 'number') {
            return returnFloat ? value : Math.floor(value);
        }

        throw new Error('The value must be either numeric or a string.');
    }

    public static guessDecimalSeparator(value: string): DecimalSeparator {
        return DecimalSeparatorGuesser.guess(value);
    }

    private static cleanValue(value: string, decimalSeparator: DecimalSeparator | null = null): string {
        decimalSeparator = decimalSeparator || Num.guessDecimalSeparator(value);

        let cleanedValue = value.replace(new RegExp('[^\\d' + Num.escapeRegExp(decimalSeparator) + ']', 'g'), '');

        if (decimalSeparator === decimalSeparators.comma) {
            cleanedValue = cleanedValue.replace(decimalSeparator, decimalSeparators.point);
        }

        return cleanedValue;
    }

    private static escapeRegExp(s: string): string {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }
}
