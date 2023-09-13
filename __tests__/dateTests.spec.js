const unitTestingTask = require("../unitTestingTask");
const setupMockDate = require("../mocks/mockDateSetup");

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
    ({ format, date, expected }) => {
        unitTestingTask.lang("en");
        mockDate.set({ isoDate: date, offset: 0 }); // Adjust the offset as needed
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
    ({ format, date, expected }) => {
        unitTestingTask.lang("pl");
        mockDate.set({ isoDate: date, offset: 0 }); // Adjust the offset as needed
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

    const testCasesTimeZoneOffset = [
        {timeZoneOffset: 0, expectedOffset: "+0000"},
        {timeZoneOffset: -60, expectedOffset: "-0100"},
        {timeZoneOffset: 60, expectedOffset: "+0100"},
        {timeZoneOffset: -120, expectedOffset: "-0200"},
        {timeZoneOffset: 120, expectedOffset: "+0200"},
        {timeZoneOffset: -180, expectedOffset: "-0300"},
        {timeZoneOffset: 180, expectedOffset: "+0300"},
        {timeZoneOffset: -240, expectedOffset: "-0400"},
        {timeZoneOffset: 240, expectedOffset: "+0400"},
    ];

    test.each(testCasesTimeZoneOffset)(
        "it should convert the date based on token and time zone offset",
        ({ timeZoneOffset }) => {
            mockDate.set({ offset: timeZoneOffset });

            const isoDate = '2023-04-23T17:48:30.000Z';

            const offsetMilliseconds = timeZoneOffset * 60 * 1000;
            const adjustedDate = new Date(new Date(isoDate).getTime() + offsetMilliseconds);

            const sign = timeZoneOffset >= 0 ? '+' : '-';
            const hours = Math.abs(Math.floor(timeZoneOffset / 60)).toString().padStart(2, '0');
            const minutes = Math.abs(timeZoneOffset % 60).toString().padStart(2, '0');
            const formattedOffset = `${sign}${hours}${minutes}`;

            const formattedDate = unitTestingTask('d-M-YY HH:mm:ss ZZ', adjustedDate);
            const expectedFormat = `${adjustedDate.getDate()}-${adjustedDate.getMonth() + 1}-${adjustedDate.getFullYear().toString().slice(-2)} ${adjustedDate.getHours().toString().padStart(2, '0')}:${adjustedDate.getMinutes().toString().padStart(2, '0')}:${adjustedDate.getSeconds().toString().padStart(2, '0')} ${formattedOffset}`;

            expect(formattedDate).toBe(expectedFormat);
        }
    );
});



