// GUN DEFINITIONS
const combineStats = function(arr) {
    try { 
    // Build a blank array of the appropiate length
    let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    arr.forEach(function(component) {
        for (let i=0; i<data.length; i++) {
            data[i] = data[i] * component[i];
        }
    });
    return {
        reload:     data[0],
        recoil:     data[1], 
        shudder:    data[2],
        size:       data[3],
        health:     data[4],
        damage:     data[5],
        pen:        data[6],
        speed:      data[7],
        maxSpeed:   data[8],
        range:      data[9],
        density:    data[10],
        spray:      data[11],
        resist:     data[12],
    };
    } catch(err) { 
        console.log(err);
        console.log(JSON.stringify(arr));
    }
};
const skillSet = (() => {
    let config = require('../config.json');
    let skcnv = {
        rld: 0,
        pen: 1,
        str: 2,
        dam: 3,
        spd: 4,
    
        shi: 5,
        atk: 6,
        hlt: 7,
        rgn: 8,
        mob: 9,
    };
    return args => {
        let skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let s in args) {
            if (!args.hasOwnProperty(s)) continue;
            skills[skcnv[s]] = Math.round(config.MAX_SKILL * args[s]);
        }
        return skills;
    };
})();

const g = { // Gun info here 
    trap:               [36,    1,     0.25,   0.6,    1,      0.75,   1,      5,      1,      1,      1,      15,     3], 
    swarm:              [18,    0.25,  0.05,   0.4,    1,      0.75,   1,      4,      1,      1,      1,      5,      1],  
    drone:              [50,    0.25,  0.1,    0.6,    1,      1,      1,      2,      1,      1,      1,      0.1,    1], 
    factory:            [60,    1,     0.1,    0.7,    1,      0.75,   1,      3,      1,      1,      1,      0.1,    1], 
    basic:              [18,    1.4,   0.1,    1,      1,      0.75,   1,      4.5,    1,      1,      1,      15,     1],  
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    blank:              [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    pet:                [1,     1,     1,      2.5,      1,      1,      1,      1,      1,      1,      1,      1,      1],
        spam:           [1.1,   1,     1,      1.05,   1,      1.1,    1,      0.9,    0.7,    1,      1,      1,      1.05],      
        minion:         [1,     1,     2,      1,      0.4,    0.4,    1.2,    1,      1,      0.75,   1,      2,      1],      
        single:         [1.05,  1,     1,      1,      1,      1,      1,      1.05,   1,      1,      1,      1,      1],  
    sniper:             [1.35,  1,     0.25,   1,      1,      0.8,    1.1,    1.5,    1.5,    1,      1.5,    0.2,    1.15],
        rifle:          [0.8,   0.8,   1.5,    1,      0.8,    0.8,    0.9,    1,      1,      1,      1,      2,      1],     
        assass:         [1.65,  1,     0.25,   1,      1.15,   1,      1.1,    1.18,   1.18,   1,      3,      1,      1.3],
        hunter:         [1.5,   0.7,   1,      0.95,   1,      0.9,    1,      1.1,    0.8,    1,      1.2,    1,      1.15], 
            hunter2:    [1,     1,     1,      0.9,    2,      0.5,    1.5,    1,      1,      1,      1.2,    1,      1.1], 
            preda:      [1.4,   1,     1,      0.8,    1.5,    0.9,    1.2,    0.9,    0.9,    1,      1,      1,      1],   
            snake:      [0.4,   1,     4,      1,      1.5,    0.9,    1.2,    0.2,    0.35,   1,      3,      6,      0.5],   
            sidewind:   [1.5,   2,     1,      1,      1.5,    0.9,    1,      0.15,   0.5,    1,      1,      1,      1],  
            snakeskin:  [0.6,   1,     2,      1,      0.5,    0.5,    1,      1,      0.2,    0.4,    1,      5,      1],
    mach:               [0.5,   0.8,   1.7,    1,      0.7,    0.7,    1,      1,      0.8,    1,      1,      2.5,    1],
        blaster:        [1,     1.2,   1.25,   1.1,    1.5,    1,      0.6,    0.8,    0.33,   0.6,    0.5,    1.5,    0.8], 
        chain:          [1.25,  1.33,  0.8,    1,      0.8,    1,      1.1,    1.25,   1.25,   1.1,    1.25,   0.5,    1.1], 
        mini:           [1.25,  0.6,   1,      0.8,    0.55,   0.45,   1.25,   1.33,   1,      1,      1.25,   0.5,    1.1], 
            stream:     [1.1,   0.6,   1,      1,      1,      0.65,   1,      1.24,   1,      1,      1,      1,      1],    
        shotgun:        [8,     0.4,   1,      1.5,    1,      0.4,    0.8,    1.8,    0.6,    1,      1.2,    1.2,    1], 
    flank:              [1,     1.2,   1,      1,      1.02,   0.81,   0.9,    1,      0.85,   1,      1.2,    1,      1],
        tri:            [1,     0.9,   1,      1,      0.9,    1,      1,      0.8,    0.8,    0.6,    1,      1,      1],  
            trifront:   [1,     0.2,   1,      1,      1,      1,      1,      1.3,    1.1,    1.5,    1,      1,      1],  
            thruster:   [1,     1.5,   2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7], 
        auto: /*pure*/  [1.8,   0.75,  0.5,    0.8,    0.9,    0.6,    1.2,    1.1,    1,      0.8,    1.3,    1,      1.25],
            five:       [1.15,  1,     1,      1,      1,      1,      1,      1.05,   1.05,   1.1,    2,      1,      1],   
            autosnipe:  [1,     1,     1,      1.4,    2,      1,      1,      1,      1,      1,      1,      1,      1],   
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */ 
    pound:              [2,     1.6,   1,      1,      1,      2,      1,      0.85,   0.8,    1,      1.5,    1,      1.15], 
        destroy:        [2.2,   1.8,   0.5,    1,      2,      2,      1.2,    0.65,   0.5,    1,      2,      1,      3],
            anni:       [0.85,  1.25,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],    
            hive:       [1.5,   0.8,   1,      0.8,    0.7,    0.3,    1,      1,      0.6,    1,      1,      1,      1],
        arty:           [1.2,   0.7,   1,      0.9,    1,      1,      1,      1.15,   1.1,    1,      1.5,    1,      1], 
            mortar:     [1.2,   1,     1,      1,      1.1,    1,      1,      0.8,    0.8,    1,      1,      1,      1],   
            spreadmain: [0.78125, 0.25, 0.5,   1,      0.5,    1,      1,   1.5/0.78, 0.9/0.78,1,      1,      1,      1], 
            spread:     [1.5,   1,     0.25,   1,      1,      1,      1,      0.7,    0.7,    1,      1,      0.25,   1],   
            skim:       [1.33,  0.8,   0.8,    0.9,    1.35,   0.8,    2,      0.3,    0.3,    1,      1,      1,      1.1],   
    twin:               [1,     0.5,   0.9,    1,      0.9,    0.7,    1,      1,      1,      1,      1,      1.2,    1],
        bent:           [1.1,   1,     0.8,    1,      0.9,    1,      0.8,    1,      1,      1,      0.8,    0.5,    1],    
        triple:         [1.2,   0.667, 0.9,    1,      0.85,   0.85,   0.9,    1,      1,      1,      1.1,    0.9,    0.95], 
            quint:      [1.5,   0.667, 0.9,    1,      1,      1,      0.9,    1,      1,      1,      1.1,    0.9,    0.95], 
            dual:       [2,     1,     0.8,    1,      1.5,    1,      1,      1.3,    1.1,    1,      1,      1,      1.25], 
        double:         [1,     1,     1,      1,      1,      0.9,    1,      1,      1,      1,      1,      1,      1],
            hewn:       [1.25,  1.5,   1,      1,      0.9,    0.85,   1,      1,      0.9,    1,      1,      1,      1],
        puregunner:     [1,     0.25,  1.5,    1.2,    1.35,   0.25,   1.25,   0.8,    0.65,   1,      1.5,    1.5,    1.2],
            machgun:    [0.66,  0.8,   2,      1,      1,      0.75,   1,      1.2,    0.8,    1,      1,      2.5,    1], 
    gunner:             [1.25,  0.25,  1.5,    1.1,    1,      0.35,   1.35,   0.9,    0.8,    1,      1.5,    1.5,    1.2],
        power:          [1,     1,     0.6,    1.2,    1,      1,      1.25,   2,      1.7,    1,      2,      0.5,    1.5], 
            nail:       [0.85,  2.5,   1,      0.8,    1,      0.7,    1,      1,      1,      1,      2,      1,      1],       
        fast:           [1,     1,     1,      1,      1,      1,      1,      1.2,    1,      1,      1,      1,      1], 
    turret:             [2,     1,     1,      1,      0.8,    0.6,    0.7,    1,      1,      1,      0.1,    1,      1], 
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    battle:             [1,     1,     1,      1,      1.25,   1.15,   1,      1,      0.85,   1,      1,      1,      1.1],
        bees:           [1.3,   1,     1,      1.4,    1,      1.5,    0.5,    3,      1.5,    1,      0.25,   1,      1],   
        carrier:        [1.5,   1,     1,      1,      1,      0.8,    1,      1.3,    1.2,    1.2,    1,      1,      1],
    hexatrap:           [1.3,   1,     1.25,   1,      1,      1,      1,      0.8,    1,      0.5,    1,      1,      1],     
    block:              [1.1,   2,     0.1,    1.5,    2,      1,      1.25,   1.5,    2.5,    1.25,   1,      1,      1.25],
        construct:      [1.3,   1,     1,      0.9,    1,      1,      1,      1,      1.1,    1,      1,      1,      1], 
        boomerang:      [0.8,   1,     1,      1,      0.5,    0.5,    1,      0.75,   0.75,   1.333,  1,      1,      1], 
    over:               [1.25,  1,     1,      0.85,   0.7,    0.8,    1,      1,      0.9,    1,      2,      1,      1], 
        meta:           [1.333, 1,     1,      1,      1,      0.667,  1,      1,      1,      1,      1,      1,      1],   
        weak:           [2,     1,     1,      1,      0.6,    0.6,    0.8,    0.5,    0.7,    0.25,   0.3,    1,      1],   
        master:         [3,     1,     1,      0.7,    0.4,    0.7,    1,      1,      1,      0.1,    0.5,    1,      1], 
        sunchip:        [5,     1,     1,      1.4,    0.5,    0.4,    0.6,    1,      1,      1,      0.8,    1,      1],     
    babyfactory:        [1.5,   1,     1,      1,      1,      1,      1,      1,      1.35,   1,      1,      1,      1], 
    lowpower:           [1,     1,     2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7], 
    halfrecoil:         [1,     0.5,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    morerecoil:         [1,     1.15,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    muchmorerecoil:     [1,     1.35,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    lotsmorrecoil:      [1,     1.8,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    tonsmorrecoil:      [1,     4,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    doublereload:       [0.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],  
    morereload:         [0.75,  1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    halfreload:         [2,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    lessreload:         [1.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    threequartersrof:   [1.333, 1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    morespeed:          [1,     1,     1,      1,      1,      1,      1,      1.3,    1.3,    1,      1,      1,      1], 
    bitlessspeed:       [1,     1,     1,      1,      1,      1,      1,      0.93,   0.93,   1,      1,      1,      1], 
    slow:               [1,     1,     1,      1,      1,      1,      1,      0.7,    0.7,    1,      1,      1,      1], 
    halfspeed:          [1,     1,     1,      1,      1,      1,      1,      0.5,    0.5,    1,      1,      1,      1],
    notdense:           [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      0.1,    1,      1],
    halfrange:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      0.5,    1,      1,      1], 
    fake:               [1,     1,     1,   0.00001, 0.0001,   1,      1,   0.00001,   2,      0,      1,      1,      1], 
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    op:                 [0.5,   0.000001,   1,      1,      4,      4,      4,      3,      2,      1,      5,      2,      1], 
    ac:                 [1,   1.3,   1,      1,      4,      9,      4,      3,      2,      1,      5,      0,      1], 
    protectorswarm:     [5,  0.000001, 1,      1,      100,    1,      1,      1,      1,     0.5,     5,      1,      10], 
    superpelter :       [10, 0, 0.001, 1, 999, 9999, 4, 11.7, 1, 3, 1, 0, 1],
    blaster:            [1,     1.6,   1,      1.5,      1,      2,      1,      0.85,   0.8,    1,      1.5,    2.5,      1.15], 
 rocketfuel :           [5,  0.00001, 0.001, 1,   0.25, 0.75,     1,      4,   1,        3,     1,     0.00001,                     1],
    flail:              [0.75,    0,    0.1,     1,    0.05,     12,     0.9,   0.7,     1,    0.05,     1,      180,    1], 
    mace:              [0.75,    0,    0.1,     1,    0.05,     16,     0.9,   0.7,     1,    0.05,     1,      180,    1], 
    lance:              [0.75,    0,    0.1,     1,    0.05,     4,     0.9,   0.7,     1,    0.05,     1,      180,    1], 
   flame: [4, 0, 0.001, 0.5, 1, 1.57, 1, 4.5, 1, 0.25, 1, 30000, 1],
        railgun: [30, 0.5, 0.001, 1, 1, 5, 1, 9, 1, 3, 1, 0.00001, 1],    
    poison: [50, 1, 1, 5, 5, 0.75, 0.5, 0, 0.5, 5, 1, 1, 1],
    poisonGun:              [50,    1.4,   0.1,    1,      2,      1,    1,      4.5,    1,      1,      1,      15,     1],
   poison2: [50, 1, 1, 5, 5, 0.75, 0.5, 1.5, 0.5, 5, 1, 1, 1],
};

const dfltskl = 9;

// NAMES
const statnames = {
    smasher: 1,
    drone: 2,
    necro: 3,
    swarm: 4,
    trap: 5,
    generic: 6,
};
const gunCalcNames = {
    default: 0,
    bullet: 1,
    drone: 2,
    swarm: 3,
    fixedReload: 4,
    thruster: 5,
    sustained: 6,
    necro: 7,
    trap: 8,
};

// ENTITY DEFINITIONS
exports.genericEntity = {
    NAME: '',
    LABEL: 'Unknown Entity',
    TYPE: 'unknown',
    DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    VALUE: 0,
    SHAPE: 0,
    COLOR: 16,    
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],    
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase
    FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATEFFECTS: true,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    PERSISTS_AFTER_DEATH: false,
    VARIES_IN_SIZE: false,
    HEALTH_WITH_LEVEL: true,
    CAN_BE_ON_LEADERBOARD: true,
    HAS_NO_RECOIL: false,
    AUTO_UPGRADE: 'none',
    BUFF_VS_FOOD: false,
    OBSTACLE: false,
    CRAVES_ATTENTION: false,
    NECRO: false,
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
  UPGRADES_TIER_4: [],
    UPGRADES_TIER_5: [],
    UPGRADES_TIER_6: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0,
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
    GUNS: [],
    MAX_CHILDREN: 0,
    BODY: {
        ACCELERATION: 1,
        SPEED: 0,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 1,
        PENETRATION: 1,

        RANGE: 0,
        FOV: 1,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,        
        HETERO: 2,
    },    
    FOOD: {
        LEVEL: -1,
    },
};
exports.genernormntity = {
    NAME: '',
    LABEL: 'Unknown Entity',
    TYPE: 'unknownboi',
    DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    VALUE: 0,
    SHAPE: 0,
    COLOR: 16,
    norm: [false, 1, 0],
    POISON: [false, 1, 0],
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase
    FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATEFFECTS: true,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    PERSISTS_AFTER_DEATH: false,
    VARIES_IN_SIZE: false,
    HEALTH_WITH_LEVEL: true,
    CAN_BE_ON_LEADERBOARD: true,
    HAS_NO_RECOIL: false,
    AUTO_UPGRADE: 'none',
    BUFF_VS_FOOD: false,
    OBSTACLE: false,
    CRAVES_ATTENTION: false,
    NECRO: false,
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0,
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl], //Reload,
    GUNS: [],
    MAX_CHILDREN: 0,
    BODY: {
        ACCELERATION: 1,
        SPEED: 10,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 1,
        PENETRATION: 1,

        RANGE: 0,
        FOV: 1,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,
        HETERO: 2,
    },
    FOOD: {
        LEVEL: -1,
    },
};
exports.genernormntityawoo = {
    NAME: '',
    LABEL: 'Unknown Entity',
    TYPE: 'unknown',
    DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    VALUE: 0,
    SHAPE: 0,
    COLOR: 16,
    norm: [false, 1, 0],
    POISON: [false, 1, 0],
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase
    FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATEFFECTS: true,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    PERSISTS_AFTER_DEATH: false,
    VARIES_IN_SIZE: false,
    HEALTH_WITH_LEVEL: true,
    CAN_BE_ON_LEADERBOARD: true,
    HAS_NO_RECOIL: false,
    AUTO_UPGRADE: 'none',
    BUFF_VS_FOOD: false,
    OBSTACLE: false,
    CRAVES_ATTENTION: false,
    NECRO: false,
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0,
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl], //Reload,
    GUNS: [],
    MAX_CHILDREN: 0,
    BODY: {
        ACCELERATION: 1,
        SPEED: 10,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 1,
        PENETRATION: 1,

        RANGE: 0,
        FOV: 1,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,
        HETERO: 2,
    },
    FOOD: {
        LEVEL: -1,
    },
};
exports.genernormntity2 = {
    NAME: '',
    LABEL: 'Unknown Entity',
    TYPE: 'unknown',
    DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    VALUE: 0,
    SHAPE: 0,
    SIZE: 11,
    COLOR: 16,
    norm: [false, 1, 0],
    POISON: [false, 1, 0],
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase
    FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATEFFECTS: true,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    PERSISTS_AFTER_DEATH: false,
    VARIES_IN_SIZE: false,
    HEALTH_WITH_LEVEL: true,
    CAN_BE_ON_LEADERBOARD: true,
    HAS_NO_RECOIL: false,
    AUTO_UPGRADE: 'none',
    BUFF_VS_FOOD: false,
    OBSTACLE: false,
    CRAVES_ATTENTION: false,
    NECRO: false,
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0,
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl], //Reload,
    GUNS: [],
    MAX_CHILDREN: 0,
    BODY: {
        ACCELERATION: 1,
        SPEED: 10,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 1,
        PENETRATION: 1,

        RANGE: 0,
        FOV: 1,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,
        HETERO: 2,
    },
    FOOD: {
        LEVEL: -1,
    },
};
// FOOD
exports.food = {
    LABEL: 'Unknown Shape Entity',
    TYPE: 'food',
    DAMAGE_CLASS: 1,
    CONTROLLERS: ['moveInCircles'],
    HITS_OWN_TYPE: 'repel',
    MOTION_TYPE: 'drift',
    FACING_TYPE: 'turnWithSpeed',
    VARIES_IN_SIZE: true,
    BODY: {
        STEALTH: 30,
        PUSHABILITY: 1,
    },
    DAMAGE_EFFECTS: false,
    RATEFFECTS: false,
    HEALTH_WITH_LEVEL: false,
};

exports.food2 = {
    LABEL: 'Unknown Alpha Shape Entity',
    TYPE: 'food',
    DAMAGE_CLASS: 1,
    CONTROLLERS: ['moveInCircles'],
    HITS_OWN_TYPE: 'repel',
    MOTION_TYPE: 'drift',
    FACING_TYPE: 'turnWithSpeed',
    VARIES_IN_SIZE: true,
    BODY: {
        STEALTH: 30,
        PUSHABILITY: 1,
    },
    DAMAGE_EFFECTS: false,
    RATEFFECTS: false,
    HEALTH_WITH_LEVEL: false,
};

exports.food3 = {
    LABEL: 'Unknown Beta Shape Entity',
    TYPE: 'food',
    DAMAGE_CLASS: 1,
    CONTROLLERS: ['moveInCircles'],
    HITS_OWN_TYPE: 'repel',
    MOTION_TYPE: 'drift',
    FACING_TYPE: 'turnWithSpeed',
    VARIES_IN_SIZE: true,
    BODY: {
        STEALTH: 30,
        PUSHABILITY: 1,
    },
    DAMAGE_EFFECTS: false,
    RATEFFECTS: false,
    HEALTH_WITH_LEVEL: false,
};

const basePolygonDamage = 1;
const basePolygonHealth = 2;
exports.hugePentagon = {
    PARENT: [exports.food2],
    FOOD: {
        LEVEL: 5,
    },
    LABEL: 'Alpha Pentagon',
    VALUE: 15000,
    SHAPE: -5,
    SIZE: 58,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 300 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.bigPentagon = {
    PARENT: [exports.food3],
    FOOD: {
        LEVEL: 4,
    },
    LABEL: 'Beta Pentagon',
    VALUE: 2500,
    SHAPE: 5,
    SIZE: 30,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 50 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        SHIELD: 20 * basePolygonHealth,
        REGEN: 0.2,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.pentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 3,
    },
    LABEL: 'Pentagon',
    VALUE: 400,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 14,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.triangle = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 2,
    },
    LABEL: 'Triangle',
    VALUE: 120,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 2,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 3 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.square = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 1,
    },
    LABEL: 'Square',
    VALUE: 30,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 13,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.egg = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 0,
    },
    LABEL: 'Egg',
    VALUE: 10,
    SHAPE: 0,
    SIZE: 5,
    COLOR: 6,
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: 0.0011,
        PUSHABILITY: 0,
    },
    DRAW_HEALTH: false,
};

exports.greenpentagon = {
    PARENT: [exports.food],
    LABEL: 'Pentagon',
    VALUE: 30000,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 1,
    BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 200,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.greentriangle = {
    PARENT: [exports.food],
    LABEL: 'Triangle',
    VALUE: 7000,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 1,
    BODY: {
        DAMAGE: 1,
        DENSITY: 6,
        HEALTH: 60,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.greensquare = {
    PARENT: [exports.food],
    LABEL: 'Square',
    VALUE: 2000,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 1,
    BODY: {
        DAMAGE: 0.5,
        DENSITY: 4,
        HEALTH: 20,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};

exports.gem = {
    PARENT: [exports.food],
    LABEL: 'Gem',
    VALUE: 2000,
    SHAPE: 6,
    SIZE: 5,
    COLOR: 0,
    BODY: {
        DAMAGE: basePolygonDamage/4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.obstacle = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Rock',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: -9,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 60,
    COLOR: 16,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
};
exports.maze = {
  TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Maze Wall',
    CONTOLLERS: ['doNothing'],
    SHAPE: 4,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 150,
    COLOR: 16,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
};
    exports.babyObstacle = {
        PARENT: [exports.obstacle],
        SIZE: 25,
        SHAPE: -7,
        LABEL: "Gravel",
    };
exports.obstacle = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Rock',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: -9,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 60,
    COLOR: 16,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
};
    exports.babyObstacle2 = {
        PARENT: [exports.obstacle],
        SIZE: 25,
        SHAPE: -7,
      COLOR: 10,  
      LABEL: "Gravel",
    };
exports.obstacle2 = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Rock',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: -9,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 60,
    COLOR: 10,  
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
};
// WEAPONS
const wepHealthFactor = 0.5;
const wepDamageFactor = 1.5;
exports.bullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};

    exports.casing = {
        PARENT: [exports.bullet],
        LABEL: 'Shell',
        TYPE: 'swarm',
    };
exports.lazerbullet = {
    LABEL: 'Lazer',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 5,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.77 * wepHealthFactor,
        DAMAGE: 7 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
  SHAPE: [[-0.6,0.1],[-0.6,-0.1],[1,-0.1],[1,0.1]] , 
  FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.frag4bullet = {
PARENT: [exports.bullet],
LABEL: "Frag-4 Bullet",
  CONTROLLERS: ['alwaysFire'],
  FACING_TYPE: 'turnWithSpeed',
GUNS: [
{
POSITION: [8.308,4.8,1,0,0,270,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.lessreload]),
TYPE: exports.bullet
}, },
{
POSITION: [8.308,4.8,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.lessreload]),
TYPE: exports.bullet
}, },
{
POSITION: [8.308,4.8,1,0,0,90,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.lessreload]),
TYPE: exports.bullet
}, },
{
POSITION: [8.308,4.8,1,0,0,180,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.lessreload]),
TYPE: exports.bullet
}, },
], };
exports.poisonEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 12,
  // POISON_TO_APPLY: 1,
  //POISON: true,
 // SHOWPOISON: true,
    SIZE: 0.00001,
   ALPHA: 0.00001,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 10,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
 
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.freezeEffect = {
  LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 10,
    SIZE: 5,
   ALPHA: 0.00001,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 10,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};

exports.freezebullet = {
  PARENT: [exports.bullet],
  
  FREEZE_TO_APPLY: 0.6,
  FREEZE: true,
  SHOWFREEZE: false,
    //SHAPE: 696969,
    TURRETS:[{
          POSITION: [  12,     0,      0,     180,    360,  1,], 
        TYPE: [exports.genericEntity,{COLOR: 25}]
           }],
};
exports.lemobullet = {
  PARENT: [exports.bullet],
  
  FREEZE_TO_APPLY: 0.6,
  FREEZE: true,
  SHOWFREEZE: false,
    SHAPE: 696969,
};
exports.freezebullet3 = {
  PARENT: [exports.bullet],
  
  FREEZE_TO_APPLY: 1,
  FREEZE: true,
  SHOWFREEZE: false,
    //SHAPE: 696969,
};
exports.freezepoison = {
  PARENT: [exports.bullet],
  
  FREEZE_TO_APPLY: 0.6,
  FREEZE: true,
  SHOWFREEZE: false,
    //SHAPE: 696969,
   POISON_TO_APPLY: 0.45,
  POISON: true,
  SHOWPOISON: true,
    
};
exports.freezebullet2 = {
  PARENT: [exports.bullet],
  FREEZE_TO_APPLY: 0.45,
  FREEZE: true,
    //SHAPE: 696969,
  SHOWFREEZE: false,
};

 exports.poisonBullet = {
    LABEL: 'Bullet',
   PARENT: [exports.bullet],
    TYPE: 'bullet',
     //SHAPE: 696969,
  //SHAPE: 138,
    ACCEPTS_SCORE: false,
  POISON_TO_APPLY: 0.45,
  POISON: true,
  SHOWPOISON: true,
     TURRETS:[{
          POSITION: [  12,     0,      0,     180,    360,  1,], 
        TYPE: [exports.genericEntity,{COLOR: 26}]
           }],
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
 exports.poisonBullet2 = {
    LABEL: 'Bullet',
   PARENT: [exports.bullet],
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
  POISON_TO_APPLY: 1,
  POISON: true,
  SHOWPOISON: true,
     //TURRETS:[{
      //    POSITION: [  12,     0,      0,     180,    360,  1,], 
     //   TYPE: exports.donutMark2,
     //      }],
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.iceEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 22,
    SIZE: 5,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 10,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.icebullet = {
  PARENT: [exports.bullet],
    ACCEPTS_SCORE: false,
    ICE: true,
    ICE_TO_APPLY: 1,
    SHOWICE: true,
   
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};

exports.frag8bullet = {
PARENT: [exports.bullet],
LABEL: "Frag-8 Bullet",
  CONTROLLERS: ['alwaysFire'],
  FACING_TYPE: 'turnWithSpeed',
GUNS: [
{
POSITION: [8.308,4.8,1,0,0,270,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.lessreload]),
TYPE: exports.bullet
}, },
{
POSITION: [8.308,4.8,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.lessreload]),
TYPE: exports.bullet
}, },
{
POSITION: [8.308,4.8,1,0,0,90,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.lessreload]),
TYPE: exports.bullet
}, },
{
POSITION: [8.308,4.8,1,0,0,180,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.lessreload]),
TYPE: exports.bullet
}, },
{
POSITION: [8.308,4.8,1,0,0,210,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.lessreload]),
TYPE: exports.bullet
}, },
{
POSITION: [8.308,4.8,1,0,0,45,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.lessreload]),
TYPE: exports.bullet
}, },
{
POSITION: [8.308,4.8,1,0,0,120,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.lessreload]),
TYPE: exports.bullet
}, },
{
POSITION: [8.308,4.8,1,0,0,330,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.lessreload]),
TYPE: exports.bullet
}, },    
], };
exports.healbullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: -40 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.redistbullet = {
PARENT: [exports.bullet],
TYPE: 'bullet',
  BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 999999999999 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
  SHAPE: 6,
//SHOOT_ON_DEATH: true,
  //CONTROLLERS:['doNothing'],
  GUNS: [
{
POSITION: [11.077,11.2,0,0,0,269.894,99999],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 3.6, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [11.077,11.2,0,0,0,210.935,99999],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 3.6, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [11.077,11.2,0,0,0,147.344,99999],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 3.6, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [11.077,11.2,0,0,0,90.627,99999],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 3.6, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [11.077,11.2,0,0,0,37.705,99999],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 3.6, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [11.077,11.2,0,0,0,328.437,99999],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 3.6, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [11.077,11.2,0,0,2.769,271.865,99999],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 3.6, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [11.077,11.2,0,0,2.769,331.088,99999],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 3.6, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [11.077,11.2,0,0,2.769,37.801,99999],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 3.6, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [11.077,11.2,0,0,2.769,91.225,99999],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 3.6, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [11.077,11.2,0,0,2.769,146.761,99999],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 3.6, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [11.077,11.2,0,0,2.769,211.419,999999],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 3.6, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [11.077,11.2,0,0,-2.769,208.334,99999],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 3.6, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [11.077,11.2,0,0,-2.769,269.907,99999],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 3.6, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [11.077,11.2,0,0,-2.769,330.899,99999],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 3.6, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [11.077,11.2,0,0,-2.769,37.607,99999],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 3.6, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [11.077,11.2,0,0,-2.769,91.072,99999],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 3.6, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [11.077,11.2,0,0,-2.769,146.324,99999],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 3.6, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
], };
exports.octobullet = {
                PARENT: [exports.bullet],
                FACING_TYPE: 'turnWithSpeed',
   CONTROLLERS: ['alwaysFire',],              
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  8,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  8,     8,      1,      0,      0,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  8,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  8,     8,      1,      0,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  8,     8,      1,      0,      0,      45,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  8,     8,      1,      0,      0,     135,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  8,     8,      1,      0,      0,     225,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  8,     8,      1,      0,      0,     315,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, },
                ],
  };
exports.testammo = {
PARENT: [exports.bullet],
LABEL: "Launched Rocket",
  SHAPE: [[-1.4,-0.8],[0.5,-1],[2,0],[0.5,1],[-1.4,0.8],[-1,0.4],[-1.6,0],[-1,-0.4]],
GUNS: [
{
POSITION: [1.385,20.8,1,-2.769,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[10, 0, 0.001, 10, 7, 0.75, 1, 0, 1, 0.5, 1, 0.00001, 1]]),
TYPE: exports.bullet,
  SHOOT_ON_DEATH: true,
}, },
], };
exports.swarm = {
    LABEL: 'Swarm Drone',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.35 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};
exports.homingbullet = {
    LABEL: 'Homing Bullet',
    TYPE: 'swarm',
    //MOTION_TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 0,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.35 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5,
    },
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};

    exports.bee = {
        PARENT: [exports.swarm],
        PERSISTS_AFTER_DEATH: true, 
        SHAPE: 4, 
        LABEL: 'Drone',
        HITS_OWN_TYPE: 'hardWithBuffer',
    };
exports.iceswarm = {
  PARENT: [exports.swarm],
    SHAPE: [[-1,-1],[-1,-1],[1,0],[-1.0,1.0]],
    ICE: true,
    ICE_TO_APPLY: 1,
    SHOWICE: true,
};
exports.poisonswarm = {
  PARENT: [exports.swarm],
    SHAPE: [[-1,-1],[1,0],[1,0],[-1.0,1.0]],
     POISON_TO_APPLY: 1,
    POISON: true,
   SHOWPOISON: true,
};
    exports.autoswarm = {
        PARENT: [exports.swarm],
        AI: { FARMER: true, },
        INDEPENDENT: true,
    };
exports.pumbabullet = {
PARENT: [exports.bullet],
TYPE: 'bullet',
  LABEL: "Pumba Pelter Flask",
CONTROLLERS: ['alwaysFire'],
  FACING_TYPE: 'turnWithSpeed',
GUNS: [
{
POSITION: [20.769,4,1,0,4.5,0.343,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,4,1,0,-4.5,0.249,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,14.4,-1.3,0,0,0.115,0.1],
},
 {
POSITION: [20.769,4,1,0,4.5,180,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,4,1,0,-4.5,180,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,14.4,-1.3,0,0,180,0.1],
},
], };
exports.dmistbullet = {
PARENT: [exports.bullet],
TYPE: 'bullet',
  LABEL: "Deltra Pelter Flask",
CONTROLLERS: ['alwaysFire'],
    FACING_TYPE: 'turnWithSpeed',
GUNS: [
{
POSITION: [20.769,4,1,0,4.5,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,4,1,0,-4.5,0,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,14.4,-1.3,0,0,0,0.1],
},
 {
POSITION: [20.769,4,1,0,4.5,120,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,4,1,0,-4.5,120,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,14.4,-1.3,0,0,120,0.1],
},
{
POSITION: [20.769,4,1,0,4.5,-120,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,4,1,0,-4.5,-120,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,14.4,-1.3,0,0,-120,0.1],
},
], };
exports.trap = {
    LABEL: 'Thrown Trap',
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: -3, 
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0,
    },
};
    exports.block = {
        LABEL: 'Set Trap',
        PARENT: [exports.trap],
        SHAPE: -4,
        MOTION_TYPE: 'motor',    
        CONTROLLERS: ['goToMasterTarget'],
        BODY: {
            SPEED: 1,
            DENSITY: 5,
        },
    };
    exports.boomerang = {
        LABEL: 'Boomerang',
        PARENT: [exports.trap],
        CONTROLLERS: ['boomerang'],
        MOTION_TYPE: 'motor',  
        HITS_OWN_TYPE: 'never',
        SHAPE: -5,
        BODY: {
            SPEED: 1.25,
            RANGE: 120,
        },
    };

exports.drone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
exports.termdrone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: [[0.09,-0.71],[0.6,-0.81],[1.01,-0.01],[0.586,0.8],[0.106,0.69],[-1.014,0.815],[-0.614,0.335],[-0.61,-0.32],[-1,-0.825]],
COLOR: 4,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
exports.dropshipdrone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
   SHAPE: [[0.45,-0.01],[-0.18,-0.36],[-0.35,-0.68],[1,0],[-0.35,0.68],[-0.18,0.36]],
COLOR: 4,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 2,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};

    exports.sunchip = {
        PARENT: [exports.drone],
        SHAPE: 4,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };
exports.sunchip2 = {
  INVISIBLE: [1, 0.1, 0.0],
          SHAPE: 4,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
  MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: ['nearestDifferentMaster','canRepel','mapTargetToGoal',]
};
    exports.autosunchip = {
        PARENT: [exports.sunchip],
        AI: {
            BLIND: true,
            FARMER: true,
        },
        INDEPENDENT: true,
    };
    exports.gunchip = {
        PARENT: [exports.drone],
        SHAPE: -2,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };
exports.apidaeflask = {
PARENT: [exports.bullet],
LABEL: "Apidae Swarmer Flask",
CONTROLLERS: ['alwaysFire'],
   //Upgraded hive?
    FACING_TYPE: 'turnWithSpeed',
    DANGER: 12,
GUNS: [
{
POSITION: [27.692,8,1.3,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: [exports.swarm,{INDEPENDENT: true,}]
}, },
{
POSITION: [27.692,8,1.3,0,0,180,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: [exports.swarm,{INDEPENDENT: true}]
}, },
{
POSITION: [22.154,12.8,-1.5,0,0,180,0.8],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: [exports.swarm,{INDEPENDENT: true}]
}, },
{
POSITION: [22.154,12.8,-1.5,0,0,0,0.8],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: [exports.swarm,{INDEPENDENT: true}]
}, },
], };
exports.missile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     -2,     130,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }, {
        POSITION: [  14,     6,      1,      0,      2,     230,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, }, 
    ],
};

    exports.hypermissile = {
        PARENT: [exports.missile],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     6,      1,      0,     -2,     150,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     210,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {        
            POSITION: [  14,     6,      1,      0,     -2,      90,    0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     270,    0.5,  ],  
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.snake = {
        PARENT: [exports.bullet],
        LABEL: 'Snake',
        INDEPENDENT: true,
        BODY: {
            RANGE: 120,
        },  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,    12,     1.4,     8,      0,     180,    0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake, g.snakeskin,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  10,    12,     0.8,     8,      0,     180,   0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    NEGATIVE_RECOIL: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.hive = {
        PARENT: [exports.bullet],
        LABEL: 'Hive',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     7,      0,      108,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      180,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      252,    0.4,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      324,    0.6,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      36,     0.8,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, 
        ],
    };

// TANK CLASSES
const base = {
    ACCEL: 1.6,
    SPEED: 5.25,
    HEALTH: 20,
    DAMAGE: 3,
    RESIST: 1,
    PENETRATION: 1.05,
    SHIELD: 8,
    REGEN: 0.025,
    FOV: 1,
    DENSITY: 0.5,
};
exports.genericTank = {
    LABEL: 'Unknown Class',
    TYPE: 'tank',
    DAMAGE_CLASS: 2,
    DANGER: 5,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',
    SIZE: 12,
    MAX_CHILDREN: 0,   
    DAMAGE_EFFECTS: false,
    BODY: { // def
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: base.HEALTH, 
        DAMAGE: base.DAMAGE, 
        PENETRATION: base.PENETRATION, 
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
    GUNS: [],
    TURRETS: [],
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true,
};
let gun = { };
exports.autoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret]),
                TYPE: exports.bullet,
            }, },
    ],
};
    exports.machineAutoTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,    11,     1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.mach, g.slow]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
    exports.autoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     6,      1,      0,      5,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {
            POSITION: [  20,     6,      1,      0,     -5,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };
    exports.oldAutoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     7,      1,      0,    -5.75,    0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {            
            POSITION: [  20,     7,      1,      0,     5.75,    0,     0.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };

exports.auto3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
                TYPE: exports.bullet,
            }, }
    ],
};
exports.home3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
                    TYPE: [exports.homingbullet,{INDEPENDENT: true}],
                COLOR: 12,
            }, }
    ],
};
    exports.auto5gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    11,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.five]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
exports.home5gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    11,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.five]),
                    TYPE: [exports.homingbullet,{INDEPENDENT: true}],
                    COLOR: 12,
                }, }
        ],
    };
    exports.heavy3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
            SPEED: 0.9,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.heavyh3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
            SPEED: 0.9,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]),
                    TYPE: [exports.homingbullet,{INDEPENDENT: true}],
                    COLOR: 12,
                }, }
        ],
    };
    exports.heavy5gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
            SPEED: 0.9,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto, g.five]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
exports.heavyh5gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
            SPEED: 0.9,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto, g.five]),
                    TYPE: [exports.homingbullet,{INDEPENDENT: true}],
                    COLOR: 12,
                }, }
        ],
    };
    exports.masterGun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 16,
        MAX_CHILDREN: 6,
        AI: {
            NO_LEAD: true,
            SKYNET: true,
            FULL_VIEW: true,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   8,     14,    1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.master]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
exports.sniper3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 5,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  27,     9,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.auto, g.assass, g.autosnipe]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [   5,     9,     -1.5,    8,      0,      0,      0,   ], 
            },
        ],
    };
    exports.bansheegun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  26,    10,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.lessreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.auto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  16,     4,      1,      0,    -3.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     3.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.bigauto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     5,      1,      0,    -4.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };

