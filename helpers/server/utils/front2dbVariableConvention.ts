export const front2DbConverter  = (user: {}) => {
    const dbMap = new Map();
    for (let [key, value] of Object.entries(user)) {
        const upperCaseIdx = key.search(/[A-Z]/g)
        if ( upperCaseIdx !== -1 ) {
            const upperCaseChar = key[upperCaseIdx];
            const toLowerCase = upperCaseChar.toLowerCase()
            let keyreplaced = key.replace(upperCaseChar, `_${toLowerCase}`);
            dbMap.set(keyreplaced, value);
        } else dbMap.set(key, value);
    }
    return Object.fromEntries(dbMap);
};

