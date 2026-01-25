/* console.log("JS is connected.") */

//The helper function below disables the half-point checkbox whenever a 10 has been awarded.//
function updateHalfPointAvailability(judgeNum, halfPointCheckbox) {
    const checkedRadio = document.querySelector(`input[name="judge${judgeNum}"]:checked`);
    if (checkedRadio && checkedRadio.value === "10") {
        halfPointCheckbox.checked = false;
        halfPointCheckbox.disabled = true;
    }
    else {
        halfPointCheckbox.disabled = false;
    }
}

//The helper function below reads a judge's score.//
function readJudgeScore(judgeNum, checkedRadio, halfPointCheckbox) {
    let score = null;
    if (checkedRadio||halfPointCheckbox.checked) {
        score = 0;
        if (checkedRadio) {
                score += Number(checkedRadio.value);
                console.log(`Checked radio value is ${checkedRadio.value}`);
                console.log(`Number(checkedRadio.value) is ${Number(checkedRadio.value)}`);
        }
        console.log(`Whole # score for judge${judgeNum} is ${score}`);
            
        if (halfPointCheckbox.checked) {
            console.log(`Judge${judgeNum}'s score was incremented by 0.5.`);
            score += 0.5;
        }
        console.log(`After possible addition of 0.5, score for judge${judgeNum} is ${score}`);
    }

    return score;
}

//The helper function below calculates the total score of a dive.//
function calculateDivesTotalScore(dd,scores) {
    let judgesScoresTotal = 0;
    scores.forEach(function(score) {
        judgesScoresTotal += score;
    })
    return (dd * judgesScoresTotal);
}

const numJudges = 3;

for (let i = 1; i <= numJudges; i++) {
    const halfPointCheckbox = document.getElementById(`judge${i}Half`);
    const radioButtons = document.querySelectorAll(`input[name="judge${i}"]`);

    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            updateHalfPointAvailability(i, halfPointCheckbox);
        });
    });
}

const calculateBtn = document.getElementById("calculateBtn");

calculateBtn.addEventListener("click", function() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const team = document.getElementById("team").value;
    const dd = Number(document.getElementById("dd").value);

    /* Verify entry of a name and dd */
    if (!(firstName || lastName)) {
        alert("Please identify the diver.");
        return;
    }
    if (!dd || Number.isNaN(dd)) {
        alert("Please enter a valid degree of difficulty.");
        return;
    }

    console.log(`Diver's full name: ${firstName} ${lastName}`);
    console.log(`Diver's team affiliation: ${team}`);
    console.log(`Dive's degree of difficulty: ${dd}`);

    let scores = [];
    for (let i=1; i <= numJudges; i++) {
        console.log("");
        console.log(`EXAMINING JUDGE${i}...`);
        const checkedRadio = document.querySelector(`input[name="judge${i}"]:checked`);
        const halfPointCheckbox = document.getElementById(`judge${i}Half`);
        if (checkedRadio) {
            console.log(`This is a printout of checkedRadio: ${checkedRadio}`);
            console.log(`This is a printout of checkedRadio's value:  ${checkedRadio.value}`);
        }
        
        /* Determine current judge's score by reading radios and/or halfPointCheckbox */
        
        let score = readJudgeScore(i, checkedRadio, halfPointCheckbox);
        if (score !== null) {
            console.log(`judge${i}'s score was ${score}`);
            scores.push(score);
        }
        else {
            console.log(`Judge ${i} failed to score this dive.`);
        }
    }

    /* Determine if all the judges' scores were entered */
    if (scores.length !== 3) {
        alert("Please be sure to enter a score for EVERY judge.");
        return;
    }

    console.log(`Scores: ${scores}`);

    let divesTotalPoints = calculateDivesTotalScore(dd,scores);
    console.log(`Points earned with this dive: ${divesTotalPoints}`);

    const resultElement = document.getElementById("resultOfDive");
    resultElement.textContent = `Total points earned on this dive: ${divesTotalPoints.toFixed(2)}`
});