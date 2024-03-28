// Asked ChatGPT to provide wrestler info to create objects for testing purposes

const wrestlers4 = [
    {
        name: 'John Cena',
        health: 100,
        moves: [
            { name: 'Attitude Adjustment', damage: 50, type: 'signature' },
            { name: 'Five Knuckle Shuffle', damage: 25, type: 'signature' },
            { name: 'AA (finisher)', damage: 100, type: 'finisher' }
        ]
    },
    {
        name: 'The Rock',
        health: 100,
        moves: [
            { name: 'Rock Bottom', damage: 55, type: 'signature' },
            { name: 'People\'s Elbow', damage: 30, type: 'signature' },
            { name: 'The Rock Bottom (finisher)', damage: 100, type: 'finisher' }
        ]
    },
    {
        name: 'Stone Cold Steve Austin',
        health: 100,
        moves: [
            { name: 'Stone Cold Stunner', damage: 60, type: 'signature' },
            { name: 'Lou Thesz Press', damage: 25, type: 'signature' },
            { name: 'Stone Cold Stunner (finisher)', damage: 100, type: 'finisher' }
        ]
    },
    {
        name: 'Triple H',
        health: 100,
        moves: [
            { name: 'Pedigree', damage: 65, type: 'signature' },
            { name: 'Spinebuster', damage: 20, type: 'signature' },
            { name: 'Pedigree (finisher)', damage: 100, type: 'finisher' }
        ]
    }
];

const wrestlers3 = [
    {
        name: 'Randy Orton',
        health: 88,
        moves: [
            { name: 'RKO', damage: 55, type: 'signature' },
            { name: 'Diving Crossbody', damage: 30, type: 'signature' },
            { name: 'RKO (finisher)', damage: 100, type: 'finisher' }
        ]
    },
    {
        name: 'Brock Lesnar',
        health: 92,
        moves: [
            { name: 'F5', damage: 65, type: 'signature' },
            { name: 'German Suplex', damage: 25, type: 'signature' },
            { name: 'F5 (finisher)', damage: 100, type: 'finisher' }
        ]
    },
    {
        name: 'Roman Reigns',
        health: 90,
        moves: [
            { name: 'Spear', damage: 60, type: 'signature' },
            { name: 'Superman Punch', damage: 30, type: 'signature' },
            { name: 'Spear (finisher)', damage: 100, type: 'finisher' }
        ]
    },
];
const wrestlers1 = [
    {
        name: 'Seth Rollins',
        health: 85,
        moves: [
            { name: 'Curb Stomp', damage: 55, type: 'signature' },
            { name: 'Frog Splash', damage: 25, type: 'signature' },
            { name: 'Curb Stomp (finisher)', damage: 100, type: 'finisher' }
        ]
    },
    {} // Test if array contains an empty object
];
const wrestlers2 = [
    {
        name: 'Seth Rollins',
        health: 85,
        moves: [
            { name: 'Curb Stomp', damage: 55, type: 'signature' },
            { name: 'Frog Splash', damage: 25, type: 'signature' },
            { name: 'Curb Stomp (finisher)', damage: 100, type: 'finisher' }
        ]
    },
    // Wrestler object example from assessment doc
    {
        name: 'Wrestler',
        health: 100,
        moves: [
            { name: 'Move A', damage: 45, type: 'signature' },
            { name: 'Move B', damage: 20, type: 'signature' },
            { name: 'Finishing Move', damage: 100, type: 'finisher'}
        ] 
    }
];

export {wrestlers1, wrestlers2, wrestlers3, wrestlers4}