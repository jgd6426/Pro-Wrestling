import { wrestlers1, wrestlers2, wrestlers3, wrestlers4 } from "./test.js"; // import the test data

// Array to store the wrestlers from the uploaded file
let wrestlers = [];
// Array to store the winning wrestler of each match to then go against each other
let matchWinners = [];

let matchDetails = [];

/*
 * Give the details for a given match number from the matchDetails array
 * param: matchNum, the match number
 * returns: match details
 */
const getMatchDetails = (matchNum) => {
    let match = [];
    let indexStart;
    let indexEnd;

    // go through the matchDetails array and find the start of the match
    for (let i = 0; i < matchDetails.length; i++) {
        if (matchDetails[i].includes(`Match ${matchNum}`)) {
            indexStart = i;
        }
    }

    // based on the start of the match, find the end of the match
    for (let i = indexStart; i < matchDetails.length; i++) {
        if (matchDetails[i].includes(`wins`)) {
            indexEnd = i + 1;
            break;
        }
    }
    
    // go through the matchDetails array and get the details for the match
    for (let j = indexStart; j < indexEnd; j++) {
        match.push(matchDetails[j]);
    }

    return match;
};

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
};

/*
 * Reset the wrestler's health to it's original value
 * param: wrestler that's health needs to be changed
 * param: originArray that has original health value to reference
 * returns: wrestler with original health
 */
const resetHealth = (wrestler, healthArray) => {
    // check through original array
    for (let i = 0; i < healthArray.length; i++) {
        // find the wrestler in the original array
        if (healthArray[i].name === wrestler.name) {
            // console.log(`${healthArray[i].name} ${healthArray[i].health}, ${wrestler.name} ${wrestler.health}`)
            wrestler.health = healthArray[i].health;
            return wrestler;
        }
    }
};

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
        const chance = Math.floor(Math.random() * 2); // return either 0 or 1
        // if chance of 0, move fails
        if (chance != 1) {
            console.log(`${move.name} failed.`);
            matchDetails.push(`${move.name} failed.`);
            return wrestler.health;
        }
        else {
            console.log(`${move.name} successful.`);
            matchDetails.push(`${move.name} successful.`);
        }
    }
    // All other moves including finisher move if wrestler's health is <= 45 or the chance = 1/succeeds
    // move damage subtracted from wrestler's health
    const newHealth = wrestler.health - move.damage;
    // No negative health, just return 0
    if (newHealth < 0) {
        return wrestler.health = 0;
    }
    else {
        return wrestler.health = newHealth;
    }
};

/*
 * Simulate each round between two wrestlers
 * param: wA, wrestler A
 * param: wB, wrestler B
 * returns: display the moves performed and the health status of both wrestlers after each turn
 */
const round = (wA, wB) => {
    // wrestler A goes first
    const moveA = randomMove(wA);
    const turn1 = `${wA.name} performs ${moveA.name} on ${wB.name}. ${wB.name}'s health: ${calcHealth(wB, moveA)}`;
    console.log(turn1);
    matchDetails.push(turn1);

    // if the wrestler's health reaches 0 
    // end the move, round, and match
    // declare the winner
    if (wB.health == 0) {
        console.log(`${wB.name}'s health is below 0. ${wA.name} wins!`);
        matchDetails.push(`${wB.name}'s health is below 0. ${wA.name} wins!`);
        // add the winning wrestler the winners array
        matchWinners.push(wA);
        // return the winning wrestler object
        return wA;
    }

    // wrestler B goes second
    const moveB = randomMove(wB);
    const turn2 = `${wB.name} performs ${moveB.name} on ${wA.name}. ${wA.name}'s health: ${calcHealth(wA, moveB)}`;
    console.log(turn2);
    matchDetails.push(turn2);

    // if the wrestler's health reaches 0 
    // end the move, round, and match
    // declare the winner
    if (wA.health == 0) {
        console.log(`${wA.name}'s health is below 0. ${wB.name} wins!`);
        matchDetails.push(`${wA.name}'s health is below 0. ${wB.name} wins!`);
        // add the winning wrestler the winners array
        matchWinners.push(wB);
        // return the winning wrestler object
        return wB;
    }
};

/*
 * Simulate each match two wrestlers
 * param: wA, wrestler A
 * param: wB, wrestler B
 * param: roundCount, the current round number
 * returns: display the moves performed and the health status of both wrestlers after each turn
 */