exports.tritrapgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,    16,      1,      0,      0,      0,      0,   ], 
        }, {
        POSITION: [   2,    16,     1.1,     20,     0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto]),
                TYPE: exports.block,
            }, },
    ],
};
exports.iceblock = {
    LABEL: '',
  CONTROLLERS: [],  
    COLOR: 10,
  SHAPE: 4,
  INDEPENDENT: true,
};
exports.smasherBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
exports.dominationBody3 = {
    LABEL: '',
    CONTROLLERS: ['dontTurn'], 
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
exports.spikeBody = {
    LABEL: '',
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: -4,
    INDEPENDENT: true,
};
    exports.spikeBody1 = {
        LABEL: '',
        CONTROLLERS: ['fastspin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
    exports.spikeBody2 = {
        LABEL: '',
        CONTROLLERS: ['reversespin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
exports.megasmashBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: -6,
    INDEPENDENT: true,
};
exports.dominationBody = {
    LABEL: '',
  FACING_TYPE: 'autospin',      
  //CONTROLLERS: ['spin'], 
  //CONTROLLERS: ['dontTurn'], 
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
exports.dominationBody2 = {
    LABEL: '',
  //FACING_TYPE: 'autospin',      
  //CONTROLLERS: ['spin'], 
  CONTROLLERS: ['dontTurn'], 
    COLOR: 9,
    SHAPE: 8,
    INDEPENDENT: true,
};
    exports.baseSwarmTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        COLOR: 16,
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        AI: {
            NO_LEAD: true,
            LIKES_SHAPES: true,
        },
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   5,    4.5,    0.6,     7,      2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,          
                }, }, {
            POSITION: [   5,    4.5,    0.6,     7,     -2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   5,    4.5,    0.6,    7.5,     0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: [exports.swarm, { INDEPENDENT: true, AI: { LIKES_SHAPES: true, }, }, ],
                    STAT_CALCULATOR: gunCalcNames.swarm,  
            }, }
        ],
    };
    exports.baseGunTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        BODY: {
            FOV: 5,
        },
        ACCEPTS_SCORE: false,
        CONTROLLERS: ['nearestDifferentMaster'], 
        INDEPENDENT: true,
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  12,    12,     1,       6,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [  11,    13,     1,       6,      0,      0,     0.1,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [   7,    13,    -1.3,     6,      0,      0,      0,   ],
                }
        ],
    };
        exports.baseProtector = {
            PARENT: [exports.genericTank],
            LABEL: 'Base',
            SIZE: 100,
            DAMAGE_CLASS: 0,
          CRAVES_ATTENTION: false,
            ACCEPTS_SCORE: false,
            SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
            BODY: { // def
                SPEED: 0,
                HEALTH: 999999999999999999999999999999999999999, 
                DAMAGE: 10, 
                PENETRATION: 0.25, 
                SHIELD: 1000,
                REGEN: 100,
                FOV: 1,
                PUSHABILITY: 0,
                HETERO: 0,
            },
            //CONTROLLERS: ['nearestDifferentMaster'],
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: exports.dominationBody2,
                        }, {
                POSITION: [  12,     7,      0,      45,     100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     135,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     225,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     315,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        },
            ],
            GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     315,     0,   ], }, {
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     315,     0,   ], }, 
            ],
        };

exports.minion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
};
 exports.sk4drone = {
   PARET: [exports.minion],           
   TYPE: 'minion',
              LABEL: "Super Swarmer",  
              DANGER: 6,
                DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 2,
        SPEED: 0.5,
        //ACCELERATION: 5,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1000,
        RESIST: 10,
        PENETRATION: 15,
    },
AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
                            TYPE: exports.hive,
                        }, 
                }, 
                       {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                    }, 
                       {   
                    POSITION: [  16,     8,      1,      0,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        },
                       },
                       {   
                    POSITION: [  16,     8,      1,      0,      1,     -90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
exports.pillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    11,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.pillbox = {
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.pillboxTurret,
        }
    ]
};
exports.skimturret = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 2,
    },
    COLOR: 2,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    LABEL: '',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                TYPE: exports.hypermissile,
            }, }, {
        POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
            },
    ],
};
    exports.skimboss = {
        PARENT: [exports.genericTank],
      LABEL: 'Elite Skimmer',  
      BODY: {
            HEALTH: 300,
            DAMAGE: 2,
            SHIELD: 200,
        },
        SHAPE: 3, 
        COLOR: 2,
        FACING_TYPE: 'autospin',
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [  15,     5,      0,     60,     170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     180,    170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     300,    170, 0], 
                TYPE: exports.skimturret,
                    },
        ],
    };

function makeAuto(type, name = -1, options = {}) {
    let turret = { type: exports.autoTurret, size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,     0,      0,     180,    360,  1,], 
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'Auto-' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}
function makeHybrid(type, name = -1) {
    let output = JSON.parse(JSON.stringify(type));
    let spawner = { 
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   7,     12,    1.2,     8,      0,     180,     0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, { INDEPENDENT: true, }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,    
            MAX_CHILDREN: 3,
        }, };
    if (type.TURRETS != null) { output.TURRETS = type.TURRETS; }
    if (type.GUNS == null) { output.GUNS = [spawner]; }
    else { output.GUNS = [...type.GUNS, spawner]; }
    if (name == -1) { output.LABEL = 'Hybrid ' + type.LABEL; } else { output.LABEL = name; }
    return output;
}
 exports.bosses3 = {
            PARENT: [exports.genericTank],
            LABEL: 'Page 3',
             //CONTROLLERS: ['nearestDifferentMaster'],  
          RESET_UPGRADES: true,
            SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
            LEVEL: 45,
            BODY: { // def
                //SHIELD: 1000,
                //REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: 0,
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
        };
        exports.bosses2 = {
            PARENT: [exports.genericTank],
            LABEL: 'Page 2',
             //CONTROLLERS: ['nearestDifferentMaster'],  
          RESET_UPGRADES: true,
            SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
            LEVEL: 45,
            BODY: { // def
                //SHIELD: 1000,
                //REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: 0,
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
        };
  exports.xkx = {
            PARENT: [exports.genericTank],
            LABEL: 'X-K-X Bosses',
             //CONTROLLERS: ['nearestDifferentMaster'],  
          RESET_UPGRADES: true,
            SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
            LEVEL: 45,
            BODY: { // def
                //SHIELD: 1000,
                //REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: 0,
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
        };
        exports.bosses = {
            PARENT: [exports.genericTank],
            LABEL: 'Bosses',
             //CONTROLLERS: ['nearestDifferentMaster'],  
          RESET_UPGRADES: true,
            //SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
            //LEVEL: 45,
            BODY: { // def
                //SHIELD: 1000,
                //REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: 0,
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
        };
        exports.betatanks = {
            PARENT: [exports.genericTank],
            LABEL: 'Beta Tanks',
             //CONTROLLERS: ['nearestDifferentMaster'],  
          RESET_UPGRADES: true,
           // SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
            //LEVEL: 45,
            BODY: { // def
                //SHIELD: 1000,
                //REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: 0,
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
        };       
exports.removed = {
            PARENT: [exports.genericTank],
            LABEL: 'Removed Tanks',
     //CONTROLLERS: ['nearestDifferentMaster'],          
  RESET_UPGRADES: true,
            //SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
            //LEVEL: 45,
            BODY: { // def
                //SHIELD: 1000,
                //REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: 0,
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
        };
exports.misc = {
            PARENT: [exports.genericTank],
            LABEL: 'Misc',
     //CONTROLLERS: ['nearestDifferentMaster'],          
  RESET_UPGRADES: true,
            //SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
            //LEVEL: 45,
            BODY: { // def
                //SHIELD: 1000,
                //REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: 0,
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
        };
exports.betatester = {
            PARENT: [exports.genericTank],
            LABEL: 'Beta Tester',
     //CONTROLLERS: ['nearestDifferentMaster'],          
  RESET_UPGRADES: true,
            //SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
            //LEVEL: 45,
            BODY: { // def
                //SHIELD: 1000,
                //REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: 0,
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
        };
exports.seniortester = {
            PARENT: [exports.genericTank],
            LABEL: 'Senior Tester',
     //CONTROLLERS: ['nearestDifferentMaster'],          
  RESET_UPGRADES: true,
            //SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
            //LEVEL: 45,
            BODY: { // def
                //SHIELD: 1000,
                //REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: 0,
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
        };
exports.overseertester = {
            PARENT: [exports.genericTank],
            LABEL: 'Overseer',
     //CONTROLLERS: ['nearestDifferentMaster'],          
  RESET_UPGRADES: true,
            //SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
            //LEVEL: 45,
            BODY: { // def
                //SHIELD: 1000,
                //REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: 0,
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
        };
exports.testbed = {
            PARENT: [exports.genericTank],
            LABEL: 'Developer',
     //CONTROLLERS: ['nearestDifferentMaster'],          
  RESET_UPGRADES: true,
            //SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
            //LEVEL: 45,
            BODY: { // def
                //SHIELD: 1000,
                //REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: 0,
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, },/*  { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY *//*
                POSITION: [  0.5,    7,    1,     0,      0,      180,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.pet]),
                    TYPE: exports.mkIpet, 
                    MAX_CHILDREN: 1,
                    AUTOFIRE: true,
                }, }, */
            ],
        };
//------------------------------------------------------------------------------------------------------\\
exports.basic = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};
exports.pelter = {
PARENT: [exports.genericTank],
LABEL: "Pelter",
SHAPE: 0,
GUNS: [
{
POSITION: [20.769,4,1,0,4.5,0.343,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,4,1,0,-4.5,0.249,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,14.4,-1.3,0,0,0.115,0.1],
},
], };
exports.pelter2 = {
PARENT: [exports.auto3gun],
LABEL: "Pelter Turret",
SHAPE: 0,
GUNS: [
{
POSITION: [20.769,4,1,0,4.5,0.343,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,4,1,0,-4.5,0.249,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,14.4,-1.3,0,0,0.115,0.1],
},
], };
exports.captain = {
PARENT: [exports.genericTank],
LABEL: "Captain",
SIZE: 12,
SHAPE: 0,
GUNS: [
{
POSITION: [14,12.4,1.5,0,0,180,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.drone]),
TYPE: exports.drone,
  MAX_CHILDREN: 2,
  INDEPENDENT: true,
  AUTOFIRE: true,
}, },
{
  POSITION: [20.769,4,1,0,4.5,0.343,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,4,1,0,-4.5,0.249,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,14.4,-1.3,0,0,0.115,0.1],
},
{
POSITION: [13.846,8,-2,0,0,298.806,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
{
POSITION: [13.846,8,-2,0,0,61.057,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
], };
exports.bpelter = {
PARENT: [exports.genericTank],
LABEL: "Back Pelter",
SHAPE: 0,
GUNS: [
{
POSITION: [20.769,4,1,0,4.5,0.343,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,4,1,0,-4.5,0.249,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,14.4,-1.3,0,0,0.115,0.1],
},
 {
POSITION: [20.769,4,1,0,4.5,180,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,4,1,0,-4.5,180,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,14.4,-1.3,0,0,180,0.1],
},
], };
exports.tpelter = {
PARENT: [exports.genericTank],
LABEL: "Flank Pelter",
SHAPE: 0,
GUNS: [
{
POSITION: [20.769,4,1,0,4.5,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,4,1,0,-4.5,0,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,14.4,-1.3,0,0,0,0.1],
},
 {
POSITION: [20.769,4,1,0,4.5,120,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,4,1,0,-4.5,120,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,14.4,-1.3,0,0,120,0.1],
},
{
POSITION: [20.769,4,1,0,4.5,-120,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,4,1,0,-4.5,-120,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,14.4,-1.3,0,0,-120,0.1],
},
], };
exports.pumba = {
PARENT: [exports.genericTank],
LABEL: "Pumba",
DANGER: 8,
  SIZE: 12,
SHAPE: 0,
GUNS: [
{
POSITION: [13.846,8,-1.5,0,0,359.848,0],
},
{
POSITION: [9.692,8,1.5,13.846,0,0.116,0],
},
{
POSITION: [4.154,11.2,-1.5,23.538,0,0.376,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[60, 3, 0.001, 1, 1, 0.75, 1, 1.35, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.pumbabullet
}, },
], };
exports.pumba2 = {
PARENT: [exports.auto3gun],
LABEL: "Pumba",
DANGER: 8,
  SIZE: 12,
SHAPE: 0,
GUNS: [
{
POSITION: [13.846,8,-1.5,0,0,359.848,0],
},
{
POSITION: [9.692,8,1.5,13.846,0,0.116,0],
},
{
POSITION: [4.154,11.2,-1.5,23.538,0,0.376,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[60, 3, 0.001, 1, 1, 0.75, 1, 1.35, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.pumbabullet
}, },
], };
exports.dmist = {
PARENT: [exports.genericTank],
LABEL: "Deltramist",
DANGER: 8,
  SIZE: 12,
SHAPE: 0,
GUNS: [
{
POSITION: [18,11.2,-1.5,0,0,0.14,0],
},
{
POSITION: [6.092,8,-1.5,15.231,0,0.463,0],
},
{
POSITION: [12.462,8,1.5,20.769,0,0.256,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[100, 4, 0.001, 1, 1, 10, 1, 4.05, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.dmistbullet
}, },
], };
exports.sailor = {
PARENT: [exports.genericTank],
LABEL: "Sailor",
SIZE: 12,
SHAPE: 0,
GUNS: [
{
POSITION: [20.769,4,1,0,4.5,0.343,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,4,1,0,-4.5,0.249,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,14.4,-1.3,0,0,0.115,0.1],
},
{
POSITION: [13.846,8,-2,0,0,298.806,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
{
POSITION: [13.846,8,-2,0,0,61.057,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
], };
exports.seadog = {
PARENT: [exports.genericTank],
LABEL: "Seadog",
SIZE: 12,
SHAPE: 0,
GUNS: [
{
POSITION: [13.846,8,-2,0,0,298.806,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
{
POSITION: [13.846,8,-2,0,0,61.057,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
{
POSITION: [13.846,8,-2,0,0,234.383,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
{
POSITION: [13.846,8,-2,0,0,126.325,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
{
POSITION: [13.846,8,-2,0,0,180.086,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
{
  POSITION: [20.769,4,1,0,4.5,0.343,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,4,1,0,-4.5,0.249,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.weak]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,14.4,-1.3,0,0,0.115,0.1],
},
{
POSITION: [13.846,8,-2,0,0,298.806,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
{
POSITION: [13.846,8,-2,0,0,61.057,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
], };
            exports.single = {
                PARENT: [exports.genericTank],
                LABEL: 'Single',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };  

        let smshskl = 12; //13;
        exports.smash = {
            PARENT: [exports.genericTank],
            LABEL: 'Smasher',
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
        exports.flailpart2 = {
            TYPE: 'turret',
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
            },
          GUNS: [
{
POSITION: [1,2.4,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.lance, g.halfrange]),
TYPE: exports.bullet,
  HAS_NO_RECOIL: true,
  //ALPHA: 0.001,
  AUTOFIRE: true
}, },
],
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
        };
            exports.megasmash = {
                PARENT: [exports.genericTank],
                LABEL: 'Mega-Smasher',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed * 1.05,
                    FOV: base.FOV * 1.1,
                    DENSITY: base.DENSITY * 4,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  24,     0,      0,      0,     360,  0,], 
                    TYPE: exports.megasmashBody,
                }],
            };
            exports.spike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed*0.9,
                    DAMAGE: base.DAMAGE * 1.1,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 2,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     120,    360,  0,], 
                    TYPE: exports.spikeBody,
                    }, {
                    POSITION: [ 20.5,    0,      0,     240,    360,  0,], 
                    TYPE: exports.spikeBody,
                }],
            };     
            exports.weirdspike = {
                PARENT: [exports.genericTank],
                LABEL: 'Mega Spike',
                DANGER: 7,
                BODY: {
                    DAMAGE: base.DAMAGE * 1.15,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 1.5,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody1,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     180,    360,  0,], 
                    TYPE: exports.spikeBody2,
                }],
            };   
exports.hypersmash = {
PARENT: [exports.genericTank],
LABEL: "Hyper Smasher",
  IS_SMASHER: true,
  SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
 STAT_NAMES: statnames.smasher,
SHAPE: 0,
GUNS: [
{
POSITION: [20.769,24,1,-10.523,0,0,0],
},
{
POSITION: [4.431,0,1,0,0,180,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[0.1, 0.35, 0.001, 1, 1, 0.75, 1, 4.5, 1, 0, 1, 10000, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,1.6,1,-10.523,0,270,0],
},
{
POSITION: [20.769,1.6,1,-10.523,0,0,0],
},
{
POSITION: [20.769,1.6,1,-10.523,-6.923,90,0],
},
{
POSITION: [20.769,1.6,1,-10.523,-6.923,270,0],
},
{
POSITION: [20.769,1.6,1,-10.523,-6.923,180,0],
},
{
POSITION: [20.769,1.6,1,-10.523,-6.923,0,0],
},
{
/*POSITION: [0,0,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[0.1, 0, 0.001, 1, 1, 0.75, 1, 0, 1, 0.05, 1, 10000, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [2.769,3.2,1,11.077,0,270,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[0.1, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 0.1, 1, 10000, 1]]),
TYPE: exports.bullet
}, },
{*/
POSITION: [2.769,0,1,0,0,180,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[0.1, 0.5, 0.001, 1, 1, 0.75, 1, 4.5, 1, 0, 1, 10000, 1]]),
TYPE: exports.bullet
}, },
], };
            exports.autosmash = makeAuto(exports.smash, 'Auto-Smasher', { type: exports.autoSmasherTurret, size: 11, });
            exports.autosmash.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl,];
  exports.hiveturret1 = {
        PARENT: [exports.genericTank],
        LABEL: 'Hive',
        BODY: {
         //   RANGE: 90,
            FOV: 1,
        },  
      //  FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['nearestDifferentMaster'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    10,    0.6,     7,      0,      0,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
              
                }, }, 
        ],
    };
exports.hiveturret2 = {
        PARENT: [exports.genericTank],
        LABEL: 'Hive',
        BODY: {
         //   RANGE: 90,
            FOV: 1,
        },  
      //  FACING_TYPE: 'turnWithSpeed',
        //INDEPENDENT: true,
        CONTROLLERS: ['nearestDifferentMaster'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    10,    0.6,     7,      0,      0,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
              
                }, }, 
        ],
    };
//exports.hiveturret = makeFlank(exports.hiveturret1, 6, 'Hive Turret');
exports.goldlancer = {
    PARENT: [exports.genericTank],
    LABEL: 'Golden Lancer',
    DANGER: 5,
  STAT_NAMES: statnames.lance,
    BODY: {
        SPEED: base.SPEED * 2,
        ACCELERATION: base.ACCEL * 1.5,
        DAMAGE: 3,
    },
    GUNS: [{
        POSITION: [11, 4, 1.4, 6, 0, 0, 0],
        PROPERTIES: {
            
            SHOOT_SETTINGS: combineStats([g.lance]),
            TYPE: [exports.bullet, {
                LABEL: 'Lance',
              ALPHA: 0
            }],   AUTOFIRE: true,
        }
    }, {
        POSITION: [11, 4, 1.4, 8.5, 0, 0, 0],
        PROPERTIES: {
          
            SHOOT_SETTINGS: combineStats([g.lance]),
            TYPE: [exports.bullet, {
                LABEL: 'Lance',
              ALPHA: 0
            }],
          AUTOFIRE: true,
        }
    }, {
        POSITION: [32, 0.31, -55, 0, 0, 0, 0],
      PROPERTIES: {
      COLOR: 232,
     
    }, }, {
       POSITION: [  27,     7,       1.5,      0,      0,      180,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                            TYPE: exports.bullet,
                        }, }, { 
       POSITION: [  25,     7,       1.5,      0,      0,      180,      0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                            TYPE: exports.bullet,
                        }, }, { 
    POSITION: [  23,     7,       1.5,      0,      0,      180,      0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     7,        1.5,       0,      0,      180,     0.6, ], 
                        PROPERTIES: {
                          SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     7,         1.5,      0,      0,     180,     0.8, ], 
                        PROPERTIES: {
                           SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  17,     7,         1.5,      0,      0,       180,      1.0, ], 
                        PROPERTIES: {
                           SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  15,     7,        1.5,      0,      0,      180,     1.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                            TYPE: exports.bullet,
                       }, }, 
        ],
    TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
               
                POSITION: [  11,     0,      0,     0,    360,   0, ],  
                    TYPE: [exports.genericTank]
                    }, {
                POSITION: [  10,     0,      0,       0,    360,   1, ],  
                    TYPE: exports.hiveturret1, 
                    },
            ],
    };
exports.afajax = {
PARENT: [exports.genericTank],
LABEL: "Afakujax",
  DANGER: 5,
  SHAPE: 0,
STAT_NAMES: statnames.lance,
  BODY: {
        SPEED: base.SPEED * 2,
        ACCELERATION: base.ACCEL * 1.5,
        DAMAGE: 3,
    },
    RESET_UPGRADES: true,
  //CONTROLLERS: ['alwaysFire'],
  GUNS: [
{
POSITION: [14,11.2,0.1,0.1,4.154,283.857,0],
},
{
POSITION: [14,11.2,0.1,0.1,-4.154,77.993,0],
},
{
POSITION: [20,12,0.1,5.538,-8,14.061,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.lance, g.halfrange]),
TYPE: exports.bullet,
  AUTOfIRE: true,
  LABEL: 'Lance',
  ALPHA: 0 
}, },
{
POSITION: [20,12,0.1,5.538,8,345.176,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.lance, g.halfrange]),
TYPE: exports.bullet,
  AUTOFIRE: true,
    LABEL: 'Lance',
       ALPHA: 0 
}, },
], };
exports.afajaxB = {
PARENT: [exports.genericTank],
LABEL: "Afakujax",
    RESET_UPGRADES: true,
  SHAPE: 0,
GUNS: [
{
POSITION: [18,8,0.1,0,0,244.56,0],
},
{
POSITION: [18,8,0.1,0,0,118.689,0],
},
{
POSITION: [27.692,8,0.1,0,-13.846,334.157,0],
},
{
POSITION: [27.692,8,0.1,0,13.846,31.613,0],
},
{
POSITION: [18,8,1,0,0,0.722,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: exports.bullet
}, },
], };
exports.saboton = {
PARENT: [exports.genericTank],
LABEL: "Saboton",
  DANGER: 5,
  SHAPE: 0,
STAT_NAMES: statnames.lance,
  BODY: {
        SPEED: base.SPEED * 2,
        ACCELERATION: base.ACCEL * 1.5,
        DAMAGE: 3,
    },
  //CONTROLLERS: ['alwaysFire'],
  GUNS: [
{
POSITION: [14,11.2,0.1,0.1,4.154,283.857,0],
},
{
POSITION: [14,11.2,0.1,0.1,-4.154,77.993,0],
},
{
POSITION: [20,12,0.1,5.538,-8,14.061,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.lance, g.halfrange]),
TYPE: exports.bullet,
  AUTOfIRE: true,
  LABEL: 'Lance',
  ALPHA: 0 
}, },
{
POSITION: [20,12,0.1,5.538,8,345.176,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.lance, g.halfrange]),
TYPE: exports.bullet,
  AUTOFIRE: true,
    LABEL: 'Lance',
       ALPHA: 0 
}, },
], };
exports.sabotonB = {
PARENT: [exports.genericTank],
LABEL: "Saboton",
  SHAPE: 0,
GUNS: [
{
POSITION: [18,8,0.1,0,0,244.56,0],
},
{
POSITION: [18,8,0.1,0,0,118.689,0],
},
{
POSITION: [27.692,8,0.1,0,-13.846,334.157,0],
},
{
POSITION: [27.692,8,0.1,0,13.846,31.613,0],
},
{
POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, 
        ],
    };
exports.lancer = {
    PARENT: [exports.genericTank],
    LABEL: 'Lancer',
    DANGER: 5,
  STAT_NAMES: statnames.lance,
    BODY: {
        SPEED: base.SPEED * 2,
        ACCELERATION: base.ACCEL * 1.5,
        DAMAGE: 3,
    },
    GUNS: [{
        POSITION: [8, 4, 1.4, 6, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.lance]),
            TYPE: [exports.bullet, {
                LABEL: 'Lance',
              ALPHA: 0
            }]
        }
    }, {
        POSITION: [8, 4, 1.4, 8.5, 0, 0, 0],
        PROPERTIES: {
          
            SHOOT_SETTINGS: combineStats([g.lance]),
            TYPE: [exports.bullet, {
                LABEL: 'Lance',
              ALPHA: 0
            }]
        }
    }, {
        POSITION: [25, 0.3, -55, 0, 0, 0, 0]
    }]
};
exports.snipelance = {
PARENT: [exports.lancer],
LABEL: 'Serrator',
SHAPE: 0,
GUNS: [
{
POSITION: [27.692,14.4,0.01,0,0,0.078,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.lance, g.halfrange]),
TYPE: exports.bullet,
  ALPHA: 0,
  AUTOFIRE: true,
  LABEL: 'Lancer'
}, },
{
POSITION: [27.692,14.4,0.01,0,0,0,0],
},
], };
exports.flailpart = {
PARENT: [exports.genericTank],
LABEL: "Flail",
SHAPE: 0,
};
exports.flail = {
PARENT: [exports.genericTank],
LABEL: "Flail",
SHAPE: 0,
GUNS: [
{
POSITION: [52,2.4,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.lance,  g.halfrange]),
HAS_NO_RECOIL: true,
  TYPE: exports.bullet,
  //ALPHA: 0.001,
  AUTOFIRE: true
}, },
],
  TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,   -55,      0,      180,     360,  1,], 
                TYPE: exports.smash,
     }, {
    POSITION: [  5,   20,      0,      0,     360,  1,], 
                TYPE: exports.flailpart,
        }, {
    POSITION: [  5,   30,      0,      0,     360,  1,], 
                TYPE: exports.flailpart,
           }, {
    POSITION: [  5,   40,      0,      0,     360,  1,], 
                TYPE: exports.flailpart,
            }],
        };
    exports.twin = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, 
        ],
    };
    exports.hometwin = {
        PARENT: [exports.genericTank],
        LABEL: 'Homing Twin',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: [exports.homingbullet,{INDEPENDENT: true}]
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: [exports.homingbullet,{INDEPENDENT: true}]
            }, }, 
        ],
        TURRETS: [{
        POSITION: [12, 0, 0, 0, 0, 1],
        TYPE: [exports.genericTank,{COLOR: 12}],
        },
                 ],
    };
exports.sn87_mx = {
PARENT: [exports.genericTank],
LABEL: "SN87-MX",
SHAPE: 0,
GUNS: [
{
POSITION: [33.231,3.2,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[10, 0, 0.001, 1, 0.25, 0.75, 1, 10.8, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [33.231,3.2,1,0,-2.769,0,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[15, 0, 0.001, 1, 0.25, 0.75, 1, 10.8, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [33.231,3.2,1,0,2.769,0,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[15, 0, 0.001, 1, 0.25, 0.75, 1, 10.8, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [33.231,3.2,1,0,5.538,0,0.4],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[15, 0, 0.001, 1, 0.25, 0.75, 1, 10.8, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [33.231,3.2,1,0,-5.538,0,0.4],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[15, 0, 0.001, 1, 0.25, 0.75, 1, 10.8, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,17,1,0,0,0,2],
},
{
POSITION: [12.462,17.6,1.3,12.462,0,0.238,2],
},
{
POSITION: [5.538,17.6,-1.3,24.923,0,0.346,2],
},
], }; 
exports.arena_sn87 = {
PARENT: [exports.genericTank],
LABEL: "Arena SN87-MX",
DANGER: 999999999,
                BODY: {
                    SPEED: 7,
                    HEALTH: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
                    RESIST: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
                    REGEN: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
                    SHIELD: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
                PUSHABILITY: 0,
                    DAMAGE: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
                },
                SIZE: 30,
                CAN_BE_ON_LEADERBOARD: false,
    COLOR: 3,
GUNS: [
{
POSITION: [33.231,3.2,1,0,0,0,0],
PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic,g.op]),
TYPE: exports.bullet
}, },
{
POSITION: [33.231,3.2,1,0,-2.769,0,0.2],
PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic,g.op]),
TYPE: exports.bullet
}, },
{
POSITION: [33.231,3.2,1,0,2.769,0,0.2],
PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic,g.op]),
TYPE: exports.bullet
}, },
{
POSITION: [33.231,3.2,1,0,5.538,0,0.4],
PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic,g.op]),
TYPE: exports.bullet
}, },
{
POSITION: [33.231,3.2,1,0,-5.538,0,0.4],
PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic,g.op]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,17,1,0,0,0,2],
},
{
POSITION: [12.462,17.6,1.3,12.462,0,0.238,2],
},
{
POSITION: [5.538,17.6,-1.3,24.923,0,0.346,2],
},
], }; 
/* DANGER: 999999999,
                BODY: {
                    SPEED: 7,
                    HEALTH: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
                    RESIST: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
                    REGEN: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
                    SHIELD: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
                PUSHABILITY: 0,
                    DAMAGE: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
                },
                SIZE: 30,
                CAN_BE_ON_LEADERBOARD: false,*/
exports.gunner = {
            PARENT: [exports.genericTank],
            LABEL: 'Gunner',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.machinegunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Machine Gunner',
                DANGER: 6,
                BODY: {
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     3,     4.0,    -3,      5,      0,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,    -3,     -5,      0,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,     2.5,     0,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,    -2.5,     0,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  14,     3,     4.0,     3,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, 
                ]
            };
            exports.autogunner = makeAuto(exports.gunner);            
            exports.nailgun = {
                PARENT: [exports.genericTank],
                LABEL: 'Nailgun',
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.75, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     2,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],
                        },
                ],
            };
exports.nailgun2 = {
                PARENT: [exports.auto3gun],
                LABEL: '',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.75, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     2,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],
                        },
                ],
            };
exports.pailergun = {
PARENT: [exports.genericTank],
LABEL: "Staple Gun",
SHAPE: 0,
GUNS: [
{
POSITION: [23.538,3.2,1,0,0,0.301,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,3.2,1,0,2.769,0.266,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,3.2,1,0,-2.769,0.487,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner]),
TYPE: exports.bullet
}, },
{
POSITION: [18,3.2,1,0,-5.538,1.224,0.4],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner]),
TYPE: exports.bullet
}, },
{
POSITION: [18,3.2,1,0,5.538,0.331,0.4],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner]),
TYPE: exports.bullet
}, },
{
POSITION: [11.077,14.4,-1.5,0,0,1.005,0],
},
], };
        exports.double = {
            PARENT: [exports.genericTank],
            LABEL: 'Double Twin',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.tripletwin = {
                PARENT: [exports.genericTank],
                LABEL: 'Triple Twin',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    120,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    240,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
            exports.autodouble = makeAuto(exports.double, 'Auto-Double');
            exports.split = {
                PARENT: [exports.genericTank],
                LABEL: 'Hewn Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     5.5,     25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,    -5.5,    -25,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };

        exports.bent = {
            PARENT: [exports.genericTank],
            LABEL: 'Triple Shot',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.bentdouble = {
                PARENT: [exports.genericTank],
                LABEL: 'Bent Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     -1,     -25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,      25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -1,     155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,    -155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.penta = {
                PARENT: [exports.genericTank],
                LABEL: 'Penta Shot',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.85,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     8,      1,      0,     -3,    -30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,      3,     30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -2,    -15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      2,     15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.pentaclose = {
                PARENT: [exports.genericTank],
                LABEL: 'Penta Closer',
                DANGER: 999999999,
                BODY: {
                    SPEED: 7,
                    HEALTH: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
                    RESIST: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
                    REGEN: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
                    SHIELD: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
                PUSHABILITY: 0,
                    DAMAGE: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
                },
                SIZE: 30,
                COLOR: 3,
                CAN_BE_ON_LEADERBOARD: false,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  12,     8,      1,      0,     -3,    -30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic,g.op]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,     8,      1,      0,      3,     30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic,g.op]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,     8,      1,      0,     -2,    -15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic,g.op]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,     8,      1,      0,      2,     15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic,g.op]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic,g.op]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.benthybrid = makeHybrid(exports.bent, 'Bent Hybrid');

        exports.triple = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
            },
            LABEL: 'Triplet',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,      1,      0,      5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,    10,      1,      0,     -5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    10,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.quint = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                },
                LABEL: 'Quintuplet',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,    10,      1,      0,     -5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    10,      1,      0,      5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,    10,      1,      0,     -3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  19,    10,      1,      0,      3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };        
            exports.dual = {
                PARENT: [exports.genericTank],
              LABEL: 'Dual',  
              DANGER: 7,
                BODY: {
                    ACCEL: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     7,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  18,     7,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  16,    8.5,     1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  16,    8.5,     1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };


exports.borer = {
PARENT: [exports.genericTank],
LABEL: "Borer",
SIZE: 12,
SHAPE: 0,
GUNS: [
{
POSITION: [22.154,3.2,1,0,-4.154,359.914,0.3],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.sniper]),
TYPE: exports.bullet
}, },
{
POSITION: [22.154,3.2,1,0,4.154,359.692,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.sniper]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,12.8,-1.5,0,0,359.872,0],
},
], };
    exports.sniper = {
        PARENT: [exports.genericTank],
        LABEL: 'Sniper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            }, },
        ],
    };
    exports.chiller = {
        PARENT: [exports.genericTank],
        LABEL: 'Chiller',
        //SHAPE: 696969,
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.icebullet,
            }, },
        ],
        TURRETS: [{
          POSITION: [5, 15, 0, 0, 0, 1],
            TYPE: [exports.genericTank,{COLOR:25}],
        },
                 ]
    };
    exports.acid = {
        PARENT: [exports.genericTank],
        LABEL: 'Acid',
        //SHAPE: 696969,
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.poisonBullet,
            }, },
        ],
        TURRETS: [{
          POSITION: [5, 15, 0, 0, 0, 1],
            TYPE: [exports.genericTank,{COLOR:26}],
        },
                 ]
    };
            exports.rifle = {
                PARENT: [exports.genericTank],
                LABEL: 'Rifle',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  20,    10.5,    1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
exports.frag4 = {
PARENT: [exports.genericTank],
LABEL: "Frag-4",
SHAPE: 0,
GUNS: [
{
POSITION: [27.692,8,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.slow, g.lessreload, g.lessreload]),
TYPE: exports.frag4bullet
}, },
{
POSITION: [9.692,11.2,1,15.231,0,0,0],
},
{
POSITION: [9.692,8,1,15.231,0,0,0],
  PROPERTIES: {
   SHOOT_SETTINGS: combineStats([g.afaker]),
    TYPE: [exports.bullet,{COLOR:9,}]
  },
},
], };
exports.frag8 = {
PARENT: [exports.genericTank],
LABEL: "Frag-8",
SHAPE: 0,
GUNS: [
{
POSITION: [27.692,8,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.slow, g.lessreload, g.lessreload]),
TYPE: exports.frag8bullet
}, },
{
POSITION: [9.692,11.2,1,15.231,0,0,0],
},
{
POSITION: [9.692,8,1,15.231,0,0,0],
  PROPERTIES: {
   SHOOT_SETTINGS: combineStats([g.afaker]),
    TYPE: [exports.bullet,{COLOR:9,}]
  },
},
], };
exports.railgun = {
PARENT: [exports.genericTank],
LABEL: "Railgun",
  BODY:{
    ACCEL: 7,
    FOV: 1.47,
    DENSITY: 10,
  },
  //DRAWS_HEALTH: true,
DANGER: 8,
  SHAPE: 0,
GUNS: [
{
POSITION: [27.692,8,0.1,0,5.538,0,0],
},
{
POSITION: [27.692,8,0.1,0,-5.538,0,0],
},
{
POSITION: [27.692,11.2,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.destroy, g.fast]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,11.2,1,0,0,0,0],
  PROPERTIES: {
    COLOR: 14,
},},
{
POSITION: [27.692,1.6,1,0,5.538,0,0],
},
{
POSITION: [27.692,1.6,1,0,-5.538,0,0],
},
], };
exports.railgun2 = {
PARENT: [exports.auto3gun],
LABEL: "RK-1 Railgun",
  //DRAWS_HEALTH: true,
DANGER: 15,
  SHAPE: 0,
GUNS: [
{
POSITION: [27.692,8,0.1,0,5.538,0,0],
},
{
POSITION: [27.692,8,0.1,0,-5.538,0,0],
},
{
POSITION: [27.692,11.2,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.destroy, g.fast]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,11.2,1,0,0,0,0],
  PROPERTIES: {
    COLOR: 14,
},},
{
POSITION: [27.692,1.6,1,0,5.538,0,0],
},
{
POSITION: [27.692,1.6,1,0,-5.538,0,0],
},
], };
//INVISIBLE: [1, 0.1, 0.0],
        exports.assassin = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Assassin',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                },
            ],
        };
exports.stalker = {
            PARENT: [exports.genericTank],
  //Dam thats a sneaky boi          
  DANGER: 6,
            LABEL: 'Stalker',
  INVISIBLE: [1, 0.1, 0.1],          
  BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  27,    8.5,     -1.7,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, 
                },
            ],
        };
            exports.ranger = {
                PARENT: [exports.genericTank],
                LABEL: 'Ranger',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.5,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  32,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                    },
                ],
            };
 exports.ranger2 = {
                PARENT: [exports.auto3gun],
                LABEL: 'Ranger MK Turret',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  32,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                    },
                ],
            };
            exports.autoass = makeAuto(exports.assassin, "Auto-Assassin");
exports.marksman = {
PARENT: [exports.genericTank],
LABEL: "Marksman",
SHAPE: 0,
GUNS: [
{
POSITION: [34.615,3.2,1,0,0,0,0.6],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.hunter]),
TYPE: exports.bullet
}, },
{
POSITION: [33.231,4.8,1,0,0,0,0.4],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.hunter]),
TYPE: exports.bullet
}, },
{
POSITION: [31.846,6.4,1,0,0,0,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.hunter]),
TYPE: exports.bullet
}, },
{
POSITION: [30.462,8,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.hunter]),
TYPE: exports.bullet
}, },
{
POSITION: [15.231,8,-2,0,0,0,0],
},
], };
        exports.hunter = {
            PARENT: [exports.genericTank],
            LABEL: 'Hunter',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    12,      1,      0,      0,      0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.preda = {
                PARENT: [exports.genericTank],
                LABEL: 'Predator',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.85,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,    12,      1,      0,      0,      0,     0.15, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  18,    16,      1,      0,      0,      0,     0.3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
exports.extinctionist = {
PARENT: [exports.genericTank],
LABEL: "The Predator",
SIZE: 12,
SHAPE: 0,
GUNS: [
{
POSITION: [30.462,8,1,0,0,0.244,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter,g.preda]),
TYPE: exports.bullet
}, },
{
POSITION: [27.692,11.2,1,0,0,0,0.4],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter,g.preda]),
TYPE: exports.bullet
}, },
{
POSITION: [24.923,14.4,1,0,0,0,0.8],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter,g.preda]),
TYPE: exports.bullet
}, },
{
POSITION: [22.154,17.6,1,0,0,0,1.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
TYPE: exports.bullet
}, },
{
POSITION: [19.385,20.8,1,0,0,0,1.6],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter,g.preda]),
TYPE: exports.bullet
}, },
], };

            exports.poach = makeHybrid(exports.hunter, 'Poacher');
            exports.sidewind = {
                PARENT: [exports.genericTank],
                LABEL: 'Sidewinder',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    11,    -0.5,    14,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  21,    12,    -1.1,     0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind]),
                            TYPE: exports.snake,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
