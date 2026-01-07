/* console.log("JS is connected.") */

const numJudges = 3;

for (let i = 1; i <= numJudges; i++) {
    const halfPointCheckbox = document.getElementById(`judge${i}Half`);
    const radioButtons = document.querySelectorAll(`input[name="judge${i}"]`)

    radioButtons.forEach(() => {
        document.addEventListener('change', () => 
            {
                const checkedRadio = document.querySelector(`input[name="judge${i}"]:checked`);
                if (checkedRadio !== null && checkedRadio.value === "10") {
                    halfPointCheckbox.checked = false;
                    halfPointCheckbox.disabled = true;
                }
                else {
                    halfPointCheckbox.disabled = false;
                }
            });
    });
}

const calculateBtn = document.getElementById("calculateBtn");

calculateBtn.addEventListener("click", function() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const team = document.getElementById("team").value;
    const dd = document.getElementById("dd").value;

    /* Verify entry of a name and dd */
    if (!(firstName || lastName)) {
        alert("Please identify the diver.");
        return;
    }
    if (!dd) {
        alert("Please enter a degree of difficulty.");
        return;
    }

    console.log(`Diver's full name: ${firstName} ${lastName}`);
    console.log(`Diver's team affiliation: ${team}`);
    console.log(`Dive's degree of difficulty: ${dd}`);

    let scores = [];
    for (let i=1; i<=numJudges; i++) {
        console.log("");
        console.log(`EXAMINING JUDGE${i}...`);
        const checkedRadio = document.querySelector(`input[name="judge${i}"]:checked`);
        const halfPointCheckbox = document.getElementById(`judge${i}Half`);
        if (checkedRadio) {
            console.log(`This is a printout of checkedRadio: ${checkedRadio}`);
            console.log(`This is a printout of checkedRadio's value:  ${checkedRadio.value}`)
        }
        
        /* determine current judge's score by reading radios and/or halfPointCheckbox */
        let score = 0;
        if (checkedRadio !== null) {
            score = Number(checkedRadio.value);
            console.log(`Checked radio value is ${checkedRadio.value}`);
            console.log(`Number(checkedRadio.value) is ${Number(checkedRadio.value)}`);
        }
        console.log(`Whole # score for judge${i} is ${score}`);
        
        if (halfPointCheckbox.checked) {
            console.log(`Judge${i}'s score was incremented by 0.5.`)
            score += 0.5
        }
        console.log(`After possible addition of 0.5, score for judge${i} is ${score}`);

        /* determine if a score was entered for the current judge */
        if (checkedRadio||halfPointCheckbox.checked) {
            console.log(`judge${i}'s score was ${score}`)
            scores.push(score);
        }
        else {
            console.log(`Judge ${i} failed to score this dive.`);
        }
    }

    /* Determine of all the judges' scores were entered */
    if (scores.length !== 3) {
        alert("Please be sure to enter a score for EVERY judge.");
        return;
    }

    console.log(`Scores: ${scores}`);

    /* calculate score for this dive */
    let judgesScoresTotal = 0;
    scores.forEach(function(score) {
        judgesScoresTotal += score;
    })
    const divesTotalPoints = dd * judgesScoresTotal;
    console.log(`Points earned with this dive: ${divesTotalPoints}`);

    const resultElement = document.getElementById("resultOfDive");
    resultElement.textContent = `Points earned on this dive: ${divesTotalPoints.toFixed(2)}`
});
