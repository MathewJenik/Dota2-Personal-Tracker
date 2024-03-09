const mongoose = require('mongoose')

const matchSchema = new mongoose.Schema({
    match_id: {
        type: Number,
        required: true
    },
    start_time: {
        type: Number,
        required: true
    },
    barracks_status_dire: {
        type: Number,
        require: true
    },
    barracks_status_radiant: {
        type: Number,
        require: true
    },
    dire_score: {
        type: Number,
        require: true
    },
    radiant_score: {
        type: Number,
        require: true
    },
    duration: {
        type: Number,
        require: true
    },
    first_blood_time: {
        type: Number,
        require: true
    },
    game_mode: {
        type: Number,
        require: true
    },
    patch: {
        type: Number,
        require: true
    },
    region: {
        type: Number,
        require: true
    },
    players: [{
        account_id: {
            type: Number,
            required: true,
            default: -1
        },
        hero_id: {
            type: Number,
            required: true,
        },
        lane_pos: {
            type: Object,
            required: false
        },
        net_worth: {
            type: Number,
            required: true
        },
        gold_per_min: {
            type: Number,
            requried: true
        },
        xp_per_min: {
            type: Number,
            required: true
        },
        item_0: {
            type: Number,
            required: true
        },
        item_1: {
            type: Number,
            required: true
        },
        item_2: {
            type: Number,
            required: true
        },
        item_3: {
            type: Number,
            required: true
        },
        item_4: {
            type: Number,
            required: true
        },
        item_5: {
            type: Number,
            required: true
        },
        backpack_0: {
            type: Number,
            required: true
        },
        backpack_1: {
            type: Number,
            required: true
        },
        backpack_2: {
            type: Number,
            required: true
        },
        aghanims_scepter: {
            type: Number,
            required: true,
            default: 0
        },
        aghanims_shard: {
            type: Number,
            required: true,
            default: 0
        },
        moonshard: {
            type: Number,
            required: true,
            default: 0
        },
        purchase: {
            type: Object,
            required: false
        },
        purchase_log: {
            type: Object,
            required: false
        },
        isRadiant: {
            type: Boolean,
            required: true
        },
        last_hits: {
            type: Number,
            required: true
        },
        denies: {
            type: Number,
            required: true
        },
        kills: {
            type: Number,
            required: true
        },
        deaths: {
            type: Number,
            required: true
        },
        assists: {
            type: Number,
            required: true
        },
        win: {
            type: Boolean,
            required: true
        },
        lose: {
            type: Boolean,
            required: true
        }
    }],
    picks_bans: [{
        is_pick: {
            type: Boolean,
            required: true
        },
        hero_id: {
            type: Number,
            required: true
        },
        team: {
            type: Number,
            required: true
        },
        order: {
            type: Number,
            required: true
        }
    }]
})

module.exports = mongoose.model('Match', matchSchema)