exports.healhelm2 = {
LABEL: '',
  SHAPE: 0,
  CONTROLLERS: ['doNothing'],
  COLOR: 6,
};
exports.healhelm = {
LABEL: '',
  SHAPE: [[0.4,-0.4],[1,-0.4],[1,0.4],[0.4,0.4],[0.4,1],[-0.4,1],[-0.4,0.4],[-1,0.4],[-1,-0.4],[-0.4,-0.4],[-0.4,-1],[0.4,-1]],
  CONTROLLERS: ['doNothing'],
  COLOR: 12,
};
exports.healer = {
                PARENT: [exports.genericTank],
                LABEL: 'Healer',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 3,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    9,    -0.5,    14,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  25,    10,    -1.1,     0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                            TYPE: exports.healbullet,
                            //STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
           TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
             POSITION: [ 15,     0,      0,     0,    0, 1, ], 
                        TYPE: exports.healhelm2,
           }, {
             POSITION: [ 10,     0,      0,     0,    0, 1, ], 
                        TYPE: exports.healhelm,
                            },
                ],
            };
    exports.director = {
        PARENT: [exports.genericTank],
        LABEL: 'Director',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 5,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
            exports.master = {
                PARENT: [exports.genericTank],
                LABEL: 'Master',  
                STAT_NAMES: statnames.drone,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.15,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  16,     1,      0,      0,      0, 0], 
                        TYPE: exports.masterGun,
                            }, {
                    POSITION: [  16,     1,      0,     120,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            }, {
                    POSITION: [  16,     1,      0,     240,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            },
                ],
            };

        exports.overseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Overseer',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            MAX_CHILDREN: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        };
            exports.overlord = {
                PARENT: [exports.genericTank],
                LABEL: 'Overlord',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                MAX_CHILDREN: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
            };
            exports.overtrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Overtrapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.banshee = {
                PARENT: [exports.genericTank],
                LABEL: 'Banshee',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     8,      0,      0,      80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     120,     80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     240,     80, 0], 
                        TYPE: exports.bansheegun,
                            },
                ],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, 
                    ]
            };
            exports.autoover = makeAuto(exports.overseer, "Autoseer");
            exports.overgunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Overgunner',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.9,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        },
                ],
            };
        
        function makeSwarmSpawner(guntype) {
            return {
                PARENT: [exports.genericTank],
                LABEL: '',
                BODY: {
                    FOV: 2,
                },
                CONTROLLERS: ['nearestDifferentMaster'], 
                COLOR: 16,
                AI: {
                    NO_LEAD: true,
                    SKYNET: true,
                    FULL_VIEW: true,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     15,    0.6,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: guntype,
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }
                ],
            };
        }
        exports.cruiserGun = makeSwarmSpawner(combineStats([g.swarm]));
        exports.cruiser = {
            PARENT: [exports.genericTank],
            LABEL: 'Cruiser',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,    7.5,    0.6,     7,      4,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };
            exports.battleship = {
                PARENT: [exports.genericTank],
                LABEL: 'Battleship',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      4,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     90,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',        
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      4,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',         
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, },
                ],
            };
            exports.carrier = {
                PARENT: [exports.genericTank],
                LABEL: 'Carrier',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      2,      40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -2,     -40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }
                ],
            };
            exports.autocruiser = makeAuto(exports.cruiser, "Auto-Cruiser");
            exports.fortress = {
                PARENT: [exports.genericTank],
                LABEL: 'Fortress', //'Palisade',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     120,    1/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     240,    2/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [  14,     9,      1,      0,      0,     60,      0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     60,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     300,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

        exports.underseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Underseer',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            SHAPE: 4,
            MAX_CHILDREN: 14,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   5,     12,    1.2,     8,      0,     270,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, },
                ],
        };
 exports.maleficitor = {
                PARENT: [exports.genericTank],
                LABEL: 'Maleficitor',
                DANGER: 7,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.85,
                    FOV: base.FOV * 1.1,
                },
                SHAPE: 4,
                MAX_CHILDREN: 20,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    1.2,     8,      0,     0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip2,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, },
                    ],
            };      
exports.necromancer = {
                PARENT: [exports.genericTank],
                LABEL: 'Necromancer',
                DANGER: 7,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                SHAPE: 4,
                FACING_TYPE: 'autospin',
                MAX_CHILDREN: 14,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,      0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard',
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     180,    0.75  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard', 
                        }, },
                    ],
            };
exports.labcoatturret = {
LABEL: '',
  SHAPE: [[-1.02,-0.005],[-0.6,-0.8],[-0.4,-0.3],[-0.4,0.3],[-0.6,0.8],[-1,-0.01],[-1.014,0],[-0.594,0.8],[-1.8,-0.01],[-0.594,-0.81],[-0.6,-0.8]],
  COLOR: 6,
  BODY: {
    STEALTH: 999999999999,
  },
  INDEPENDENT: true,
};
exports.labcoat = {
  PARENT: [exports.genericTank],
  LABEL: 'Lab Coat',
  POISONIMMUNE: true, // Make it Immune to poison
  GUNS: [{
    POSITION: [16, 8, 1, 0, 0, 0, 0],
    PROPERTIES:{
      SHOOT_SETTINGS: combineStats([g.basic]),
      TYPE: exports.bullet,
    }, },
         ],
  TURRETS:[{
    POSITION:[20, 0, 0, 0, 0, 1],
    TYPE: exports.labcoatturret,
  },
           ]
};
exports.necro_4 = {
  PARENT:[exports.genericTank],
  LABEL: 'Necromancer-4',
  SHAPE: 0,
  TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  12,     10,      10,       0,    360,   0, ],  
                    TYPE: [exports.necromancer]  
                                           }, {
                    POSITION: [  12,     10,      -10,       0,    360,   0, ],  
                    TYPE: [exports.necromancer]  
                                             }, {
                    POSITION: [  12,     -10,      10,       0,    360,   0, ],  
                    TYPE: [exports.necromancer]  
                                               }, {
                    POSITION: [  12,     -10,      -10,       0,    360,  0, ],  
                    TYPE: [exports.necromancer]  
                    },
            ],
        };
        exports.lilfact = {
            PARENT: [exports.genericTank],
            LABEL: 'Spawner',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  4.5,    10,      1,     10.5,    0,      0,      0,   ], 
                }, {
                POSITION: [   1,     12,      1,      15,     0,      0,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 4,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                    TYPE: exports.minion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, }, {                        
                    POSITION: [  3.5,    12,      1,      8,      0,      0,      0,   ], 
                }
            ],
        };
            exports.factory = {
                PARENT: [exports.genericTank],
                LABEL: 'Factory',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: 1.1,
                },
                MAX_CHILDREN: 6,
                GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.minion,
                            STAT_CALCULATOR: gunCalcNames.drone,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,   
                        }, }, {                        
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
                    }
                ],
            };

    exports.machine = {
        PARENT: [exports.genericTank],
        LABEL: 'Machine Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.ak47_bx = {
PARENT: [exports.genericTank],
LABEL: "AK47-BX-12-7",
SIZE: 12,
SHAPE: 0,
GUNS: [
{
POSITION: [36,1.6,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.rocketfuel, g.mach]),
TYPE: exports.bullet
}, },
{
POSITION: [36,1.6,1,0,-1.385,0,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.rocketfuel, g.mach]),
TYPE: exports.bullet
}, },
{
POSITION: [36,1.6,1,0,1.385,0,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.rocketfuel, g.mach]),
TYPE: exports.bullet
}, },
{
POSITION: [36,1.6,1,0,2.769,0,0.4],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.rocketfuel, g.mach]),
TYPE: exports.bullet
}, },
{
POSITION: [36,1.6,1,0,-2.769,0,0.4],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.rocketfuel, g.mach]),
TYPE: exports.bullet
}, },
{
POSITION: [36,1.6,1,0,-4.154,0,0.6],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.rocketfuel, g.mach]),
TYPE: exports.bullet
}, },
{
POSITION: [36,1.6,1,0,4.154,0,0.6],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.rocketfuel, g.mach]),
TYPE: exports.bullet
}, },
{
POSITION: [8.308,11.2,2,0,0,0,3.2],
},
{
POSITION: [12.462,17.6,1,8.308,0,0.366,3.2],
},
{
POSITION: [5.538,14.4,2,27.692,0,0,3.2],
},
], };    
exports.kashmirA = {
PARENT: [exports.genericTank],
LABEL: "Kashmir",
DANGER: 7, //Better than Booster
 GUNS: [
{
POSITION: [30.462,4.8,1,0,0,270,0],
},
{
POSITION: [30.462,4.8,1,0,0,90,0],
},
{
POSITION: [16.615,8,-1.7,0,0,270,0],
},
{
POSITION: [13.846,11.2,-1.5,0,0,270,0],
},
{
POSITION: [16.615,8,-1.7,0,0,90,0],
},
{
POSITION: [13.846,11.2,-1.5,0,0,90,0],
},
{
POSITION: [4.154,6.4,1.5,23.538,0,270,0],
},
{
POSITION: [4.154,6.4,1.5,23.538,0,90,0],
},
{
POSITION: [4.154,32,1,27.692,-2.769,270,0],
},
{
POSITION: [4.154,32,1,27.692,2.769,90,0],
},
{
POSITION: [2.769,3.2,-1.3,18,29.908,180,0],
},
{
POSITION: [2.769,3.2,-1.3,18,-29.908,180,0],
},
{
POSITION: [2.769,3.2,1.3,22.154,-29.908,180,0],
},
{
POSITION: [2.769,3.2,1.3,22.154,29.908,180,0],
},
{
POSITION: [5.538,3.2,1,26.308,-29.908,180,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[4.667, 3, 0.001, 1, 1, 0.75, 1, 1.8, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [5.538,3.2,1,26.308,29.908,180,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[4.667, 3, 0.001, 1, 1, 0.75, 1, 1.8, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [2.769,3.2,-1.3,26.308,-29.908,180,0],
},
{
POSITION: [2.769,3.2,-1.3,26.308,29.908,180,0],
}, {
    POSITION: [16, 5, 0.1, 0, 0, 90, 0],
    PROPERTIES:{
    COLOR: 9,
    }, }, {
    POSITION: [16, 5, 0.1, 0, 0,270,0],
    PROPERTIES:{
    COLOR: 9,
    }, },
],
TURRETS:[{
    POSITION: [10, 0, 0, 0, 0, 1],
  TYPE: exports.smash,
  },
       ],
};
exports.kashmirshell = {
  PARENT: [exports.bullet],
  LABEL: 'Kashmir Shell',
  SHAPE: 4,
  CONTROLLERS: ['alwaysFire'],
 GUNS: [
{
POSITION: [30.462,4.8,1,0,0,270,0],
},
{
POSITION: [30.462,4.8,1,0,0,90,0],
},
{
POSITION: [16.615,8,-1.7,0,0,270,0],
},
{
POSITION: [13.846,11.2,-1.5,0,0,270,0],
},
{
POSITION: [16.615,8,-1.7,0,0,90,0],
},
{
POSITION: [13.846,11.2,-1.5,0,0,90,0],
},
{
POSITION: [4.154,6.4,1.5,23.538,0,270,0],
},
{
POSITION: [4.154,6.4,1.5,23.538,0,90,0],
},
{
POSITION: [4.154,32,1,27.692,-2.769,270,0],
},
{
POSITION: [4.154,32,1,27.692,2.769,90,0],
},
{
POSITION: [2.769,3.2,-1.3,18,29.908,180,0],
},
{
POSITION: [2.769,3.2,-1.3,18,-29.908,180,0],
},
{
POSITION: [2.769,3.2,1.3,22.154,-29.908,180,0],
},
{
POSITION: [2.769,3.2,1.3,22.154,29.908,180,0],
},
{
POSITION: [5.538,3.2,1,26.308,-29.908,180,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[4.667, 3, 0.001, 1, 1, 0.75, 1, 1.8, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [5.538,3.2,1,26.308,29.908,180,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[4.667, 3, 0.001, 1, 1, 0.75, 1, 1.8, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [2.769,3.2,-1.3,26.308,-29.908,180,0],
},
{
POSITION: [2.769,3.2,-1.3,26.308,29.908,180,0],
}, {
    POSITION: [16, 5, 0.1, 0, 0, 90, 0],
    PROPERTIES:{
    COLOR: 9,
    }, }, {
    POSITION: [16, 5, 0.1, 0, 0,270,0],
    PROPERTIES:{
    COLOR: 9,
    }, },
], };
exports.kashmirB = {
  PARENT: [exports.genericTank],
  LABEL: 'Kashmir',
  DANGER: 5,
  GUNS:[{
  POSITION:[1, 10, 1, 0, 0, 0, 0],  
    PROPERTIES:{
      SHOOT_SETTINGS: combineStats([[300, 0.001, 0.001, 2, 7, 2, 3, 1, 3, 5, 0, 1]]),
      TYPE: exports.kashmirshell,
      AUTOFIRE: true,
  }, },
       ],
TURRETS:[{
    POSITION: [10, 0, 0, 0, 0, 1],
  TYPE: exports.smash,
  },
       ],
  };
exports.spray = {
                PARENT: [exports.genericTank],
                LABEL: 'Sprayer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    10,     1.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
   exports.flamer = {
PARENT: [exports.genericTank],
//Better Flamethrower model
LABEL: "Flamethrower",
SIZE: 12,
SHAPE: 0,
GUNS: [
{
POSITION: [27.692,14.4,0.1,0,0,0,0],
},
{
POSITION: [19.385,9.6,1.5,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.flame, g.lessreload]),
TYPE: exports.bullet
}, },
{
POSITION: [19.385,9.6,1.5,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.flame, g.lessreload]),
TYPE: exports.bullet
}, },
{
POSITION: [19.385,9.6,1.5,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.flame, g.lessreload]),
TYPE: exports.bullet
}, },
], };
exports.apidae = {
PARENT: [exports.genericTank],
LABEL: "Apidae",
SIZE: 12,
SHAPE: 0,
GUNS: [
{
POSITION: [15.508,12.8,-1.5,0,0,0,0],
},
{
POSITION: [19.385,11.2,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[80, 0, 0.001, 1, 1, 1, 1, 6.3, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.apidaeflask
}, },
{
POSITION: [13.846,11.2,1,0,0,180,0],
},
], };
        exports.mini = {
            PARENT: [exports.genericTank],
            LABEL: 'Minigun',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
    exports.dualtech = {
        PARENT: [exports.genericTank],
        LABEL: 'Dual Tech',
        DANGER: 10,
        BODY:{
        FOV: 1.3,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, },{    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
    };
            exports.stream = {
                PARENT: [exports.genericTank],
                LABEL: 'Streamliner',
                DANGER: 7,
                BODY: {
                    FOV: 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  25,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  23,     8,      1,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  17,     8,      1,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };

            exports.hybridmini = makeHybrid(exports.mini, "Hybrid Minigun");
            exports.minitrap = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                LABEL: 'Barricade',
                STAT_NAMES: statnames.trap,
                BODY: {
                    FOV: 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [  24,     8,      1,      0,      0,      0,      0, ], 
                            }, {
                    POSITION: [   4,     8,     1.3,     22,     0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     18,     0,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     14,     0,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
exports.minifridge = {
    PARENT: [exports.genericTank],
    LABEL: "Mini Fridge",
    SIZE: 12,
    SHAPE: 0,
    GUNS: [{
            POSITION: [22.154, 3.2, 1, 0, -4.154, 0, 0.3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.sniper, g.fast]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [22.154, 3.2, 1, 0, 4.154, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.sniper, g.fast]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [12.462, 12.8, -1.5, 0, 0, 0, 0],
        },
    ],
    TURRETS: [{
        /*  SIZE     Y       X     ANGLE    ARC */
        POSITION: [5, 11, -4.154, 0, 160, 1],
        TYPE: exports.iceblock,
    }, {
        POSITION: [5, 11, 4.154, 0, 160, 1],
        TYPE: exports.iceblock,
    }, ],
};

exports.blaster = {
PARENT: [exports.genericTank],
LABEL: "Blaster",
SHAPE: 0,
GUNS: [
{
POSITION: [18,8,2.25,0,0,0.089,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.blaster, g.mach, g.morereload]),
TYPE: exports.bullet
}, },
], };
exports.flarestick = {
PARENT: [exports.genericTank],
LABEL: "Flare Stick",
BODY: {
     FOV: 1.3,
  RANGE: 30,
},
  DANGER: 5,
SHAPE: 0,
GUNS: [
{
POSITION: [18,12.8,-2,0,0,0.13,0],
},
{
POSITION: [12.462,12.8,-1.5,0,0,0.338,0],
},
{
POSITION: [12.462,12.8,-1.5,0,0,178.827,0],
},
{
POSITION: [12.462,12.8,1,12.462,0,0.09,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[10, 1, 0.001, 1, 1, 0.75, 1, 2.7, 1, 0.5, 1, 15000, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,12.8,1,12.462,0,349.509,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[10, 1, 0.001, 1, 1, 0.75, 1, 2.7, 1, 0.5, 1, 15000, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,12.8,1,12.462,0,8.643,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[10, 1, 0.001, 1, 1, 0.75, 1, 2.7, 1, 0.5, 1, 15000, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,12.8,1,12.462,0,0,0.8],
},
], };
exports.heavytwin = {
    PARENT: [exports.genericTank],
    LABEL: "Heavy Twin",
    DANGER: 5,
    SHAPE: 0,
    GUNS: [{
            POSITION: [18, 12.8, 0.1, 0, 3.877, 285.255, 0],
        },
        {
            POSITION: [18, 12.8, 0.1, 0, -3.877, 75.969, 0],
        },
        {
            POSITION: [18, 17.6, 1, 9.692, -8.308, 0.076, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [18, 17.6, 1, 9.692, 8.308, 0.087, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
                TYPE: exports.bullet
            },
        },
    ],
};
    exports.pound = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },  
      LABEL: 'Pounder',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.pistol = {
    PARENT: [exports.genericTank],
  DANGER: 5, 
  BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
  LABEL: "Pistol",
    GUNS: [{
            POSITION: [18, 14.4, 1, 0, 0, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.sniper]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [8.308, 20.8, 1, 13.846, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.sniper]),
                TYPE: exports.bullet
            },
        },
    ],
};
exports.destroy = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Destroyer',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, },
            ],
        };
            exports.anni = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: 'Annihilator',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20.5,  19.5,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
exports.guardbullet = {
  PARENT: [exports.swarm],
  LABEL: 'Guardian',
  SHAPE: 3,
  INDEPENDENT: true,
  GUNS: [{
  POSITION: [12, 12, 1.5, 0, 0, 180, 0],
    PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.swarm, g.fast]),
    TYPE: [exports.swarm,{INDEPENDENT: true}],
    AUTOFIRE: true,
    }, },
        ],
};
exports.oxyrrhexis = {
  PARENT: [exports.genericTank],
  LABEL: 'Oxyrrhexis',
  BODY: {
  ACCELERATION: base.ACCEL * 0.75,
  },
  DANGER: 8,
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20.5,  19.5,     1,      0,      0,      0,      0,   ],
                    }, {
                    POSITION: [   3,   19.5,    1.4,    20.5,     0,    0,      0,    ],
                     PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, g.fast, g.fast]),
                        TYPE: exports.guardbullet,
                     }, }, {
                    POSITION: [  18,     8,     0.01,     0,       0,    180,     0,   ],
                     PROPERTIES: {
                     COLOR: 5,
                     }, },
                ],
            };
exports.donutbullet = {
  PARENT: [exports.bullet],
  LABEL: 'Donut',
  SHAPE: [[0,1],[0.05,0.9987],[0.1,0.995],[0.15,0.9887],[0.2,0.9797],[0.25,0.9682],[0.3,0.9539],[0.35,0.9367],[0.4,0.9165],[0.45,0.893],[0.5,0.866],[0.55,0.8352],[0.6,0.8],[0.65,0.76],[0.7,0.7141],[0.7141,0.7],[0.76,0.65],[0.8,0.6],[0.8352,0.55],[0.866,0.5],[0.893,0.45],[0.9165,0.4],[0.9367,0.35],[0.9539,0.3],[0.9682,0.25],[0.9797,0.2],[0.9887,0.15],[0.995,0.1],[0.9987,0.05],[1,0],[1,0],[0.9987,-0.05],[0.995,-0.1],[0.9887,-0.15],[0.9797,-0.2],[0.9682,-0.25],[0.9539,-0.3],[0.9367,-0.35],[0.9165,-0.4],[0.893,-0.45],[0.866,-0.5],[0.8352,-0.55],[0.8,-0.6],[0.76,-0.65],[0.7141,-0.7],[0.7,-0.7141],[0.65,-0.76],[0.6,-0.8],[0.55,-0.8352],[0.5,-0.866],[0.45,-0.893],[0.4,-0.9165],[0.35,-0.9367],[0.3,-0.9539],[0.25,-0.9682],[0.2,-0.9797],[0.15,-0.9887],[0.1,-0.995],[0.05,-0.9987],[0,-1],[0,-1],[-0.05,-0.9987],[-0.1,-0.995],[-0.15,-0.9887],[-0.2,-0.9797],[-0.25,-0.9682],[-0.3,-0.9539],[-0.35,-0.9367],[-0.4,-0.9165],[-0.45,-0.893],[-0.5,-0.866],[-0.55,-0.8352],[-0.6,-0.8],[-0.65,-0.76],[-0.7,-0.7141],[-0.7141,-0.7],[-0.76,-0.65],[-0.8,-0.6],[-0.8352,-0.55],[-0.866,-0.5],[-0.893,-0.45],[-0.9165,-0.4],[-0.9367,-0.35],[-0.9539,-0.3],[-0.9682,-0.25],[-0.9797,-0.2],[-0.9887,-0.15],[-0.995,-0.1],[-0.9987,-0.05],[-1,0],[-1,0],[-0.9987,0.05],[-0.995,0.1],[-0.9887,0.15],[-0.9797,0.2],[-0.9682,0.25],[-0.9539,0.3],[-0.9367,0.35],[-0.9165,0.4],[-0.893,0.45],[-0.866,0.5],[-0.8352,0.55],[-0.8,0.6],[-0.76,0.65],[-0.7141,0.7],[-0.7,0.7141],[-0.65,0.76],[-0.6,0.8],[-0.55,0.8352],[-0.5,0.866],[-0.45,0.893],[-0.4,0.9165],[-0.35,0.9367],[-0.3,0.9539],[-0.25,0.9682],[-0.2,0.9797],[-0.15,0.9887],[-0.1,0.995],[-0.05,0.9987],[0,1],[0,1],[0,0.7],[-0.034999999999999996,0.69909],[-0.06999999999999999,0.6965],[-0.105,0.69209],[-0.13999999999999999,0.68579],[-0.175,0.6777399999999999],[-0.21,0.6677299999999999],[-0.24499999999999997,0.65569],[-0.27999999999999997,0.64155],[-0.315,0.6251],[-0.35,0.6062],[-0.385,0.58464],[-0.42,0.5599999999999999],[-0.45499999999999996,0.5319999999999999],[-0.48999999999999994,0.4998699999999999],[-0.4998699999999999,0.48999999999999994],[-0.5319999999999999,0.45499999999999996],[-0.5599999999999999,0.42],[-0.58464,0.385],[-0.6062,0.35],[-0.6251,0.315],[-0.64155,0.27999999999999997],[-0.65569,0.24499999999999997],[-0.6677299999999999,0.21],[-0.6777399999999999,0.175],[-0.68579,0.13999999999999999],[-0.69209,0.105],[-0.6965,0.06999999999999999],[-0.69909,0.034999999999999996],[-0.7,0],[-0.7,0],[-0.69909,-0.034999999999999996],[-0.6965,-0.06999999999999999],[-0.69209,-0.105],[-0.68579,-0.13999999999999999],[-0.6777399999999999,-0.175],[-0.6677299999999999,-0.21],[-0.65569,-0.24499999999999997],[-0.64155,-0.27999999999999997],[-0.6251,-0.315],[-0.6062,-0.35],[-0.58464,-0.385],[-0.5599999999999999,-0.42],[-0.5319999999999999,-0.45499999999999996],[-0.4998699999999999,-0.48999999999999994],[-0.48999999999999994,-0.4998699999999999],[-0.45499999999999996,-0.5319999999999999],[-0.42,-0.5599999999999999],[-0.385,-0.58464],[-0.35,-0.6062],[-0.315,-0.6251],[-0.27999999999999997,-0.64155],[-0.24499999999999997,-0.65569],[-0.21,-0.6677299999999999],[-0.175,-0.6777399999999999],[-0.13999999999999999,-0.68579],[-0.105,-0.69209],[-0.06999999999999999,-0.6965],[-0.034999999999999996,-0.69909],[0,-0.7],[0,-0.7],[0.034999999999999996,-0.69909],[0.06999999999999999,-0.6965],[0.105,-0.69209],[0.13999999999999999,-0.68579],[0.175,-0.6777399999999999],[0.21,-0.6677299999999999],[0.24499999999999997,-0.65569],[0.27999999999999997,-0.64155],[0.315,-0.6251],[0.35,-0.6062],[0.385,-0.58464],[0.42,-0.5599999999999999],[0.45499999999999996,-0.5319999999999999],[0.48999999999999994,-0.4998699999999999],[0.4998699999999999,-0.48999999999999994],[0.5319999999999999,-0.45499999999999996],[0.5599999999999999,-0.42],[0.58464,-0.385],[0.6062,-0.35],[0.6251,-0.315],[0.64155,-0.27999999999999997],[0.65569,-0.24499999999999997],[0.6677299999999999,-0.21],[0.6777399999999999,-0.175],[0.68579,-0.13999999999999999],[0.69209,-0.105],[0.6965,-0.06999999999999999],[0.69909,-0.034999999999999996],[0.7,0],[0.7,0],[0.69909,0.034999999999999996],[0.6965,0.06999999999999999],[0.69209,0.105],[0.68579,0.13999999999999999],[0.6777399999999999,0.175],[0.6677299999999999,0.21],[0.65569,0.24499999999999997],[0.64155,0.27999999999999997],[0.6251,0.315],[0.6062,0.35],[0.58464,0.385],[0.5599999999999999,0.42],[0.5319999999999999,0.45499999999999996],[0.4998699999999999,0.48999999999999994],[0.48999999999999994,0.4998699999999999],[0.45499999999999996,0.5319999999999999],[0.42,0.5599999999999999],[0.385,0.58464],[0.35,0.6062],[0.315,0.6251],[0.27999999999999997,0.64155],[0.24499999999999997,0.65569],[0.21,0.6677299999999999],[0.175,0.6777399999999999],[0.13999999999999999,0.68579],[0.105,0.69209],[0.06999999999999999,0.6965],[0.034999999999999996,0.69909],[0,0.7]],
};
exports.donut = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Donut',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.fast, g.fast]),
                    TYPE: exports.donutbullet,
                }, },
            ],
    TURRETS: [{
    POSITION:[5, 15, 0, 0, 0, 1],
    TYPE: [exports.genericTank,{COLOR:26}],
    },
             ],
        };
            exports.beignet = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: 'Beignet',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20.5,  19.5,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, g.fast, g.fast]),
                        TYPE: exports.donutbullet,
                    }, },
                ],
                TURRETS: [{
    POSITION:[5, 15, 0, 0, 0, 1],
    TYPE: [exports.genericTank,{COLOR:26}],
    },
             ],
            };
            exports.hiveshooter = {
                PARENT: [exports.genericTank],
              LABEL: "Swarmer",  
              DANGER: 6,
                BODY: {
                   // ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.speed * 0.8,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
                            TYPE: exports.hive,
                        }, }, {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                    }
                ],
            };
            exports.hybrid = makeHybrid(exports.destroy, 'Hybrid');
            exports.shotgun2 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Shotgun',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                },
                GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                    POSITION: [  4,      3,      1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  1,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      3,      1,     13,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,     -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [ 15,     14,      1,     6,       0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  8,     14,    -1.3,    4,       0,      0,      0,   ], }
                ],
            };

        exports.builder = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Builder',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    12,      1,      0,      0,      0,      0,   ], 
                }, {
                POSITION: [   2,    12,     1.1,     18,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.block,
                    }, },
            ],
        };

            exports.engineer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Engineer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 6,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.pillbox,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };
            exports.construct = {
                PARENT: [exports.genericTank],
                LABEL: 'Constructor',
                STAT_NAMES: statnames.trap,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.7,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,    18,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    18,     1.2,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                            TYPE: exports.block,
                        }, }, 
                ],
            };
            exports.autobuilder = makeAuto(exports.builder);
            exports.conq = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Conquor',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  21,    14,      1,      0,      0,     180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  18,    14,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.1,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.block,
                        }, },
                ],
            };
        exports.laser = {
            PARENT: [exports.genericTank],
            LABEL: 'Laser',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.lazerbullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.lazerbullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.lazerbullet,
                    }, },{
                      POSITION: [24, 1.5, 1, 0, 0, 0, 0],
                      PROPERTIES:{
                        COLOR: 99999,
                      }, },
            ],
        };
            exports.lightsaber = {
                PARENT: [exports.genericTank],
                LABEL: 'Lightsaber',
                DANGER: 7,
                BODY: {
                    FOV: 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  25,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.lazerbullet,
                        }, }, { 
                    POSITION: [  23,     8,      1,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.lazerbullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.lazerbullet,
                        }, }, { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.lazerbullet,
                        }, },  { 
                    POSITION: [  17,     8,      1,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.lazerbullet,
                        }, },{
                      POSITION: [27, 1.5, 1, 0, 0, 0, 0],
                      PROPERTIES:{
                        COLOR: 99999,
                      }, },
                ],
            };
            exports.bentboomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Bent Boomer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      14,     0,      -37,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      -37,      0,   ],
                        }, {
                    POSITION: [   2,    10,     1.3,     18,    0,     -37,     0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                            TYPE: exports.boomerang,
                        }, }, 
                       { 
                    POSITION: [   5,    10,      1,      14,     0,      37,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      37,      0,   ],
                        }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      37,    0.5,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
            exports.boomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Boomer',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
                    //    }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
            exports.quadtrapper = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Quad Trapper',
                STAT_NAMES: statnames.trap, 
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     6,      1,      0,      0,     45,      0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     45,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     135,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     135,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     225,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     225,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     315,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     315,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, },
                ],
            };

        exports.artillery = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Artillery',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
exports.devast = {
PARENT: [exports.genericTank],
//"It wields godly power, but holds a curse with it"
  LABEL: "Devastator",
 BODY: {
  FOV: 1.5,
},
SHAPE: 0,
GUNS: [
{
POSITION: [18,8,2,0,0,0.05,0],
},
{
POSITION: [12.462,10.56,-2,0,0,0.299,0],
},
{
POSITION: [5.356,11.2,1,12.462,0,0.162,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[160, 15, 0.001, 1, 1, 0.75, 1, 7.2, 1, 5, 1, 0.00001, 1]]),
TYPE: exports.redistbullet
}, },
], };
            exports.mortar = {
                PARENT: [exports.genericTank],
                LABEL: 'Mortar',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     3,      1,      0,     -8,     -7,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  13,     3,      1,      0,      8,      7,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,     -6,     -7,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,      6,      7,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                            TYPE: exports.bullet,
                            LABEL: 'Heavy',
                        }, },
                ],
            };
            exports.skimmer = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Skimmer',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.missile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
            exports.spread = {
                PARENT: [exports.genericTank],
                LABEL: 'Spreadshot',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     4,      1,      0,    -0.8,    -75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,    -1.0,    -60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,    -1.6,    -45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,    -2.4,    -30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,    -3.0,    -15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {                    
                    POSITION: [  13,     4,      1,      0,     0.8,     75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,     1.0,     60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,     1.6,     45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,     2.4,     30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,     3.0,     15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  13,    10,     1.3,     8,      0,      0,      0,     ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spreadmain, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Pounder',
                        }, },
                ],
            };

    exports.flank = {
        PARENT: [exports.genericTank],
        LABEL: 'Flank Guard',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
        exports.hexa = {
            PARENT: [exports.genericTank],
            LABEL: 'Hexa Tank',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.octo = {
                PARENT: [exports.genericTank],
                LABEL: 'Octo Tank',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      45,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     135,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     225,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     315,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.heptatrap = (() => {
                let a = 360/7, d = 1/7;
                return {
                    PARENT: [exports.genericTank],
                    LABEL: 'Hepta-Trapper',
                    DANGER: 7,
                    BODY: {
                        SPEED: base.SPEED * 0.8,
                    },
                    STAT_NAMES: statnames.trap,
                    HAS_NO_RECOIL: true,
                    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                        POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,      a,     4*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      a,     4*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     2*a,    1*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     2*a,    1*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     3*a,    5*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     3*a,    5*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     4*a,    2*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     4*a,    2*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     5*a,    6*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     5*a,    6*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     6*a,    3*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     6*a,    3*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, },
                    ],
                };
            })();
            exports.hexatrap = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Hexa-Trapper',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                STAT_NAMES: statnames.trap,
                HAS_NO_RECOIL: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     60,     0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     60,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     120,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     180,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     240,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     300,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     300,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            }, 'Hexa-Trapper');

        exports.tri = {
            PARENT: [exports.genericTank],
            LABEL: 'Tri-Angle',
            BODY: {
                HEALTH: base.HEALTH * 0.8,
                SHIELD: base.SHIELD * 0.8,
                DENSITY: base.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        }; 
            exports.booster = {
                PARENT: [exports.genericTank],
                LABEL: 'Booster',
                BODY: {
                    HEALTH: base.HEALTH * 0.6,
                    SHIELD: base.SHIELD * 0.6,
                    DENSITY: base.DENSITY * 0.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.muchmorerecoil]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
exports.motorcycle = {
                PARENT: [exports.genericTank],
                LABEL: 'Motorcycle',
                BODY: {
                    HEALTH: base.HEALTH * 0.6,
                    SHIELD: base.SHIELD * 0.6,
                    DENSITY: base.DENSITY * 0.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.muchmorerecoil]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: [exports.homingbullet,{INDEPENDENT: true}],
                            LABEL: gunCalcNames.thruster,
                            COLOR: 12,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: [exports.homingbullet,{INDEPENDENT: true}],
                            LABEL: gunCalcNames.thruster,
                            COLOR: 12,
                        }, },
                ],
            };
            exports.fighter = {
                PARENT: [exports.genericTank],
                LABEL: 'Fighter',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      1,     -90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
exports.fighter_h = {
                PARENT: [exports.genericTank],
                LABEL: 'Fighter-H',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: [exports.homingbullet,{INDEPENDENT: true}],
                            COLOR: 12,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      1,     -90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: [exports.homingbullet,{INDEPENDENT: true}],
                            COLOR: 12,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
exports.boxer = {
PARENT: [exports.fighter],
LABEL: "Boxer",
SHAPE: 0,
GUNS: [
{
POSITION: [19.385,9.6,1,0,-4.985,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
TYPE: exports.bullet
}, },
{
POSITION: [19.385,9.6,1,0,4.985,0,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
TYPE: exports.bullet
}, },
{
POSITION: [13.846,9.6,1,0,0,270,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
TYPE: exports.bullet
}, },
{
POSITION: [13.846,9.6,1,0,0,90,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
TYPE: exports.bullet
}, },
{
POSITION: [13.846,9.6,1,0,0,150,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
TYPE: exports.bullet
}, },
{
POSITION: [13.846,9.6,1,0,0,210,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
TYPE: exports.bullet
}, },
], };
exports.racecar = {
    PARENT: [exports.genericTank],
    LABEL: 'Race Car',
    SHAPE: 0,
    GUNS: [{
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                   g.basic, g.flank, g.tri, g.trifront
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 210, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic, g.flank, g.tri, g.trifront
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 120, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                   g.basic, g.flank, g.tri, g.trifront
                ]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [18, 8, 2, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic, g.morerecoil, g.doublereload
                ]),
                TYPE: exports.bullet
            },
        },
    ],
};
            exports.brutalizer = {
                PARENT: [exports.genericTank],
                LABEL: 'Surfer',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: exports.autoswarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,         
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,      1,     -90,     9,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: exports.autoswarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,     
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.bomber = {
                PARENT: [exports.genericTank],
                LABEL: 'Bomber',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     130,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     230,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.morerecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };    
            exports.autotri = makeAuto(exports.tri);   
            exports.autotri.BODY = {
                SPEED: base.SPEED,
            };   
            exports.falcon = {
                PARENT: [exports.genericTank],
                LABEL: 'Falcon',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Assassin',
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [   5,    8.5,   -1.6,     8,      0,      0,      0,   ], 
                        }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
exports.rainbowauto = {
  LABEL: '',
  COLOR: 36,
  CRAVES_ATTENTION: false
};  
exports.rainbowbullet ={
    PARENT: [exports.bullet],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  20,     0,      0,      0,     190, 1], 
                    TYPE: exports.rainbowauto,
                        },
            ],
        };
exports.rainbowflameauto = {
  PARENT:[exports.auto3gun],
  LABEL: '',
  SHAPE: [[0,-0.5],[1.5,-0.5],[1.43,-0.4],[1.72,-0.29],[1.8,-0.12],[2,-0.005],[1.8,0.12],[1.72,0.29],[1.42,0.4],[1.5,0.5],[0,0.5]],
  GUNS: [{
  POSITION:[16, 6, 0, 0, 0, 0, 0],
    PROPERTIES:{
      SHOOT_SETTINGS: combineStats([g.flame]),
      TYPE: exports.rainbowbullet,
  }, },
        ],
  TURRETS:[{
  POSITION:[20, 0, 0, 0, 0, 1],
  TYPE: exports.genericTank,
},
  ],
};    
   exports.ttr3 = {
PARENT: [exports.genericTank],
//Better Flamethrower model
LABEL: "Taste the Rainbow 3.0",
SIZE: 12,
SHAPE: 0,
TURRETS: [{
POSITION:[20, 0, 0, 0, 1, 0],
TYPE: exports.rainbowflameauto,
},
      ], 
};
        exports.ttr2 = {
            PARENT: [exports.genericTank],
            LABEL: 'Taste the Rainbow 2.0',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.rainbowbullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.rainbowbullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.rainbowbullet,
                    }, },
            ],
        };
exports.ttr1 = {
        PARENT: [exports.genericTank],
        LABEL: 'Taste the Rainbow',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.rainbowbullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.rainbowbullet,
            }, }, 
        ],
    };
   exports.ttr3auto = {
PARENT: [exports.auto3gun],
//Better Flamethrower model
LABEL: "Taste the Rainbow 3.0",
TURRETS: [{
POSITION:[20, 0, 0, 0, 1, 0],
TYPE: exports.rainbowflameauto,
},
      ], 
 };
        exports.ttr2auto = {
            PARENT: [exports.auto3gun],
            LABEL: 'Taste the Rainbow 2.0',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.rainbowbullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.rainbowbullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.rainbowbullet,
                    }, },
            ],
        };
