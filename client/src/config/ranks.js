export const RANKS = {
    Herald: {
        name: "Herald",
        min: 11,
        max: 15,
        imageLocation: "/assets/images/ranks/Herald"
    },
    Guardian: {
        name: "Guardian",
        min: 21,
        max: 25,
        imageLocation: "/assets/images/ranks/Guardian"
    },
    Crusader: {
        name: "Crusader",
        min: 31,
        max: 35,
        imageLocation: "/assets/images/ranks/Crusader"
    },
    Archon: {
        name: "Archon",
        min: 41,
        max: 45,
        imageLocation: "/assets/images/ranks/Archon"
    },
    Legend: {
        name: "Legend",
        min: 51,
        max: 55,
        imageLocation: "/assets/images/ranks/Legend"
    },
    Ancient: {
        name: "Ancient",
        min: 61,
        max: 65,
        imageLocation: "/assets/images/ranks/Ancient"
    },
    Divine: {
        name: "Divine",
        min: 71,
        max: 75,
        imageLocation: "/assets/images/ranks/Divine"
    },
    Immortal: {
        name: "Immortal",
        min: 81,
        max: 85,
        imageLocation: "/assets/images/ranks/Immortal"
    },

}

// find matching rank
export const findRank = (aveBracket) => {
    for (const rank in RANKS) {
        const {name, min, max, imageLocation } = RANKS[rank]
        if (aveBracket == Math.floor(min/10)) {
            return {name, imageLocation}
        }
    }

    return {name: "Unknown", imageLocation: "Unknown"};
};


// custom rounding to the nearest rank
export const customRound = (number, set) => {
    let closest = set.reduce((prev, curr) => Math.abs(curr - number) < Math.abs(prev - number) ? curr : prev);
    return closest;
}