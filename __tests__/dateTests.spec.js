const unitTestingTask = require("../unitTestingTask");

describe("Unit Testing Task", () => {
    test("it should convert the date based on token and language", () => {

        unitTestingTask.lang('pl');
        expect(unitTestingTask('dd MMMM YYYY', new Date('2023-01-15'))).toBe('15 stycznia 2023');
        expect(unitTestingTask('dd MMMM YYYY', new Date('2023-05-12'))).toBe('12 maja 2023');
        expect(unitTestingTask('dd MMMM YYYY', new Date('2023-11-09'))).toBe('09 listopada 2023');
        expect(unitTestingTask('dd MMM YYYY', new Date('2023-02-20'))).toBe('20 lut 2023');
        expect(unitTestingTask('dd MMM YYYY', new Date('2023-08-03'))).toBe('03 sie 2023');
        expect(unitTestingTask('dd MMM YYYY', new Date('2023-12-25'))).toBe('25 gru 2023');
        expect(unitTestingTask('DDD, dd MMMM YYYY', new Date('2023-03-10'))).toBe('piątek, 10 marca 2023');
        expect(unitTestingTask('DDD, dd MMMM YYYY', new Date('2023-07-18'))).toBe('wtorek, 18 lipca 2023');
        expect(unitTestingTask('DDD, dd MMMM YYYY', new Date('2023-09-22'))).toBe('piątek, 22 września 2023');
        expect(unitTestingTask('DD, dd MMMM YYYY', new Date('2023-04-05'))).toBe('śr, 05 kwietnia 2023');
        expect(unitTestingTask('DD, dd MMMM YYYY', new Date('2023-10-14'))).toBe('sb, 14 październik 2023');
        expect(unitTestingTask('DD, dd MMMM YYYY', new Date('2023-06-30'))).toBe('pt, 30 czerwca 2023');
        expect(unitTestingTask('hh:mm A', new Date('2023-12-25 02:30'))).toBe('02:30 rano');
        expect(unitTestingTask('hh:mm A', new Date('2023-12-25 09:15'))).toBe('09:15 rano');

        unitTestingTask.lang('en');
        expect(unitTestingTask('DDD, dd MMMM YYYY', new Date('2023-03-10'))).toBe('Friday, 10 March 2023');
        expect(unitTestingTask('DDD, dd MMMM YYYY', new Date('2023-07-18'))).toBe('Tuesday, 18 July 2023');
        expect(unitTestingTask('dd MMMM YYYY', new Date('2023-01-15'))).toBe('15 January 2023');
        expect(unitTestingTask('dd MMMM YYYY', new Date('2023-05-12'))).toBe('12 May 2023');
        expect(unitTestingTask('dd MMM YYYY', new Date('2023-02-20'))).toBe('20 Feb 2023');
        expect(unitTestingTask('dd MMM YYYY', new Date('2023-08-03'))).toBe('03 Aug 2023');
        expect(unitTestingTask('D-M-YY', new Date('2023-04-23'))).toBe('Su-4-23');
        expect(unitTestingTask('dd-M-YY', new Date('2023-04-23'))).toBe('23-4-23');
        expect(unitTestingTask('d-M-YY', new Date('2023-04-23'))).toBe('23-4-23');
        expect(unitTestingTask('d-M-YY HH:mm:ss', new Date('2023-04-23 17:48:30'))).toBe('23-4-23 17:48:30');
        expect(unitTestingTask('d-M-YY HH:mm:ss:ff', new Date('2023-04-23 17:48:30'))).toBe('23-4-23 17:48:30:000');
        expect(unitTestingTask('d-M-YY HH:mm:ss:f', new Date('2023-04-23 17:48:30'))).toBe('23-4-23 17:48:30:0');
        expect(unitTestingTask('d-M-YY H:m:s', new Date('2023-04-23 17:48:30'))).toBe('23-4-23 17:48:30');
        expect(unitTestingTask('d-M-YY hh:mm:ss', new Date('2023-04-23 17:48:30'))).toBe('23-4-23 05:48:30');
        expect(unitTestingTask('d-M-YY h:m:s', new Date('2023-04-23 17:48:30'))).toBe('23-4-23 5:48:30');
    });

    test("it should handle different meridiem (AM/PM) values", () => {
        expect(unitTestingTask('d-M-YY hh:mm:ss A', new Date('2023-04-23 07:48:30'))).toBe('23-4-23 07:48:30 AM');
        expect(unitTestingTask('d-M-YY hh:mm:ss A', new Date('2023-04-23 17:48:30'))).toBe('23-4-23 05:48:30 PM');
        expect(unitTestingTask('d-M-YY hh:mm:ss a', new Date('2023-04-23 07:48:30'))).toBe('23-4-23 07:48:30 am');
    });

    test("it should convert the date based on token and different time zones", () => {
        expect(unitTestingTask('d-M-YY HH:mm:ss ZZ', new Date('2023-04-23 17:48:30 GMT+02:00'))).toBe('23-4-23 17:48:30 +0200');
    });

    test("it should convert the date based on token and different time zones", () => {
        expect(unitTestingTask('d-M-YY HH:mm:ss ZZ', new Date('2023-04-23 17:48:30 GMT-05:00'))).toBe('23-4-23 22:48:30 -0500');
        expect(unitTestingTask('d-M-YY HH:mm:ss ZZ', new Date('2023-04-23 17:48:30 GMT+03:30'))).toBe('23-4-23 14:18:30 +0330');
    });

    test("it should convert the date based on token and language", () => {
        unitTestingTask.lang('kk');
        expect(unitTestingTask('DD MMMM YYYY', new Date('2023-01-15'))).toBe('15 қаңтар 2023');
        expect(unitTestingTask('DD MMMM YYYY', new Date('2023-05-12'))).toBe('12 мамыр 2023');
        expect(unitTestingTask('DD MMMM YYYY', new Date('2023-11-09'))).toBe('09 қараша 2023');
        expect(unitTestingTask('DD MMM YYYY', new Date('2023-02-20'))).toBe('20 ақпан 2023');
        expect(unitTestingTask('DD MMM YYYY', new Date('2023-08-03'))).toBe('03 маусым 2023');
        expect(unitTestingTask('DD MMM YYYY', new Date('2023-12-25'))).toBe('25 желтоқсан 2023');
        expect(unitTestingTask('dddd, DD MMMM YYYY', new Date('2023-03-10'))).toBe('жексенбі, 10 науырыз 2023');
        expect(unitTestingTask('dddd, DD MMMM YYYY', new Date('2023-07-18'))).toBe('сейсенбі, 18 шілде 2023');
        expect(unitTestingTask('dddd, DD MMMM YYYY', new Date('2023-09-22'))).toBe('сәрсенбі, 22 қыркүйек 2023');
        expect(unitTestingTask('ddd, DD MMMM YYYY', new Date('2023-04-05'))).toBe('жк, 05 сәуір 2023');
        expect(unitTestingTask('ddd, DD MMMM YYYY', new Date('2023-10-14'))).toBe('сб, 14 қазан 2023');
        expect(unitTestingTask('ddd, DD MMMM YYYY', new Date('2023-06-30'))).toBe('сен, 30 маусым 2023');
    });

    test("it should throw an error for incorrect arguments", () => {
        expect(() => unitTestingTask()).toThrow('Argument `format` must be a string');
        expect(() => unitTestingTask('d-M-YY', true)).toThrow(
            'Argument `date` must be instance of Date or Unix Timestamp or ISODate String'
        );
    });
});