exports.ttr1auto = {
        PARENT: [exports.auto3gun],
        LABEL: 'Taste the Rainbow',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.rainbowbullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.rainbowbullet,
            }, }, 
        ],
    };
        exports.auto2 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Auto-2',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     180,    190, 0], 
                    TYPE: exports.auto3gun,
                        },
            ],
        };
exports.home2 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Homing-2',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.home3gun,
                        }, {
                POSITION: [  11,     8,      0,     180,    190, 0], 
                    TYPE: exports.home3gun,
                        },
            ],
        };
        exports.auto3 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Auto-3',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.auto3gun,
                        },
            ],
        };
        exports.home3 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Homing-3',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.home3gun,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.home3gun,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.home3gun,
                        },
            ],
        };
exports.captaincrunch = { 
            PARENT: [exports.genericTank],
            LABEL: 'Captain Crunch',
  BRODCAST_MESSAGE: 'S.S. Taste the rainbow has sunk...' , 
  SIZE: 25,          
  DANGER: 12,
        COLOR: 14,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.ttr3auto,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.ttr2auto,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.ttr1auto,
                        },
            ],
        };
            exports.auto5 = {
                PARENT: [exports.genericTank],
                LABEL: 'Auto-5',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     8,      0,      0,     190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,      72,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     144,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     216,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     288,    190, 0], 
                        TYPE: exports.auto5gun,
                            },
                ],
            };
                      exports.home5 = {
                PARENT: [exports.genericTank],
                LABEL: 'Homing-5',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     8,      0,      0,     190, 0], 
                        TYPE: exports.home5gun,
                            }, {
                    POSITION: [  11,     8,      0,      72,    190, 0], 
                        TYPE: exports.home5gun,
                            }, {
                    POSITION: [  11,     8,      0,     144,    190, 0], 
                        TYPE: exports.home5gun,
                            }, {
                    POSITION: [  11,     8,      0,     216,    190, 0], 
                        TYPE: exports.home5gun,
                            }, {
                    POSITION: [  11,     8,      0,     288,    190, 0], 
                        TYPE: exports.home5gun,
                            },
                ],
            };
            exports.heavy3 = {
                BODY: {
                    SPEED: base.SPEED * 0.95,
                },
                PARENT: [exports.genericTank],
                LABEL: 'Mega-3',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  14,     8,      0,      0,     190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     120,    190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     240,    190, 0], 
                        TYPE: exports.heavy3gun,
                            },
                ],
            };
            exports.heavyh3 = {
                BODY: {
                    SPEED: base.SPEED * 0.95,
                },
                PARENT: [exports.genericTank],
                LABEL: 'Mega-H-3',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  14,     8,      0,      0,     190, 0], 
                        TYPE: exports.heavyh3gun,
                            }, {
                    POSITION: [  14,     8,      0,     120,    190, 0], 
                        TYPE: exports.heavyh3gun,
                            }, {
                    POSITION: [  14,     8,      0,     240,    190, 0], 
                        TYPE: exports.heavyh3gun,
                            },
                ],
            };
           exports.heavy5 = {
                BODY: {
                    SPEED: base.SPEED * 0.95,
                },
                PARENT: [exports.genericTank],
                LABEL: 'Mega-5',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  14,     8,      0,      0,     190, 0], 
                        TYPE: exports.heavy5gun,
                            }, {
                    POSITION: [  14,     8,      0,      72,    190, 0], 
                        TYPE: exports.heavy5gun,
                            }, {
                    POSITION: [  14,     8,      0,     144,    190, 0], 
                        TYPE: exports.heavy5gun,
                            }, {
                    POSITION: [  14,     8,      0,     216,    190, 0], 
                        TYPE: exports.heavy5gun,
                            }, {
                    POSITION: [  14,     8,      0,     288,    190, 0], 
                        TYPE: exports.heavy5gun,
                            },
                ],
            };
exports.heavyh5 = {
                BODY: {
                    SPEED: base.SPEED * 0.95,
                },
                PARENT: [exports.genericTank],
                LABEL: 'Mega-H-5',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  14,     8,      0,      0,     190, 0], 
                        TYPE: exports.heavyh5gun,
                            }, {
                    POSITION: [  14,     8,      0,      72,    190, 0], 
                        TYPE: exports.heavyh5gun,
                            }, {
                    POSITION: [  14,     8,      0,     144,    190, 0], 
                        TYPE: exports.heavyh5gun,
                            }, {
                    POSITION: [  14,     8,      0,     216,    190, 0], 
                        TYPE: exports.heavyh5gun,
                            }, {
                    POSITION: [  14,     8,      0,     288,    190, 0], 
                        TYPE: exports.heavyh5gun,
                            },
                ],
            };
            exports.tritrap = {
                LABEL: 'Architect',
                BODY: {
                    SPEED: base.SPEED * 1.1,
                },
                PARENT: [exports.genericTank],
                DANGER: 6,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  12,     8,      0,      0,     190, 0], 
                        TYPE: exports.tritrapgun,
                            }, {
                    POSITION: [  12,     8,      0,     120,    190, 0], 
                        TYPE: exports.tritrapgun,
                            }, {
                    POSITION: [  12,     8,      0,     240,    190, 0], 
                        TYPE: exports.tritrapgun,
                            },
                ],
            };
            exports.sniper3 = { 
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Assassin-3',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.25,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     8,      0,      0,     170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     120,    170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     240,    170, 0], 
                        TYPE: exports.sniper3gun,
                            },
                ],
            };
            exports.auto4 = { 
                PARENT: [exports.genericTank],
                DANGER: 5,
                LABEL: 'Auto-4',
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     6,      0,      45,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     135,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     225,    160, 0],
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     315,    160, 0],
                        TYPE: exports.auto4gun,
                            },
                ],
            };
            exports.pomermini = { 
                PARENT: [exports.genericTank],
                DANGER: 5,
                LABEL: 'Mini Pomeranionitation',
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     6,      0,      45,    160, 0], 
                        TYPE: exports.pelter2,
                            }, {
                    POSITION: [  13,     6,      0,     135,    160, 0], 
                        TYPE: exports.pelter2,
                            }, {
                    POSITION: [  13,     6,      0,     225,    160, 0],
                        TYPE: exports.pelter2,
                            }, {
                    POSITION: [  13,     6,      0,     315,    160, 0],
                        TYPE: exports.pelter2,
                               }, {
                    POSITION: [  13,     0,      0,     0,    160, 1],
                        TYPE: [exports.pumba2,{INDEPENDENT: true,}]
                            },
                ],
            };
            exports.pomermini2 = { 
                PARENT: [exports.drone],
              SHAPE: 0,  
              DANGER: 5,
              BODY: {
                HEALTH: 100,
                SPEED: 5,
                RANGE: 30,
                FOV: 2.7
              },
              FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     6,      0,      45,    160, 0], 
                        TYPE: exports.pelter2,
                            }, {
                    POSITION: [  13,     6,      0,     135,    160, 0], 
                        TYPE: exports.pelter2,
                            }, {
                    POSITION: [  13,     6,      0,     225,    160, 0],
                        TYPE: exports.pelter2,
                            }, {
                    POSITION: [  13,     6,      0,     315,    160, 0],
                        TYPE: exports.pelter2,
                               }, {
                    POSITION: [  13,     0,      0,     90,    160, 1],
                        TYPE: [exports.pumba2,{INDEPENDENT: true,}]
                            },
                ],
            };

                        exports.autotank = { 
                PARENT: [exports.genericTank],
                DANGER: 5,
                LABEL: 'Auto Tank',
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     6,      0,      45,    160, 0], 
                        TYPE: exports.auto3gun,
                            }, {
                    POSITION: [  13,     6,      0,     135,    160, 0], 
                        TYPE: exports.auto3gun,
                            }, {
                    POSITION: [  13,     6,      0,     225,    160, 0],
                        TYPE: exports.auto3gun,
                            }, {
                    POSITION: [  13,     6,      0,     315,    160, 0],
                        TYPE: exports.auto3gun,
                            },
                ],
            };
        exports.flanktrap = {
            PARENT: [exports.genericTank],
            LABEL: 'Trap Guard',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };
            exports.guntrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Gunner Trapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    FOV: base.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [  13,    11,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    11,     1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.halfrecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
exports.greything = {
  PARENT: [exports.genericTank],
    COLOR: 6,
    SHAPE: 0,
};
exports.pinkthing = {
  PARENT: [exports.genericTank],
    COLOR: 5,
    SHAPE: 3,
};
exports.mkIpet = {
PARENT: [exports.genericTank],
LABEL: "MK-1 Pet",
BODY:{
  RESIST: 9999999999999999999999999999999999999999999999999,
  HEALTH: 99999999999999999999999,
    REGEN: 999999999999999999999999999999999999999999999999,
    SPEED: 7,
    DAMAGE: 0,
    STEALTH: 1,
},
        POISON_IMMUNE: true,
    ACCEPTS_SCORE: false,
    CAN_BE_ON_LEADERBOARD: false,
  SIZE: 23,
  COLOR: 3,
SHAPE: 4,
    CONTROLLERS: ['hangOutNearMaster', 'mapTargetToGoal'],
    INDEPENDENT: true,
GUNS: [
{
POSITION: [16,4.8,1,0,2.769,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.single,g.fakethingy]),
TYPE: exports.bullet,
  LABEL: 'Double',
}, },
{
POSITION: [16,4.8,1,0,-2.769,0,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.single,g.fakethingy]),
TYPE: exports.bullet,
  LABEL: 'Double',
}, },
{
POSITION: [12.462,11.2,-1.5,0,0,0,0],
},
],  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                 POSITION: [ 10,     0,      0,     180,    190, 1, ], 
                        TYPE: exports.sniper3gun,
                            },
                ],
            };
exports.acpet = {
 PARENT:[exports.genericTank],
    LABEL: 'Arena Closer Pet',
    SHAPE: 0,
    BODY:{
  RESIST: 9999999999999999999999999999999999999999999999999,
  HEALTH: 99999999999999999999999,
  REGEN: 9999999999999999999999999999999999999999999999999999999,
    SPEED: 7,
        DAMAGE: 0,
        STEALTH: 1
},
    POISON_IMMUNE: true,
    ACCEPTS_SCORE: false,
    CAN_BE_ON_LEADERBOARD: false,
  SIZE: 23,
  COLOR: 3,
    CONTROLLERS: ['hangOutNearMaster', 'mapTargetToGoal'],
    INDEPENDENT: true,
GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     8.5,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fakethingy]),
            TYPE: exports.bullet,
        }, }, 
    ],
    /*TURRETS:[{
    POSITION: [20, 0, 0, 0, 0, 1],
        TYPE: [exports.greything,{COLOR: 3}]
    },
            ],*/
};
            exports.pcpet = {
                PARENT: [exports.acpet],
                LABEL: 'Penta Closer',
                COLOR: 3,
                CAN_BE_ON_LEADERBOARD: false,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  12,     8,      1,      0,     -3,    -30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic,g.op]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,     8,      1,      0,      3,     30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic,g.op]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,     8,      1,      0,     -2,    -15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic,g.op]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,     8,      1,      0,      2,     15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic,g.op]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic,g.op]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
exports.fallenbpet = {
    PARENT: [exports.booster],
    TYPE: 'drone',
    LABEL: 'Fallen Booster Pet',
        POISON_IMMUNE: true,
    BODY: {
        HEALTH: 99999999999999999999999999999999999999,
        RESIST: 99999999999999999999999999999999999999,
        REGEN: 99999999999999999999999999999999999999,
        DAMAGE: 0,
        STEALTH: 99999999999999999999999999999999999999,
    },
    CONTROLLERS: ['hangOutNearMaster', 'mapTargetToGoal'],
    INDEPENDENT: true,
    CAN_BE_ON_LEADERBOARD: false,
    ACCEPTS_SCORE: false,
    DANGER: 0,
    TURRETS:[{
    POSITION: [20, 0, 0, 0, 0, 1],
        TYPE: exports.greything,
    },
            ],
};
exports.fallenopet = {
    PARENT: [exports.overlord],
    TYPE: 'drone',
    LABEL: 'Fallen Overlord Pet',
    BODY: {
        HEALTH: 99999999999999999999999999999999999999,
        RESIST: 99999999999999999999999999999999999999,
        REGEN: 99999999999999999999999999999999999999,
        DAMAGE: 0,
        STEALTH: 99999999999999999999999999999999999999,
    },
    CONTROLLERS: ['hangOutNearMaster', 'mapTargetToGoal'],
    INDEPENDENT: true,
    CAN_BE_ON_LEADERBOARD: false,
    ACCEPTS_SCORE: false,
    DANGER: 0,
    MAX_CHILDREN: 1,
        POISON_IMMUNE: true,
  FACING_TYPE: 'autospin',
    TURRETS:[{
    POSITION: [20, 0, 0, 0, 0, 1],
        TYPE: exports.greything,
    },
            ],
};
exports.elite_testbedpet = { 
            PARENT: [exports.mkIpet],
          FACING_TYPE: 'autospin',  
          LABEL: 'Elite TESTBED Pet',
         SHAPE: 3,
        POISON_IMMUNE: true,
    COLOR: 5,
    GUNS: [],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     6,      0,     180,     190, 0], 
                    TYPE: [exports.testbed, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,      60,    190, 0], 
                    TYPE: [exports.testbed, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,     -60,    190, 0], 
                    TYPE: [exports.testbed, { COLOR: 5, }],
                       },/* {
                POSITION: [  20,     0,      0,       0,    360,   1, ],  
                    TYPE: exports.pinkthing,
                        }, */{
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.minitrap, { COLOR: 36, }]
                        },
            ],
        };
            exports.bushwhack = {
                PARENT: [exports.genericTank],
                LABEL: 'Snipe Guard',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,    8.5,     1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    8.5,    1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
exports.testbedpet = {
            PARENT: [exports.genericTank],
            LABEL: 'TESTBED',
     //CONTROLLERS: ['nearestDifferentMaster'],          
  RESET_UPGRADES: true,
            //SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
            //LEVEL: 45,
            BODY: { // def
                //SHIELD: 1000,
                //REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: 0,
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, },  { 
                POSITION: [  0.5,    7,    1,     0,      0,      180,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.pet]),
                    TYPE: [exports.elite_testbedpet,{COLOR_OVERRIDE: 5}],
                    MAX_CHILDREN: 1,
                    AUTOFIRE: true,
                }, }, { 
                POSITION: [  0.5,    7,    1,     0,      0,      180,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.pet]),
                    TYPE: [exports.pcpet,{COLOR_OVERRIDE: 3}],
                    MAX_CHILDREN: 1,
                    AUTOFIRE: true,
                }, }, 
            ],
        };
exports.fallenpetpack = {
  PARENT: [exports.basic],
 //LABEL: 'Basic',
    GUNS: [{
  POSITION: [18, 8, 1, 0, 0, 0, 0],
  PROPERTIES: {
    SHOOT_SETTINGS: combineStats([g.basic]),
  TYPE: exports.bullet
  }, }, {
    POSITION: [1, 10, 1, 0, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.pet]),
          TYPE: exports.fallenbpet,
            AUTOFIRE: true,
              MAX_CHILDREN: 1,
      }, }, {
    POSITION: [1, 10, 1, 0, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.pet]),
          TYPE: exports.fallenopet,
            AUTOFIRE: true,
              MAX_CHILDREN: 1,
      }, },
      ],
};
// UPGRADE PATHS
exports.testbed.UPGRADES_TIER_1 = [
 exports.betatanks,
  exports.bosses,
  exports.xkx,
  exports.removed,
  exports.misc
];
exports.betatanks.UPGRADES_TIER_1 = [
exports.testbed
];
exports.bosses.UPGRADES_TIER_1 = [
exports.testbed,
  exports.bosses2
];
exports.bosses2.UPGRADES_TIER_1 = [
exports.bosses
];
exports.xkx.UPGRADES_TIER_1 = [
exports.testbed
];
exports.removed.UPGRADES_TIER_1 = [
  exports.testbed
];
exports.misc.UPGRADES_TIER_1 = [
  exports.testbed
];
exports.basic.UPGRADES_TIER_1 = [exports.twin, exports.sniper, exports.pound, exports.machine, exports.flank, exports.director, exports.lancer, exports.pelter, exports.auto2];
exports.pelter.UPGRADES_TIER_1 = [exports.borer, exports.sailor, exports.nailgun, exports.gunner, exports.bpelter];
exports.sailor.UPGRADES_TIER_2 = [exports.captain, exports.seadog];
exports.nailgun.UPGRADES_TIER_3 = [exports.pailergun];
exports.borer.UPGRADES_TIER_2 = [exports.minifridge];

exports.bpelter.UPGRADES_TIER_2 = [exports.tpelter, exports.pumba];
exports.pumba.UPGRADES_TIER_3 = [exports.dmist, exports.pomermini];
exports.tpelter.UPGRADES_TIER_3 = [exports.dmist];
exports.lancer.UPGRADES_TIER_1 = [exports.flail, exports.goldlancer, exports.afajax];        
exports.basic.UPGRADES_TIER_3 = [exports.single];
exports.afajax.UPGRADES_TIER_2 = [exports.afajaxB, exports.saboton];
exports.afajaxB.UPGRADES_TIER_2 = [exports.saboton];
exports.saboton.UPGRADES_TIER_2 = [exports.sabotonB];
exports.sabotonB.UPGRADES_TIER_2 = [exports.saboton];
    exports.basic.UPGRADES_TIER_2 = [exports.smash];
        exports.smash.UPGRADES_TIER_3 = [exports.megasmash, exports.spike, exports.autosmash];

exports.pound.UPGRADES_TIER_2 = [exports.builder, exports.heavytwin, exports.destroy, exports.artillery, exports.pistol, exports.blaster];
exports.blaster.UPGRADES_TIER_3 = [exports.flarestick, exports.flamer];
// exports.miniswarmer.UPGRADES_TIER_2 = [exports.hiveshooter];

    exports.twin.UPGRADES_TIER_2 = [exports.double, exports.dual, exports.bent, exports.gunner, exports.hexa];
        exports.twin.UPGRADES_TIER_3 = [exports.triple];
        exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.split, exports.autodouble, exports.bentdouble];
        exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.spread, exports.benthybrid, exports.bentdouble, exports.triple];
        exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.nailgun, exports.auto4,exports.machinegunner, exports.sn87_mx];
        //exports.hometwin.UPGRADES_TIER_4 = [exports.fighterh, exports.motorcycle];

    exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.borer, exports.hunter, exports.mini, exports.builder];
        exports.sniper.UPGRADES_TIER_3 = [exports.bushwhack];
        exports.assassin.UPGRADES_TIER_3 = [exports.ranger, exports.falcon, exports.railgun, exports.autoass, exports.marksman, exports.sniper3, exports.stalker];
        exports.hunter.UPGRADES_TIER_3 = [exports.preda, exports.poach, exports.sidewind, exports.marksman];
        exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autobuilder, exports.engineer, exports.boomer, exports.tritrap];

    exports.machine.UPGRADES_TIER_2 = [exports.destroy, exports.artillery, exports.mini, exports.gunner, exports.blaster];
        exports.machine.UPGRADES_TIER_3 = [exports.spray];
        exports.destroy.UPGRADES_TIER_3 = [exports.anni, exports.hybrid, exports.construct, exports.shotgun2, exports.hiveshooter];
        exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.devast, exports.spread, exports.skimmer];
        exports.mini.UPGRADES_TIER_3 = [exports.stream, exports.nailgun, exports.hybridmini, exports.laser];

exports.laser.UPGRADES_TIER_4 = [exports.lightsaber];

    exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.tpelter, exports.auto3, exports.flanktrap];
        exports.flank.UPGRADES_TIER_3 = [exports.tritrap];
        exports.tri.UPGRADES_TIER_3 = [exports.fighter, exports.booster, exports.racecar, exports.brutalizer, exports.falcon, exports.bomber, exports.autotri];
        exports.hexa.UPGRADES_TIER_3 = [exports.octo, exports.hexatrap];
        exports.flanktrap.UPGRADES_TIER_3 = [exports.bushwhack, exports.guntrap, exports.fortress, exports.bomber];
        exports.fighter.UPGRADES_TIER_4 = [exports.goldlancer, exports.fighter_h];
        exports.bomber.UPGRADES_TIER_4 = [exports.frag4];
        exports.frag4.UPGRADES_TIER_5 = [exports.frag8];
        exports.booster.UPGRADES_TIER_4 = [exports.motorcycle];
    
    exports.auto2.UPGRADES_TIER_1 = [exports.auto3, exports.home2];
        exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3, exports.autotank, exports.auto4, exports.home3];
        exports.auto5.UPGRADES_TIER_4 = [exports.home5, exports.heavy5];
        exports.heavy3.UPGRADES_TIER_4 = [exports.heavyh3, exports.heavy5];
        exports.heavy5.UPGRADES_TIER_5 = [exports.heavyh5];
        exports.home2.UPGRADES_TIER_2 = [exports.home3];
        exports.home3.UPGRADES_TIER_4 = [exports.home5, exports.heavyh3];
        exports.home5.UPGRADES_TIER_5 = [exports.heavyh5];

    exports.director.UPGRADES_TIER_2 = [exports.overseer, exports.cruiser, exports.underseer, exports.lilfact];
        exports.lilfact.UPGRADES_TIER_3 = [exports.factory];
        exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.overtrap, exports.overgunner, exports.master];  
        exports.underseer.UPGRADES_TIER_3 = [exports.necromancer, exports.maleficitor];
        exports.cruiser.UPGRADES_TIER_3 = [exports.autocruiser, exports.carrier, exports.battleship, exports.fortress];

exports.testbedpet.UPGRADES_TIER_1 = [exports.testbed];
    /*exports.smash.UPGRADES_TIER_3 = [exports.megasmash, exports.spike, exports.autosmash];
            
    exports.twin.UPGRADES_TIER_2 = [exports.double, exports.bent, exports.triple, exports.hexa];
        exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.autodouble];
        exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.benthybrid];
        exports.triple.UPGRADES_TIER_3 = [exports.quint];

    exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.overseer, exports.hunter, exports.builder];
        exports.assassin.UPGRADES_TIER_3 = [exports.ranger];
        exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.battleship
            , exports.overtrap, exports.necromancer, exports.factory, exports.fortress];
        exports.hunter.UPGRADES_TIER_3 = [exports.preda, exports.poach];
        exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autobuilder];
        
    exports.machine.UPGRADES_TIER_2 = [exports.destroy, exports.gunner, exports.artillery];
        exports.destroy.UPGRADES_TIER_3 = [exports.anni, exports.hybrid];
        exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.mortar, exports.stream];
        exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.spread, exports.skimmer];
        exports.machine.UPGRADES_TIER_3 = [exports.spray];

    exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.auto3, exports.flanktrap];
        exports.hexa.UPGRADES_TIER_3 = [exports.octo];
        exports.tri.UPGRADES_TIER_3 = [exports.booster, exports.fighter, exports.bomber, exports.autotri];
        exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3];
        exports.flanktrap.UPGRADES_TIER_3 = [exports.guntrap, exports.fortress, exports.bomber];*/

// NPCS:
exports.crasher = {
    LABEL: 'Crasher',
  TYPE: 'crasher',  
  COLOR: 5,
    SHAPE: 3,
    SIZE: 5,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 5,
        ACCEL: 0.01,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};



exports.crasher2 = {
    LABEL: 'Crasher',
  PARENT: [exports.genericTank],  
  COLOR: 5,
    SHAPE: 3,
    SIZE: 5,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 5,
        ACCEL: 0.01,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.longboy = {
  PARENT: [exports.crasher],
  TYPE: 'crasher',
  LABEL: 'Long Boy',
  SIZE: 10,
  BODY: {
    SPEED: 10,
    DAMAGE: 30,
  },
SHAPE: [[-1,-0.3],[1.5,0],[-1,0.3]],
};
exports.longboy2 = {
  PARENT: [exports.crasher2],
  TYPE: 'crasher',
  LABEL: 'Long Boy',
  SIZE: 10,
  BODY: {
    SPEED: 10,
    DAMAGE: 30,
  },
SHAPE: [[-1,-0.3],[1.5,0],[-1.0,0.3]],
};
exports.glass1 = {
PARENT: [exports.genericTank],
  COLOR: 18,
    SHAPE: 3,
};
exports.glasscrasher = {
  PARENT: [exports.crasher],
  TYPE: 'crasher',
  LABEL: 'Glass Crasher',
  BODY: {
  DAMAGE: 30,
},
 SIZE: 10,
  COLOR: 9,
TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 360, 1, ],
        TYPE: [exports.glass1]
}, ],
};
exports.glasscrasher2 = {
  PARENT: [exports.crasher2],
  TYPE: 'crasher',
  LABEL: 'Glass Crasher',
  BODY: {
  DAMAGE: 30,
},
 SIZE: 10,
  COLOR: 9,
TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 360, 1, ],
        TYPE: [exports.glass1]
}, ],
};
exports.reindecrashum = {
  PARENT: [exports.crasher],
  LABEL: 'Reindecrashum',
  COLOR: 7,
    SHAPE: [[0.8,-0.625],[0.9,-0.445],[0.985,-0.2],[1,0],[0.97,0.175],[0.92,0.4],[0.8,0.6],[0.385,0.935],[-0.8,0.7],[-0.415,0.4],[-1,0],[-0.4,-0.4],[-0.795,-0.8],[0.4,-0.925]],
    SIZE: 10,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 15,
        ACCEL: 5,
        HEALTH: 1000,
        DAMAGE: 100,
        PENETRATION: 12,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 15,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};


exports.sentry = {
    PARENT: [exports.genericTank],
  TYPE: 'sentry',  
  LABEL: 'Sentry',
    DANGER: 3,
    COLOR: 5,
    SHAPE: 3,
    SIZE: 10,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 1500,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        FOV: 0.5,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE * 2,
        SPEED: base.SPEED * 0.5,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.trapTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.5,
    },
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster'], 
    COLOR: 16,
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,    14,      1,      0,      0,      0,      0,   ],
            }, {
        POSITION: [   4,    14,     1.8,    16,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowpower, g.fast, g.halfreload]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
    ],
};
exports.sentrySwarm = {
    PARENT: [exports.sentry],
    LABEL: 'Guardian lite',    
  DANGER: 3,
    GUNS: [{
        POSITION: [    7,    14,    0.6,     7,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
};

exports.sentryGun = makeAuto(exports.sentry, 'Sentry', { type: exports.heavy3gun, size: 12, });
exports.sentryTrap = makeAuto(exports.sentry, 'Sentry', { type: exports.trapTurret, size: 12, });

exports.miniboss2 = {
    PARENT: [exports.genericTank],
    //TYPE: 'miniboss',
    //Controllable boss
  DANGER: 6,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    //CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    //FACING_TYPE: 'autospin',
    //HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A visitor has left!',
};
    exports.crasherSpawner = {
        PARENT: [exports.genericTank],
        LABEL: 'Spawned',  
        STAT_NAMES: statnames.drone,
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 5, 
        INDEPENDENT: true, 
        AI: { chase: true, },
        MAX_CHILDREN: 4,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak]),
                    TYPE: [exports.drone, { LABEL: 'Crasher', VARIES_IN_SIZE: true, DRAW_HEALTH: true }],
                    SYNCS_SKILLS: true,
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
exports.miniboss = {
    PARENT: [exports.genericTank],
    DANGER: 6,
  TYPE: 'miniboss',  
  SKILL: skillSet({
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    //FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A visitor has left!',
};
    exports.crasherSpawner = {
        PARENT: [exports.genericTank],
        LABEL: 'Spawned',  
        STAT_NAMES: statnames.drone,
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 5, 
        INDEPENDENT: true, 
        AI: { chase: true, },
        MAX_CHILDREN: 4,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak]),
                    TYPE: [exports.drone, { LABEL: 'Crasher', VARIES_IN_SIZE: true, DRAW_HEALTH: true }],
                    SYNCS_SKILLS: true,
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
exports.reindecrashum2 = {
  PARENT: [exports.miniboss],
  LABEL: 'Arena Cleaner',
  CAN_BE_ON_LEADERBOARD: false,
  ACCEPTS_SCORE: false,
  COLOR: 3,
    SHAPE: [[0.8,-0.625],[0.9,-0.445],[0.985,-0.2],[1,0],[0.97,0.175],[0.92,0.4],[0.8,0.6],[0.385,0.935],[-0.8,0.7],[-0.415,0.4],[-1,0],[-0.4,-0.4],[-0.795,-0.8],[0.4,-0.925]],
    SIZE: 30,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 15,
        ACCEL: 5,
        HEALTH: 9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
        DAMAGE: 9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
        PENETRATION: 9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
      FOV: 2.5,
      REGEN: 9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
GUNS: [
{
POSITION: [18,8,1,0,0,359.931,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[5, 0, 0.001, 1, 1, 99999999999, 1, 9, 1, 2.5, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
], };
exports.gsfact = {
  PARENT: [exports.genericTank],
  LABEL: "Factory",
  DANGER: 7,
  STAT_NAMES: statnames.drone,
  BODY: {
    SPEED: base.SPEED * 0.8,
    FOV: 1.1
  },
  MAX_CHILDREN: 4,
  GUNS: [
    {
      /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [5, 11, 1, 10.5, 0, 0, 0]
    },
    {
      POSITION: [2, 14, 1, 15.5, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory]),
        TYPE: exports.minion,
        STAT_CALCULATOR: gunCalcNames.drone,
        AUTOFIRE: true,
        SYNCS_SKILLS: true
      }
    },
    {
      POSITION: [4, 14, 1, 8, 0, 0, 0]
    }
  ]
};
exports.GS_1 = {
  PARENT: [exports.miniboss],
  DANGER: 5,
  SIZE: 20,
  VALUE: 60000,
  COLOR: 1,
  SHAPE:
    "m -0.71327555,-0.37159273 0.38002383,0.005846 -0.005846,-0.66650337 -10e-9,-0.3917169 1.54348153,0.011693 v 0.391717 0.19878164 l -0.91205728,0.005847 0.0350791,1.6721045 0.88867128,0.005847 0.00585,0.54372596 -1.54348507,0.011693 V 0.32998974 H -1.0757598 l 3.5e-6,-0.69573598 z",
  BODY: {
    FOV: 1.05,
    SHIELD: base.SHIELD * 1.3,
    DAMAGE: base.DAMAGE * 1.2,
    RELOAD: base.RELOAD * 0.7
  },
  LABEL: "GS-1",
  CONTROLLERS: ["nearestDifferentMaster", "mapAltToFire"],
  FACING_TYPE: "toTarget",
  GUNS: [ {
      POSITION: [8, 2, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.lance]),
        TYPE: exports.bullet
      } }, {
      POSITION: [13, 10, 0.001, 0, 0, 0, 0]
    }, {
      POSITION: [8, 2, 1, 6, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.lance]),
        TYPE: exports.bullet
      } }, {
      POSITION: [13, 6.5, 0.001, 6, 0, 180, 0]
    }
  ],
  TURRETS: [ { /*********  SIZE     X       Y     ANGLE    ARC  LAYER */
      POSITION: [3, 9, -11, 0, 360, 1],
      TYPE: [exports.basic]
    }, {
      POSITION: [3, 9, 11, 0, 360, 1],
      TYPE: [exports.basic]
    }, {
      POSITION: [4, 12, -11, 0, 360, 0],
      TYPE: [exports.pound]
    }, {
      POSITION: [4, 12, 11, 0, 360, 0],
      TYPE: [exports.pound]
    }, {
      POSITION: [4, -4, -4, 0, 360, 0],
      TYPE: [exports.basic, {
          AI: { NO_LEAD: true },
          CONTROLLERS: ["nearestDifferentMaster"],
          INDEPENDENT: true
        }
      ]
    }, {
      POSITION: [4, -4, 4, 0, 360, 0],
      TYPE: [exports.basic, {AI: { NO_LEAD: true },
          CONTROLLERS: ["nearestDifferentMaster"],
          INDEPENDENT: true
        }
      ]
    }, {
      POSITION: [6, 0, 0, 0, 360, 1],
      TYPE: [exports.gsfact]
    }
  ]
};    
exports.elite = {
        PARENT: [exports.miniboss],
        LABEL: 'Elite Crasher',
      TYPE: 'miniboss',  
      COLOR: 5,
        SHAPE: 3,
        SIZE: 20,
        VARIES_IN_SIZE: true,
        VALUE: 150000,
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.25,
            HEALTH: base.HEALTH * 1.5,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.5,
        },
    };
exports.guardian = {
    PARENT: [exports.elite],
  LABEL: 'Guardian',  
  DANGER: 7,
    GUNS: [{
        POSITION: [   5,    7,    1.5,     7,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
};
exports.s2_22 = {
    PARENT: [exports.elite],
  LABEL: 'S2_22',  
  COLOR: 25,
    SHAPE: [[-1,-1],[1,0],[1,0],[-1.0,1.0]],
    BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.75,
            HEALTH: base.HEALTH * 1.5,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.5,
        SPEED: 50,
        },
    DANGER: 12,
    GUNS: [{
        POSITION: [    5,    7,    1.5,     7,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports.iceswarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
};
exports.ps3_33 = {
    PARENT: [exports.elite],
  LABEL: 'PS3_33',  
  COLOR: 26,
    SHAPE: [[-1,-1],[1,0],[1,0],[-1.0,1.0]],
    BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.25,
            HEALTH: base.HEALTH * 1.5,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.5,
        },
    DANGER: 12,
    GUNS: [{
        POSITION: [    5,    7,    1.5,     7,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports.poisonswarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
};
exports.eliteknight = {
PARENT: [exports.elite],
LABEL: "Elite SN87-MX",
  BODY: {
    SPEED: 15,
    HEALTH: 3000,
    RESIST: 30,
  },
  SIZE: 25,
SHAPE: 3,
GUNS: [
{
POSITION: [9.692,1.6,1,0,0,180,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.rocketfuel, g.thruster, g.morerecoil]),
TYPE: exports.bullet
}, },
{
POSITION: [9.692,1.6,1,0,1.385,180,0.8],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.rocketfuel, g.thruster, g.morerecoil]),
TYPE: exports.bullet
}, },
{
POSITION: [9.692,1.6,1,0,2.769,180,0.8],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.rocketfuel, g.thruster, g.morerecoil]),
TYPE: exports.bullet
}, },
{
POSITION: [9.692,1.6,1,0,4.154,180,0.4],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.rocketfuel, g.thruster, g.morerecoil]),
TYPE: exports.bullet
}, },
{
POSITION: [9.692,1.6,1,0,-1.385,180,0.4],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.rocketfuel, g.thruster, g.morerecoil]),
TYPE: exports.bullet
}, },
{
POSITION: [9.692,1.6,1,0,-2.769,180,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.rocketfuel, g.thruster, g.morerecoil]),
TYPE: exports.bullet
}, },
{
POSITION: [9.692,1.6,1,0,-4.154,180,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.rocketfuel, g.thruster, g.morerecoil]),
TYPE: exports.bullet
}, },
{
POSITION: [6.923,14.4,1,1.385,0,180,0],
},
], 
  TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  13,    1,      0,     0,    360,   1, ], 
                    TYPE: [exports.flail]
  }, {
    POSITION: [  10,     8,      0,     60,     180,   0, ], 
                    TYPE: [exports.sn87_mx],
                    }, {
                POSITION: [  10,     8,      0,     300,    180,   0, ],
                    TYPE: [exports.sn87_mx],
  },
            ],
        };
exports.elite_destroyer = {
            PARENT: [exports.elite],
          FACING_TYPE: 'autospin',  
          GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    5,    16,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto4gun, { INDEPENDENT: true, COLOR: 5, }]
                    },
            ],
        };
        exports.elite_gunner = {
            PARENT: [exports.elite],
            FACING_TYPE: 'autospin',
          GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  14,    16,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,    16,     1.5,    14,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                        TYPE: [exports.pillbox, { INDEPENDENT: true, }],
                    }, }, {                
                POSITION: [   6,    14,     -2,      2,      0,      60,     0,   ],
                    }, {                
                POSITION: [   6,    14,     -2,      2,      0,     300,     0,   ],
                    }
            ],
            AI: { NO_LEAD: false, },
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     8,      0,     60,     180,   0, ], 
                    TYPE: [exports.auto4gun],
                    }, {
                POSITION: [  14,     8,      0,     300,    180,   0, ],
                    TYPE: [exports.auto4gun],
            }],
        };
        exports.elite_sprayer = { 
            PARENT: [exports.elite],
          FACING_TYPE: 'autospin',  
          AI: { NO_LEAD: false, },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     6,      0,     180,     190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,      60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,     -60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        },
            ],
        };
        exports.elite_swarmer = { 
            PARENT: [exports.elite],
          FACING_TYPE: 'autospin',  
          LABEL: 'Elite Swarmer',
          AI: { NO_LEAD: false, },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     6,      0,     180,     190, 0], 
                    TYPE: [exports.hiveshooter, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,      60,    190, 0], 
                    TYPE: [exports.hiveshooter, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,     -60,    190, 0], 
                    TYPE: [exports.hiveshooter, { COLOR: 5, }],
                       }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.anni, { COLOR: 20, }]
                        },
            ],
        };
        exports.elite_testbed = { 
            PARENT: [exports.elite],
          FACING_TYPE: 'autospin',  
          LABEL: 'Elite TESTBED',
          AI: { NO_LEAD: false, },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     6,      0,     180,     190, 0], 
                    TYPE: [exports.testbed, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,      60,    190, 0], 
                    TYPE: [exports.testbed, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,     -60,    190, 0], 
                    TYPE: [exports.testbed, { COLOR: 5, }],
                       }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.minitrap, { COLOR: 36, }]
                        },
            ],
        };
 exports.elite_frag8 = { 
            PARENT: [exports.elite],
          FACING_TYPE: 'autospin',  
          LABEL: 'Elite Fragmentar',
          AI: { NO_LEAD: false, },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     6,      0,     180,     190, 0], 
                    TYPE: [exports.frag8, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,      60,    190, 0], 
                    TYPE: [exports.frag8, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,     -60,    190, 0], 
                    TYPE: [exports.frag8, { COLOR: 5, }],
                       }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.minitrap, { COLOR: 5, }]
                        },
            ],
        };
exports.elite_single = { 
            PARENT: [exports.elite],
          FACING_TYPE: 'autospin',  
          LABEL: 'Elite Single',
          AI: { NO_LEAD: false, },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     6,      0,     180,     190, 0], 
                    TYPE: [exports.single, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,      60,    190, 0], 
                    TYPE: [exports.single, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,     -60,    190, 0], 
                    TYPE: [exports.single, { COLOR: 5, }],
                       }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.cruiser, { COLOR: 5, }]
                        },
            ],
        };
