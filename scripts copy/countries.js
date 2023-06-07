var countriesDataJSON;
var countryIndex;
var countriesArrFirstIndex = 0;
var countriesArrLastIndex = 249; //There are 250 total countries
var countCorrect = 0;
var countIncorrect = 0;
var answerSelected = false; //Answer has been selected for the current prompt

function loadCountriesData()
{
    let api='https://restcountries.com/v3.1/all';
    fetch(api)
    .then(res => res.json())
    .then((dataJSON) => {
        console.log(dataJSON);
        countriesDataJSON = dataJSON;
        getRandomFlag();
    });
}

function getRandomFlag()
{
    answerSelected = false; //Reset to false every new flag 
    document.getElementById("hintPanel").innerHTML = ""; //Reset hint section every new flag

    countryIndex = getRandomIntInclusive(countriesArrFirstIndex, countriesArrLastIndex); //Get random number between 0 and 249
    localStorage.setItem("countryIndex", countryIndex);

    let flagURL = countriesDataJSON[countryIndex].flags.png;
    document.getElementById("countryFlag").src = flagURL;
    //console.log(countriesDataJSON[countryIndex].name.common); 

    populateButtonOptions();
}

function populateButtonOptions()
{
    document.getElementById("option1").style.color = "black"; //Reset to black every new flag
    document.getElementById("option2").style.color = "black";

    let correctAnswer = countriesDataJSON[localStorage.getItem("countryIndex")].name.common; //Country name of given flag
    let incorrectAnswer = countriesDataJSON[getRandomIntInclusive(countriesArrFirstIndex, countriesArrLastIndex)].name.common; //Country name of random flag
    let answers = [correctAnswer, incorrectAnswer];

    //Randomize populating the answers in option1 and option2 buttons
    //Ensures that a button does NOT always have the correct answer
    let option1 = getRandomIntInclusive(0, 1); 
    document.getElementById("option1").innerHTML = `${answers[option1]}`;

    let option2 = (option1 == 1) ? 0: 1;
    document.getElementById("option2").innerHTML = `${answers[option2]}`;
}

function showHint()
{
    let hintPanel = document.getElementById("hintPanel");

    if(hintPanel.innerHTML == "")
    {
        let country = countriesDataJSON[localStorage.getItem("countryIndex")];
        let hintString = `<p>Continent: ${country.continents}</p>`
        hintPanel.innerHTML += hintString;
    } 
}

function checkAnswer(option)
{
    if(answerSelected == false) //Ensure an option has NOT already been selected
    {
        if(option == 'option1')
        {
            compareToCorrectAnswer(document.getElementById("option1").innerHTML, document.getElementById("option1"));
        }
        else if (option == 'option2')
        {
            compareToCorrectAnswer(document.getElementById("option2").innerHTML, document.getElementById("option2"));
        }
        answerSelected = true;
    }
}

function compareToCorrectAnswer(selectedAnswer, button)
{
    if(selectedAnswer == countriesDataJSON[localStorage.getItem("countryIndex")].name.common)
    {
        //console.log("Correct!");
        button.style.color = "green";
        document.getElementById("countCorrect").innerHTML = 'Correct: '; //Reset count
        document.getElementById("countCorrect").innerHTML += `${++countCorrect}`;
    }
    else
    {
        //console.log("Not correct");
        button.style.color = "red";
        document.getElementById("countIncorrect").innerHTML = 'Incorrect: '; //Reset count
        document.getElementById("countIncorrect").innerHTML += `${++countIncorrect}`;
    }
}

function getRandomIntInclusive(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}