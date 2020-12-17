/*jslint node: true */
"use strict";

// Seed math

exports.random = x => {
    return x * Math.random();
};

exports.randomAngle = () => {
    return Math.PI * 2 * Math.random();
};

exports.randomRange = (min, max) => {
    return Math.random() * (max - min) + min;
};

exports.irandom = i => {
    let max = Math.floor(i);
    return Math.floor(Math.random() * (max + 1)); //Inclusive
};

exports.irandomRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Inclusive
};

exports.gauss = (mean, deviation) => {
    let x1, x2, w;
    do {
        x1 = 2*Math.random() - 1;
        x2 = 2*Math.random() - 1;
        w = x1 * x1 + x2 * x2;
    } while (0 == w || w >= 1);

    w = Math.sqrt(-2 * Math.log(w) / w);
    return mean + deviation * x1 * w;
};

exports.gaussInverse = (min, max, clustering) => {
    let range = max - min;
    let output = exports.gauss(0, range / clustering);

    while (output < 0) {
        output += range;
    }
    
    while (output > range) {
        output -= range;
    }
    
    return output + min;
};

exports.gaussRing = (radius, clustering) => {
    let r = exports.random(Math.PI * 2);
    let d = exports.gauss(radius, radius*clustering);
    return {
        x: d * Math.cos(r),
        y: d * Math.sin(r),
    };
};

exports.chance = prob => {
    return exports.random(1) < prob;
};

exports.dice = sides => {
    return exports.random(sides) < 1;
};

exports.choose = arr => {
    return arr[exports.irandom(arr.length - 1)];
};

exports.chooseN = (arr, n) => {
    let o = [];
    for (let i=0; i<n; i++) {
        o.push(arr.splice(exports.irandom(arr.length - 1), 1)[0]);
    }
    return o;
};

exports.chooseChance = (...arg) => {
    let totalProb = 0;
    arg.forEach(function(value) { totalProb += value; });
    let answer = exports.random(totalProb);
    for (let i=0; i<arg.length; i++) {
        if (answer<arg[i]) return i;
        answer -= arg[i];
    }
};