exports.elite_cruiser = { 
            PARENT: [exports.elite],
          FACING_TYPE: 'autospin',  
          LABEL: 'Elite Cruiser',
          AI: { NO_LEAD: false, },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     6,      0,     180,     190, 0], 
                    TYPE: [exports.cruiser, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,      60,    190, 0], 
                    TYPE: [exports.cruiser, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,     -60,    190, 0], 
                    TYPE: [exports.cruiser, { COLOR: 5, }],
                       }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.director, { COLOR: 5, }]
                        },
            ],
        };
    exports.palisade = (() => {
        let props = {
            SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.halfreload, g.halfreload]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,                        
            AUTOFIRE: true,
            MAX_CHILDREN: 1,
            SYNCS_SKILLS: true,   
            WAIT_TO_CYCLE: true,
        };
        return {
            PARENT: [exports.miniboss],
            LABEL: 'Rogue Palisade',
          FACING_TYPE: 'autospin',  
          COLOR: 17,
            SHAPE: 6,
            SIZE: 28,
            VALUE: 500000,
            BODY: {
                FOV: 1.3,
                SPEED: base.SPEED * 0.1,
                HEALTH: base.HEALTH * 2,
                SHIELD: base.SHIELD * 2,
                REGEN: base.REGEN,
                DAMAGE: base.DAMAGE * 3,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,      6,    -1.6,     8,      0,      0,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     60,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     120,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,                        
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true, 
                        WAIT_TO_CYCLE: true,  
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     240,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     300,     0,   ], 
                    PROPERTIES: props, },
            ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   5,    10,      0,      30,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,      90,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     150,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     210,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     270,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     330,    110, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
    })();

exports.bot = {
  PARENT :[exports.genericTank],  
  AUTO_UPGRADE: 'random',
    FACING_TYPE: 'looseToTarget',
  SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),  
  BODY: {
        SIZE: 10,
    },
    //COLOR: 17,
    NAME: "[A.I.]",
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'fleeAtLowHealth'
    ],
    AI: { STRAFE: true, },
};
exports.rambot = {
  PARENT :[exports.genericTank],  
  AUTO_UPGRADE: 'random',
    FACING_TYPE: 'looseToTarget',
  SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),  
  BODY: {
        SIZE: 10,
    },
    //COLOR: 17,
    NAME: "[A.I.]",
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'fleeAtLowHealth', 'mapTargetToGoal'
    ],
    AI: { STRAFE: true, },
};
        exports.smash2 = {
            PARENT: [exports.rambot],
            LABEL: 'Smasher',
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
        exports.flailpart2 = {
            TYPE: 'turret',
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
            },
          GUNS: [
{
POSITION: [1,2.4,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.lance, g.halfrange]),
TYPE: exports.bullet,
  HAS_NO_RECOIL: true,
  //ALPHA: 0.001,
  AUTOFIRE: true
}, },
],
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
        };
            exports.megasmash2 = {
                PARENT: [exports.rambot],
                LABEL: 'Mega-Smasher',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed * 1.05,
                    FOV: base.FOV * 1.1,
                    DENSITY: base.DENSITY * 4,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  24,     0,      0,      0,     360,  0,], 
                    TYPE: exports.megasmashBody,
                }],
            };
            exports.spike2 = {
                PARENT: [exports.rambot],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed*0.9,
                    DAMAGE: base.DAMAGE * 1.1,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 2,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     120,    360,  0,], 
                    TYPE: exports.spikeBody,
                    }, {
                    POSITION: [ 20.5,    0,      0,     240,    360,  0,], 
                    TYPE: exports.spikeBody,
                }],
            };     
            exports.weirdspike2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Booby Trap',
                DANGER: 7,
                BODY: {
                    DAMAGE: base.DAMAGE * 1.15,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 1.5,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody1,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     180,    360,  0,], 
                    TYPE: exports.spikeBody2,
                }],
            };   
exports.hypersmash2 = {
PARENT: [exports.genericTank],
LABEL: "Hyper Smasher",
  IS_SMASHER: true,
  SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
 STAT_NAMES: statnames.smasher,
SHAPE: 0,
GUNS: [
{
POSITION: [20.769,24,1,-10.523,0,0,0],
},
{
POSITION: [4.431,0,1,0,0,180,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[0.1, 0.35, 0.001, 1, 1, 0.75, 1, 4.5, 1, 0, 1, 10000, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,1.6,1,-10.523,0,270,0],
},
{
POSITION: [20.769,1.6,1,-10.523,0,0,0],
},
{
POSITION: [20.769,1.6,1,-10.523,-6.923,90,0],
},
{
POSITION: [20.769,1.6,1,-10.523,-6.923,270,0],
},
{
POSITION: [20.769,1.6,1,-10.523,-6.923,180,0],
},
{
POSITION: [20.769,1.6,1,-10.523,-6.923,0,0],
},
{
/*POSITION: [0,0,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[0.1, 0, 0.001, 1, 1, 0.75, 1, 0, 1, 0.05, 1, 10000, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [2.769,3.2,1,11.077,0,270,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[0.1, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 0.1, 1, 10000, 1]]),
TYPE: exports.bullet
}, },
{*/
POSITION: [2.769,0,1,0,0,180,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[0.1, 0.5, 0.001, 1, 1, 0.75, 1, 4.5, 1, 0, 1, 10000, 1]]),
TYPE: exports.bullet
}, },
], };
            exports.autosmash2 = makeAuto(exports.smash2, 'Auto-Smasher', { type: exports.autoSmasherTurret, size: 11, });
            exports.autosmash2.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl,];
exports.skr68body1 = {
PARENT: [exports.crasher],
LABEL: "SKR-68 body",
COLOR: 19,
SHAPE: 4,
GUNS: [
{
POSITION: [9.692,4.8,1,0,0,268.669,0],
},
{
POSITION: [1.615, 4.8, 1.3, 9.692, 0, 268.669, 0 ],
},
{
POSITION: [4.154,4.8,1,10.246,0,268.658,0],
},
{
POSITION: [0.692, 4.8, 1.3, 14.4, 0, 268.658, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap,g.block,g.construct]),
TYPE: exports.trap
}, },
{
POSITION: [4.154,4.8,1,10.246,0,90.362,0],
},
{
POSITION: [0.692, 4.8, 1.3, 14.4, 0, 90.362, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap,g.block,g.construct]),
TYPE: exports.trap
}, },
{
POSITION: [0, 0, 0, 10.246, 0, 89.77, 0 ],
},
], };
exports.skr68body2 = {
PARENT: [exports.crasher],
LABEL: "SKR-68 body",
COLOR:19,
SHAPE: 3,
GUNS: [
{
POSITION: [12,4.8,-2,0,0,301.187,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
{
POSITION: [12,4.8,-2,0,0,56.328,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
], };
exports.skrLXVIII = {
PARENT: [exports.miniboss],
LABEL: "SKR-68",
SIZE: 40,
COLOR: 3,
  SHAPE: 6,
BODY: {
                    FOV: 1.3,
                    HEALTH: base.HEALTH * 50,
                    SHIELD: base.SHIELD * 10,
                    DENSITY: base.DENSITY * 5,
                   SPEED: base.SPEED * 0.25
                },
GUNS: [
{
POSITION: [4.308,3,2.7,8,0,179.869,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1.54, 1.02, 1.26, 1, 3.15, 0.9, 3, 2, 0.00001, 1]]),
TYPE: exports.drone,
MAX_CHILDRED: 10,
   }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     15,      0,       0,    360,   1, ],  
                    TYPE: [exports.skr68body1, { INDEPENDENT: false, COLOR: 3, }]
              }, {
              POSITION: [  10,     25,      0,       0,    360,   1, ],  
                    TYPE: [exports.skr68body2, { INDEPENDENT: false, COLOR: 3, }]
               }, {
              POSITION: [  10,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.factory, { INDEPENDENT: false,}]
                /* }, {
              POSITION: [  5,     15,      -5,       -60,    360,   1, ],  
                    TYPE: [exports.assass, { INDEPENDENT: false,}]*/
                    },
            ],
        }; 
exports.elite_spaceship = {
PARENT: [exports.elite],
LABEL: "Elite Spaceship",
FACING_TYPE: 'autospin',
  GUNS: [
{
POSITION: [2.492,2.56,-2,8.538,0,179.946,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
{
POSITION: [2.492,2.56,-2,8.538,7.538,180.34,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
{
POSITION: [2.492,2.56,-2,8.538,-7.538,180.752,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
{
POSITION: [2.492,2.56,-2,8.538,-7.538,301.849,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
{
POSITION: [2.492,2.56,-2,8.538,-7.538,59.084,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
{
POSITION: [2.492,2.56,-2,8.538,7.538,301.85,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
{
POSITION: [2.492,2.56,-2,8.538,7.538,58.939,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
{
POSITION: [2.492,2.56,-2,8.538,0,302.384,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
{
POSITION: [2.492,2.56,-2,8.538,0,58.478,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
     }, },
            ],          
         TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  5,     8,      0.1,      0,     360, 1], 
                    TYPE: [exports.auto3gun,{ INDEPENDENT: false,
                           COLOR: 5, }]
                        }, {
                POSITION: [  5,     8,      0.1,     120,    360, 1], 
                    TYPE: [exports.auto3gun,{ INDEPENDENT: false,
                           COLOR: 5, }]
                        }, {
                POSITION: [  5,     8,      0.1,     240,    360, 1], 
                    TYPE: [exports.auto3gun, { INDEPENDENT: false,
                          COLOR: 5, }]
                        },
            ],
        };
exports.arrasianlorium = {
    PARENT: [exports.miniboss],
    LABEL: "Arrasian Hyrant",
    NAME: "Arrasian Lorium",
    SIZE: 20,
  COLOR: 2,
    BODY: {
        DAMAGE: 1000,
        HEALTH: 8000,
        RESIST: 7,
      FOV: 2,
    },
    SHAPE: [
        [-0.59, -0.81],
        [0.405, -0.924],
        [1, -0.015],
        [1.015, -0.01],
        [0.405, 0.91],
        [-0.61, 0.81],
        [-0.18, 0.6],
        [-0.1, 0.38],
        [-1.01, 0],
        [-0.09, -0.43],
        [-0.19, -0.6]
    ],
    GUNS: [{
            POSITION: [12, 2, 1, 0, 4.538, 0.116, 1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.sniper, g.basic, g.single]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [12, 2, 1, 0, -4.538, 0.263, 2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.sniper, g.basic, g.single]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [5, 4, 1, 0, 0, 180, 2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.single]),
                TYPE: exports.drone,
              AUTOFIRE: true,  
              MAX_CHILDREN: 15
               },
        },
        {
              POSITION: [3, 5, 2, 10, 0, 180, 2],
               },
        {
            POSITION: [10, 5, 1, 0, 0, 180, 2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                TYPE: exports.trap
              }, },
            ],          
         TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  7,     0,      0.1,      180,     360, 1], 
                    TYPE: [exports.builder,{ INDEPENDENT: false,
                           COLOR: 2, }]
                        },
            ],
        };
exports.ArrasianSpirit = {
PARENT: [exports.miniboss],
LABEL: "Devestatus",
  NAME: 'Devestatus',
SIZE: 30,
  FACING_TYPE: 'autospin',
  COLOR: 25,
      BODY: {
        HEALTH: 8000,
      FOV: 1.3,
    },
SHAPE: [[0.4,1],[1,1],[1,0.4],[0.6,0],[1,-0.4],[1,-1],[0.4,-1],[0,-0.6],[-0.4,-1],[-1,-1],[-1,-0.4],[-0.6,0],[-1,0.4],[-1,1],[-0.4,1],[0,0.6]],
GUNS: [
{
POSITION: [18,1.6,1,0,-1.385,221.566,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.gunner, g.single, g.basic]),
TYPE: exports.bullet
}, },
{
POSITION: [18,1.6,1,0,1.385,222.253,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.gunner, g.single, g.basic]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,1.6,1,0,0,221.841,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.gunner, g.single, g.basic]),
TYPE: exports.bullet
}, },
{
POSITION: [18,1.6,1,0,1.385,138.906,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.gunner, g.single, g.basic]),
TYPE: exports.bullet
}, },
{
POSITION: [18,1.6,1,0,1.385,46.268,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.gunner, g.single, g.basic]),
TYPE: exports.bullet
}, },
{
POSITION: [18,1.6,1,0,-1.385,135.796,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.gunner, g.single, g.basic]),
TYPE: exports.bullet
}, },
{
POSITION: [18,1.6,1,0,-1.385,42.212,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.gunner, g.single, g.basic]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,1.6,1,0,0,137.374,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.gunner, g.single, g.basic]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,1.6,1,0,0,44.691,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.gunner, g.single, g.basic]),
TYPE: exports.bullet
}, },
{
POSITION: [18,1.6,1,0,1.385,319.445,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.gunner, g.single, g.basic]),
TYPE: exports.bullet
}, },
{
POSITION: [18,1.6,1,0,-1.385,315.729,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.gunner, g.single, g.basic]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,1.6,1,0,0,317.576,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.gunner, g.single, g.basic]),
TYPE: exports.bullet
}, },
{
POSITION: [5.538,2.24,1,4.708,0,180.309,0],
},
{
POSITION: [0.923, 2.24, 1.3, 10.246, 0, 180.309, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 0.45, 0.6, 0.39, 1.25, 1.8, 0.8, 3, 1.25, 0.00001, 1]]),
TYPE: exports.trap
}, },
{
POSITION: [5.538,2.24,1,4.708,0,268.925,0],
},
{
POSITION: [0.923, 2.24, 1.3, 10.246, 0, 268.925, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 0.45, 0.6, 0.39, 1.25, 1.8, 0.8, 3, 1.25, 0.00001, 1]]),
TYPE: exports.trap
}, },
{
POSITION: [5.538,2.24,1,4.708,0,89.775,0],
},
{
POSITION: [0.923, 2.24, 1.3, 10.246, 0, 89.775, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 0.45, 0.6, 0.39, 1.25, 1.8, 0.8, 3, 1.25, 0.00001, 1]]),
TYPE: exports.trap
}, },
{
POSITION: [5.538,2.24,1,4.708,0,0.139,0],
},
{
POSITION: [0.923, 2.24, 1.3, 10.246, 0, 0.139, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 0.45, 0.6, 0.39, 1.25, 1.8, 0.8, 3, 1.25, 0.00001, 1]]),
TYPE: exports.trap
}, },
{
POSITION: [2.462,1.4,2.7,12.708,0,221.749,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.single, g.basic]),
TYPE: exports.drone,
  MAX_CHILDREN: 5,
  AUTOFIRE: true,
}, },
{
POSITION: [2.462,1.4,2.7,12.708,0,316.79,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.single, g.basic]),
TYPE: exports.drone,
  MAX_CHILDREN: 5,
  AUTOFIRE: true,
}, },
{
POSITION: [2.462,1.4,2.7,12.708,0,43.939,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.single, g.basic]),
TYPE: exports.drone,
  MAX_CHILDREN: 5,
  AUTOFIRE: true,
}, },
{
POSITION: [2.462,1.4,2.7,12.708,0,137.386,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.single, g.basic]),
TYPE: exports.drone,
  MAX_CHILDREN: 5,
  AUTOFIRE: true,
 }, },
            ],          
         TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  12,     0,      0.1,      0,     360, 1], 
                    TYPE: [exports.mini,{ INDEPENDENT: false,
                           COLOR: 50, }]
                        },
            ],
        };
exports.summonerboss = {
PARENT: [exports.miniboss],
LABEL: "Summoner",
VALUE: 5000,
  FACING_TYPE: 'autospin',
  SIZE: 25,
  COLOR: 3,
SHAPE: 4,
GUNS: [
{
POSITION: [3.692,5,2.7,8,0,268.772,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.op, g.basic]),
TYPE: exports.sunchip,
  AUTOFIRE: true,
  MAX_CHILDREN: 5,
}, },
{
POSITION: [3.692,5,2.7,8,0,0.132,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.op, g.basic]),
TYPE: exports.sunchip,
  AUTOFIRE: true,
  MAX_CHILDREN: 5,
}, },
{
POSITION: [3.692,5,2.7,8,0,90.501,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.op, g.basic]),
TYPE: exports.sunchip,
  AUTOFIRE: true,
  MAX_CHILDREN: 5,
}, },
{
POSITION: [3.692,5,2.7,8,0,179.346,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.op, g.basic]),
TYPE: exports.sunchip,
  AUTOFIRE: true,
  MAX_CHILDREN: 5,
}, },
], };
exports.minihive = {
    PARENT: [exports.bullet],
    LABEL: 'Mini Hive',
    BODY: {
        RANGE: 90,
        FOV: 0.5,
    },
    FACING_TYPE: 'turnWithSpeed',
    INDEPENDENT: true,
    CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf', ],
    GUNS: [{
            POSITION: [7, 9.5, 0.6, 7, 0, 120.183, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                TYPE: exports.bee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 240.183, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                TYPE: exports.bee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 0.183, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                TYPE: exports.bee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
};
exports.miniswarmer = {
    PARENT: [exports.genericTank],
    LABEL: "Mini Swarmer",
    SHAPE: 0,
    GUNS: [{
            POSITION: [18, 9.6, -2, 0, 0, 0.102, 0],
        },
        {
            POSITION: [18, 9.6, 1, 0, 0, 0.545, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
                TYPE: exports.hive
            },
        },
    ],
};
exports.testersummoner = {
    PARENT: [exports.genericTank],
    LABEL: 'Boss Tester',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.eliteknight, 
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 1,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};

            exports.pomeraniontation = { 
                PARENT: [exports.miniboss],
                DANGER: 5,
                LABEL: 'Pomeranionitation',
              BODY:{
              FOV: 2,
            },
              COLOR: 8,
              SIZE: 25,  
              FACING_TYPE: 'autospin',
              GUNS: [
{
POSITION: [3,8,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.factory]),
TYPE: exports.pomermini2,
  MAX_CHILDREN: 2,
  LABEL: 'Elite Servent',
  CAN_BE_ON_LEADERBOARD: false,
  ACCEPTS_SCORE: false
 }, },
            ],    
              TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                  POSITION: [  10,     6,      0,      90,    160, 0], 
                        TYPE: exports.pelter2,
                            }, {
                    POSITION: [  10,     6,      0,     180,    160, 0], 
                        TYPE: exports.pelter2,
                            }, {
                    POSITION: [  10,     6,      0,     270,    160, 0],
                        TYPE: exports.pelter2,
                            }, {
                    POSITION: [  10,     6,      0,     360,    160, 0],
                        TYPE: exports.pelter2,
                               }, {  
                  POSITION: [  10,     6,      0,      45,    160, 0], 
                        TYPE: exports.pelter2,
                            }, {
                    POSITION: [  10,     6,      0,     135,    160, 0], 
                        TYPE: exports.pelter2,
                            }, {
                    POSITION: [  10,     6,      0,     225,    160, 0],
                        TYPE: exports.pelter2,
                            }, {
                    POSITION: [  10,     6,      0,     315,    160, 0],
                        TYPE: exports.pelter2,
                               }, {
                    POSITION: [  13,     0,      0,     0,    160, 1],
                        TYPE: [exports.pumba2,{INDEPENDENT: true, COLOR: 8,}]
                            },
                ],
            };
exports.hyperboi = {
PARENT: [exports.genericTank],
LABEL: 'Hyper Cannon',
BODY: {
  FOV: 1.5,
  RANGE: 50,
},
  SIZE: 12,
SHAPE: 0,
GUNS: [
{
POSITION: [40,14.4,-1.4,0,0,0.257,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[160, 0, 0.001, 1, 999, 999, 1, 7.2, 1, 5, 1, 0.00001, 1]]),
TYPE: exports.frag8bullet
}, },
], };

exports.gatekeeper = {
PARENT: [exports.miniboss],
LABEL: "Gate Keeper",
    BODY: {
        DAMAGE: 70,
        HEALTH: 8000,
      FOV: 1.3,
    },
  LEVEL: 100,
  COLOR: 5,
  SIZE: 30,
SHAPE: 0,
BRODCAST_MESSAGE: 'A Gatekeeper Has Fallen',
  GUNS: [
{
POSITION: [22.154,8,1,0,0,89.627,0],
},
{
POSITION: [22.154,8,1,0,0,269.627,0],
},
{
POSITION: [18,6.4,-2,0,4.154,182.012,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
{
POSITION: [18,6.4,-2,0,-4.154,179.941,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.swarm]),
TYPE: exports.swarm
}, },
{
POSITION: [18,11.2,-2,0,0,0.586,0],
},
{
POSITION: [18,11.2,1,0,0,0.138,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
TYPE: exports.hive
 }, },
            ],          
         TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  10,     0,      -20,      0,     360, 1], 
                    TYPE: [exports.hyperboi,{INDEPENDENT: false,}]//Replace with stronger frag-8?
                        }, {
                POSITION: [  10,     0,      20,     0,    360, 1], 
                    TYPE: [exports.hyperboi,{INDEPENDENT: false,}]//Make Frag-16?
                        },
            ],
        };

exports.terminatorA = {
PARENT: [exports.miniboss],
LABEL: "Terminator",
  SIZE: 30,
SHAPE: [[0.09,-0.71],[0.6,-0.81],[1.01,-0.01],[0.586,0.8],[0.106,0.69],[-1.014,0.815],[-0.614,0.335],[-0.61,-0.32],[-1,-0.825]],
COLOR: 2,
  GUNS: [
{
POSITION: [15.077,3.2,1,0,-1.938,0,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner]),
TYPE: exports.bullet
}, },
{
POSITION: [15.077,3.2,1,0,1.938,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner]),
TYPE: exports.bullet
}, },
{
POSITION: [13.077,3.2,1,-1.385,5.538,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner]),
TYPE: exports.bullet
}, },
{
POSITION: [13.077,3.2,1,-1.385,-5.538,0,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner]),
TYPE: exports.bullet
}, },
{
POSITION: [5,4,2.7,5,-3,269.12,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.drone]),
TYPE: exports.termdrone,
  MAX_CHILDREN: 7,
  AUTOFIRE: true,
}, },
{
POSITION: [5,4,2.7,5,3,87.969,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.drone]),
TYPE: exports.termdrone,
  MAX_CHILDREN: 7,
  AUTOFIRE: true,
}, },
{
POSITION: [10,6.4,1,0,0,179.808,0],
},
{
POSITION: [3.923, 6.4, 1.3, 10, 0, 179.808, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.builder]),
TYPE: exports.trap
}, },
{
POSITION: [3.923, 3.2, 1.3, 10, 0, 179.751, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.builder]),
TYPE: exports.trap
}, },
], };
exports.stelarA = {
  PARENT:[exports.genericTank],
  SHAPE: 5,
  COLOR: 4,
TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [5, 10, 0, 72, 360, 0, ],
        TYPE: [exports.skimturret]
    }, {
        POSITION: [5, 10, 0, 144, 360, 0, ],
        TYPE: [exports.skimturret]
    }, {
        POSITION: [5, 10, 0, 216, 360, 0, ],
        TYPE: [exports.skimturret]
    }, {
        POSITION: [5, 10, 0, 288, 360, 0, ],
        TYPE: [exports.skimturret]
    }, {
        POSITION: [5, 10, 0, 360, 360, 0, ],
        TYPE: [exports.skimturret]
      }, ],
};

exports.extinctionatorturret = {
PARENT: [exports.genericTank],
LABEL: "Extinctionator",
COLOR: 2,
SHAPE: 3,
GUNS: [
{
POSITION: [15.231,6.4,1,0,0,0.228,0],
},
{
POSITION: [18,6.4,1,-2.769,4.431,0.451,0],
},
{
POSITION: [18,6.4,1,-2.769,-4.431,359.888,0],
},
{
POSITION: [15.231,6.4,1,0,0,0.114,0],
},
{
POSITION: [9.692,17.6,1,15.231,0,0.074,0],
},
{
POSITION: [2.769,4.8,1,15.231,0,359.237,0],
},
{
POSITION: [2.769,4.8,1,15.231,5.538,359.846,0],
},
{
POSITION: [2.769,4.8,1,15.231,-5.538,0.416,0],
},
{
POSITION: [33.231,4.8,1,18,0,0.053,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.mini]),
TYPE: exports.bullet
}, },
{
POSITION: [18,4.8,1,19.385,5.538,359.912,0.6],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.mini]),
TYPE: exports.bullet
}, },
{
POSITION: [18,4.8,1,19.385,-5.538,0.189,0.6],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.mini]),
TYPE: exports.bullet
}, },
], };
exports.acturretdecor = {
PARENT: [exports.genericTank],
  SHAPE: [[0,0.01],[0.001,-1.434],[0,0],[1.41,-0.014],[0,0],[0.001,1.39],[0,0],[-1.416,0.006],[-0.99,0.01],[0.001,-1.02],[1,-0.014],[0.001,1.006],[-0.99,0]],
  COLOR: 18,
  CONTROLLERS: ['doNothing'],
};
exports.aclazerturret = {
PARENT: [exports.genericTank],
LABEL: "OP lazer (Warning!Too laggy)",
SHAPE: 0,
GUNS: [
{
POSITION: [13.846,11.2,-2,0,0,0.504,0],
PROPERTIES: {
 COLOR: 12,
}, },
{
POSITION: [9.692,8,1,14.4,0,0.164,0.5],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.pound, g.destroy, g.anni, g.halfrecoil]),
TYPE: exports.lazerbullet
}, },
{
POSITION: [7.477,11.2,1,14.4,0,0.225,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.pound, g.destroy, g.anni, g.halfrecoil]),
TYPE: exports.lazerbullet
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.acturretdecor]
                    },
            ],
        };
exports.theHunter = {
PARENT: [exports.genericTank],
LABEL: "The Hunter",
NAME: 'Elmer J. Fudd',
  BODY: {
    FOV: 2,
    HEALTH: 999999999999999999999999,
    SHIELD: 999999999999999,
    REGEN: 999999999,
    RESIST: 99999,
    },
  COLOR: 3,
  SIZE: 30,
  SHAPE: 0,
GUNS: [
{
POSITION: [13.846,11.2,-2,0,0,0.504,0],
PROPERTIES: {
 COLOR: 14,
}, },
{
POSITION: [9.692,8,1,14.4,0,0.164,0.5],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, g.halfrecoil]),
TYPE: exports.lazerbullet
}, },
{
POSITION: [7.477,11.2,1,14.4,0,0.225,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, g.halfrecoil]),
TYPE: exports.lazerbullet
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     10,      0,       90,    360,   0, ],  
                    TYPE: [exports.aclazerturret]
            }, {
                              POSITION: [  11,     10,      0,       270,    360,   0, ],  
                    TYPE: [exports.aclazerturret]
                    },
            ],
        };
exports.speedcloser = {
PARENT: [exports.reindecrashum2],
LABEL: "Speedy Closer",
  NAME: "Arena Closer",
SIZE: 30,
SHAPE: 0,
GUNS: [
{
POSITION: [18,20.8,1,0,0,180,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[10, 3, 0.001, 1, 1, 0.75, 1, 5.85, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [18,20.8,1,0,0,232.073,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[10, 3, 0.001, 1, 1, 0.75, 1, 5.85, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [18,20.8,1,0,0,126.817,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[10, 3, 0.001, 1, 1, 0.75, 1, 5.85, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
{
POSITION: [18,20.8,1,0,0,179.742,0],
},
{
POSITION: [13.846,9.6,1,0,0,0,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[10, 0, 0.001, 1, 1, 0.75, 999999999999, 4.5, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
], };

exports.trapper = {
    PARENT: [exports.genericTank],
    LABEL: 'Trapper',
    DANGER: 7,
    STAT_NAMES: statnames.generic,
    BODY: {
        ACCELERATION: base.ACCEL * 0.6,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.2,
    },
    GUNS: [{
        POSITION: [14, 8, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [4, 8, 1.5, 14, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap,
        },
    }, ],
};
    exports.skI = {
        PARENT: [exports.genericTank],
      LABEL: 'SK-1',  
      BODY: {
            HEALTH: 300,
            DAMAGE: 2,
            SHIELD: 200,
            FOV: 2,
        },
        SHAPE: 4, 
        COLOR: 3,
      SIZE: 25,
        FACING_TYPE: 'autospin',
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [  5,     10,      0,     0,     170, 0], 
                TYPE: exports.construct,
                    }, {
            POSITION: [  5,     10,      6,     0,    170, 0], 
                TYPE: exports.construct,
                    }, {
            POSITION: [  5,     10,      -6,     0,    170, 0], 
                TYPE: exports.construct,
                    }, {
            POSITION: [  5,     10,      0,     90,     170, 0], 
                TYPE: exports.construct,
                    }, {
            POSITION: [  5,     10,      -6,     90,    170, 0], 
                TYPE: exports.construct,
                    }, {
            POSITION: [  5,     10,      6,     90,    170, 0], 
                TYPE: exports.construct,
                    }, {
            POSITION: [  5,     10,      0,     180,     170, 0], 
                TYPE: exports.construct,
                    }, {
            POSITION: [  5,     10,      -6,     180,    170, 0], 
                TYPE: exports.construct,
                    }, {
            POSITION: [  5,     10,      6,     180,    170, 0], 
                TYPE: exports.construct,
                    }, {
            POSITION: [  5,     10,      0,     270,     170, 0], 
                TYPE: exports.construct,
                    }, {
            POSITION: [  5,     10,      -6,     270,    170, 0], 
                TYPE: exports.construct,
                    }, {
            POSITION: [  5,     10,      6,     270,    170, 0], 
                TYPE: exports.construct,
                        }, {
            POSITION: [  10,     0,      0,     45,    170, 1], 
                TYPE: exports.boomer,
                    },
        ],
    };
            exports.skconstruct = {
                PARENT: [exports.genericTank],
                LABEL: 'Warstructihose',
              BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.7,
                    FOV: base.FOV * 1.15,
                },
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  7,     10,      0,       0,    170,   0, ],  
                    TYPE: [exports.builder]
                    }, {
                POSITION: [  7,     10,      0,       90,    170,   0, ],  
                    TYPE: [exports.builder]
                      }, {
                POSITION: [  7,     10,      0,       180,    170,   0, ],  
                    TYPE: [exports.builder]
                    }, {
                POSITION: [  7,     10,      0,       270,    170,   0, ],  
                    TYPE: [exports.builder]
                      },
            ],
        };
exports.skII = {
PARENT: [exports.genericTank],
LABEL: "SK-2",
      BODY: {
            HEALTH: 1000,
            DAMAGE: 100,
            SHIELD: 200,
            FOV: 2,
        },
        SHAPE: 4, 
        COLOR: 3,
      SIZE: 28,
FACING_TYPE: 'autospin',
  GUNS: [
{
POSITION: [9.692,4.8,-2,0,0,180.164,0],
},
{
POSITION: [9.692,4.8,-2,0,0,0.26,0],
},
{
POSITION: [9.692,4.8,-2,0,0,91.031,0],
},
{
POSITION: [9.692,4.8,-2,0,0,269.236,0],
},
{
POSITION: [12,4.8,1.3,0,0,225.503,0],
},
{
POSITION: [1.615, 4.8, 1.3, 12, 0, 225.503, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
TYPE: exports.block
}, },
{
POSITION: [12,4.8,1,0,0,316.731,0],
},
{
POSITION: [1.615, 4.8, 1.3, 12, 0, 316.731, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
TYPE: exports.block
}, },
{
POSITION: [12,4.8,1,0,0,45,0],
},
{
POSITION: [1.615, 4.8, 1.3, 12, 0, 45, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
TYPE: exports.block
}, },
{
POSITION: [12,4.8,1,0,0,137.482,0],
},
{
POSITION: [1.615, 4.8, 1.3, 12, 0, 137.482, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
TYPE: exports.block
 }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  7,     15,      0,       0,    360,   0, ],  
                    TYPE: [exports.necromancer]
                    }, {
                POSITION: [  7,     15,      0,       90,    360,   0, ],  
                    TYPE: [exports.necromancer]
                      }, {
                POSITION: [  7,     15,      0,       180,    360,   0, ],  
                    TYPE: [exports.necromancer]
                    }, {
                POSITION: [  7,     15,      0,       270,    360,   0, ],  
                    TYPE: [exports.necromancer]
                    }, {
                    POSITION: [  7,     0,      0,       270,    360,   1, ],  
                    TYPE: [exports.skconstruct]  
                    },
            ],
        };
exports.skIII = {
PARENT: [exports.genericTank],
LABEL: "SK-3",
      BODY: {
            HEALTH: 1000,
            DAMAGE: 100,
            SHIELD: 200,
            FOV: 2,
        },
  SIZE: 32,
SHAPE: 4,
  COLOR: 3,
  FACING_TYPE: 'autospin',
GUNS: [
{
POSITION: [16.615,6.4,1,0,0,180,0],
},
{
POSITION: [16.615,6.4,1,0,0,270,0],
},
{
POSITION: [16.615,6.4,1,0,0,0,0],
},
{
POSITION: [16.615,6.4,1,0,0,90,0],
},
{
POSITION: [5.538,6.4,0,18,0,270.184,0],
},
{
POSITION: [5.538,6.4,0,18,0,0.135,0],
},
{
POSITION: [5.538,6.4,0,18,0,90.776,0],
},
{
POSITION: [5.538,6.4,0,18,0,179.244,0],
},
{
POSITION: [5.538,6.4,1,12,18,210.013,0],
},
{
POSITION: [5.538,6.4,1,12,18,299.422,0],
},
{
POSITION: [5.538,6.4,1,12,18,30.277,0],
},
{
POSITION: [5.538,6.4,1,12,18,117.719,0],
},
{
POSITION: [5.538,6.4,1,12,-18,241.136,0],
},
{
POSITION: [5.538,6.4,1,12,-18,330.271,0],
},
{
POSITION: [5.538,6.4,1,12,-18,60.372,0],
},
{
POSITION: [5.538,6.4,1,12,-18,151.116,0],
 },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  7,     25,      0,       0,    360,   1, ],  
                    TYPE: [exports.necromancer]
                    }, {
                POSITION: [  7,     25,      0,       90,    360,   1, ],  
                    TYPE: [exports.necromancer]
                      }, {
                POSITION: [  7,     25,      0,       180,    360,   1, ],  
                    TYPE: [exports.necromancer]
                    }, {
                POSITION: [  7,     25,      0,       270,    360,   1, ],  
                    TYPE: [exports.necromancer]
                                        }, {
                    POSITION: [  5,     -7,      0,       0,    360,   1, ],  
                    TYPE: [exports.construct]  
                    }, {
                    POSITION: [  5,     -7,      0,       90,    360,   1, ],  
                    TYPE: [exports.construct]  
                                          }, {
                    POSITION: [  5,     -7,      0,       180,    360,   1, ],  
                    TYPE: [exports.construct]  
                                                                }, {
                    POSITION: [  5,     -7,      0,       270,    360,   1, ],  
                    TYPE: [exports.construct]  
                                       }, {
                    POSITION: [  3,     10,      0,       45,    360,   1, ],  
                    TYPE: [exports.auto3gun]  
                                         }, {
                    POSITION: [  3,     10,      0,       135,    360,   1, ],  
                    TYPE: [exports.auto3gun]  
                                           }, {
                    POSITION: [  3,     10,      0,       225,    360,   1, ],  
                    TYPE: [exports.auto3gun] 
                                             }, {
                    POSITION: [  3,     10,      0,       315,    360,   1, ],  
                    TYPE: [exports.auto3gun]  
                                               }, {
                    POSITION: [  5,     25,      -10,       225,    360,   0, ],  
                    TYPE: [exports.shotgun2]  
                                                 }, {
                    POSITION: [  5,     25,      -10,       315,    360,   0, ],  
                    TYPE: [exports.shotgun2]  
                                                   }, {
                    POSITION: [  5,     25,      -10,       45,    360,   0, ],  
                    TYPE: [exports.shotgun2] 
                                                     }, {
                    POSITION: [  5,     25,      -10,       135,    360,   0, ],  
                    TYPE: [exports.shotgun2]  
                                                      }, {
                    POSITION: [  5,     25,      10,       225,    360,   0, ],  
                    TYPE: [exports.shotgun2]  
                                                 }, {
                    POSITION: [  5,     25,      10,       315,    360,   0, ],  
                    TYPE: [exports.shotgun2]  
                                                   }, {
                    POSITION: [  5,     25,      10,       45,    360,   0, ],  
                    TYPE: [exports.shotgun2] 
                                                     }, {
                    POSITION: [  5,     25,      10,       135,    360,   0, ],  
                    TYPE: [exports.shotgun2]  
                                              
                                                                },
            ],
        };
exports.skIX = {
PARENT: [exports.genericTank],
LABEL: "SK-4",
      BODY: {
            HEALTH: 1000,
            DAMAGE: 100,
            SHIELD: 200,
            FOV: 2,
        },
  SIZE: 38,
SHAPE: 4,
  COLOR: 3,
  FACING_TYPE: 'autospin',
GUNS: [
{
POSITION: [9.692,3.2,1,0,-4.985,269.869,0],
},
{
POSITION: [1.615, 3.2, 1.3, 9.692, -4.985, 269.869, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
TYPE: exports.block
}, },
{
POSITION: [9.692,3.2,1,0,-4.985,0.354,0],
},
{
POSITION: [1.615, 3.2, 1.3, 9.692, -4.985, 0.354, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
TYPE: exports.block
}, },
{
POSITION: [9.692,3.2,1,0,-4.985,90.509,0],
},
{
POSITION: [1.615, 3.2, 1.3, 9.692, -4.985, 90.509, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
TYPE: exports.block
}, },
{
POSITION: [9.692,3.2,1,0,-4.985,179.864,0],
},
{
POSITION: [1.615, 3.2, 1.3, 9.692, -4.985, 179.864, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
TYPE: exports.block
}, },
{
POSITION: [9.692,3.2,1,0,4.985,270.314,0],
},
{
POSITION: [1.615, 3.2, 1.3, 9.692, 4.985, 270.314, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
TYPE: exports.block
}, },
{
POSITION: [9.692,3.2,1,0,4.985,0.299,0],
},
{
POSITION: [1.615, 3.2, 1.3, 9.692, 4.985, 0.299, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
TYPE: exports.block
}, },
{
POSITION: [9.692,3.2,1,0,4.985,90.479,0],
},
{
POSITION: [1.615, 3.2, 1.3, 9.692, 4.985, 90.479, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
TYPE: exports.block
}, },
{
POSITION: [9.692,3.2,1,0,4.985,179.154,0],
},
{
POSITION: [1.615, 3.2, 1.3, 9.692, 4.985, 179.154, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
TYPE: exports.block
}, },
{
POSITION: [2.769,9.6,1,0,0,269.707,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.factory, g.construct]),
TYPE: exports.sk4drone,
  MAX_CHILDREN: 4,
 STAT_CALCULATOR: gunCalcNames.drone,                        
 AUTOFIRE: true,
 SYNCS_SKILLS: true,   
 }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  7,     10,      0,       0,    360,   0, ],  
                    TYPE: [exports.ranger]
                    }, {
                POSITION: [  7,     10,      0,       90,    360,   0, ],  
                    TYPE: [exports.ranger]
                      }, {
                POSITION: [  7,     10,      0,       180,    360,   0, ],  
                    TYPE: [exports.ranger]
                    }, {
                POSITION: [  7,     10,      0,       270,    360,   0, ],  
                    TYPE: [exports.ranger]
                    }, {
                    POSITION: [  7,     0,      0,       270,    360,   1, ],  
                    TYPE: [exports.anni]  
                                         }, {
                    POSITION: [  5,     7,      0,       0,    360,   1, ],  
                    TYPE: [exports.cruiser]  
                                           }, {
                    POSITION: [  5,     7,      0,       90,    360,   1, ],  
                    TYPE: [exports.cruiser]  
                                             }, {
                    POSITION: [  5,     7,      0,       180,    360,   1, ],  
                    TYPE: [exports.cruiser]  
                                               }, {
                    POSITION: [  5,     7,      0,       270,    360,   1, ],  
                    TYPE: [exports.cruiser]  
                    },
            ],
        };
