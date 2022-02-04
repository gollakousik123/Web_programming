$(function () {
    $("button").click(function () {
        let myChoice = $(this).attr('id');
        play(myChoice);
    });
})

function play(userChoice) {

    rivalChoice = getOpponentChoice();
    if (userChoice === rivalChoice)
        alert("It's a draw! Please Try again");
    else if (userChoice == "rock")
        if (rivalChoice == "scissors")
            alert("You Won ... Your opponent had scissors");
        else
            alert("You Lost ... Your opponent had Papers");
    else if (userChoice == "paper")
        if (rivalChoice == "rock")
            alert("You Won ... Your opponent had rock");
        else
            alert("You Lost !!! Your opponent had scissors");
    else if (userChoice == "scissors")
        if (rivalChoice == "paper")
            alert("You Won ... Your opponent had paper");
        else
            alert("You Lost ... Your opponent had rock");
}
function getOpponentChoice() {

    switch (Math.floor(Math.random() * 3)) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissors';
    }
}


