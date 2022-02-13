export const dbToFrontConverter = (db: {}) => {
    const dbMap = new Map();
    for (let [key, value] of Object.entries(db)) {
        let keySplit = key.split("_");
        let newKey;
        if (keySplit[1]) {
            keySplit[1] = keySplit[1][0].toUpperCase() + keySplit[1].substring(1);
        };
        newKey = keySplit.join("");
        dbMap.set(newKey, value);
    }
    return Object.fromEntries(dbMap);
};