exports.skI.UPGRADES_TIER_1 = [
exports.skII
];
exports.skII.UPGRADES_TIER_1 = [
exports.skIII
];
exports.skIII.UPGRADES_TIER_1 = [
exports.skIX
];
exports.octogron = {
PARENT: [exports.miniboss],
LABEL: "Octogron",
FACING_TYPE: 'autospin',
  COLOR: 3,
  SIZE: 30,
SHAPE: 8,
GUNS: [
{
POSITION: [12,8,1,0,0,270,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
TYPE: exports.bullet
}, },
{
POSITION: [12,8,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
TYPE: exports.bullet
}, },
{
POSITION: [12,8,1,0,0,90,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
TYPE: exports.bullet
}, },
{
POSITION: [12,8,1,0,0,180,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
TYPE: exports.bullet
 }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  8,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.necro_4]  
                                         }, {
                    POSITION: [  7,     10,      0,       45,    360,   0, ],  
                    TYPE: [exports.auto3gun]  
                                           }, {
                    POSITION: [  7,     10,      0,       225,    360,   0, ],  
                    TYPE: [exports.auto3gun]  
                                             }, {
                    POSITION: [  7,     10,      0,       315,    360,   0, ],  
                    TYPE: [exports.auto3gun]  
                                               }, {
                    POSITION: [  7,     10,      0,       135,    360,  0, ],  
                    TYPE: [exports.auto3gun]  
                    },
            ],
        };
exports.beehive = {
    PARENT: [exports.genericTank],
  CONTROLLERS: ['spin', 'alwaysFire'],  
  LABEL: "Bee Hive",
    SHAPE: 0,
    GUNS: [{
            POSITION: [13.846, 3.2, 1, 0, 0, 0.415, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
            TYPE: exports.bee,
            STAT_CALCULATOR: gunCalcNames.swarm,            },
       },
        {
            POSITION: [13.846, 3.2, 1, 0, -2.769, 354.774, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
            TYPE: exports.bee,
            STAT_CALCULATOR: gunCalcNames.swarm,            },
        },
        {
            POSITION: [13.846, 3.2, 1, 0, 2.769, 8.125, 0],
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
            TYPE: exports.bee,
            STAT_CALCULATOR: gunCalcNames.swarm,   
         },
       // },
        {
        POSITION: [13.846, 3.2, 1, 0, 0, 51.061, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
            TYPE: exports.bee,
            STAT_CALCULATOR: gunCalcNames.swarm,           
         },
        },
        {
        POSITION: [13.846, 3.2, 1, 0, 0, 313.194, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
            TYPE: exports.bee,
            STAT_CALCULATOR: gunCalcNames.swarm,            
        },
    },
    {
        POSITION: [13.846, 3.2, 1, 0, 0, 288.774, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
            TYPE: exports.bee,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    },
    {
        POSITION: [13.846, 3.2, 1, 0, 0, 263.757, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
            TYPE: exports.bee,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    },
    {
        POSITION: [13.846, 3.2, 1, 0, 0, 78.978, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
            TYPE: exports.bee,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    },
    {
        POSITION: [13.846, 3.2, 1, 0, 0, 104.31, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
            TYPE: exports.bee,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    },
],
};
exports.pailergun2 = {
TYPE: 'turret',
LABEL: "Pailer Gun",
CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
  SHAPE: 0,
GUNS: [
{
POSITION: [23.538,3.2,1,0,0,0.301,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.auto]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,3.2,1,0,2.769,0.266,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.auto]),
TYPE: exports.bullet
}, },
{
POSITION: [20.769,3.2,1,0,-2.769,0.487,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.auto]),
TYPE: exports.bullet
}, },
{
POSITION: [18,3.2,1,0,-5.538,1.224,0.4],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.auto]),
TYPE: exports.bullet
}, },
{
POSITION: [18,3.2,1,0,5.538,0.331,0.4],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.auto]),
TYPE: exports.bullet
}, },
{
POSITION: [11.077,14.4,-1.5,0,0,1.005,0],
},
], };
exports.redemptionist = {
    PARENT: [exports.miniboss],
    LABEL: 'Redemptionist',
  BODY: {
    FOV: 2.5,
    HEALTH: 5000,
    RESIST: 10,
    DAMAGE: 100,
  },
  COLOR: 35,
  FACING_TYPE: 'autospin',  
  SHAPE: 10,
    SIZE: 35,
  CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [5, 10, 0, 36, 360, 0, ],
        TYPE: [exports.pailergun2, { INDEPENDENT: false,
                          COLOR: 35, }]
    }, {
        POSITION: [5, 10, 0, 72, 360, 0, ],
        TYPE: [exports.pailergun2,{ INDEPENDENT: false,
                          COLOR: 35, }]
    }, {
        POSITION: [5, 10, 0, 108, 360, 0, ],
        TYPE: [exports.pailergun2, { INDEPENDENT: false,
                          COLOR: 35, }]
    }, {
        POSITION: [5, 10, 0, 144, 360, 0, ],
        TYPE: [exports.pailergun2, { INDEPENDENT: false,
                          COLOR: 35, }]
    }, {
        POSITION: [5, 10, 0, 180, 360, 0, ],
        TYPE: [exports.pailergun2, { INDEPENDENT: false,
                          COLOR: 35, }]
    }, {
        POSITION: [5, 10, 0, 216, 360, 0, ],
        TYPE: [exports.pailergun2, { INDEPENDENT: false,
                          COLOR: 35, }]
    }, {
        POSITION: [5, 10, 0, 252, 360, 0, ],
        TYPE: [exports.pailergun2, { INDEPENDENT: false,
                          COLOR: 35, }]
    }, {
        POSITION: [5, 10, 0, 288, 360, 0, ],
        TYPE: [exports.pailergun2, { INDEPENDENT: false,
                          COLOR: 35, }]
    }, {
        POSITION: [5, 10, 0, 324, 360, 0, ],
        TYPE: [exports.pailergun2, { INDEPENDENT: false,
                          COLOR: 35, }]
       }, {
        POSITION: [5, 10, 0, 360, 360, 0, ],
        TYPE: [exports.pailergun2, { INDEPENDENT: false,
                          COLOR: 35, }]
         }, {
        POSITION: [7, 0, 0, 90, 360, 1, ],
        TYPE: [exports.beehive, {COLOR: 35, }]
    }, ],
};
exports.ekI = {
  PARENT: [exports.elite],
  LABEL: 'EK-1',
  FACING_TYPE: 'autospin',
  SHAPE: 0,
  COLOR: 6,
     TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
       POSITION: [10, 10, 0, 360, 360, 0, ],
        TYPE: [exports.auto3gun]
    }, {
        POSITION: [10, 10, 0, 60, 360, 0, ],
        TYPE: [exports.auto3gun]
    }, {
        POSITION: [10, 10, 0, 120, 360, 0, ],
        TYPE: [exports.auto3gun]
    }, {
        POSITION: [10, 10, 0, 180, 360, 0, ],
        TYPE: [exports.auto3gun]
    }, {
        POSITION: [10, 10, 0, 240, 360, 0, ],
        TYPE: [exports.auto3gun]
       }, {
        POSITION: [10, 10, 0, 300, 360, 0, ],
        TYPE: [exports.auto3gun]
        /* }, {
        POSITION: [25, 0, 0, 90, 360, 0, ],
        TYPE: [exports.smasherBody]*/
           }, {
             POSITION: [25, 0, 0, 0, 360, 0, ],
        TYPE: [exports.dominationBody]
        }, {
        POSITION: [10, 0, 0, 0, 360, 1, ],
        TYPE: [exports.bigauto4gun]
    }, ],
};
exports.awp39triangle ={
  PARENT: [exports.crasher],
  CRAVES_ATTENTION: false,
  SHAPE: 3,
  COLOR: 13,
};
exports.awp39square ={
    PARENT: [exports.crasher],
  CRAVES_ATTENTION: false,
  SHAPE: 4,
  COLOR: 13,
};
/*exports.mrclean = {
PARENT: [exports.genericTank],
LABEL: "Arena Cleaner",
NAME: "Mr. Clean",
 BODY:{
  FOV: 2.5,
    HEALTH: 9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
    RESIST: 9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
    REGEN:  9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
    DAMAGE: 99999999999999999999999999999999999999999999999999999999,
},
CONTROLLERS: ['nearestDifferentMaster','mapTowrdsGoal'],
  ACCEPT_SCORE: false,
  CAN_BE_ON_LEADERBOARD: false,
  BRODCAST_MESSAGE: "Mr. Clean, Mr. Clean Mr. Clean!",
  SIZE: 30,
  COLOR: 35,
  SHAPE: 0,
GUNS: [
{
POSITION: [18,8,1,0,0,359.931,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1000, 1, 99999999999, 1, 9, 1, 2.5, 1, 0.00001, 1]]),
TYPE: exports.bullet
}, },
], };*/
exports.awpicebody = {
  PARENT: [exports.crasher],
  COLOR: 25,
CRAVES_ATTENTION: false,
};  
exports.awp_ice = {
            PARENT: [exports.elite],
            DANGER: 6,
   //VALUE: 100000000,
    SHAPE: 5,
    SIZE: 10,
    COLOR: 25,
            LABEL: 'AWP-Ice',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: 15,
                FOV: 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    12,      1,      0,      0,      0,      0,   ], 
                }, {
                POSITION: [   2,    12,     1.1,     18,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.block,
                    }, },           
], 
  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     15,      0,      180,    190, 0], 
                        TYPE: exports.awpicebody,
                            }, {
                    POSITION: [  10,     15,      0,     250,    190, 0], 
                        TYPE: exports.awpicebody,
                            }, {
                    POSITION: [  5,     15,      0,     180,    190, 0], 
                        TYPE: exports.auto3gun,
                            }, {
                    POSITION: [  5,     15,      0,     250,    190, 0], 
                        TYPE: exports.auto3gun,
                            }, {
                              POSITION: [  10,     15,      0,     -250,    190, 0], 
                        TYPE: exports.awpicebody,
                            }, {
                    POSITION: [  5,     15,      0,     -250,    190, 0], 
                        TYPE: exports.auto3gun,
                            },
                ],
            };

exports.awp39lite = {
  PARENT: [exports.miniboss],
 LABEL: 'AWP-39',
  BODY:{
    FOV: 2.5,
    HEALTH: 50000,
    RESIST: 10,
  },
  COLOR: 13,
  SHAPE: 4,
  SIZE: 25,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  20,     15,      0,      180,    190, 0, ], 
                        TYPE: exports.awp39square,
                            }, {
                    POSITION: [  20,     15,      0,     0,    190, 0, ], 
                        TYPE: exports.awp39square,
                            }, {
                    POSITION: [  12.5,     30,      0,     180,    190, 0, ], 
                        TYPE: exports.awp39triangle,
                            }, {
                    POSITION: [  12.5,     30,      0,     0,    190, 0, ], 
                        TYPE: exports.awp39triangle,
                            }, {
                    POSITION: [ 10,     0,      0,     0,    190, 1, ], 
                        TYPE: exports.hyperboi,
                            },
                ],
            };

//-------------------------------------------------\\
//-------------------------------------------------\\
exports.mkI = {
PARENT: [exports.miniboss],
LABEL: "MK-1",
BODY:{
  FOV: 1.7,
  RESIST: 10,
  HEALTH: 1275,
},
  SIZE: 23,
  COLOR: 3,
SHAPE: 4,
GUNS: [
{
POSITION: [16,4.8,1,0,2.769,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.single]),
TYPE: exports.bullet,
  LABEL: 'Double',
}, },
{
POSITION: [16,4.8,1,0,-2.769,0,0.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.single]),
TYPE: exports.bullet,
  LABEL: 'Double',
}, },
{
POSITION: [12.462,11.2,-1.5,0,0,0,0],
},
],  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 10,     0,      0,     180,    190, 1, ], 
                        TYPE: exports.ranger2,
                            },
                ],
            };

//-----------------------------------Whnhcnivthuithnv
/*exports.afakujii_new = {
PARENT: [exports.afajax],
LABEL: "Afakujii",
SHAPE: 0,
GUNS: [
{
POSITION: [18,8,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.lance, g.halfrange]),
TYPE: exports.bullet,
  LABEL: "Afakujii Lance",
}, },
  {
POSITION: [8.308,32,2,-8.308,-19.385,90,0],
},
{
POSITION: [8.308,32,2,-8.308,19.385,270,0],
},
], };*/
exports.ekIdrone = {
  PARENT: [exports.drone],
  LABEL: 'EK-1',
  FACING_TYPE: 'autospin',
  BODY:{
  FOV: 1.7,
  RESIST: 10,
  HEALTH: 1275,
},
  SHAPE: 0,
  COLOR: 6,
     TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
       POSITION: [10, 10, 0, 360, 360, 0, ],
        TYPE: [exports.auto3gun]
    }, {
        POSITION: [10, 10, 0, 60, 60, 0, ],
        TYPE: [exports.auto3gun]
    }, {
        POSITION: [10, 10, 0, 120, 120, 0, ],
        TYPE: [exports.auto3gun]
    }, {
        POSITION: [10, 10, 0, 180, 180, 0, ],
        TYPE: [exports.auto3gun]
    }, {
        POSITION: [10, 10, 0, 240, 240, 0, ],
        TYPE: [exports.auto3gun]
       }, {
        POSITION: [10, 10, 0, 300, 300, 0, ],
        TYPE: [exports.auto3gun]
        /* }, {
        POSITION: [25, 0, 0, 90, 360, 0, ],
        TYPE: [exports.smasherBody]*/
           }, {
             POSITION: [25, 0, 0, 0, 360, 0, ],
        TYPE: [exports.dominationBody]
        }, {
        POSITION: [10, 0, 0, 0, 360, 1, ],
        TYPE: [exports.bigauto4gun]
    }, ],
};
exports.predaminion = {
PARENT: [exports.minion],
LABEL: "Super Predator",
SHAPE: 0,
GUNS: [
{
POSITION: [30.462,8,1,0,0,0.244,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter,g.preda]),
TYPE: exports.bullet
}, },
{
POSITION: [27.692,11.2,1,0,0,0,0.4],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter,g.preda]),
TYPE: exports.bullet
}, },
{
POSITION: [24.923,14.4,1,0,0,0,0.8],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter,g.preda]),
TYPE: exports.bullet
}, },
{
POSITION: [22.154,17.6,1,0,0,0,1.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
TYPE: exports.bullet
}, },
{
POSITION: [19.385,20.8,1,0,0,0,1.6],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter,g.preda]),
TYPE: exports.bullet
}, },
], 
  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  12,     7,      0,      45,     100,  0], 
                    TYPE: exports.ranger,
                        }, {
                POSITION: [  12,     7,      0,     135,    100,  0], 
                    TYPE: exports.ranger,
                        }, {
                POSITION: [  12,     7,      0,     225,    100,  0], 
                    TYPE: exports.ranger,
                        }, {
                POSITION: [  12,     7,      0,     315,    100,  0], 
                    TYPE: exports.ranger,
                            }, {
                     POSITION: [  12,     4,      0,      45,     100,  1], 
                    TYPE: exports.marksman,
                        }, {
                POSITION: [  12,     4,      0,     135,    100,  1], 
                    TYPE: exports.stream,
                        }, {
                POSITION: [  12,     4,      0,     225,    100,  1], 
                    TYPE: exports.stream,
                        }, {
                POSITION: [  12,     4,      0,     90,    100,  1], 
                    TYPE: exports.hunter,
                        }, {
                POSITION: [  12,     4,      0,     270,    100,  1], 
                    TYPE: exports.hunter,
                        }, {
                POSITION: [  12,     4,      0,     315,    100,  1], 
                    TYPE: exports.marksman,
                        },
            ],
};
            exports.superfalcon = {
                PARENT: [exports.minion],
                LABEL: 'Falcon',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Assassin',
                        }, }, {
                    POSITION: [   5,    8.5,   -1.6,     8,      0,      0,      0,   ], 
                        }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
exports.superhawk = {
                PARENT: [exports.minion],
                LABEL: 'Super Eagle',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  21,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                  LABEL: 'Destroyer',
                        }, }, { 
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
exports.ek6spawner = {
PARENT: [exports.genericTank],
LABEL: "EK-6 Spawner",
SIZE: 12,
SHAPE: 0,
GUNS: [
{
POSITION: [20.769,11.2,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1.5, 1, 0.75, 1, 4.5, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.superfalcon,
  MAX_CHILDREN: 1,
}, },
{
POSITION: [12.462,12.8,-1.5,0,0,0,0],
},
{
POSITION: [4.154,12.8,1,16.615,0,0,0],
},
], };
exports.ek6spawner2 = {
PARENT: [exports.genericTank],
LABEL: "EK-6 Spawner",
SIZE: 12,
SHAPE: 0,
GUNS: [
{
POSITION: [30,11.2,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.superhawk,
  MAX_CHILDREN: 2,
}, },
{
POSITION: [12.462,12.8,-1.5,0,0,0,0],
},
{
POSITION: [4.154,12.8,1,16.615,0,0,0],
},
{
POSITION: [4.154,12.8,1,25.615,0,0,0],
},
], };
exports.whitething ={
  TYPE: 'turret',
  LABEL: 'Some white thing',
  CRAVES_ATTENTION: false,
  SHAPE: 0,
  COLOR: 6
};
exports.gigapreda = {
    PARENT: [exports.genericTank],
    LABEL: "EK-6 Hyper Predator",
    COLOR: 6,
    SHAPE: 0,
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],   
  CRAVES_ATTENTION: false,
    GUNS: [{
            POSITION: [22, 6.4, 1, 0, -4.708, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [22, 6.4, 1, 0, 4.708, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [20, 8, 1, 0, 4.708, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [20, 8, 1, 0, -4.708, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [17, 9.6, 1, 0, -4.708, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [17, 9.6, 1, 0, 4.708, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [3, 6.4, 1, 0, 0, 0, 1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [28, 8, 1, 0, 0, 0, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [26, 9.6, 1, 0, 0, 0, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [24, 11.2, 1, 0, 0, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [22, 12.8, 1, 0, 0, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [20, 14.4, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [20, 4.8, 1.3, 0, 4.154, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sniper]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [20, 4.8, 1.3, 0, -4.154, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sniper]),
                TYPE: exports.bullet
            },
        },
    ],
};
exports.gigapreda2 = {
    PARENT: [exports.genericEntity],
    LABEL: "EK-6 Hyper Predator",
    SHAPE: 0,
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],   
  CRAVES_ATTENTION: false,
    GUNS: [{
            POSITION: [22, 6.4, 1, 0, -4.708, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [22, 6.4, 1, 0, 4.708, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [20, 8, 1, 0, 4.708, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [20, 8, 1, 0, -4.708, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [17, 9.6, 1, 0, -4.708, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [17, 9.6, 1, 0, 4.708, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [3, 6.4, 1, 0, 0, 0, 1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [28, 8, 1, 0, 0, 0, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [26, 9.6, 1, 0, 0, 0, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [24, 11.2, 1, 0, 0, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [22, 12.8, 1, 0, 0, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [20, 14.4, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [25, 10, 1.3, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sniper]),
                TYPE: exports.bullet
            },
        },
    ],
  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 12,     0,      0,     0,    190, 1, ], 
                        TYPE: exports.whitething,
                            },
                ],
            };
exports.obliterate = {
PARENT: [exports.genericEntity],
LABEL: "EK-6 Turret",
SHAPE: 0,
      CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
GUNS: [
{
POSITION: [37.385,1.6,1,0,0,0,4],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
TYPE: exports.bullet
}, },
{
POSITION: [36,3.2,1,0,0,0,3.6],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
TYPE: exports.bullet
}, },
{
POSITION: [34.615,4.8,1,0,0,0,3.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
TYPE: exports.bullet
}, },
{
POSITION: [33.231,6.4,1,0,0,0,2.8],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
TYPE: exports.bullet
}, },
{
POSITION: [31.846,8,1,0,0,0,2.4],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
TYPE: exports.bullet
}, },
{
POSITION: [30.462,9.6,1,0,0,0,2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
TYPE: exports.bullet
}, },
{
POSITION: [29.077,11.2,1,0,0,0,1.6],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
TYPE: exports.bullet
}, },
{
POSITION: [27.692,12.8,1,0,0,0,1.2],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
TYPE: exports.bullet
}, },
{
POSITION: [26.308,14.4,1,0,0,0,0.8],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
TYPE: exports.bullet
}, },
{
POSITION: [24.923,16,1,0,0,0,0.4],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
TYPE: exports.bullet
}, },
{
POSITION: [23.538,17.6,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
TYPE: exports.bullet
}, },
{
POSITION: [15.231,17.6,-1.15,0,0,0,0],
},
],  
  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 12,     0,      0,     0,    190, 1, ], 
                        TYPE: exports.whitething,
                            },
                ],
            };
exports.ekXI = {
    PARENT: [exports.autotank],
    LABEL: 'EK-6',
    SIZE: 50,
    COLOR: 6,
    SHAPE: 6,
  GUNS: [
{
POSITION: [13.846,3.2,1,0,0,240,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.ekIdrone,
  MAX_CHILDREN: 1,
}, },
{
POSITION: [13.846,3.2,1,0,0,300,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.predaminion,
  MAX_CHILDREN: 1,
}, },
{
POSITION: [13.846,3.2,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.ekIdrone,
  MAX_CHILDREN: 1,
}, },
{
POSITION: [13.846,3.2,1,0,0,60,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.predaminion,
  MAX_CHILDREN: 1,
}, },
{
POSITION: [13.846,3.2,1,0,0,120,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.ekIdrone,
  MAX_CHILDREN: 1,
}, },
{
POSITION: [13.846,3.2,1,0,0,180,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 3, 1, 0.00001, 1]]),
TYPE: exports.predaminion,
  MAX_CHILDREN: 1,
}, }, 
{
POSITION: [11,4.8,1,0,0,180,0],
},
{
POSITION: [11,4.8,1,0,0,240,0],
},
{
POSITION: [11,4.8,1,0,0,300,0],
},
{
POSITION: [11,4.8,1,0,0,0,0],
},
{
POSITION: [11,4.8,1,0,0,60,0],
},
{
POSITION: [11,4.8,1,0,0,120,0],
},
{
POSITION: [2,4.8,1,12,0,240,0],
},
{
POSITION: [2,4.8,1,12,0,300,0],
},
{
POSITION: [2,4.8,1,12,0,0,0],
},
{
POSITION: [2,4.8,1,12,0,60,0],
},
{
POSITION: [2,4.8,1,12,0,120,0],
},
{
POSITION: [2,4.8,1,12,0,180,0],
},
],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [3.5, 12, -2, 30, 190, 0, ],
        TYPE: exports.obliterate,
    }, {
        POSITION: [3.5, 12, 2, 30, 190, 0, ],
        TYPE: exports.obliterate,
           }, {
        POSITION: [3.5, 12, -2, 90, 190, 0, ],
        TYPE: exports.obliterate,
           }, {
        POSITION: [3.5, 12, 2, 90, 190, 0, ],
        TYPE: exports.obliterate,
           }, {
        POSITION: [3.5, 12, -2, 150, 190, 0, ],
        TYPE: exports.obliterate,
           }, {
        POSITION: [3.5, 12, 2, 150, 190, 0, ],
        TYPE: exports.obliterate,
           }, {
        POSITION: [3.5, 12, -2, 210, 190, 0, ],
        TYPE: exports.obliterate,
           }, {
        POSITION: [3.5, 12, 2, 210, 190, 0, ],
        TYPE: exports.obliterate,
           }, {
        POSITION: [3.5, 12, -2, 270, 190, 0, ],
        TYPE: exports.obliterate,
           }, {
        POSITION: [3.5, 12, 2, 270, 190, 0, ],
        TYPE: exports.obliterate,
           }, {
        POSITION: [3.5, 12, -2, 330, 190, 0, ],
        TYPE: exports.obliterate,
          }, {
        POSITION: [3.5, 12, 2, 330, 190, 0, ],
        TYPE: exports.obliterate,
            }, {
        POSITION: [23, 0, 0, 0, 190, 0, ],
        TYPE: exports.dominationBody,
              }, {
        POSITION: [0.5, 7, 1.5, 180, 190, 1, ],
        TYPE: exports.bent,
                }, {
        POSITION: [0.5, 7, -1.5, 180, 190, 1, ],
        TYPE: exports.bent,
                  }, {
        POSITION: [0.5, 7, 0, 180, 190, 1, ],
        TYPE: exports.bent,
                                  }, {
        POSITION: [0.5, 7, 1.5, 0, 190, 1, ],
        TYPE: exports.bent,
                }, {
        POSITION: [0.5, 7, -1.5, 0, 190, 1, ],
        TYPE: exports.bent,
                  }, {
        POSITION: [0.5, 7, 0, 0, 190, 1, ],
        TYPE: exports.bent,
                     }, {
        POSITION: [0.5, 7, 1.5, 60, 190, 1, ],
        TYPE: exports.bent,
                }, {
        POSITION: [0.5, 7, -1.5, 60, 190, 1, ],
        TYPE: exports.bent,
                  }, {
        POSITION: [0.5, 7, 0, 60, 190, 1, ],
        TYPE: exports.bent,
                    }, {
        POSITION: [0.5, 7, 1.5, 240, 190, 1, ],
        TYPE: exports.bent,
                }, {
        POSITION: [0.5, 7, -1.5, 240, 190, 1, ],
        TYPE: exports.bent,
                  }, {
        POSITION: [0.5, 7, 0, 240, 190, 1, ],
        TYPE: exports.bent,
                    }, {
        POSITION: [1, 9, 1, 30, 190, 1, ],
        TYPE: [exports.ek6spawner,{COLOR: 6,
                                  }],
                      }, {
        POSITION: [1.5, 12, 0, 30, 190, 1, ],
        TYPE: [exports.ek6spawner2,{COLOR: 6,
                                  }],
                      }, {
        POSITION: [1, 9, -1, 30, 190, 1, ],
        TYPE: [exports.ek6spawner,{COLOR: 6,
                                  }],
                         }, {
        POSITION: [1.5, 11, 0, -30, 190, 1, ],
        TYPE: [exports.ek6spawner2,{COLOR: 6,
                                  }],
                           }, {
        POSITION: [1, 9, 1, -30, 190, 1, ],
        TYPE: [exports.ek6spawner,{COLOR: 6,
                                  }],
                      }, {
        POSITION: [1, 9, -1, -30, 190, 1, ],
        TYPE: [exports.ek6spawner,{COLOR: 6,
                                  }],
                         }, {
        POSITION: [1, 9, 1, 210, 190, 1, ],
        TYPE: [exports.ek6spawner,{COLOR: 6,
                                  }],
                           }, {
        POSITION: [1.5, 11, 0, 210, 190, 1, ],
        TYPE: [exports.ek6spawner2,{COLOR: 6,
                                  }],
                      }, {
        POSITION: [1, 9, -1, 210, 190, 1, ],
        TYPE: [exports.ek6spawner,{COLOR: 6,
                                  }],
                         }, {
        POSITION: [1, 9, 1, -210, 190, 1, ],
        TYPE: [exports.ek6spawner,{COLOR: 6,
                                  }],
                           }, {
        POSITION: [1.5, 11, 0, -210, 190, 1, ],
        TYPE: [exports.ek6spawner2,{COLOR: 6,
                                  }],
                      }, {
        POSITION: [1, 9, -1, -210, 190, 1, ],
        TYPE: [exports.ek6spawner,{COLOR: 6,
                                  }],
                         }, {
        POSITION: [1, 9, 1, 270, 190, 1, ],
        TYPE: [exports.ek6spawner,{COLOR: 6,
                                  }],
                           }, {
        POSITION: [1.5, 11, 0, 270, 190, 1, ],
        TYPE: [exports.ek6spawner2,{COLOR: 6,
                                  }],
                      }, {
        POSITION: [1, 9, -1, 270, 190, 1, ],
        TYPE: [exports.ek6spawner,{COLOR: 6,
                                  }],
                         }, {
        POSITION: [1, 9, 1, -270, 190, 1, ],
        TYPE: [exports.ek6spawner,{COLOR: 6,
                                  }],
                      }, {
        POSITION: [1, 9, -1, -270, 190, 1, ],
        TYPE: [exports.ek6spawner,{COLOR: 6,
                                  }],
                        }, {
        POSITION: [1.5, 11, 0, -270, 190, 1, ],
        TYPE: [exports.ek6spawner2,{COLOR: 6,
                                  }],
                          }, {
        POSITION: [1.5, 5, 1.5, 120, 190, 1, ],
        TYPE: [exports.gigapreda,{COLOR: 6,
                                  }],
                            }, {
        POSITION: [1.5, 5, -1.5, 120, 190, 1, ],
        TYPE: [exports.gigapreda,{COLOR: 6,
                                  }],
                              }, {
        POSITION: [2, 7, 0, 120, 190, 1, ],
        TYPE: [exports.gigapreda,{COLOR: 6,
                                  }],
                                }, {
        POSITION: [1.5, 5, 1.5, 300, 190, 1, ],
        TYPE: [exports.gigapreda,{COLOR: 6,
                                  }],
                            }, {
        POSITION: [1.5, 5, -1.5, 300, 190, 1, ],
        TYPE: [exports.gigapreda,{COLOR: 6,
                                  }],
                          }, {
        POSITION: [2, 7, 0, 300, 190, 1, ],
        TYPE: [exports.gigapreda,{COLOR: 6,
                                  }],
                            }, {
        POSITION: [1.5, 3, 1.5, 30, 190, 1, ],
        TYPE: [exports.gigapreda,{COLOR: 6,
                                  }],
                              }, {
        POSITION: [1.5, 3, 1.5, 210, 190, 1, ],
        TYPE: [exports.gigapreda,{COLOR: 6,
                                  }],
                                 }, {
        POSITION: [1.5, 3, -1.5, 30, 190, 1, ],
        TYPE: [exports.gigapreda,{COLOR: 6,
                                  }],
                              }, {
        POSITION: [1.5, 3, -1.5, 210, 190, 1, ],
        TYPE: [exports.gigapreda,{COLOR: 6,
                                  }],
                                }, {
        POSITION: [0.5, 7, 0, 90, 190, 1, ],
        TYPE: exports.spread,
                              }, {
        POSITION: [0.5, 7, 0, 270, 190, 1, ],
        TYPE: exports.spread,
                                }, {
        POSITION: [0.5, 7, 0, 150, 190, 1, ],
        TYPE: exports.spread,
                              }, {
        POSITION: [0.5, 7, 0, 330, 190, 1, ],
        TYPE: exports.spread,
                                 }, {
        POSITION: [5, 0, 0, 120, 190, 1, ],
        TYPE: exports.gigapreda2,
    }, ],
};

exports.ekII = {
    PARENT: [exports.elite],
    LABEL: 'EK-2',
    SIZE: 40,
    COLOR: 8,
    SHAPE: 0,
  FACING_TYPE: 'autospin',
    AI: {
        NO_LEAD: false,
    },
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [15, 10, 0, 180, 190, 0],
        TYPE: [exports.gunner, {
            COLOR: 6,
        }],
    }, {
        POSITION: [15, 10, 0, 60, 190, 0],
        TYPE: [exports.gunner, {
            COLOR: 6,
        }],
    }, {
        POSITION: [15, 10, 0, -60, 190, 0],
        TYPE: [exports.gunner, {
            COLOR: 6,
        }],
    }, { 
        POSITION: [10, 10, 0, 123, 190, 0],
        TYPE: [exports.cruiser, {
            COLOR: 16,
        }],
    }, {
        POSITION: [10, 10, 0, 0, 190, 0],
        TYPE: [exports.cruiser, {
            COLOR: 16,
        }],
    }, {
        POSITION: [10, 10, 0, -123, 190, 0],
        TYPE: [exports.cruiser, {
            COLOR: 16,
        }],
    }, {
        POSITION: [25, 0, 0, 0, 0, 0],
        TYPE: [exports.dominationBody, {
            COLOR: 9,
        }],
    }, {
        POSITION: [8, 0, 0, 0, -360, 1],
        TYPE: [exports.autoTurret, {
            COLOR: 16,
        }],
    }, ],
};

exports.rkIbody1 = {
    PARENT: [exports.crasher],
    LABEL: 'RK-1',
    COLOR: 35,
    SHAPE: 4,
  CRAVES_ATTENTION: false,
    DANGER: 15,
    GUNS: [{
            POSITION: [18, 3.84, 1.5, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.thruster, g.weak]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [15.231, 3.84, 1.5, 0, 0, 180, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.thruster, g.weak]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [12.462, 3.84, 1.5, 0, 0, 180, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.thruster, g.weak]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [15.231, 3.84, 1.5, 0, -4.154, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.thruster, g.weak]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [12.462, 3.84, 1.5, 0, -4.154, 180, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.thruster, g.weak]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [15.231, 3.84, 1.5, 0, 4.154, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.thruster, g.weak]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [12.462, 3.84, 1.5, 0, 4.154, 180, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.thruster, g.weak]),
                TYPE: exports.bullet
            },
        },
    ],
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 8, -5, 300, 330, 0],
        TYPE: [exports.railgun2, {
            COLOR: 35,
        }]
    }, {
        POSITION: [10, 8, 5, 60, 330, 0],
        TYPE: [exports.railgun2, {
            COLOR: 35,
        }]
    }, ]
};
exports.rkIbody2 = {
        PARENT: [exports.crasher],
        LABEL: 'RK-1',
        COLOR: 35,
        SHAPE: 3,
  CRAVES_ATTENTION: false,
        DANGER: 7,
        BODY: {
            FOV: 1.3,
        },
                    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    GUNS: [{
                           POSITION: [11.077, 4.8, 1, 0, 0, 300, 0],
                        },
                        {
                            POSITION: [8.308, 6.4, 1, 0, 0, 300, 0],
                        },
                        {
                            POSITION: [2.769, 6.4, 1, 9.692, 0, 300.04, 0],
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.factory]),
                                TYPE: exports.minion,
                                MAX_CHILDREN: 4,
                            },
                        },
                        {
                            POSITION: [11.077, 4.8, 1, 0, 0, 60, 0],
                        },
                        {
                            POSITION: [8.308, 6.4, 1, 0, 0, 60, 0],
                        },
                        {
                            POSITION: [2.769, 6.4, 1, 9.692, 0, 60, 0],
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.factory]),
                                TYPE: exports.minion,
                                MAX_CHILDREN: 4,
                            },
                        },
                        {
                            POSITION: [25, 8, 1, 0, 0, 0, 0, ],
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.mini, g.stream]),
                                TYPE: exports.bullet,
                            },
                        }, {
                            POSITION: [23, 8, 1, 0, 0, 0, 0.2, ],
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.mini, g.stream]),
                                TYPE: exports.bullet,
                            },
                        }, {
                            POSITION: [21, 8, 1, 0, 0, 0, 0.4, ],
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.mini, g.stream]),
                                TYPE: exports.bullet,
                            },
                        }, {
                            POSITION: [19, 8, 1, 0, 0, 0, 0.6, ],
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.mini, g.stream]),
                                TYPE: exports.bullet,
                            },
                        }, {
                            POSITION: [17, 8, 1, 0, 0, 0, 0.8, ],
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.mini, g.stream]),
                                TYPE: exports.bullet,
                            },
                        },
                    ],
                };
