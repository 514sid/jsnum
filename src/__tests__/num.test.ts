import { Num } from "../num";
import { decimalSeparators } from "../decimalSeparators";
import { NumberValidator } from "../numberValidator";

describe("Num Tests", () => {
    const conversionData = [
        {
            name: 'Guesser',
            testCases: [
                ['123', 123.0, 123],
                ['-123', -123.0, -123],
                ['12.34567', 12.34567, 12],
                ['12.34', 12.34, 12],
                ['text', 0.0, 0],
                ['.12', 0.12, 0],
                [123.45, 123.45, 123],
                [123, 123.0, 123],
            ],
            separator: null,
        },
        {
            name: 'Point Separator',
            testCases: [
                ['123', 123.0, 123],
                ['1,234,567.89', 1234567.89, 1234567],
                ['1,234,567', 1234567.0, 1234567],
                ['1 234 567.89', 1234567.89, 1234567],
                ['123,4567.89', 1234567.89, 1234567],
                ['1\'234\'567.89', 1234567.89, 1234567],
                ['-1\'234\'567.89', -1234567.89, -1234567],
                ['12,345', 12345.0, 12345],
                ['12,3456', 123456.0, 123456],
                ['3.14159265359', 3.14159265359, 3],
                ['$12.30', 12.30, 12],
                ['-12.30', -12.30, -12],
                ['text', 0.0, 0],
                ['.12', 0.12, 0],
                ['-123.45', -123.45, -123],
                [123, 123.0, 123],
            ],
            separator: decimalSeparators.point,
        },
        {
            name: 'Comma Separator',
            testCases: [
                ['123', 123.0, 123],
                ['1 234 567,89', 1234567.89, 1234567],
                ['1.234.567,89', 1234567.89, 1234567],
                ['1\'234\'567,89', 1234567.89, 1234567],
                ['12,345', 12.345, 12],
                ['-12,345', -12.345, -12],
                ['3,14159265359', 3.14159265359, 3],
                ['12.34567', 1234567.0, 1234567],
                ['12.34', 1234.0, 1234],
                ['12.345', 12345.0, 12345],
                ['-12.345', -12345.0, -12345],
                ['text', 0.0, 0],
                [',12', 0.12, 0],
            ],
            separator: decimalSeparators.comma,
        },
    ];

    conversionData.forEach((dataSet) => {
        describe(dataSet.name, () => {
            dataSet.testCases.forEach(([input, expectedFloat, expectedInt]) => {
                it(`should convert ${input} to float and int`, () => {
                    expect(Num.float(input, dataSet.separator)).toBe(expectedFloat);
                    expect(Num.int(input, dataSet.separator)).toBe(expectedInt);
                });
            });
        });
    });
});

describe('Number Validator Tests', () => {
    it('should return point as the decimal separator', () => {
        const floatValue = '12.345'
        const intValue = '12,345'

        expect(NumberValidator.deviceDecimalSeparator()).toBe(decimalSeparators.point);
        expect(Num.float(floatValue)).toBe(12.345);
        expect(Num.float(intValue)).toBe(12345.0);
        expect(Num.int(floatValue)).toBe(12);
        expect(Num.int(intValue)).toBe(12345);
    });

    it('should return comma as the decimal separator', () => {
        const spy = jest.spyOn(Number.prototype, 'toLocaleString');

        spy.mockImplementation(function (this: number) {
            return this.toString().replace('.', ',');
        });

        const floatValue = '12,345';
        const intValue = '12.345';

        expect(NumberValidator.deviceDecimalSeparator()).toBe(decimalSeparators.comma);
        expect(Num.float(floatValue)).toBe(12.345);
        expect(Num.float(intValue)).toBe(12345.0);
        expect(Num.int(floatValue)).toBe(12);
        expect(Num.int(intValue)).toBe(12345);
    });
});
