document.addEventListener("DOMContentLoaded", function () {
    let startBtn = document.getElementById("start");

    if (startBtn) {
        startBtn.addEventListener("click", function () {
            window.location.href = "ChooseGame.html";
        });
    }

    let rockPaperGame = document.getElementById("rock-paper-game");
    if (rockPaperGame) {
        rockPaperGame.addEventListener('click', function () {
            window.location.href = "index.html";
        });
    }

    let TicTackToe = document.getElementById('tic-tack-toe-game');
    if (TicTackToe) {
        TicTackToe.addEventListener('click', function () {
            window.location.href = "tic-tack.html"; // Redirects to the game page
        });
    }

    // Move this outside the previous block
    let onePlayerBtn = document.getElementById("one-player");
    if (onePlayerBtn) {
        onePlayerBtn.addEventListener('click', function () {
            PlayGame()
        });

    } else {
        console.error("1P button not found in DOM!");
    }


    if (window.location.pathname.includes("result.html")) {
        showResult();
        setupResultButtons();
    }
});

//main function of rock paper game
function PlayGame() {
    let PlayBtn = document.querySelector('#one-player');
    let paraElements = document.getElementsByClassName('welcome-para')
    let choices = document.querySelector('#choices')
    let scorecard = document.querySelector('#score-card')

    PlayBtn.addEventListener('click', () => {
        choices.style.display = "block";
        PlayBtn.style.display = "none";
        document.querySelector('#two-player').style.display = "none"

        for (let i = 0; i < paraElements.length; i++) {
            paraElements[i].style.display = "none"
        }
    })
    document.querySelectorAll('.btn-img').forEach(button => {
        button.addEventListener('click', function () {
            let userChoice = this.getAttribute('data-choice')
            let compChoice = getComputerChoice()
            updateImage(userChoice, compChoice)
            updateResult(userChoice, compChoice);

            document.querySelector('#selectionDisplay').style.display = "block";
            scorecard.style.display = "block";
        })
    })

    function updateImage(userChoice, compChoice) {
        document.getElementById('userChoiceImage').src = `Images/${userChoice}.png`;
        document.getElementById('compChoiceImage').src = `Images/${compChoice}.png`;

    }

    function getComputerChoice() {
        const choices = ["Rock", "Paper", "Scissors", "Lizard", "Spock"]
        return choices[Math.floor(Math.random() * choices.length)]
    }

    let userScore = 0;
    let compScore = 0;
    let roundPlayed = 0;

    function updateResult(userChoice, compChoice) {
        let result = determineWinner(userChoice, compChoice);

        resetAnimations();

        if (result === 'win') {
            userScore++;
            animateScore("user-score-anim");  // Call animation function
        }
        else if (result === 'lose') {
            compScore++;
            animateScore("comp-score-anim");
        }
        else {
            animateScore("draw-animation");
        }
        document.querySelector('#result').innerHTML = `You chose ${userChoice} and Computer chose ${compChoice}`
        document.getElementById('user-score').innerText = userScore;
        document.getElementById('comp-score').innerText = compScore;

        roundPlayed++;

        if (roundPlayed === 5) {
            setTimeout(() => {
                showFinalResult();
            }, 1000);  // Wait 1 second before redirecting
        }
    }

    function showFinalResult() {
        let finalResult = "";

        if (userScore > compScore) {
            finalResult = "win";
        } else if (userScore < compScore) {
            finalResult = "lose";
        } else {
            finalResult = "draw";
        }

        // Redirect to result.html with the result passed as a query parameter
        window.location.href = `result.html?result=${finalResult}`;
    }

    //animation function
    function animateScore(elementId) {
        let animElement = document.getElementById(elementId);
        animElement.style.opacity = "1";
        animElement.style.transform = "translateY(-35px)";

        setTimeout(() => {
            animElement.style.opacity = "0";
            animElement.style.transform = "translateY(0)";
        }, 800);
    }

    // Function to reset all animations (hide previous animations)
    function resetAnimations() {
        document.getElementById("user-score-anim").style.opacity = "0";
        document.getElementById("comp-score-anim").style.opacity = "0";
        document.getElementById("draw-animation").style.opacity = "0";
    }

    //main determine function
    function determineWinner(userChoice, compChoice) {
        userChoice = userChoice.toLowerCase();
        compChoice = compChoice.toLowerCase();

        const winConditions = {
            rock: ["scissors", "lizard"],
            paper: ["rock", "spock"],
            scissors: ["paper", "lizard"],
            lizard: ["spock", "paper"],
            spock: ["scissors", "rock"]
        };

        if (userChoice === compChoice) {
            return "Draw"
        }
        return winConditions[userChoice].includes(compChoice) ? "win" : "lose";
    }

}

function showResult() {
    let result = new URLSearchParams(location.search).get("result");
    let messages = {
        win: "🎉 Congratulations! You won! 🎉",
        lose: "😞 You lost! Try again!",
        draw: "It's a Draw! 🤝"
    };

    document.getElementById("result-message").innerText = messages[result] || "Unknown result";


    if (result === "win") {
        confetti();
    }
}

function setupResultButtons() {
    let replayBtn = document.getElementById("replay");
    let exitBtn = document.getElementById("exit");

    if (replayBtn) {
        replayBtn.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }

    if (exitBtn) {
        exitBtn.addEventListener("click", function () {
            window.location.href = "ChooseGame.html";
        });
    }
}