exports.rkI = {
    PARENT: [exports.miniboss],
    LABEL: 'RK-1',
    COLOR: 35,
  SIZE: 40,
  BODY: {
    FOV: 2,
    HEALTH: 2000,
    RESIST: 7,
    ACCEL: 7,
  },
  CONTROLLERS: ['mapTargetToGoal', 'nearestDifferentMaster'],
    SHAPE: 4,
    DANGER: 15,
      TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  20,     -18.5,      0,      0,    0, 0, ], 
                        TYPE: exports.rkIbody1,
                            }, {
                    POSITION: [  12.5,     14.5,      0,     0,    0, 1, ], 
                        TYPE: exports.rkIbody2,
                            }, {
      POSITION: [10, 8, -5, 300, 330, 0],
        TYPE: [exports.railgun2, {
            COLOR: 35,
        }]
    }, {
        POSITION: [10, 8, 5, 60, 330, 0],
        TYPE: [exports.railgun2, {
            COLOR: 35,
        }]
    }, ]
};
exports.spectator = {
  PARENT: [exports.genericTank],
  LABEL: 'Spectator',
  INVISIBLE: [1, 0.1, 0.0],
  ACCEPTS_SCORE: true,
  CAN_BE_ON_LEADERBOARD: false,
  BODY: {
    HEALTH: 99999999999999999999999999999999999999999999999999999999999999999999999999,
    RESIST: 99999999999999999999999999999999999999999999999999999999999999999999999999,
    REGEN: 999999999999999999999999999999999999999999999999999999999999999999999999999,
    DAMAGE: 0,
    SPEED: 30,
    FOV: 1.7,
    STEALTH: 1
  },
  CRAVES_ATTENTION: false,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  20,     0,      0,      0,    0, 1, ], 
                        TYPE: [exports.rainbowauto,{COLOR: 4}]
    }, ]
};
exports.ball = {
  PARENT: [exports.genericTank],
  LABEL: 'Ball',
  SIZE: 30,
  BRODCAST_MESSAGE: '*sprooooiiiiiiing aging aging aging*("Those springs can be so annoying sometimes"- FTC)',
  BODY: {
    PUSHABILITY: 50,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 0,
        RESIST: 100,
        STEALTH: 0,
    SPEED: 30,
  },
  CRAVES_ATTENTION: false,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  20,     0,      0,      0,    0, 1, ], 
                        TYPE: [exports.rainbowauto,{COLOR: 2}]
    }, ]
};
exports.iceball = {
  PARENT: [exports.genericTank],
  LABEL: 'Ice Ball',
  SIZE: 30,
  BRODCAST_MESSAGE: '*beeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeep*(Annoying high piched noise when hit with it)',
  BODY: {
    PUSHABILITY: 9,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 5,
        RESIST: 100,
        //STEALTH: 1,
    SPEED: 60,
  },
  CRAVES_ATTENTION: false,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  20,     0,      0,      0,    0, 1, ], 
                        TYPE: [exports.rainbowauto,{COLOR: 25}]
    }, ]
};
exports.snowball = {
  PARENT: [exports.genericTank],
  LABEL: 'Snow Ball',
  SIZE: 30,
  BRODCAST_MESSAGE: 'Snow day?',
  BODY: {
    PUSHABILITY: 9,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 0.001,
        RESIST: 100,
        //STEALTH: 1,
    SPEED: 60,
  },
  CRAVES_ATTENTION: false,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  20,     0,      0,      0,    0, 1, ], 
                        TYPE: [exports.rainbowauto,{COLOR: 6}]
    }, ]
};
exports.rainbowball = {
  PARENT: [exports.genericTank],
  LABEL: 'Rainbow Ball',
  SIZE: 30,
  BRODCAST_MESSAGE: 'We like To party...(A couple seconds later...) *truck explodes*',
  BODY: {
    PUSHABILITY: 50,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 0,
        RESIST: 100,
        //STEALTH: 1,
    SPEED: 30,
  },
  CRAVES_ATTENTION: false,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  20,     0,      0,      0,    0, 1, ], 
                        TYPE: [exports.rainbowauto]
    }, ]
};
exports.toxicball = {
  PARENT: [exports.genericTank],
  LABEL: 'Toxic Ball',
  SIZE: 30,
  BRODCAST_MESSAGE: 'bRo! yOu bE tOxIc',
  BODY: {
    PUSHABILITY: 50,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 100,
        RESIST: 100,
        //STEALTH: 1,
    SPEED: 30,
  },
  CRAVES_ATTENTION: false,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  20,     0,      0,      0,    0, 1, ], 
                        TYPE: [exports.rainbowauto,{COLOR: 26}]
    }, ]
};
exports.arenaball = {
  PARENT: [exports.genericTank],
  LABEL: 'Arena Bouncer',
  SIZE: 50,
  BRODCAST_MESSAGE: 'Arena Closed: No Player May Bounce!',
  BODY: {
    PUSHABILITY: 50,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 99999999999,
        RESIST: 100,
        //STEALTH: 1,
    SPEED: 30,
  },
  CRAVES_ATTENTION: false,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  20,     0,      0,      0,    0, 1, ], 
                        TYPE: [exports.rainbowauto,{COLOR: 35}]
    }, ]
};
//---------------------------------\\
//---------------------------------\\
//---------------------------------\\
//---------------------------------\\
//---------------------------------\\
//---------------------------------\\
//---------------------------------\\ 
exports.warship = {
  PARENT: [exports.genericTank],
  LABEL: 'Warship',
  BODY:{
    FOV: 1.3,
      HEALTH: 500,
      REGEN: 4,
      RESIST: 2,
      DAMAGE: 10,
  },
    SHAPE: [[-0.2,0.65],[0.2,0.65],[0.4,0.4],[1.55,0.4],[1.9,0],[1.55,-0.4],[0.4,-0.4],[0.2,-0.65],[-0.2,-0.65],[-0.4,-0.4],[-1.2,-0.4],[-1.3,-0.5],[-1.5,-0.5],[-1.8,-0.2],[-1.8,0.2],[-1.5,0.5],[-1.3,0.5],[-1.2,0.4],[-0.4,0.4]],
  SIZE: 30,
TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  5,     0,      0,      0,     360,  1], 
                    TYPE: exports.marksman,
                        },{
              POSITION: [  3,     15,      0,      0,     360,  1], 
                    TYPE: exports.auto4gun,
                        },{
              POSITION: [  3,     15,      0,      180,     360,  1], 
                    TYPE: exports.auto4gun,
                        },{
                POSITION: [  3.5,     7,      0,      90,     180,  0], 
                    TYPE: exports.railgun2,
                        },{
                POSITION: [  3.5,     7,      0,      270,     180,  0], 
                    TYPE: exports.railgun2,
                        },{
                POSITION: [  2,     5,      7,      270,     0,  0], 
                    TYPE: exports.hiveturret2,
                        },{
                POSITION: [  2,     5,      12,      270,     0,  0], 
                    TYPE: exports.hiveturret2,
                        },{
                POSITION: [  2,     5,      -7,      90,     0,  0], 
                    TYPE: exports.hiveturret2,
                        },{
                POSITION: [  2,     5,      -12,      90,     0,  0], 
                    TYPE: exports.hiveturret2,
                        },{
                POSITION: [  1.5,     10,      2,      180,     360,  1], 
                    TYPE: exports.hybrid,
                        },{
                POSITION: [  1.5,     10,      -2,      180,     360,  1], 
                    TYPE: exports.hybrid,
                        },{
                POSITION: [  1.5,     10,      2,      0,     360,  1], 
                    TYPE: exports.hybrid,
                        },{
                POSITION: [  1.5,     10,      -2,      0,     360,  1], 
                    TYPE: exports.hybrid,
                        },{
                POSITION: [  1.5,     12.5,      2,      180,     360,  1], 
                    TYPE: exports.overlord,
                        },{
                POSITION: [  1.5,     12.5,      -2,      180,     360,  1], 
                    TYPE: exports.overlord,
                        },{
                POSITION: [  1.5,     12.5,      2,      0,     360,  1], 
                    TYPE: exports.overlord,
                        },{
                POSITION: [  1.5,     12.5,      -2,      0,     360,  1], 
                    TYPE: exports.overlord,
                        }
          ]
};
exports.elite_spaceship_drone = {
 PARENT: [exports.elite_spaceship],
  CONTROLLERS:['hangOutNearMaster', 'mapTargetToGoal','nearestDifferentMaster'],
    SIZE: 3,
};
exports.skr_sin4pi45 = {
  PARENT: [exports.elite],
  LABEL: 'SKR-sin((4*pi)/45)',
  SHAPE: 8,
  FACING_TYPE: 'autospin',
  BODY: {
    FOV: 1.3,
    SPEED: 12,
  },
  GUNS: [{
    POSITION: [1,3,1,0,0,0,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.factory]),
      TYPE: [exports.elite_spaceship_drone,{INDEPENDENT: true,}],
      MAX_CHILDREN: 2,
        AUTOFIRE: true,
    }, },
         ],
  TURRETS: [{
  POSITION: [2, -7, 0, 180, 360, 1],
  TYPE: exports.hiveturret2,
  }, {
  POSITION: [2, -7, 0, 0, 360, 1],
  TYPE: exports.hiveturret2,
  }, {
  POSITION: [2, -7, 0, 90, 390, 1],
  TYPE: exports.hiveturret2,
  }, {
  POSITION: [2, -7, 0, 270, 390, 1],
  TYPE: exports.hiveturret2,
  }, {
  POSITION: [2, -7, 0, 45, 360, 1],
  TYPE: exports.hiveturret2,
  }, {
  POSITION: [2, -7, 0, -45, 360, 1],
  TYPE: exports.hiveturret2,
  }, {
  POSITION: [2, -7, 0, 135, 360, 1],
  TYPE: exports.hiveturret2,
  }, {
  POSITION: [2, -7, 0, -135, 360, 1],
  TYPE: exports.hiveturret2,
  }, {
   POSITION: [7, 10, 0, 0, 50, 0],
      TYPE: [exports.skimturret,{COLOR: 5}]
  }, {
   POSITION: [7, 10, 0, 180, 50, 0],
      TYPE: [exports.skimturret,{COLOR: 5}]
  }, {
   POSITION: [7, 10, 0, 90, 50, 0],
      TYPE: [exports.skimturret,{COLOR: 5}]
  }, {
   POSITION: [7, 10, 0, 270, 50, 0],
      TYPE: [exports.skimturret,{COLOR: 5}]
  }, {
   POSITION: [7, 10, 0, 45, 50, 0],
      TYPE: [exports.bigauto4gun,{COLOR: 5}]
  }, {
   POSITION: [7, 10, 0, -45, 50, 0],
      TYPE: [exports.bigauto4gun,{COLOR: 5}]
  }, {
   POSITION: [7, 10, 0, 135, 50, 0],
      TYPE: [exports.bigauto4gun,{COLOR: 5}]
  }, {
   POSITION: [7, 10, 0, -135, 50, 0],
      TYPE: [exports.bigauto4gun,{COLOR: 5}]
  }, {
   POSITION: [5, 0, 0, 0, 360, 1],
      TYPE: [exports.director]
  }
           ],
};
exports.celestialtrapper = {
  PARENT: [exports.auto3gun],
    LABEL: '',
    GUNS: [{
        POSITION:[16, 12, 1, 0, 0, 0, 0],
}, {
     POSITION: [2.5, 12, 1.3, 16, 0, 0, 3],
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.block, g.slow]),
        TYPE: exports.trap,
//        AUTOFIRE: true,
}, },
]
};
//exports.skimturret
exports.celestialbodyS1 = {
  PARENT: [exports.genericTank],
  LABEL: 'Celestial',
  SHAPE: 5,
  COLOR: 2,
  FACING_TYPE: 'autospin',
  TURRETS: [{
    POSITION: [8, 10, 0, 40, 120, 0],
    TYPE: [exports.skimturret],
}, {
    POSITION: [8, 10, 0, -40, 120, 0],
    TYPE: [exports.skimturret],
}, {
    POSITION: [8, 10, 0, 105, 120, 0],
    TYPE: [exports.skimturret],
}, {
    POSITION: [8, 10, 0, -105, 120, 0],
    TYPE: [exports.skimturret],
}, {
    POSITION: [8, 10, 0, 180, 120, 0],
    TYPE: [exports.skimturret],
}, 
  ],
};
exports.celestialbodyS2 = {
    PARENT: [exports.genericTank],
    LABEL: "Celestial",
    BODY: {
    STEALTH: 9999999999999999999,
    },
    COLOR: 2,
    SHAPE: 7,
    MAX_CHILDREN: 12,
    FACING_TYPE: 'autospin',
    GUNS: [{
            POSITION: [3, 4, 1.3, 8, 0, 232.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: exports.drone
            },
        },
        {
            POSITION: [3, 4, 1.3, 8, 0, 284.598, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: exports.drone
            },
        },
        {
            POSITION: [3, 4, 1.3, 8, 0, 334.032, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: exports.drone
            },
        },
        {
            POSITION: [3, 4, 1.3, 8, 0, 26.929, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: exports.drone
            },
        },
        {
            POSITION: [3, 4, 1.3, 8, 0, 77.316, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: exports.drone
            },
        },
        {
            POSITION: [3, 4, 1.3, 8, 0, 129.764, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: exports.drone
            },
        },
        {
            POSITION: [3, 4, 1.3, 8, 0, 180.502, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: exports.drone
            },
        },
    ],
};
exports.celestialS = {
  PARENT: [exports.miniboss],
  LABEL: 'Celestial',
  COLOR: 2,
  SIZE: 45,
  SHAPE: 9,
    BODY: {
    SPEED: 5,
        FOV: 1.4,
    },
    VALUE: 1370000,
  FACING_TYPE: 'autospin',
  TURRETS: [{
  POSITION:[15, 0, 0, 0, 0, 1],
    TYPE: exports.celestialbodyS2,
  },{
  POSITION:[12, 0, 0, 45, 0, 1],
    TYPE: exports.celestialbodyS1,
  },{
    POSITION:[6,10,0,-20, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 20, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 60, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 100, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0,140, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 180, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 220, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 260, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 300, 120, 0],
    TYPE: exports.celestialtrapper,
  },
           ]
};
exports.celestialswarmer = {
  PARENT: [exports.hiveshooter],
    LABEL: '',
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster']
};
exports.celestialbodyH1 = {
  PARENT: [exports.genericTank],
  LABEL: 'Celestial',
  SHAPE: 5,
  COLOR: 14,
  FACING_TYPE: 'autospin',
  TURRETS: [{
    POSITION: [8, 10, 0, 40, 120, 0],
    TYPE: [exports.celestialswarmer],
}, {
    POSITION: [8, 10, 0, -40, 120, 0],
    TYPE: [exports.celestialswarmer],
}, {
    POSITION: [8, 10, 0, 105, 120, 0],
    TYPE: [exports.celestialswarmer],
}, {
    POSITION: [8, 10, 0, -105, 120, 0],
    TYPE: [exports.celestialswarmer],
}, {
    POSITION: [8, 10, 0, 180, 120, 0],
    TYPE: [exports.celestialswarmer],
}, 
  ],
};
exports.celestialH = {
  PARENT: [exports.miniboss],
  LABEL: 'Celestial',
  COLOR: 14,
  SIZE: 45,
  SHAPE: 9,
    BODY: {
    SPEED: 5,
        FOV: 1.4,
    },
    VALUE: 1370000,
  FACING_TYPE: 'autospin',
  TURRETS: [{
  POSITION:[15, 0, 0, 0, 0, 1],
    TYPE: [exports.celestialbodyS2,{COLOR: 14}]
  },{
  POSITION:[12, 0, 0, 45, 0, 1],
    TYPE: exports.celestialbodyH1,
  },{
    POSITION:[6,10,0,-20, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 20, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 60, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 100, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0,140, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 180, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 220, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 260, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 300, 120, 0],
    TYPE: exports.celestialtrapper,
  },
           ]
};
exports.yellowbullet = {
  PARENT: [exports.bullet],
  TURRETS: [{
    POSITION: [20, 0, 0, 0, 0, 1],
    TYPE: [exports.genericTank,{COLOR: 3}],
  },
           ],
};
exports.yellowtrap = {
  PARENT: [exports.trap],
  SHAPE: 1,
  TURRETS: [{
    POSITION:[20, 0, 0, 0, 0, 1],
    TYPE: [exports.trap,{COLOR: 3}],
  },
            ],
};
exports.def_auto = {
  PARENT:[exports.auto3gun],
LABEL: '',
  GUNS: [{
    POSITION: [18, 8, 0, 0, 0, 0, 0],
    PROPERTIES:{
      SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.auto]),
      TYPE: exports.yellowbullet
    }, },
         ],
};
exports.defender = {
  PARENT: [exports.miniboss],
  LABEL: 'Defender',
  SHAPE: 3,
  COLOR: 2,
  SIZE: 25,
    FACING_TYPE: 'autospin',
  GUNS:[{
    POSITION:[12, 7, 1, 0, 0, 60, 0],
  }, {
    POSITION:[12, 7, 1, 0, 0, 180, 0]
  }, {
    POSITION:[12, 7, 1, 0, 0, 300, 0]
  }, {
    POSITION:[4, 7, 1.5, 12, 0, 60, 0],
    PROPERTIES:{
      SHOOT_SETTINGS: combineStats([g.trap, g.block]),
      TYPE: exports.yellowtrap,
      AUTOFIRE: true,
    }, }, {
      POSITION:[4, 7, 1.5, 12, 0, 180, 0],
    PROPERTIES:{
      SHOOT_SETTINGS: combineStats([g.trap, g.block]),
      TYPE: exports.yellowtrap,
      AUTOFIRE: true,
    }, }, {
      POSITION:[4, 7, 1.5, 12, 0, 300, 0],
    PROPERTIES:{
      SHOOT_SETTINGS: combineStats([g.trap, g.block]),
      TYPE: exports.yellowtrap,
      AUTOFIRE: true,
    }, },
       ],
  TURRETS: [{
  POSITION:[5, 7, 0, 120, 360, 1],
    TYPE: exports.def_auto,
  }, {
  POSITION:[5, 7, 0, 240, 360, 1],
    TYPE: exports.def_auto,
  }, {
  POSITION:[5, 7, 0, 0, 360, 1],
    TYPE: exports.def_auto,
  },
           ],
};
exports.awp_a_a = {
    PARENT: [exports.genericTank],
    LABEL: "AWP-A-A",
    SIZE: 20,
    SHAPE: 4,
    GUNS: [{
            POSITION: [28, 3.2, 1, 0, -2.769, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [28, 3.2, 1, 0, 2.769, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [28, 3.2, 1, 0, 1.385, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [28, 3.2, 1, 0, -1.385, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [28, 3.2, 1, 0, 0, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner]),
                TYPE: exports.bullet
            },
        },
        {
            POSITION: [12, 11.2, -1.3, 0, 0, 0, 0],
        },
        {
            POSITION: [1.385, 9, 1.2, 19, 0, 0, 0],
        },
        {
            POSITION: [1.385, 11, 1, 21, 0, 0, 0],
        },
        {
            POSITION: [13.5, 2.24, -1.6, 0, 4, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.swarm
            },
        },
        {
            POSITION: [13.5, 2.24, -1.6, 0, -4, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.swarm
            },
        },
        {
            POSITION: [12, 13, -1.3, 0, 0, 180, 0],
        },
    ],
};
exports.celestialbodyO1 = {
  PARENT: [exports.genericTank],
  LABEL: 'Celestial',
  SHAPE: 5,
  COLOR: 3,
  FACING_TYPE: 'autospin',
  TURRETS: [{
    POSITION: [8, 10, 0, 40, 120, 0],
    TYPE: [exports.obliterate],
}, {
    POSITION: [8, 10, 0, -40, 120, 0],
    TYPE: [exports.obliterate],
}, {
    POSITION: [8, 10, 0, 105, 120, 0],
    TYPE: [exports.obliterate],
}, {
    POSITION: [8, 10, 0, -105, 120, 0],
    TYPE: [exports.obliterate],
}, {
    POSITION: [8, 10, 0, 180, 120, 0],
    TYPE: [exports.obliterate],
}, 
  ],
};
//exports.gigapreda
exports.celestialbodyO2 = {
    PARENT: [exports.genericTank],
    LABEL: "Celestial",
    BODY: {
    STEALTH: 9999999999999999999,
    },
    COLOR: 3,
    SHAPE: 7,
    FACING_TYPE: 'autospin',
  TURRETS: [{
    POSITION: [8, 10, 0, 232.5, 120, 0],
    TYPE: [exports.gigapreda],
}, {
    POSITION: [8, 10, 0, 284.598, 120, 0],
    TYPE: [exports.gigapreda],
}, {
    POSITION: [8, 10, 0, 334.032, 120, 0],
    TYPE: [exports.gigapreda],
}, {
    POSITION: [8, 10, 0, 26.929, 120, 0],
    TYPE: [exports.gigapreda],
}, {
    POSITION: [8, 10, 0, 77.316, 120, 0],
    TYPE: [exports.gigapreda],
}, {
    POSITION: [8, 10, 0, 180.502, 120, 0],
    TYPE: [exports.gigapreda],
}, {
    POSITION: [8, 10, 0, 129.764, 120, 0],
    TYPE: [exports.gigapreda],
}, 
  ],
};
exports.celestialO = {
  PARENT: [exports.miniboss],
  LABEL: 'Celestial',
  COLOR: 3,
  SIZE: 45,
  SHAPE: 9,
    BODY: {
    SPEED: 5,
        FOV: 1.4,
    },
    VALUE: 1370000,
  FACING_TYPE: 'autospin',
  TURRETS: [{
  POSITION:[15, 0, 0, 0, 0, 1],
    TYPE: exports.celestialbodyO2,
  },{
  POSITION:[12, 0, 0, 45, 0, 1],
    TYPE: exports.celestialbodyO1,
  },{
    POSITION:[6,10,0,-20, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 20, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 60, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 100, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0,140, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 180, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 220, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 260, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 300, 120, 0],
    TYPE: exports.celestialtrapper,
  },
           ]
};
exports.tkI = {
PARENT: [exports.miniboss],
LABEL: "TK-1",
SIZE: 20,
SHAPE: 3,
  COLOR: 2,
  FACING_TYPE: 'autospin',
GUNS: [
{
POSITION: [8.308,3.2,1,0,0,300,0],
},
{
POSITION: [1.385, 3.2, 1.3, 8.308, 0, 300, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap, g.block]),
TYPE: exports.block
}, },
{
POSITION: [8.308,3.2,1,0,0,180,0],
},
{
POSITION: [1.385, 3.2, 1.3, 8.308, 0, 180, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap, g.block]),
TYPE: exports.block
}, },
{
POSITION: [8.308,3.2,1,0,0,60,0],
},
{
POSITION: [1.385, 3.2, 1.3, 8.308, 0, 60, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap, g.block]),
TYPE: exports.block
}, },
{
POSITION: [8,3.2,1,4.154,-5.538,180,0],
},
{
POSITION: [1.692, 3.2, 1.3, 8.308, -5.538, 180, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap, g.block]),
TYPE: exports.block
}, },
{
POSITION: [8,3.2,1,4.154,-5.538,300,0],
},
{
POSITION: [1.692, 3.2, 1.3, 12, -5.538, 300, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap, g.block]),
TYPE: exports.block
}, },
{
POSITION: [8,3.2,1,4.154,-5.538,60,0],
},
{
POSITION: [1.692, 3.2, 1.3, 12, -5.538, 60, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap, g.block]),
TYPE: exports.block
}, },
{
POSITION: [8,3.2,1,4.154,5.538,300,0],
},
{
POSITION: [1.692, 3.2, 1.3, 8.308, 5.538, 300, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap, g.block]),
TYPE: exports.block
}, },
{
POSITION: [8,3.2,1,4.154,5.538,60,0],
},
{
POSITION: [1.692, 3.2, 1.3, 12, 5.538, 60, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap, g.block]),
TYPE: exports.block
}, },
{
POSITION: [8,3.2,1,4.154,5.538,180,0],
},
{
POSITION: [1.692, 3.2, 1.3, 12, 5.538, 180, 0 ],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.trap, g.block]),
TYPE: exports.block
}, },
], 
TURRETS: [{
  POSITION: [7, 0, 0, 0, 360, 1],
  TYPE: exports.hunter,
},
  ]
};
exports.comet = {
  PARENT: [exports.miniboss],
    LABEL: 'Comet',
    COLOR: 0,
    SHAPE: 0,
    SIZE: 25,
    BODY: {
    SPEED: 7,
        FOV: 1.3,
    },
GUNS: [
{
POSITION: [12.462,8,1.5,0,0,210,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.thruster]),
TYPE: exports.bullet
}, },
{
POSITION: [12.462,8,1.7,0,0,-210,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.thruster]),
TYPE: exports.bullet
}, },
{
POSITION: [27.154,8,1.5,0,0,180,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.thruster, g.thruster]),
TYPE: exports.bullet
}, },
], 
TURRETS: [{
    POSITION: [5, 5, 0, 0, 360, 1],
    TYPE: exports.pelter2,
}, {
    POSITION: [5, 5, 0, 90, 360, 1],
    TYPE: exports.pelter2,
}, {
    POSITION: [5, 5, 0, 180, 360, 1],
    TYPE: exports.pelter2,
}, {
    POSITION: [5, 5, 0, 270, 360, 1],
    TYPE: exports.pelter2,
}
         ],
};
exports.dropshipboss = {
  PARENT: [exports.miniboss],
  LABEL: 'Dropship',
  SHAPE: [[0.45,-0.01],[-0.18,-0.36],[-0.35,-0.68],[1,0],[-0.35,0.68],[-0.18,0.36]],
  VALUE: 75000,
  BODY:{
    HEALTH: 1500,
    RESIST: 3,
    DAMAGE: 30,
    SPEED: 20,
  },
    COLOR: 6,
  SIZE: 25,
    GUNS: [{
      POSITION:[1, 2, 1.5, 0, 7, 150, 0],  
   PROPERTIES:{
   SHOOT_SETTINGS: combineStats([g.drone, g.over, g.pet]),
       TYPE: exports.dropshipdrone,
       MAX_CHILDREN: 10,
       AUTOFIRE: true,
   }, }, {
      POSITION:[1, 2, 1.5, 0, -7, 210, 0],  
         PROPERTIES:{
   SHOOT_SETTINGS: combineStats([g.drone, g.over, g.pet]),
       TYPE: exports.dropshipdrone,
       MAX_CHILDREN: 10,
       AUTOFIRE: true,
   }, },
          ],
    TURRETS:[{
      POSITION:[4, 7, 0, 0, 360, 1],
        TYPE: exports.sniper3gun,
    }, {
      POSITION: [3, 4.5, 0, 60, 120, 0],
        TYPE: exports.construct,
    }, {
      POSITION: [3, 4.5, 0, -60, 120, 0],
        TYPE: exports.construct,
    },
            ],
};
exports.steamdom = {
PARENT: [exports.genericTank],
LABEL: "Steamroller Dominator",
SIZE: 20,
SHAPE: 0,
  SKILLS: [0, 0, 0, 9, 9, 9, 9, 0, 0, 0],
  LEVEL: 75,
  CAN_BE_ON_LEADERBOARD: false,
              SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
            BODY: { // def
                SPEED: 0,
                HEALTH: 1000, 
                DAMAGE: 10, 
                PENETRATION: 0.25, 
                SHIELD: 10,
                REGEN: 100,
                FOV: 1,
                PUSHABILITY: 0,
                HETERO: 0,
            },
GUNS: [
{
POSITION: [22.154,3,1,0,0,0,0],
},
{
POSITION: [7.5,9.6,1,22.154,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.sniper, g.assass]),
TYPE: exports.bullet
}, },
{
POSITION: [12.077,10.6,-1.5,0,0,0,0],
},
], 
TURRETS: [{
POSITION: [  25,     0,      0,      0,     360,  0], 
    TYPE: exports.dominationBody3
    },
],
};
exports.ac = {
  PARENT: [exports.genericTank],
    LABEL: 'Arena Closer',
    DANGER: 99999999999999999999999999999999,
    SIZE: 30,
    BODY:{
     HEALTH: 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,   
    RESIST: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
    REGEN: 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
    SHIELD: 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
    DAMAGE: 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
    PUSHABILITY: 0,
    },
    COLOR: 3,
    GUNS: [{
        POSITION: [16.5, 9, 1, 0, 0, 0, 0],
        PROPERTIES:{
            SHOOT_SETTINGS: combineStats([g.basic, g.op]),
            TYPE: exports.bullet,
        }, }
          ],
};
exports.ac3gun = {
  PARENT: [exports.auto3gun],
    LABEL: 'Arena Closer',
    DANGER: 99999999999999999999999999999999,
    SIZE: 30,
    BODY:{
     HEALTH: 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,   
    RESIST: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
    REGEN: 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
    SHIELD: 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
    DAMAGE: 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
    PUSHABILITY: 0,
    },
    COLOR: 3,
    GUNS: [{
        POSITION: [16.5, 9, 1, 0, 0, 0, 0],
        PROPERTIES:{
            SHOOT_SETTINGS: combineStats([g.basic, g.op]),
            TYPE: exports.bullet,
        }, }
          ],
};
exports.ac3 = {
  PARENT: [exports.genericTank],
    LABEL: 'Arena Closer-3',
    DANGER: 99999999999999999999999999999999,
    SIZE: 30,
    FACING_TYPE: 'autospin',
    BODY:{
     HEALTH: 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,   
    RESIST: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
    REGEN: 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
    SHIELD: 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
    DAMAGE: 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
    PUSHABILITY: 0,
    },
    COLOR: 3,
    TURRETS: [{
      POSITION: [9, 10, 0, 0, 150, 0],
       TYPE: exports.ac3gun, 
    },{
      POSITION: [9, 10, 0, 120, 150, 0],
       TYPE: exports.ac3gun, 
    },{
      POSITION: [9, 10, 0, 240, 150, 0],
       TYPE: exports.ac3gun, 
    },
             ],
};
exports.celestialbodyC1 = {
  PARENT: [exports.genericTank],
  LABEL: 'Celestial',
  SHAPE: 5,
  COLOR: 25,
  FACING_TYPE: 'autospin',
  TURRETS: [{
    POSITION: [8, 10, 0, 40, 120, 0],
    TYPE: [exports.chiller],
}, {
    POSITION: [8, 10, 0, -40, 120, 0],
    TYPE: [exports.chiller],
}, {
    POSITION: [8, 10, 0, 105, 120, 0],
    TYPE: [exports.chiller],
}, {
    POSITION: [8, 10, 0, -105, 120, 0],
    TYPE: [exports.chiller],
}, {
    POSITION: [8, 10, 0, 180, 120, 0],
    TYPE: [exports.chiller],
}, 
  ],
};
exports.celestialC = {
  PARENT: [exports.miniboss],
  LABEL: 'Celestial',
  COLOR: 25,
  SIZE: 45,
  SHAPE: 9,
    BODY: {
    SPEED: 5,
        FOV: 1.4,
    },
    VALUE: 1370000,
  FACING_TYPE: 'autospin',
  TURRETS: [{
  POSITION:[15, 0, 0, 0, 0, 1],
    TYPE: [exports.celestialbodyS2,{COLOR: 25}]
  },{
  POSITION:[12, 0, 0, 45, 0, 1],
    TYPE: exports.celestialbodyC1,
  },{
    POSITION:[6,10,0,-20, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 20, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 60, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 100, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0,140, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 180, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 220, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 260, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 300, 120, 0],
    TYPE: exports.celestialtrapper,
  },
           ]
};
exports.celestialbodyA1 = {
  PARENT: [exports.genericTank],
  LABEL: 'Celestial',
  SHAPE: 5,
  COLOR: 26,
  FACING_TYPE: 'autospin',
  TURRETS: [{
    POSITION: [8, 10, 0, 40, 120, 0],
    TYPE: [exports.acid],
}, {
    POSITION: [8, 10, 0, -40, 120, 0],
    TYPE: [exports.acid],
}, {
    POSITION: [8, 10, 0, 105, 120, 0],
    TYPE: [exports.acid],
}, {
    POSITION: [8, 10, 0, -105, 120, 0],
    TYPE: [exports.acid],
}, {
    POSITION: [8, 10, 0, 180, 120, 0],
    TYPE: [exports.acid],
}, 
  ],
};
exports.celestialA = {
  PARENT: [exports.miniboss],
  LABEL: 'Celestial',
  COLOR: 25,
  SIZE: 45,
  SHAPE: 9,
    BODY: {
    SPEED: 5,
        FOV: 1.4,
    },
    VALUE: 1370000,
  FACING_TYPE: 'autospin',
  TURRETS: [{
  POSITION:[15, 0, 0, 0, 0, 1],
    TYPE: [exports.celestialbodyS2,{COLOR: 26}]
  },{
  POSITION:[12, 0, 0, 45, 0, 1],
    TYPE: exports.celestialbodyA1,
  },{
    POSITION:[6,10,0,-20, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 20, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 60, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 100, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0,140, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 180, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 220, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 260, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 300, 120, 0],
    TYPE: exports.celestialtrapper,
  },
           ]
};
exports.flamerauto = {
  PARENT:[exports.auto3gun],
  LABEL: '',
  SHAPE: [[0,-0.5],[1.5,-0.5],[1.43,-0.4],[1.72,-0.29],[1.8,-0.12],[2,-0.005],[1.8,0.12],[1.72,0.29],[1.42,0.4],[1.5,0.5],[0,0.5]],
  GUNS: [{
  POSITION:[16, 6, 0, 0, 0, 0, 0],
    PROPERTIES:{
      SHOOT_SETTINGS: combineStats([g.flame]),
      TYPE: exports.bullet
  }, },
        ],
  TURRETS:[{
  POSITION:[20, 0, 0, 0, 0, 1],
  TYPE: exports.genericTank,
},
  ],
};    
exports.flamer3 = {
  PARENT: [exports.genericTank],
    LABEL: 'Flamethrower-3',
    DANGER: 12,
    FACING_TYPE: 'autospin',
    TURRETS: [{
      POSITION: [9, 10, 0, 0, 150, 0],
       TYPE: exports.flamerauto, 
    },{
      POSITION: [9, 10, 0, 120, 150, 0],
       TYPE: exports.flamerauto, 
    },{
      POSITION: [9, 10, 0, 240, 150, 0],
       TYPE: exports.flamerauto, 
    },
             ],
};
exports.flamerlutionist = {
  PARENT:[exports.genericTank],
    LABEL: 'Flamethrower 2.0',
    DANGER: 18,
    TURRETS:[{
      POSITION:[20, 0, 0, 0, 1, 0],
        TYPE: exports.flamerauto,
    },
            ],
};
exports.bowturret = {
  PARENT:[exports.auto3gun],
  LABEL:'',
  GUNS: [
{
POSITION: [22.154,6,1,0,0,0,0],
},
{
POSITION: [7.5,12.6,1,22.154,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.sniper, g.assass]),
TYPE: exports.bullet
}, },
], 
};
exports.bowbody = {
  PARENT:[exports.genericTank],
  LABEL: 'Bow',
  SHAPE: [[-1,0],[0,-1],[1,0],[0,1],[-0.7,0.3],[-0.4,0],[0,0.4],[0.4,0],[0,-0.4],[-0.7,0.3]],
  COLOR: 2,
};
exports.bow = {
PARENT: [exports.miniboss],
  LABEL: 'Bow',
  COLOR: 3,
  DANGER: 12,
  SHAPE: [[-1,0],[0,-1],[1,0],[0,1]],
  TURRETS:[{
  POSITION:[7, 0, 0, 0, 360, 1],
    TYPE: exports.bowturret,
  }, {
    POSITION:[20, -14, 0, 90, 0, 0],
    TYPE: exports.bowbody,
  },{
   POSITION:[20, -14, 0, 270, 0, 0],
   TYPE: exports.bowbody,
  },
    ],
};
exports.custombodytest = {
  PARENT: [exports.genericTank],  
    LABEL: 'Shape/Image test',
    SHAPE: 10004,
};
exports.flailpart6 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  GUNS: [{
    POSITION: [30,5,1,0,0,0,0,0],
    PROPERTIES:{
      SHOOT_SETTINGS: combineStats([g.flail, g.halfrange]),
      TYPE: exports.bullet,
      AUTOFIRE: true,
  }, },
        ],
  TURRETS: [{
    POSITION: [25, 35, 0, 0, 0, 1],
    TYPE: exports.smash,
  },
           ],
};
exports.flailpart5 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  GUNS: [{
    POSITION: [30,5,1,0,0,0,0,0],
  },
        ],
  TURRETS: [{
    POSITION: [20, 30, 0, 0, 0, 1],
    TYPE: exports.flailpart6,
  },
           ],
};
exports.flailpart4 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  GUNS: [{
    POSITION: [30,5,1,0,0,0,0,0],
  },
        ],
  TURRETS: [{
    POSITION: [20, 30, 0, 0, 0, 1],
    TYPE: exports.flailpart5,
  },
           ],
};
exports.flail2 = {
  PARENT: [exports.flail],
  LABEL: 'Flail',
    GUNS: [],
  TURRETS: [{
    POSITION:[5, 10, 0, 0, 0, 0],
    TYPE: exports.flailpart4
  },
           ],
};
exports.dwh = {
  PARENT: [exports.genericTank],
  LABEL: 'Double Whammy',
  DANGER: 8,
  TURRETS: [{
    POSITION:[5, 10, 0, 0, 0, 0],
    TYPE: exports.flailpart4
  },{
    POSITION:[5, 10, 0, 180, 0, 0],
    TYPE: exports.flailpart4
  },
           ],
};
exports.flail2part6 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  GUNS: [{
    POSITION: [30,5,1,0,0,0,0,0],
    PROPERTIES:{
      SHOOT_SETTINGS: combineStats([g.mace, g.flail, g.halfrange]),
      TYPE: exports.bullet,
      AUTOFIRE: true,
  }, },
        ],
  TURRETS: [{
    POSITION: [60, 50, 0, 0, 0, 1],
    TYPE: exports.spike,
  },
           ],
};
exports.flail2part5 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  GUNS: [{
    POSITION: [30,5,1,0,0,0,0,0],
  },
        ],
  TURRETS: [{
    POSITION: [20, 30, 0, 0, 0, 1],
    TYPE: exports.flail2part6,
  },
           ],
};
exports.flail2part4 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  GUNS: [{
    POSITION: [30, 5, 1, 0, 0, 0, 0, 0],
  },
        ],
  TURRETS: [{
    POSITION: [20, 30, 0, 0, 0, 1],
    TYPE: exports.flail2part5,
  },
           ],
};
exports.mace = {
  PARENT: [exports.genericTank],
  LABEL: 'Mace',
  DANGER: 12,
  BODY:{
    SPEED: 2,
  },
  TURRETS:[{
  POSITION: [5, 10, 0, 0, 0, 0],
  TYPE: exports.flail2part4,
  },
          ],
};
exports.flail3part6 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  GUNS: [{
    POSITION: [30,5,1,0,0,0,0,0],
    PROPERTIES:{
      SHOOT_SETTINGS: combineStats([g.flail, g.halfrange]),
      TYPE: exports.icebullet,
      AUTOFIRE: true,
  }, },
        ],
  TURRETS: [{
    POSITION: [23, 30, 0, 0, 0, 1],
    TYPE: [exports.smash,{COLOR: 25}]
  },
           ],
};
exports.flail3part5 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  GUNS: [{
    POSITION: [30,5,1,0,0,0,0,0],
  },
        ],
  TURRETS: [{
    POSITION: [20, 30, 0, 0, 0, 1],
    TYPE: exports.flail3part6,
  },
           ],
};
exports.flail3part4 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  GUNS: [{
    POSITION: [30,5,1,0,0,0,0,0],
  },
        ],
  TURRETS: [{
    POSITION: [20, 30, 0, 0, 0, 1],
    TYPE: exports.flail3part5,
  },
           ],
};
exports.icicle = {
  PARENT: [exports.flail],
  LABEL: 'Icicle',
  DANGER: 9,
    GUNS: [],
  TURRETS: [{
    POSITION:[5, 10, 0, 0, 0, 0],
    TYPE: exports.flail3part4
  },
           ],
};
exports.basicalpha = {
    PARENT: [exports.genericTank],
    LABEL: 'Trap Shooter(First ever alpha created this tank)',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.4,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.trap,
            
        }, }, 
    ],
};
exports.octopet = {
  PARENT: [exports.octo],
  LABEL: 'Octo-Pet',
  BODY:{
    HEALTH: 9999999999999999999999999999999999,
    SHIELD: 9999999999999999999999999999999999,
    REGEN: 9999999999999999999999999999999999,
    RESIST: 9999999999999999999999999999999999,
    STEALTH: 999999999999999999999999999999999,
    DAMAGE: 0,
  },
  POISON_IMMUNE: true,
  ACCEPTS_SCORE: false,
  CAN_BE_ON_LEADERBOARD: false,
  INDEPENDENT: true,
  CONTROLLERS: ['hangOutNearMaster'],
  TURRETS: [{
  POSITION:[20, 0, 0, 0, 0, 1],
    TYPE: [exports.genericTank,
           {
           COLOR: 36,
           },
          ],
  },
           ],
};
exports.twinceptionpet = {
  PARENT: [exports.twin],
  LABEL: 'Twinception Pet',
  BODY:{
    HEALTH: 9999999999999999999999999999999999,
    SHIELD: 9999999999999999999999999999999999,
    REGEN: 9999999999999999999999999999999999,
    RESIST: 9999999999999999999999999999999999,
    STEALTH: 999999999999999999999999999999999,
    DAMAGE: 0,
  },
  POISON_IMMUNE: true,
  ACCEPTS_SCORE: false,
  CAN_BE_ON_LEADERBOARD: false,
  INDEPENDENT: true,
  CONTROLLERS: ['hangOutNearMaster'],
  TURRETS: [{
  POSITION:[20, 0, 0, 0, 0, 1],
    TYPE: [exports.genericTank,{COLOR: 10}],
  }, {
    POSITION:[12, 0, 0, 180, 0, 1],
    TYPE: exports.twin
  },
           ],
};
exports.helipart1 = {
  PARENT: [exports.genericTank],
    COLOR: 12,
    CONTROLLERS: ['reversespin'],
    INDEPENDENT: true,
    GUNS: [{
    POSITION: [16, 6, -1.5, 0, 0, 0, 0],
        PROPERTIES: {
         COLOR: 9,   
    }, },{
    POSITION: [16, 6, -1.5, 0, 0, 90, 0],
        PROPERTIES: {
         COLOR: 9,   
    }, }, {
    POSITION: [16, 6, -1.5, 0, 0, 180, 0],
        PROPERTIES: {
         COLOR: 9,   
    }, },{
    POSITION: [16, 6, -1.5, 0, 0, 270, 0],
        PROPERTIES: {
         COLOR: 9,   
    }, },
          ],
};
exports.helipart2 = {
  PARENT: [exports.genericTank],
    COLOR: 12,
    CONTROLLERS: ['reversespin'],
    INDEPENDENT: true,
    GUNS: [{
    POSITION: [30, 4, -1, 0, 0, 0, 0],
        PROPERTIES: {
         COLOR: 9,   
    }, },{
    POSITION: [30, 4, -1, 0, 0, 90, 0],
        PROPERTIES: {
         COLOR: 9,   
    }, }, {
    POSITION: [30, 4, -1, 0, 0, 180, 0],
        PROPERTIES: {
         COLOR: 9,   
    }, },{
    POSITION: [30, 4, -1, 0, 0, 270, 0],
        PROPERTIES: {
         COLOR: 9,   
    }, }, {
    POSITION: [16, 4, -1.5, 0, 0, 0, 0],
        PROPERTIES: {
         COLOR: 12,   
    }, },{
    POSITION: [16, 4, -1.5, 0, 0, 90, 0],
        PROPERTIES: {
         COLOR: 12,   
    }, }, {
    POSITION: [16, 4, -1.5, 0, 0, 180, 0],
        PROPERTIES: {
         COLOR: 12,   
    }, },{
    POSITION: [16, 4, -1.5, 0, 0, 270, 0],
        PROPERTIES: {
         COLOR: 12,   
    }, }, 
          ],
};
exports.charlespet = {
            PARENT: [exports.genericTank],
            NAME: 'Charles',
            LABEL: 'Greatest Plan!',
            BODY:{
    HEALTH: 9999999999999999999999999999999999,
    SHIELD: 9999999999999999999999999999999999,
    REGEN: 9999999999999999999999999999999999,
    RESIST: 9999999999999999999999999999999999,
    STEALTH: 999999999999999999999999999999999,
    DAMAGE: 0,
  },
  POISON_IMMUNE: true,
  ACCEPTS_SCORE: false,
  CAN_BE_ON_LEADERBOARD: false,
  INDEPENDENT: true,
  CONTROLLERS: ['hangOutNearMaster'],
            GUNS:[{
            POSITION: [16, 10, -1.5, 0, 0, 180, 0],
                PROPERTIES: {
                    COLOR: 12,
            }, },
                 ],
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }, {
            POSITION:[20, 0, 0, 0, 0, 1],
                TYPE: [exports.genericTank,{COLOR: 12}]
            }, {
            POSITION: [7, 16, 0, 180, 360, 1],
                TYPE: exports.helipart1,
            }, {
            POSITION: [12, 0, 0, 0, 360, 1],
              TYPE: exports.helipart2,
            },
                     ],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
