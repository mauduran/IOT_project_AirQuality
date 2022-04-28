import RiskLevelColors from "../constants/RiskLevelColors";
import ALERT_LEVELS, { ALERT_LEVELS_TEXT } from "../constants/AirQualityLevels";

export const reduceValueArrayToDayAverages = (array, daysInMonth) => {
    const hashmap = array.reduce((map, item) => {
        if (item.day in map) {
            map[item.day].push(parseInt(item.value));
        } else {
            map[item.day] = [parseInt(item.value)];
        }
        return map;
    }, {});

    const dayAveragesArray = new Array(daysInMonth).fill(0);

    for (const [key, val] of Object.entries(hashmap)) {
        dayAveragesArray[parseInt(key) - 1] = val.reduce((a, b) => a + b) / val.length;
    }

    return dayAveragesArray;
}

export const reduceValueArrayToLevelCount = (array, daysInMonth) => {
    const valueLevelCountMap = {}
    for (const level of Object.keys(ALERT_LEVELS)) {
        valueLevelCountMap[level] = {
            color: RiskLevelColors[level],
            title: ALERT_LEVELS_TEXT[level],
            values: new Array(daysInMonth).fill(0)
        }
    }

    for (const item of array) {
        if (item.level in valueLevelCountMap) {
            valueLevelCountMap[item.level].values[parseInt(item.day) - 1]++;
        }
    }

    return valueLevelCountMap;
}
