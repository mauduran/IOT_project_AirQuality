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

    for(const [key, val] of Object.entries(hashmap)) {
        dayAveragesArray[parseInt(key)-1] = val.reduce((a,b)=>a+b) / val.length;
    }

    return dayAveragesArray;
}