import { wrestlers, wrestlers2, wrestlers3 } from "./test.js";

// Array to store the winning wrestler of each match to then go against each other
let matchWinners = [];

/*
 * Choose a random move from a given wrestler object
 * param: wrestler 
 * returns: random move object
 */
const randomMove = (wrestler) => {
    // get a random index from the moves array
    let randomIndex = Math.floor(Math.random() * wrestler.moves.length);

    // return the move at the random index
    return wrestler.moves[randomIndex];
}

/*
 * Choose a random move from a given wrestler object
 * param: wrestler, the wrestler getting attacked
 * param: move, the move being performed
 * returns: random move object
 */
const calcHealth = (wrestler, move) => {
    // Moves with the type ‘finisher’ should have a 50% chance of failing 
    // unless their opponent’s health is less than or equal to 45.
    if (move.type === 'finisher' && wrestler.health > 45) {
        let chance = Math.floor(Math.random() * 2); // return either 0 or 1
            // if chance of 1, move succeds
            if (chance == 1) {
                console.log(`${move.name} succeeded.`);
                let newHealth = wrestler.health - move.damage;
                if (newHealth < 0) {
                    return wrestler.health = 0;
                }
                else {
                    return wrestler.health = newHealth;
                }
            }
            // if chance of 0 move fails
            else {
                console.log(`${move.name} failed.`);
                return wrestler.health;
            }
    }
    // All other moves including finisher move if wrestler's health is <= 45
    // move damage subtracted from wrestler's health
    else {
        let newHealth = wrestler.health - move.damage;
        // No negative health, just return 0
        if (newHealth < 0) {
            newHealth = 0;
            return wrestler.health = newHealth;
        }
        else {
            return wrestler.health = newHealth;
        }
    }
}

/*
 * 
 * param: wA, wrestler A
 * param: wB, wrestler B
 * returns: simulate each round, display the moves performed
 * and the health status of both wrestlers after each turn
 */
const round = (wA, wB) => {
    // wrestler A goes first
    let moveA = randomMove(wA);
    console.log(`${wA.name} performs ${moveA.name} on ${wB.name}. ${wB.name}'s health: ${calcHealth(wB, moveA)}`);
    
    // if the wrestler's health reaches 0 
    // end the move, round, and match
    // declare the winner
    if (wB.health == 0) {
        console.log(`${wB.name}'s health is below 0. ${wA.name} wins!`);
        // add the winning wrestler the winners array
        matchWinners.push(wA);
        return;
    }

    // wrestler B goes second
    let moveB = randomMove(wB);
    console.log(`${wB.name} performs ${moveB.name} on ${wA.name}. ${wA.name}'s health: ${calcHealth(wA, moveB)}`);

    // if the wrestler's health reaches 0 
    // end the move, round, and match
    // declare the winner
    if (wA.health == 0) {
        console.log(`${wA.name}'s health is below 0. ${wB.name} wins!`);
        // add the winning wrestler the winners array
        matchWinners.push(wB);
        return;
    }
}

const match = (wA, wB, roundCount) => {
    let wAMaxHealth = wA.health;
    let wBMaxHealth = wB.health;

    console.log(`------------Round ${roundCount}--------------`);
    round(wA, wB);

    // if either wrestler's health is above 0, continue more rounds
    if (wA.health > 0 && wB.health > 0) {
        match(wA, wB, roundCount + 1);
    }

    // reset wrestler's healths after the match
    wA.health = wAMaxHealth;
    wB.health = wBMaxHealth;
}

/*
 * Main function to run the matches rounds and tournament
 * param: none
 * returns: results of each match, round, and the tournament winner
 */
const main = () => {
    // console.log(`${matchWinners[0].name}, ${matchWinners[1].name}, ${matchWinners[2].name}, ${matchWinners[3].name}`);

    console.log(`Match 1: ${wrestlers[0].name} vs. ${wrestlers[1].name}`);
    match(wrestlers[0], wrestlers[1], 1);

    // console.log(`Winners - first loser: ${matchWinners[0].name}, ${matchWinners[1].name}, ${matchWinners[2].name}`);
    console.log("\n\n");

    console.log(`Match 2: ${wrestlers[2].name} vs. ${wrestlers[3].name}`);
    match(wrestlers[2], wrestlers[3], 1);

    // console.log("\n");
    // console.log(`Winners: ${matchWinners[0].name}, ${matchWinners[0].health}, ${matchWinners[1].name}, ${matchWinners[1].health}`);
    console.log("\n\n");

    console.log(`Match 3: ${matchWinners[0].name} vs. ${matchWinners[1].name}`);
    match(matchWinners[0], matchWinners[1], 1);
}

window.onload = () => {
    main();
}

