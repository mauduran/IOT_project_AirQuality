import moment from 'moment';

export const msToSeconds = (seconds) => {
    return seconds * 1000;
}

export const msToMinutes = (minutes) => {
    return minutes * 60 * 1000;
}

export const getDaysInMonth = (month, year) => {
    return moment(`${month}/${year}`, "MM/YYYY").daysInMonth();
}

export const generateEmptyArrayWithDaysInMonth = (month, year) => {
    const daysInMonth = getDaysInMonth(month, year);
    return new Array(daysInMonth).fill(0);
}
export const generateArrayWithDaysInMonth = (month, year) => {
    const daysInMonth = getDaysInMonth(month, year);
    return new Array(daysInMonth).fill(0).map((_, idx) => `${padWithZero(idx+1)}/${month}/${year}`);
}

export const padWithZero = (value) => {
    return (value.toString().length<2)? `0${value}`: value;
};