const match = (wA, wB, roundCount) => {
    console.log(`------------Round ${roundCount}--------------`);
    matchDetails.push(`------------Round ${roundCount}--------------`);
    const winner = round(wA, wB);

    if (wA.health <= 0 || wB.health <= 0) {
        // return the winner of the match
        // console.log(winner.name);
        return winner;
    }
    // else continue more rounds
    return match(wA, wB, roundCount + 1);
};

/*
 * Run the Tournament and each match based on wrestlers from a given array
 * param: wArray, array of wrestler objects
 * param: healthArray, array of wrestler names and original health values
 * returns: results of each match, round, and the tournament winner
 */
const tournament = (wArray, healthArray) => {
    // reset matchWinners array at the beginning of each tournament
    matchWinners = [];

    if (wArray.length == 4) {
        console.log(`Match 1: ${wArray[0].name} vs. ${wArray[1].name}`);
        matchDetails.push(`Match 1: ${wArray[0].name} vs. ${wArray[1].name}`);

        // display wrestler names on card
        document.querySelector('#wA').innerHTML = `${wArray[0].name}`;
        document.querySelector('#wB').innerHTML = `${wArray[1].name}`;

        match(wArray[0], wArray[1], 1);

        console.log("\n\n");
        matchDetails.push(`\n\n`);

        console.log(`Match 2: ${wArray[2].name} vs. ${wArray[3].name}`);
        matchDetails.push(`Match 2: ${wArray[2].name} vs. ${wArray[3].name}`);

        document.querySelector('#wC').innerHTML = `${wArray[2].name}`;
        document.querySelector('#wD').innerHTML = `${wArray[3].name}`;
        match(wArray[2], wArray[3], 1);

        // reset wrestler healths before the final match
        resetHealth(matchWinners[0], healthArray);
        resetHealth(matchWinners[1], healthArray);

        console.log("\n\n");
        matchDetails.push("\n\n");

        console.log(`Match 3: ${matchWinners[0].name} vs. ${matchWinners[1].name}`);
        matchDetails.push(`Match 3: ${matchWinners[0].name} vs. ${matchWinners[1].name}`);

        document.querySelector('#wE').innerHTML = `${matchWinners[0].name}`;
        document.querySelector('#wF').innerHTML = `${matchWinners[1].name}`;
        const finalWinner = match(matchWinners[0], matchWinners[1], 1);

        // display match details in the dropdowns
        document.querySelector('#match1Details').innerHTML = getMatchDetails(1).join('<br>');
        document.querySelector('#match2Details').innerHTML = getMatchDetails(2).join('<br>');
        document.querySelector('#match3Details').innerHTML = getMatchDetails(3).join('<br>');

        console.log("\n");
        console.log(`${finalWinner.name} wins the tournament`);
        document.querySelector('#winner').innerHTML = `<i class="fa-solid fa-crown is-color-warning"></i> ${finalWinner.name}`;
    }
    else if (wArray.length == 3) {
        console.log(`Match 1: ${wArray[0].name} vs. ${wArray[1].name}`);
        matchDetails.push(`Match 1: ${wArray[0].name} vs. ${wArray[1].name}`);
        
        document.querySelector('#wA').innerHTML = `${wArray[0].name}`;
        document.querySelector('#wB').innerHTML = `${wArray[1].name}`;
        match(wArray[0], wArray[1], 1);

        console.log("\n\n");
        matchDetails.push("\n\n");

        console.log(`Match 2: ${wArray[2].name}`);
        matchDetails.push(`Match 2: ${wArray[2].name}`);

        console.log(`No opponent, ${wArray[2].name} wins and automatically advances to next match`);
        matchDetails.push(`No opponent, ${wArray[2].name} wins and automatically advances to next match`);

        document.querySelector('#wC').innerHTML = `${wArray[2].name}`;
        matchWinners.push(wArray[2]);

        console.log("\n\n");
        matchDetails.push("\n\n");

        console.log(`Match 3: ${matchWinners[0].name} vs. ${matchWinners[1].name}`);
        matchDetails.push(`Match 3: ${matchWinners[0].name} vs. ${matchWinners[1].name}`);

        document.querySelector('#wE').innerHTML = `${matchWinners[0].name}`;
        document.querySelector('#wF').innerHTML = `${matchWinners[1].name}`;
        const finalWinner = match(matchWinners[0], matchWinners[1], 1);

        // display match details in the dropdowns
        document.querySelector('#match1Details').innerHTML = getMatchDetails(1).join('<br>');
        document.querySelector('#match2Details').innerHTML = getMatchDetails(2).join('<br>');
        document.querySelector('#match3Details').innerHTML = getMatchDetails(3).join('<br>');

        console.log(`${finalWinner.name} wins the tournament!`);
        document.querySelector('#winner').innerHTML = `<i class="fa-solid fa-crown is-color-warning"></i> ${finalWinner.name}`;
    }
    else if (wArray.length == 2) {
        console.log(`Match 1: ${wArray[0].name} vs. ${wArray[1].name}`);
        matchDetails.push(`Match 1: ${wArray[0].name} vs. ${wArray[1].name}`);

        document.querySelector('#wA').innerHTML = `${wArray[0].name}`;
        document.querySelector('#wB').innerHTML = `${wArray[1].name}`;

        // first/final match
        const finalWinner = match(wArray[0], wArray[1], 1);;
        console.log(`${finalWinner.name} wins the tournament!`);

        // display match details in the dropdowns
        document.querySelector('#match1Details').innerHTML = getMatchDetails(1).join('<br>');
        document.querySelector('#winner').innerHTML = `<i class="fa-solid fa-crown is-color-warning"></i> ${finalWinner.name}`;
    }
    else if (wArray.length == 1) {
        console.log('Only one wrestler showed up.');
        document.querySelector('#match1Details').innerHTML = `Only one wrestler showed up.<br>`;
        console.log(`${wArray[0].name} automatically wins the tournament!`);
        document.querySelector('#match1Details').innerHTML += `${wArray[0].name} automatically wins the tournament!`;
        document.querySelector('#wA').innerHTML = `${wArray[0].name}`;
        document.querySelector('#winner').innerHTML = `<i class="fa-solid fa-crown is-color-warning"></i> ${wArray[0].name}`;
    }
    // if the array is empty
    else if (wArray.length == 0) {
        console.log('No wrestlers showed up.');
        console.log('No winner declared.')
    }
    // if the array has more than 4 wrestlers
    else {
        console.log('Too many wrestlers showed up.');
        console.log('Only 4 wrestlers can compete in a tournament.');
    }
};

