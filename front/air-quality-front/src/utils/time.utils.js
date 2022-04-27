import moment from 'moment';

export const msToSeconds = (seconds) => {
    return seconds * 1000;
}

export const msToMinutes = (minutes) => {
    return minutes * 60 * 1000;
}

export const generateEmptyArrayWithDaysInMonth = (month, year) => {
    const daysInMonth = moment(`${month}/${year}`, "MM/YYYY").daysInMonth();

    return new Array(daysInMonth).fill(0);
}
