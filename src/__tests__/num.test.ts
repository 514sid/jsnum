import { Num } from "../num";
import { decimalSeparators } from "../decimalSeparators";

describe("Num Tests", () => {
    const conversionData = [
        {
            name: 'Guesser',
            testCases: [
                ['123',         123.0,      123],
                ['-123',        -123.0,     -123],
                ['12.34567',    12.34567,   12],
                ['12.34',       12.34,      12],
                ['12.345',      12345.0,    12345],
                ['-12.345',     -12345.0,   -12345],
                ['text',        0.0,        0],
                ['.12',         0.12,       0],
                [123.45,        123.45,     123],
                [123,           123.0,      123],
            ],
            separator: null,
        },
        {
            name: 'Point Separator',
            testCases: [
                ['123',             123.0,          123],
                ['1,234,567.89',    1234567.89,     1234567],
                ['1,234,567',       1234567.0,      1234567],
                ['1 234 567.89',    1234567.89,     1234567],
                ['123,4567.89',     1234567.89,     1234567],
                ['1\'234\'567.89',  1234567.89,     1234567],
                ['-1\'234\'567.89', -1234567.89,    -1234567],
                ['12,345',          12345.0,        12345],
                ['12,3456',         123456.0,       123456],
                ['3.14159265359',   3.14159265359,  3],
                ['$12.30',          12.30,          12],
                ['-12.30',          -12.30,         -12],
                ['text',            0.0,            0],
                ['.12',             0.12,           0],
                ['-123.45',         -123.45,        -123],
                [123,               123.0,          123],
            ],
            separator: decimalSeparators.point,
        },
        {
            name: 'Comma Separator',
            testCases: [
                ['123',             123.0,          123],
                ['1 234 567,89',    1234567.89,     1234567],
                ['1.234.567,89',    1234567.89,     1234567],
                ['1\'234\'567,89',  1234567.89,     1234567],
                ['12,345',          12.345,         12],
                ['-12,345',         -12.345,        -12],
                ['3,14159265359',   3.14159265359,  3],
                ['12.34567',        1234567.0,      1234567],
                ['12.34',           1234.0,         1234],
                ['12.345',          12345.0,        12345],
                ['-12.345',         -12345.0,       -12345],
                ['text',            0.0,            0],
                [',12',             0.12,           0],
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
