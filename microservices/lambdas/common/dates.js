const isToday = (date) => {
    const today = new Date()
    return date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()
}

const getTodayDate = () => {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
}

const getTodayString = () => {
    const date = new Date();
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    return `${day}/${month}/${date.getFullYear()}`;
}

const getDateString = (isoDate) => {
    const date = new Date(isoDate);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    return `${day}/${month}/${date.getFullYear()}`;
}

const getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNum = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return { weekYear: d.getUTCFullYear(), weekNum: weekNum };
}

const addHours = (date, hours) => {
    let newDate = date
    newDate.setHours(date.getHours() + hours);
}

const getWeekFromOffset = (offset) => {
    const currentWeek = getWeekNumber(new Date());

    let offsetYear = currentWeek.weekYear;
    let offsetWeek = currentWeek.weekNum - offset;

    if (offsetWeek < 1) {
        offsetYear--;
        offsetWeek += 52;
    }

    return { weekYear: offsetYear, weekNum: offsetWeek };
}

module.exports = {
    isToday,
    getTodayDate,
    getTodayString,
    addHours,
    getDateString,
    getWeekNumber,
    getWeekFromOffset,
}