/*
* Read and return the data from a JSON file
* param: filename, the name of the JSON file
* returns: the data from the JSON file and runs the main function with the data
*/
const handleFileUpload = (fileInput) => {
    //https://gomakethings.com/how-to-upload-and-process-a-json-file-with-vanilla-js/
    // if there is a file
    if (fileInput.files.length > 0) {
        const reader = new FileReader();
        //
        reader.onload = (e) => {
            const text = e.target.result;
            wrestlers = JSON.parse(text);
            // console.log(text);
            // console.log(wrestlers);

            // run the tournament with the uploaded wrestlers
            main(wrestlers);
        };
        reader.readAsText(fileInput.files[0]);
    }
    else {
        return;
    }
};

/*
 * Main function to run the tournaments with wrestler arrays of different lengths
 */
const main = (array) => {
    // remove any empty objects from the given array
    // code from https://surajsharma.net/blog/javascript-remove-empty-objects-from-array
    const roster = array.filter(obj => !(Object.keys(obj).length === 0));

    // make an array to store each wrestler and their original healths
    // code from: https://www.geeksforgeeks.org/how-to-create-an-array-of-partial-objects-from-another-array-in-javascript/
    const originalHealths = array.map(({ name, health }) => ({ name, health }));

    console.log(`\n----------Tournament: ${roster.length} wrestler(s)-----------`);
    tournament(roster, originalHealths);

    // console.log(matchDetails);
    // console.log(getMatchDetails(1));
};

/*
 * On page load, have the file input display the file name when uploaded
 * and setup the submit button to run the main function with the uploaded file
 */
window.onload = () => {
    // main(wrestlers4);

    // https://bulma.io/documentation/form/file/
    const fileInput = document.querySelector("#fileUpload input[type=file]");
    fileInput.onchange = () => {
        if (fileInput.files.length > 0) {
            const fileName = document.querySelector("#fileUpload .file-name");
            fileName.textContent = fileInput.files[0].name;
        }
    };

    document.querySelector('#submitBtn').onclick = () => {
        if (fileInput.files.length > 0) {
            handleFileUpload(fileInput);
        }
        else {
            console.log("No file uploaded.");
        }
    };
};