exports.petusage1 = {
            PARENT: [exports.genericTank],
            LABEL: 'Developer',
     //CONTROLLERS: ['nearestDifferentMaster'],          
  RESET_UPGRADES: true,
            //SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
            LEVEL: 45,
            BODY: { // def
                //SHIELD: 1000,
                //REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: 0,
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, },  {
                POSITION: [  0.5,    7,    1,     0,      0,      180,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.pet, g.factory]),
                    TYPE: exports.octopet, 
                    MAX_CHILDREN: 1,
                    AUTOFIRE: true,
                }, }, 
            ],
        };
exports.petusage2 = {
            PARENT: [exports.genericTank],
            LABEL: 'Beta Tester',
     //CONTROLLERS: ['nearestDifferentMaster'],          
  RESET_UPGRADES: true,
            //SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
            LEVEL: 45,
            BODY: { // def
                //SHIELD: 1000,
                //REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: 0,
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, },  {
                POSITION: [  0.5,    7,    1,     0,      0,      180,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.pet, g.factory]),
                    TYPE: exports.mkIpet, 
                    MAX_CHILDREN: 1,
                    AUTOFIRE: true,
                }, }, 
            ],
        };
exports.petusage3 = {
            PARENT: [exports.genericTank],
            LABEL: 'Senior Tester',
     //CONTROLLERS: ['nearestDifferentMaster'],          
  RESET_UPGRADES: true,
            //SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
            LEVEL: 45,
            BODY: { // def
                //SHIELD: 1000,
                //REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: 0,
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, {
                POSITION: [  0.5,    7,    1,     0,      0,      180,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.pet, g.factory]),
                    TYPE: exports.twinceptionpet, 
                    MAX_CHILDREN: 1,
                    AUTOFIRE: true,
                }, }, {
                POSITION: [  0.5,    7,    1,     0,      0,      180,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.pet, g.factory]),
                    TYPE: exports.charlespet, //This is the greatest plaaaaaan...!
                    MAX_CHILDREN: 1,
                    AUTOFIRE: true,
                }, }, 
            ],
        };
exports.petpage = {
            PARENT: [exports.genericTank],
            LABEL: 'Pets',
     //CONTROLLERS: ['nearestDifferentMaster'],          
  RESET_UPGRADES: true,
            //SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
            LEVEL: 45,
            BODY: { // def
                //SHIELD: 1000,
                //REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: 0,
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, },
            ],
        };
exports.skIpet = {
  PARENT: [exports.skI],
  LABEL: 'SK-1 Pet',
 BODY:{
    HEALTH: 9999999999999999999999999999999999,
    SHIELD: 9999999999999999999999999999999999,
    REGEN: 9999999999999999999999999999999999,
    RESIST: 9999999999999999999999999999999999,
    STEALTH: 999999999999999999999999999999999,
    DAMAGE: 0,
  },
  POISON_IMMUNE: true,
  ACCEPTS_SCORE: false,
  CAN_BE_ON_LEADERBOARD: false,
  INDEPENDENT: true,
  CONTROLLERS: ['hangOutNearMaster'],
};
exports.ka2pet = {
  PARENT: [exports.overlord],
  //NAME: 'KA2',
 BODY:{
    HEALTH: 9999999999999999999999999999999999,
    SHIELD: 9999999999999999999999999999999999,
    REGEN: 9999999999999999999999999999999999,
    RESIST: 9999999999999999999999999999999999,
    STEALTH: 999999999999999999999999999999999,
    DAMAGE: 0,
  },
  POISON_IMMUNE: true,
  ACCEPTS_SCORE: false,
  CAN_BE_ON_LEADERBOARD: false,
  INDEPENDENT: true,
  CONTROLLERS: ['hangOutNearMaster'],
  MAX_CHILDREN: 1,
  TURRETS: [{
  POSITION: [20, 0, 0, 0, 0, 1],
  TYPE: [exports.genericTank,{COLOR:10}]
  },
           ],
};
exports.awp39cannon = {
  PARENT: [exports.genericTank],
  LABEL: '',
  COLOR: 3,
  GUNS: [{
  POSITION: [50, 10, -1.7, 0, 0, 0, 0],  
  },
        ],
};
exports.awp39petsquare = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 4,
  COLOR: 3,
};
exports.awp39pettriangle = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 3,
  COLOR: 3,
};
exports.awp39pet = {
  PARENT: [exports.ka2pet],
  LABEL: 'AWP-39 pet',
	//NAME: '',
  GUNS: [],
  SHAPE: [[0,0]],
  TURRETS: [{
  POSITION: [20, 0, 0, 0, 0, 1],
  TYPE: exports.awp39petsquare,
  }, {
  POSITION: [20, 20, 0, 0, 0, 1],  
  TYPE: exports.awp39petsquare,  
  }, {
  POSITION: [20, 20, 0, 180, 0, 1],  
  TYPE: exports.awp39petsquare,  
  }, {
  POSITION: [13, 35, 0, 0, 0, 1],  
  TYPE: exports.awp39pettriangle,  
  }, {
  POSITION: [13, 35, 0, 180, 0, 1],  
  TYPE: exports.awp39pettriangle,  
  }, {
  POSITION: [18, 0, 0, 0, 0, 1],  
  TYPE: exports.awp39cannon
  },
           ],
};
  exports.petusage4 = {
            PARENT: [exports.genericTank],
            LABEL: 'Developer',
     //CONTROLLERS: ['nearestDifferentMaster'],          
  RESET_UPGRADES: true,
            //SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
            LEVEL: 45,
            BODY: { // def
                //SHIELD: 1000,
                //REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: 0,
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, {
                POSITION: [  0.5,    7,    1,     0,      0,      180,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.pet, g.factory]),
                    TYPE: exports.charlespet, 
                    MAX_CHILDREN: 1,
                    AUTOFIRE: true,
                }, }, {
                POSITION: [  0.5,    7,    1,     0,      0,      180,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.pet, g.factory]),
                    TYPE: exports.awp39pet, 
                    MAX_CHILDREN: 1,
                    AUTOFIRE: true,
                }, }, 
            ],
        };
  exports.petusage5 = {
            PARENT: [exports.genericTank],
            LABEL: 'Developer',
     //CONTROLLERS: ['nearestDifferentMaster'],          
  RESET_UPGRADES: true,
            //SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
            LEVEL: 45,
            BODY: { // def
                //SHIELD: 1000,
                //REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: 0,
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, {
                POSITION: [  0.5,    7,    1,     0,      0,      180,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.pet, g.factory]),
                    TYPE: exports.ka2pet, 
                    MAX_CHILDREN: 1,
                    AUTOFIRE: true,
                }, },
            ],
        };
exports.cbtest = {
   PARENT: [exports.genericTank],
    LABEL: 'Custom Barrel Test',
    GUNS: [{
    POSITION: [18, 8, 1, 0, 0, 0, 0],
        PROPERTIES:{
            SKIN: 1,
    }, },
          ],
};
exports.doomnut = {
  PARENT: [exports.miniboss],
  LABEL: 'Doom-nut',
  //Donuts are evolving...
  SHAPE: [[0,1],[0.05,0.9987],[0.1,0.995],[0.15,0.9887],[0.2,0.9797],[0.25,0.9682],[0.3,0.9539],[0.35,0.9367],[0.4,0.9165],[0.45,0.893],[0.5,0.866],[0.55,0.8352],[0.6,0.8],[0.65,0.76],[0.7,0.7141],[0.7141,0.7],[0.76,0.65],[0.8,0.6],[0.8352,0.55],[0.866,0.5],[0.893,0.45],[0.9165,0.4],[0.9367,0.35],[0.9539,0.3],[0.9682,0.25],[0.9797,0.2],[0.9887,0.15],[0.995,0.1],[0.9987,0.05],[1,0],[1,0],[0.9987,-0.05],[0.995,-0.1],[0.9887,-0.15],[0.9797,-0.2],[0.9682,-0.25],[0.9539,-0.3],[0.9367,-0.35],[0.9165,-0.4],[0.893,-0.45],[0.866,-0.5],[0.8352,-0.55],[0.8,-0.6],[0.76,-0.65],[0.7141,-0.7],[0.7,-0.7141],[0.65,-0.76],[0.6,-0.8],[0.55,-0.8352],[0.5,-0.866],[0.45,-0.893],[0.4,-0.9165],[0.35,-0.9367],[0.3,-0.9539],[0.25,-0.9682],[0.2,-0.9797],[0.15,-0.9887],[0.1,-0.995],[0.05,-0.9987],[0,-1],[0,-1],[-0.05,-0.9987],[-0.1,-0.995],[-0.15,-0.9887],[-0.2,-0.9797],[-0.25,-0.9682],[-0.3,-0.9539],[-0.35,-0.9367],[-0.4,-0.9165],[-0.45,-0.893],[-0.5,-0.866],[-0.55,-0.8352],[-0.6,-0.8],[-0.65,-0.76],[-0.7,-0.7141],[-0.7141,-0.7],[-0.76,-0.65],[-0.8,-0.6],[-0.8352,-0.55],[-0.866,-0.5],[-0.893,-0.45],[-0.9165,-0.4],[-0.9367,-0.35],[-0.9539,-0.3],[-0.9682,-0.25],[-0.9797,-0.2],[-0.9887,-0.15],[-0.995,-0.1],[-0.9987,-0.05],[-1,0],[-1,0],[-0.9987,0.05],[-0.995,0.1],[-0.9887,0.15],[-0.9797,0.2],[-0.9682,0.25],[-0.9539,0.3],[-0.9367,0.35],[-0.9165,0.4],[-0.893,0.45],[-0.866,0.5],[-0.8352,0.55],[-0.8,0.6],[-0.76,0.65],[-0.7141,0.7],[-0.7,0.7141],[-0.65,0.76],[-0.6,0.8],[-0.55,0.8352],[-0.5,0.866],[-0.45,0.893],[-0.4,0.9165],[-0.35,0.9367],[-0.3,0.9539],[-0.25,0.9682],[-0.2,0.9797],[-0.15,0.9887],[-0.1,0.995],[-0.05,0.9987],[0,1],[0,1],[0,0.7],[-0.034999999999999996,0.69909],[-0.06999999999999999,0.6965],[-0.105,0.69209],[-0.13999999999999999,0.68579],[-0.175,0.6777399999999999],[-0.21,0.6677299999999999],[-0.24499999999999997,0.65569],[-0.27999999999999997,0.64155],[-0.315,0.6251],[-0.35,0.6062],[-0.385,0.58464],[-0.42,0.5599999999999999],[-0.45499999999999996,0.5319999999999999],[-0.48999999999999994,0.4998699999999999],[-0.4998699999999999,0.48999999999999994],[-0.5319999999999999,0.45499999999999996],[-0.5599999999999999,0.42],[-0.58464,0.385],[-0.6062,0.35],[-0.6251,0.315],[-0.64155,0.27999999999999997],[-0.65569,0.24499999999999997],[-0.6677299999999999,0.21],[-0.6777399999999999,0.175],[-0.68579,0.13999999999999999],[-0.69209,0.105],[-0.6965,0.06999999999999999],[-0.69909,0.034999999999999996],[-0.7,0],[-0.7,0],[-0.69909,-0.034999999999999996],[-0.6965,-0.06999999999999999],[-0.69209,-0.105],[-0.68579,-0.13999999999999999],[-0.6777399999999999,-0.175],[-0.6677299999999999,-0.21],[-0.65569,-0.24499999999999997],[-0.64155,-0.27999999999999997],[-0.6251,-0.315],[-0.6062,-0.35],[-0.58464,-0.385],[-0.5599999999999999,-0.42],[-0.5319999999999999,-0.45499999999999996],[-0.4998699999999999,-0.48999999999999994],[-0.48999999999999994,-0.4998699999999999],[-0.45499999999999996,-0.5319999999999999],[-0.42,-0.5599999999999999],[-0.385,-0.58464],[-0.35,-0.6062],[-0.315,-0.6251],[-0.27999999999999997,-0.64155],[-0.24499999999999997,-0.65569],[-0.21,-0.6677299999999999],[-0.175,-0.6777399999999999],[-0.13999999999999999,-0.68579],[-0.105,-0.69209],[-0.06999999999999999,-0.6965],[-0.034999999999999996,-0.69909],[0,-0.7],[0,-0.7],[0.034999999999999996,-0.69909],[0.06999999999999999,-0.6965],[0.105,-0.69209],[0.13999999999999999,-0.68579],[0.175,-0.6777399999999999],[0.21,-0.6677299999999999],[0.24499999999999997,-0.65569],[0.27999999999999997,-0.64155],[0.315,-0.6251],[0.35,-0.6062],[0.385,-0.58464],[0.42,-0.5599999999999999],[0.45499999999999996,-0.5319999999999999],[0.48999999999999994,-0.4998699999999999],[0.4998699999999999,-0.48999999999999994],[0.5319999999999999,-0.45499999999999996],[0.5599999999999999,-0.42],[0.58464,-0.385],[0.6062,-0.35],[0.6251,-0.315],[0.64155,-0.27999999999999997],[0.65569,-0.24499999999999997],[0.6677299999999999,-0.21],[0.6777399999999999,-0.175],[0.68579,-0.13999999999999999],[0.69209,-0.105],[0.6965,-0.06999999999999999],[0.69909,-0.034999999999999996],[0.7,0],[0.7,0],[0.69909,0.034999999999999996],[0.6965,0.06999999999999999],[0.69209,0.105],[0.68579,0.13999999999999999],[0.6777399999999999,0.175],[0.6677299999999999,0.21],[0.65569,0.24499999999999997],[0.64155,0.27999999999999997],[0.6251,0.315],[0.6062,0.35],[0.58464,0.385],[0.5599999999999999,0.42],[0.5319999999999999,0.45499999999999996],[0.4998699999999999,0.48999999999999994],[0.48999999999999994,0.4998699999999999],[0.45499999999999996,0.5319999999999999],[0.42,0.5599999999999999],[0.385,0.58464],[0.35,0.6062],[0.315,0.6251],[0.27999999999999997,0.64155],[0.24499999999999997,0.65569],[0.21,0.6677299999999999],[0.175,0.6777399999999999],[0.13999999999999999,0.68579],[0.105,0.69209],[0.06999999999999999,0.6965],[0.034999999999999996,0.69909],[0,0.7]],
  COLOR: 3,
  SIZE: 30,
  FACING_TYPE: 'autospin',
  GUNS: [{
  POSITION: [5, 2, -1.5, 10, 0, 0, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.fast]),
      TYPE: [exports.swarm,{INDEPENDENT: true}],
      AUTOFIRE: true,
      COLOR: 3,
  }, }, {
  POSITION: [5, 2, -1.5, 10, 0, 90, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.fast]),
      TYPE: [exports.swarm,{INDEPENDENT: true}],
      AUTOFIRE: true,
      COLOR: 3,
  }, }, {
  POSITION: [5, 2, -1.5, 10, 0, 180, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.fast]),
      TYPE: [exports.swarm,{INDEPENDENT: true}],
      AUTOFIRE: true,
      COLOR: 3,
  }, }, {
  POSITION: [5, 2, -1.5, 10, 0, 270, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.swarm, g.fast]),
      TYPE: [exports.swarm,{INDEPENDENT: true}],
      AUTOFIRE: true,
      COLOR: 3,
  }, },
        ],
  TURRETS: [{
  POSITION: [9, 0, 0, 0, 360, 1],
  TYPE: exports.donut,
  },{
  POSITION: [4, 10, 0, 45, 120, 0],
  TYPE: [exports.builder,{COLOR: 3,}]
  },{
  POSITION: [4, 10, 0, 135, 120, 0],
  TYPE: [exports.builder,{COLOR: 3,}]
  },{
  POSITION: [4, 10, 0, 225, 120, 0],
  TYPE: [exports.builder,{COLOR: 3,}]
  },{
  POSITION: [4, 10, 0, -45, 120, 0],
  TYPE: [exports.builder,{COLOR: 3,}]
  },
           ],
};
exports.edBody = {
  PARENT: [exports.smasherBody],
  SHAPE: 9,
  COLOR: 16,
};
exports.eventdev = {
  PARENT: [exports.genericTank],
  LABEL: 'Event Developer',
  SHAPE: 9,
  TURRETS: [{
  POSITION: [22, 0, 0, 0, 0, 0],
	TYPE: exports.edBody
  }, {
  POSITION: [13, 0, 0, 0, 0, 1],
	TYPE: [exports.anni,{INDEPENDENT: true}]
  }, 
           ],
};
exports.acs = {
  PARENT: [exports.genericTank],
  LABEL: 'Arena Closers',
  SHAPE: 9,
  TURRETS: [{
  POSITION: [22, 0, 0, 0, 0, 0],
	TYPE: exports.edBody
  }, {
  POSITION: [13, 0, 0, 0, 0, 1],
	TYPE: [exports.anni,{INDEPENDENT: true}]
  }, 
           ],
};
exports.nestkeeper = {
  PARENT: [exports.elite],
  LABEL: 'Nest Keeper',
  COLOR: 15,
  SHAPE: 5,
  SIZE: 25,
  MAX_CHILDREN: 20,
  FACING_TYPE: 'autospin',
  GUNS: [{
POSITION: [12, 5, 1.7, 0, 0, 36, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.drone, g.over]),
TYPE: exports.drone,
	AUTOFIRE: true
}, },{
POSITION: [12, 5, 1.7, 0, 0, 108, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.drone, g.over]),
TYPE: exports.drone,
	AUTOFIRE: true
},},{
POSITION: [12, 5, 1.7, 0, 0, -108, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.drone, g.over]),
TYPE: exports.drone,
	AUTOFIRE: true
},},{
POSITION: [12, 5, 1.7, 0, 0, 180, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.drone, g.over]),
TYPE: exports.drone,
	AUTOFIRE: true
},},{
POSITION: [12, 5, 1.7, 0, 0, -36, 0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([g.drone, g.over]),
TYPE: exports.drone,
	AUTOFIRE: true
},},
],
  TURRETS:[{
  POSITION: [10, 0, 0, 0, 360, 1],
  TYPE: exports.boomer
  },{
  POSITION: [6, 10, 0, 72, 150, 0],
  TYPE: exports.auto4gun
  },{
  POSITION: [6, 10, 0, 144, 150, 0],
  TYPE: exports.auto4gun
  },{
  POSITION: [6, 10, 0, 216, 150, 0],
  TYPE: exports.auto4gun
  },{
  POSITION: [6, 10, 0, 288, 150, 0],
  TYPE: exports.auto4gun
  },{
  POSITION: [6, 10, 0, 0, 150, 0],
  TYPE: exports.auto4gun
  },
          ],
};
exports.celestialbodyLime1 = {
  PARENT: [exports.genericTank],
  LABEL: 'Celestial',
  SHAPE: 5,
  COLOR: 26,
  FACING_TYPE: 'autospin',
  TURRETS: [{
    POSITION: [8, 10, 0, 40, 120, 0],
    TYPE: [exports.auto4gun],
}, {
    POSITION: [8, 10, 0, -40, 120, 0],
    TYPE: [exports.auto4gun],
}, {
    POSITION: [8, 10, 0, 105, 120, 0],
    TYPE: [exports.auto4gun],
}, {
    POSITION: [8, 10, 0, -105, 120, 0],
    TYPE: [exports.auto4gun],
}, {
    POSITION: [8, 10, 0, 180, 120, 0],
    TYPE: [exports.auto4gun],
}, 
  ],
};
exports.celestialbodyLime2 = {
    PARENT: [exports.genericTank],
    LABEL: "Celestial",
    BODY: {
    STEALTH: 9999999999999999999,
    },
    COLOR: 26,
    SHAPE: 7,
    FACING_TYPE: 'autospin',
  TURRETS: [{
    POSITION: [8, 10, 0, 232.5, 120, 0],
    TYPE: [exports.cruiser],
}, {
    POSITION: [8, 10, 0, 284.598, 120, 0],
    TYPE: [exports.cruiser],
}, {
    POSITION: [8, 10, 0, 334.032, 120, 0],
    TYPE: [exports.cruiser],
}, {
    POSITION: [8, 10, 0, 26.929, 120, 0],
    TYPE: [exports.cruiser],
}, {
    POSITION: [8, 10, 0, 77.316, 120, 0],
    TYPE: [exports.cruiser],
}, {
    POSITION: [8, 10, 0, 180.502, 120, 0],
    TYPE: [exports.cruiser],
}, {
    POSITION: [8, 10, 0, 129.764, 120, 0],
    TYPE: [exports.cruiser],
}, 
  ],
};
exports.celestialLime = {
  PARENT: [exports.miniboss],
  LABEL: 'Celestial',
  COLOR: 26,
  SIZE: 45,
  SHAPE: 9,
    BODY: {
    SPEED: 5,
        FOV: 1.4,
    },
    VALUE: 1370000,
  FACING_TYPE: 'autospin',
  TURRETS: [{
  POSITION:[15, 0, 0, 0, 0, 1],
    TYPE: exports.celestialbodyLime2,
  },{
  POSITION:[12, 0, 0, 45, 0, 1],
    TYPE: exports.celestialbodyLime1,
  },{
    POSITION:[6,10,0,-20, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 20, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 60, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 100, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0,140, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 180, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 220, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 260, 120, 0],
    TYPE: exports.celestialtrapper,
  },{
    POSITION:[6,10,0, 300, 120, 0],
    TYPE: exports.celestialtrapper,
  },
           ],
};
exports.clock = {
  PARENT: [exports.elite],
  LABEL: 'C.L.O.C.K.',
  COLOR: 2,
	SHAPE: 0,
  SIZE: 25,
  FACING_TYPE: 'autospin',
  TURRETS: [{
	POSITION: [3, 10, 0, 18, 100, 0],
	TYPE: exports.auto3gun,
},{
	POSITION: [3, 10, 0, 36, 100, 0],
	TYPE: exports.auto3gun,
},{
	POSITION: [3, 10, 0, 54, 100, 0],
	TYPE: exports.auto3gun,
},{
	POSITION: [3, 10, 0, 72, 100, 0],
	TYPE: exports.auto3gun,
},{
	POSITION: [3, 10, 0, 90, 100, 0],
	TYPE: exports.auto3gun,
},{
	POSITION: [3, 10, 0, 108, 100, 0],
	TYPE: exports.auto3gun,
},{
	POSITION: [3, 10, 0, 126, 100, 0],
	TYPE: exports.auto3gun,
},{
	POSITION: [3, 10, 0, 144, 100, 0],
	TYPE: exports.auto3gun,
},{
	POSITION: [3, 10, 0, 162, 100, 0],
	TYPE: exports.auto3gun,
},{
	POSITION: [3, 10, 0, 180, 100, 0],
	TYPE: exports.auto3gun,
},{
	POSITION: [3, 10, 0, 198, 100, 0],
	TYPE: exports.auto3gun,
},{
	POSITION: [3, 10, 0, 216, 100, 0],
	TYPE: exports.auto3gun,
},{
	POSITION: [3, 10, 0, 234, 100, 0],
	TYPE: exports.auto3gun,
},{
	POSITION: [3, 10, 0, 252, 100, 0],
	TYPE: exports.auto3gun,
},{
	POSITION: [3, 10, 0, 270, 100, 0],
	TYPE: exports.auto3gun,
},{
	POSITION: [3, 10, 0, 288, 100, 0],
	TYPE: exports.auto3gun,
},{
	POSITION: [3, 10, 0, 306, 100, 0],
	TYPE: exports.auto3gun,
},{
	POSITION: [3, 10, 0, 324, 100, 0],
	TYPE: exports.auto3gun,
},{
	POSITION: [3, 10, 0, 342, 100, 0],
	TYPE: exports.auto3gun,
},{
	POSITION: [3, 10, 0, 360, 100, 0],
	TYPE: exports.auto3gun,
},{
  POSITION: [7, 5, 0, 0, 360, 1],
  TYPE: exports.preda
},  {
  POSITION: [7, 5, 0, 120, 360, 1],
  TYPE: exports.gunner
},  {
  POSITION: [7, 5, 0, 240, 360, 1],
  TYPE: exports.cruiser
},   
],
};
exports.awp14 = {
                PARENT: [exports.miniboss],
                LABEL: 'AWP-14',
                DANGER: 12,
  BODY: {
    SPEED: 30,
  },
  COLOR: 12,
  SIZE: 25,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  25,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  23,     8,      1,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  17,     8,      1,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },
                ],
  TURRETS: [{
  POSITION: [9, 10, 0, 90, 180, 0],
  TYPE: [exports.nailgun2,{COLOR: 12,}],
  },{
  POSITION: [9, 10, 0, 270, 180, 0],
  TYPE: [exports.nailgun2,{COLOR: 12,}],
  },
           ],
            };
exports.ekIbody = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 6,
  COLOR: 9,
  INDEPENDENT: true,
};
exports.ek1 = {
  PARENT: [exports.elite],
  LABEL: 'EK-1',
	SHAPE: 0,
  COLOR: 18,
  SIZE: 25,
  FACING_TYPE: 'autospin',
  TURRETS: [{
  POSITION: [7, 12, 0, 0, 120, 0],
  TYPE: exports.auto3gun,
  },{
  POSITION: [7, 12, 0, 60, 120, 0],
  TYPE: exports.auto3gun,
  },{
  POSITION: [7, 12, 0, 120, 120, 0],
  TYPE: exports.auto3gun,
  },{
  POSITION: [7, 12, 0, 180, 120, 0],
  TYPE: exports.auto3gun,
  },{
  POSITION: [7, 12, 0, 240, 120, 0],
  TYPE: exports.auto3gun,
  },{
  POSITION: [7, 12, 0, 300, 120, 0],
  TYPE: exports.auto3gun,
  },{
  POSITION: [13, 0, 0, 0, 360, 1],
  TYPE: exports.bigauto4gun,
  },{
  POSITION: [25, 0, 0, 0, 0, 0],
  TYPE: exports.ekIbody,
  },
           ],
};
exports.ekIIturret1 = {
            PARENT: [exports.auto3gun],
            LABEL: '',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  14,    2.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  14,    2.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    2.5,     1,      0,     2,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    2.5,     1,      0,    -2,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
exports.ekIIbody = {
  PARENT: [exports.genericTank],
  LABEL: '',
  COLOR: 9,
  SHAPE: 6,
  GUNS: [{
  POSITION: [16, 1.5, -1.5, 0, 0, 60, 0],
  PROPERTIES: {
  SHOOT_SETTINGS: combineStats([g.swarm]),
  TYPE: exports.swarm
  }, },{
  POSITION: [16, 1.5, -1.5, 0, 0, 180, 0],
  PROPERTIES: {
  SHOOT_SETTINGS: combineStats([g.swarm]),
  TYPE: exports.swarm
  }, },{
  POSITION: [16, 1.5, -1.5, 0, 0, 300, 0],
  PROPERTIES: {
  SHOOT_SETTINGS: combineStats([g.swarm]),
  TYPE: exports.swarm
  }, },
        ],
  TURRETS: [{
  POSITION: [10, 10, 0, 0, 120, 0],
  TYPE: [exports.ekIIturret1,{COLOR:18}],
  },{
  POSITION: [10, 10, 0, 120, 120, 0],
  TYPE: [exports.ekIIturret1,{COLOR:18}],
  },{
  POSITION: [10, 10, 0, 240, 120, 0],
  TYPE: [exports.ekIIturret1,{COLOR:18}],
  },{
  POSITION: [3, 10, 3, 60, 120, 0],
  TYPE: exports.auto3gun
  },{
  POSITION: [3, 10, -3, 60, 120, 0],
  TYPE: exports.auto3gun
  },{
  POSITION: [3, 10, 3, 180, 120, 0],
  TYPE: exports.auto3gun
  },{
  POSITION: [3, 10, -3, 180, 120, 0],
  TYPE: exports.auto3gun
  },{
  POSITION: [3, 10, 3, 300, 120, 0],
  TYPE: exports.auto3gun
  },{
  POSITION: [3, 10, -3, 300, 120, 0],
  TYPE: exports.auto3gun
  },         
    ],
};
exports.ek2 = {
  PARENT: [exports.elite],
  LABEL: 'EK-2',
  SHAPE: 0,
  COLOR: 18,
  SIZE: 25,
  FACING_TYPE: 'autospin',
  TURRETS: [{
  POSITION: [13, 0, 0, 0, 360, 1],
  TYPE: exports.auto3gun
  },{
  POSITION: [25, 0, 0, 0, 0, 0],
  TYPE: exports.ekIIbody,
  },
           ],
};
exports.egg2 = {
  PARENT: [exports.egg],
};
exports.eggsanctuary = {
  PARENT: [exports.egg],
  TYPE: 'miniboss',
  LABEL: 'Egg Sanctuary',
  SIZE: 25,
  BODY: {
  HEALTH: 7500,
  DAMAGE: 30,
    RESIST: 1,
    PUSHABILITY: 30,
    SHIELD: 10,
    REGEN: 15,
  },
  VALUE: 7500,
  COLOR: 18,
  FACING_TYPE: 'autospin',
  GUNS: [{
  POSITION: [14, 12, 1.7, 0, 0, 0, 0],
  PROPERTIES:{
  SHOOT_SETTINGS: combineStats([g.mach]),
  TYPE: exports.egg2,
  MAX_CHILDREN: 30,
  AUTOFIRE: true,
  },  },
        ],
};
exports.square2 = {
  PARENT: [exports.square],
};
exports.squaresanctuary = {
  PARENT: [exports.square],
  LABEL: 'Square Sanctuary',
    TYPE: 'miniboss',
	SIZE: 25,
  BODY: {
  HEALTH: 7500,
  DAMAGE: 30,
    RESIST: 1,
    PUSHABILITY: 30,
    SHIELD: 10,
    REGEN: 15,
  },
  MAX_CHILDREN: 30,
  VALUE: 10000,
  COLOR: 3,
  FACING_TYPE: 'autospin',
  GUNS: [{
  POSITION: [14, 12, 1.7, 0, 0, 0, 1.5],
  PROPERTIES:{
  SHOOT_SETTINGS: combineStats([g.mach]),
  TYPE: exports.square2,
  //MAX_CHILDREN: 30,
  AUTOFIRE: true,
  },  },{
  POSITION: [14, 12, 1.7, 0, 0, 90, 1],
  PROPERTIES:{
  SHOOT_SETTINGS: combineStats([g.mach]),
  TYPE: exports.square2,
  //MAX_CHILDREN: 30,
  AUTOFIRE: true,
  },  },{
  POSITION: [14, 12, 1.7, 0, 0, 180, 0.5],
  PROPERTIES:{
  SHOOT_SETTINGS: combineStats([g.mach]),
  TYPE: exports.square2,
  //MAX_CHILDREN: 30,
  AUTOFIRE: true,
  },  },{
  POSITION: [14, 12, 1.7, 0, 0, 270, 0],
  PROPERTIES:{
  SHOOT_SETTINGS: combineStats([g.mach]),
  TYPE: exports.square2,
  //MAX_CHILDREN: 30,
  AUTOFIRE: true,
  },  },
        ],
};
    exports.triangle2 = {
  PARENT: [exports.triangle],
};
exports.trianglesanctuary = {
  PARENT: [exports.triangle],
  LABEL: 'Triangle Sanctuary',
    TYPE: 'miniboss',
	SIZE: 25,
  BODY: {
  HEALTH: 7500,
  DAMAGE: 30,
    RESIST: 1,
    PUSHABILITY: 30,
    SHIELD: 10,
    REGEN: 15,
  },
  MAX_CHILDREN: 30,
  VALUE: 15000,
  COLOR: 2,
  FACING_TYPE: 'autospin',
  GUNS: [{
  POSITION: [14, 12, 1.7, 0, 0, 300, 1],
  PROPERTIES:{
  SHOOT_SETTINGS: combineStats([g.mach]),
  TYPE: exports.triangle2,
  //MAX_CHILDREN: 30,
  AUTOFIRE: true,
  },  },{
  POSITION: [14, 12, 1.7, 0, 0, 60, 0.5],
  PROPERTIES:{
  SHOOT_SETTINGS: combineStats([g.mach]),
  TYPE: exports.triangle2,
  //MAX_CHILDREN: 30,
  AUTOFIRE: true,
  },  },{
  POSITION: [14, 12, 1.7, 0, 0, 180, 0],
  PROPERTIES:{
  SHOOT_SETTINGS: combineStats([g.mach]),
  TYPE: exports.triangle2,
  //MAX_CHILDREN: 30,
  AUTOFIRE: true,
  },  },
        ],
};
exports.testsummon = {
PARENT: [exports.genericTank],
	LABEL: 'Egg Sanctuary summon test',
	COLOR: 3,
	GUNS: [{
	POSITION: [16, 15, 1, 0, 0, 0, 0],
	PROPERTIES: {
	SHOOT_SETTINGS: combineStats([g.basic, g.pet]),
	TYPE: exports.squaresanctuary,
		MAX_CHILDREN: 1,
	},  },
	      ],
};
exports.testbed.UPGRADES_TIER_1.push(exports.petpage, exports.acs, exports.basic, exports.spectator);
exports.bosses.UPGRADES_TIER_1.push(exports.gatekeeper, exports.guardian, exports.pomeraniontation, exports.redemptionist, exports.eliteknight, exports.octogron, exports.elite_sprayer, exports.elite_destroyer, exports.elite_gunner, exports.elite_swarmer, exports.skr_sin4pi45, exports.defender, exports.comet);//Note to self... Make Page 3!
exports.betatanks.UPGRADES_TIER_1.push(exports.testsummon, exports.healer, exports.dualtech, exports.oxyrrhexis, exports.donut, exports.beignet);//hope this works...
exports.bosses2.UPGRADES_TIER_1.push(exports.terminatorA, exports.elite_spaceship, exports.arrasianlorium, exports.ArrasianSpirit, exports.palisade, exports.summonerboss, exports.elite_frag8, exports.elite_single, exports.elite_cruiser ,exports.s2_22, exports.ps3_33, exports.celestialS, exports.celestialH, exports.bosses3);
exports.removed.UPGRADES_TIER_1.push(exports.elite_testbed, exports.weirdspike2, exports.apidae, exports.kashmirA, exports.kashmirB);
exports.xkx.UPGRADES_TIER_1.push(exports.awp39lite, exports.mkI, exports.skI, exports.ek1, exports.awp_ice, exports.skrLXVIII, exports.ekXI, exports.rkI, exports.awp14);
exports.misc.UPGRADES_TIER_1.push(exports.aclazerturret, exports.captaincrunch, exports.ttr1, exports.ttr2, exports.ttr3, exports.necro_4, exports.ball, exports.flamer3, exports.steamdom, exports.flamerlutionist);
exports.skrLXVIII.UPGRADES_TIER_2 = [exports.awp_ice, exports.awp39lite, exports.mkI, exports.skI];
exports.ek1.UPGRADES_TIER_1 = [
  exports.ek2];
exports.ball.UPGRADES_TIER_1 = [exports.iceball, exports.rainbowball, exports.arenaball];
exports.ball.UPGRADES_TIER_4 = [exports.toxicball];
exports.iceball.UPGRADES_TIER_1 = [exports.ball];
exports.iceball.UPGRADES_TIER_2 = [exports.snowball];
exports.iceball.UPGRADES_TIER_4 = [exports.toxicball];
exports.rainbowball.UPGRADES_TIER_1 = [exports.ball];
exports.toxicball.UPGRADES_TIER_1 = [exports.ball];
exports.arenaball.UPGRADES_TIER_1 = [exports.ball];
exports.snowball.UPGRADES_TIER_1 = [exports.ball];
exports.basic.UPGRADES_TIER_4 = [exports.trapper, exports.basicalpha];
exports.trapper.UPGRADES_TIER_2 = [exports.builder, exports.flanktrap];
exports.trapper.UPGRADES_TIER_3 = [exports.minitrap, exports.quadtrapper, exports.overtrap];
exports.bosses3.UPGRADES_TIER_1 = [exports.bosses2, exports.celestialLime, exports.dropshipboss, exports.celestialC, exports.celestialA, /*exports.bow, */exports.doomnut, exports.nestkeeper, exports.clock];
exports.betatester.UPGRADES_TIER_1 = [exports.betatanks, exports.removed, exports.basic, exports.spectator];
exports.seniortester.UPGRADES_TIER_1 = [exports.betatanks, exports.bosses, exports.removed, exports.basic, exports.spectator];
exports.overseertester.UPGRADES_TIER_1 = [exports.betatanks, exports.bosses, exports.xkx, exports.removed, exports.basic, exports.spectator];
exports.flail.UPGRADES_TIER_2 = [exports.dwh, exports.mace, exports.icicle];
exports.petpage.UPGRADES_TIER_1 = [exports.petusage1, exports.petusage2, exports.petusage3, exports.petusage4, exports.petusage5];
exports.petusage1.UPGRADES_TIER_1 = [exports.betatanks, exports.bosses, exports.xkx, exports.removed, exports.misc, exports.petpage, exports.basic, exports.spectator];
exports.petusage2.UPGRADES_TIER_1 = [exports.betatanks, exports.removed, exports.basic, exports.spectator];
exports.petusage3.UPGRADES_TIER_1 = [exports.betatanks, exports.bosses, exports.removed, exports.basic, exports.spectator];
exports.acs.UPGRADES_TIER_1 = [exports.pentaclose, exports.arena_sn87, exports.ac, exports.ac3];
exports.eventdev.UPGRADES_TIER_1 = [exports.betatanks, exports.removed, exports.misc, exports.basic, exports.spectator];
