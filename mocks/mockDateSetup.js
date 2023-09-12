const timezonedDate = require("timezoned-date");

const originalDate = Date;

function setupMockDate() {
    function reset() {
        Date = originalDate;
    }

    function set({ isoDate, offset }) {
        const getMockDate = () => {
            let MockDate;

            jest.isolateModules(() => {
                MockDate = require("mockdate");
            });

            return MockDate;
        };

        if (offset !== undefined) {
            Date = timezonedDate.makeConstructor(offset);
        }

        if (isoDate !== undefined) {
            getMockDate().set(isoDate);
        }
    }

    return { reset, set };
}

module.exports = setupMockDate;