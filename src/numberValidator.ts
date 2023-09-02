import { decimalSeparators } from './decimalSeparators';
import { DecimalSeparator } from './types';

export class NumberValidator {
    public static canBeInteger(input: string): boolean {
        const cleanedInput = NumberValidator.cleanInput(input);
        const separatorCounts = NumberValidator.countSeparators(cleanedInput);

        if (!NumberValidator.hasExactlyOneSeparator(separatorCounts)) {
            return false;
        }

        const separatorPosition = NumberValidator.findSeparatorPosition(cleanedInput, separatorCounts);

        const separator = separatorCounts.commaCount > separatorCounts.pointCount ? decimalSeparators.comma : decimalSeparators.point

        return (
            NumberValidator.hasValidAmountOfDigitsBeforeSeparator(separatorPosition) &&
            NumberValidator.hasValidAmountOfDigitsAfterSeparator(cleanedInput, separatorPosition) &&
            (separator !== NumberValidator.deviceDecimalSeparator())
        );
    }

    private static cleanInput(input: string): string {
        input = input.replace(/[^\d,.]/g, '');
        return input.replace(/^0+/, '');
    }

    private static hasExactlyOneSeparator(separatorCounts: { pointCount: number; commaCount: number }): boolean {
        return separatorCounts.pointCount + separatorCounts.commaCount === 1;
    }

    private static countSeparators(input: string): { pointCount: number; commaCount: number } {
        const pointCount = input.split(decimalSeparators.point).length - 1;
        const commaCount = input.split(decimalSeparators.comma).length - 1;

        return { pointCount, commaCount };
    }

    private static findSeparatorPosition(input: string, separatorCounts: { pointCount: number; commaCount: number }): number {
        return separatorCounts.pointCount === 1
            ? input.indexOf(decimalSeparators.point)
            : input.indexOf(decimalSeparators.comma);
    }

    private static hasValidAmountOfDigitsBeforeSeparator(separatorPosition: number): boolean {
        return separatorPosition > 0 && separatorPosition <= 3;
    }

    private static hasValidAmountOfDigitsAfterSeparator(input: string, separatorPosition: number): boolean {
        const decimalPart = input.substr(separatorPosition + 1);
        return decimalPart.length === 3;
    }

    public static deviceDecimalSeparator(): DecimalSeparator {
        const n: number = 1.1;
        const formattedNumber: string = n.toLocaleString();
        const decimalSeparator: string = formattedNumber.substring(1, 2);

        return decimalSeparator === '.' ? decimalSeparators.point : decimalSeparators.comma
    }
}