exports.chooseBotName = () => {
    return exports.choose([
/*        'Alice',
        'Bob',
        'Carmen',
        'David',
        'Edith',
        'Freddy',
        'Gustav',
        'Helga',
        'Janet',
        'Lorenzo',
        'Mary',
        'Nora',
        'Olivia',
        'Peter',
        'Queen',
        'Roger',
        'Suzanne',
        'Tommy',
        'Ursula',
        'Vincent',
        'Wilhelm',
        'Xerxes',
        'Yvonne',
        'Zachary',
        'Alpha',
        'Bravo',
        'Charlie',
        'Delta',
        'Echo',
        'Foxtrot',
        'Hotel',
        'India',
        'Juliet',
        'Kilo',
        'Lima',
        'Mike',
        'November',
        'Oscar',
        'Papa',
        'Quebec',
        'Romeo',
        'Sierra',
        'Tango',
        'Uniform',
        'Victor',
        'Whiskey',
        'X-Ray',
        'Yankee',
        'Zulu',*/
      'USES',
'cool',
'the pro arrived!',
'Baller',
'Tyson',
'Our World Of Tanks',
'Give Me Wings',
'a salty discord kid',
'Vogelaj',
'Brotherhood of Steel',
'Rosetta stoned',
'toon',
'Mew',
'Disposition',
'Anonymous',
'Blank',
'Friend pls',
'Luke',
'The Nameless',
'hmst',
'big me!',
'I am easter egg lol',
'TBA'
      /*Real CreepyDaPolyplanet
[IX] Clan
King of Pros
a named player
Synth
alpharad
THE WORLD!
PEST_YT
Halal Certified Tank
DJVI
Rake
(Some bots don't have any names at all, so it's just a spacebar.)
iXPLODE
Minecrafter
Roger
ArenaC
Little Red Rocket
A named player
Angel
Brian
Ehwaz
Carmen
Luka modric
.
Green sauce
and
teamtrees
November
dont feed me
illuminati
ROCKET
MJK
Oswald veblen
Mike
BUSTER WOLF
Elmo is gone
Internet explorer
Are you okay?
[AI]
1
pet
Sinx
t-series succs
noob
Faaip of
CJ
Oscar
KOA
support
Fallen AI
Discord
India
YouRIP
team ??!
die
MrBeast
Real Kitty!
how to get testbed?
Creeper, Aw Man
Banarama
DJ-NATE
Spree
deposit> diep
D:
Electrodynamix
Theory of Everything
ForeverBound
Derp
developer
koala
FRIENDS
TEST
The Patient
NO U
A Settlement Needs Your Help
[GZ] Team
T-REX
novice
Yankee
0
666
Kim jong un
AHHHHH!
ok boomer
dragons go mlem
boi
...
Totally Not A Bot
𝕯𝖆𝖙 𝕺𝖓𝖊 𝕭𝖔𝖎
CUCK
an unnamed player
HUG ME!
best
Im scary
im new
im beef
Impeach Trump
Trans Rights
Reflection
KING CRIMSON!
Fallen Bot
Fallen Nothing
Dagaz
Dagaz 2.0
Real hellcat
oof
! foO
trump
Allah is King
CX Fan
final destination, fox only
no team kill
PRAY PRAY PRAY
facu ++
no
Real AI
k
agar.io
AK-47
rush
buff basic
buff arena closer
The Grudge
crasher
Knoz
Paradox
brogle
GABE
DOGE
your mom
Joe Mamma
Vicarious
Canada> USA
Whiskey
Aleph Null
bruh moment
Bruh monument
Bruh Momentum
Bruh Monumentum
F-777
Mountain range
Ruthless
Mantra
BOMBS AWAY
road to 1m
Threw out
FeZtiVAl
FeZTi Fan
Toast
[MG] Team
food
Angel
leonardo
The Pot
salty
NO WITCH-HUNTING
Sucko Mode
Lateralus
boi
Suzanne
Yvonne
Team?
mf = r
Real Despacit.io
M8
dont touch me
Alice
[MG] Pro Team
Uniform
king of diep
Real dark knight
Not going
Mike
Jera
Ramen
SPICY RAMEN
OH PAPI!
ZA WARUDO!
green square
Decagon?
Pope
MrBeast Rules
David
Coronavirus
The Flu
The Common Cold
Delta
Olivia
yam
Que?
WOOT
koala
mm
Luke
W = Team
Steven Universe
Careenervirus
taal volcano
Satan
summoner
Triad
Friends?
Derp
hug me
Ight Bro
Liberty prime
Fourty Six & 2
Balloon
Y
Why?
D:
.-.
sael savage
CATS
kitten
[insert creative name]
PP Tank
Slayer
King slayer
Broccoli
Nooblet
take this L
Magikarp
Hagalaz
Road to 10m
Captian
max
developer
Colombia
Milk Bar
GOKU
TOUCAN
jotaro kujo
LOL
UwU
OwO
Peter
Bee
Honey bee
Dumb
Freddy
kok
Red Hot Chill Pepper
Am I Sinbadx?
Jake
BrOBer The Prod
why
bob
Bravo
Have mercy ....
Spree
Berkanan
Solomon
Zplit
hotel
Waterflame
Hammer
Windows 98
Railroad
Carmen
kek
Mary
NoCopyrightSounds
TheFatRat
Real CX
What in
Kilo
D
Algiz
Neo
V
Mango*/

    ]);
};

exports.chooseBossName = (code, n) => {
    switch (code) {
    case 'a':
    return exports.chooseN([
        'Archimedes',
        'Akilina',
        'Anastasios',
        'Athena',
        'Alkaios',
        'Amyntas',
        'Aniketos',
        'Artemis',
        'Anaxagoras',
        'Apollon',
    ], n);
        case 'bossrush':
    return exports.chooseN([
        ''
    ], n);
    case 'castle':
    return exports.chooseN([
        'Berezhany',
        'Lutsk',
        'Dobromyl',
        'Akkerman',
        'Palanok',
        'Zolochiv',
        'Palanok',
        'Mangup',
        'Olseko',
        'Brody',
        'Isiaslav',
        'Kaffa',
        'Bilhorod',
    ], n);
    default: return 'God';
    }
};
