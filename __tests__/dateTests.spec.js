const unitTestingTask = require("../unitTestingTask");
const setupMockDate = require("../mocks/mockDateSetup");
const timezonedDate = require('timezoned-date');

let mockDate;

beforeEach(() => {
    mockDate = setupMockDate();
});

afterEach(() => {
    mockDate.reset();
});

describe("Date time testing", () => {

    test("it should throw an error if format argument is missing", () => {
        expect(() => unitTestingTask()).toThrow('Argument `format` must be a string');
    });

    test("it should throw an error if date argument is not a valid Date, Timestamp, or ISODate String", () => {
        expect(() => unitTestingTask('d-M-YY', true)).toThrow(
            'Argument `date` must be instance of Date or Unix Timestamp or ISODate String'
        );
    });

    const testCases = [
        {
            format: "DDD, dd MMMM YYYY",
            date: "2023-04-23T12:00:00.000Z",
            expected: "Sunday, 23 April 2023",
        },
        {
            format: "DD, dd MMMM YYYY",
            date: "2023-04-23T12:00:00.000Z",
            expected: "Sun, 23 April 2023",
        },
        {
            format: "DD MMMM YYYY",
            date: "2023-04-23T12:00:00.000Z",
            expected: "Sun April 2023",
        },
        {
            format: "DDD, dd MMMM YYYY",
            date: "2023-03-10T12:00:00.000Z",
            expected: "Friday, 10 March 2023",
        },
        {
            format: "dd MMMM YYYY",
            date: "2023-05-12T12:00:00.000Z",
            expected: "12 May 2023",
        },
        {
            format: "dd MMM YYYY",
            date: "2023-08-03T12:00:00.000Z",
            expected: "03 Aug 2023",
        },
        {
            format: "D-M-YY",
            date: "2023-04-23T12:00:00.000Z",
            expected: "Su-4-23",
        },
        {
            format: "dd-M-YY",
            date: "2023-04-23T12:00:00.000Z",
            expected: "23-4-23",
        },
        {
            format: "d-M-YY",
            date: "2023-04-23T12:00:00.000Z",
            expected: "23-4-23",
        },
        {
            format: "d-M-YY HH:mm:ss",
            date: "2023-04-23T17:48:30.000Z",
            expected: "23-4-23 17:48:30",
        },
        {
            format: "d-M-YY HH:mm:ss:ff",
            date: "2023-04-23T17:48:30.000Z",
            expected: "23-4-23 17:48:30:000",
        },
        {
            format: "d-M-YY HH:mm:ss:f",
            date: "2023-04-23T17:48:30.000Z",
            expected: "23-4-23 17:48:30:0",
        },
        {
            format: "d-M-YY H:m:s",
            date: "2023-04-23T17:48:30.000Z",
            expected: "23-4-23 17:48:30",
        },
        {
            format: "d-M-YY hh:mm:ss",
            date: "2023-04-23T17:48:30.000Z",
            expected: "23-4-23 05:48:30",
        },
        {
            format: "d-M-YY h:m:s",
            date: "2023-04-23T17:48:30.000Z",
            expected: "23-4-23 5:48:30",
        },
    ];

    test.each(testCases)(
        "it should convert the date based on token and language for format '%s'",
        ({format, date, expected}) => {
            unitTestingTask.lang("en");
            mockDate.set({isoDate: date, offset: 0}); // Adjust the offset as needed
            const result = unitTestingTask(format, new Date());
            expect(result).toBe(expected);
        }
    );


    const testCasesPolishLanguage = [
        {
            format: "DDD, dd MMMM YYYY",
            date: "2023-04-23T12:00:00.000Z",
            expected: "niedziela, 23 kwietnia 2023",
        },
        {
            format: "DD MMMM YYYY",
            date: "2023-04-23T12:00:00.000Z",
            expected: "nie kwiecień 2023",
        },
        {
            format: "DDD, dd MMMM YYYY",
            date: "2023-03-10T12:00:00.000Z",
            expected: "piątek, 10 marca 2023",
        },
        {
            format: "dd MMMM YYYY",
            date: "2023-05-12T12:00:00.000Z",
            expected: "12 maja 2023",
        },
        {
            format: "dd MMMM YYYY",
            date: "2023-08-03T12:00:00.000Z",
            expected: "03 sierpnia 2023",
        },
        {
            format: "dd MMM YYYY",
            date: "2023-08-03T12:00:00.000Z",
            expected: "03 sie 2023",
        },
    ];

    test.each(testCasesPolishLanguage)(
        "it should convert the date based on token and language for format '%s'",
        ({format, date, expected}) => {
            unitTestingTask.lang("pl");
            mockDate.set({isoDate: date, offset: 0}); // Adjust the offset as needed
            const result = unitTestingTask(format, new Date());
            expect(result).toBe(expected);
        }
    );

    test("it should handle different meridiem (AM/PM) values", () => {

        const date1AM = new Date('2023-04-23 07:48:30');
        const date2PM = new Date('2023-04-23 17:48:30');
        const format = 'd-M-YY hh:mm:ss';

        unitTestingTask.lang("en");
        expect(unitTestingTask(format + ' A', date1AM)).toBe('23-4-23 07:48:30 AM');
        expect(unitTestingTask(format + ' A', date2PM)).toBe('23-4-23 05:48:30 PM');
        expect(unitTestingTask(format + ' a', date1AM)).toBe('23-4-23 07:48:30 am');
        expect(unitTestingTask(format + ' a', date2PM)).toBe('23-4-23 05:48:30 pm');
    });


    test('it should handle time zone offset', () => {
        const Date = timezonedDate.makeConstructor(120); // offset in minutes, GMT+2
        const formattedDate = unitTestingTask('d-M-YY HH:mm:ss ZZ', new Date('2025-04-23T17:48:30.000Z'));
        expect(formattedDate).toBe('23-4-25 19:48:30 +0200'); // original date +2 hours of offset
    });
});
