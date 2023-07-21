const customTimerInput = document.querySelector("#custom-timer");
const startCustomTimer = document.querySelector("#start-custom-timer");

const timerMinutesCountDown = document.querySelector("#timer-minutes");
const timerSecondsCountDown = document.querySelector("#timer-seconds");


const fifteenMinutesTemplateButton = document.querySelector("#fifteen-minutes-template");
const twentyfiveMinutesTemplateButton = document.querySelector("#twenty-five-minutes-template");
const thirtyFiveMinutesTemplate = document.querySelector("#thirty-five-minutes-template");

const numberOfPodomoroSessions = document.querySelector("#number-of-podomoro-sessions")

const addTodo = document.querySelector("#add-todo");
const todoInput = document.querySelector("#todo-input");
const userOngoingTodo = document.querySelector("#user-todo");
const todoCheckbox = document.querySelector("#todo-checkbox");


const quoteContainer = document.querySelector("#quote-container");


const giveUpButton = document.querySelector("#give-up-button");




let secondsInAMinute = 59;
// this array will keep track of the amount of podomor sessions
let podomoroSessionCount = [];




startCustomTimer.addEventListener("click", () =>{
    // a conditon to check if the user's input is valid
    if(customTimerInput.value === '0' || customTimerInput.value === undefined || customTimerInput.value === ''){
        alert("enter a valid input");
    }
    else{
        // customTimerInput.value -= 1;

        // console.log(customTimerInput.value)


        // removes the timer input start button, and template buttons
        customTimerInput.style.display = "none";
        startCustomTimer.style.display = "none";
        fifteenMinutesTemplateButton.style.display = "none";
        twentyfiveMinutesTemplateButton.style.display = "none";
        thirtyFiveMinutesTemplate.style.display = "none";


        // initializes the timer to the user's input to the original user's input
        timerMinutesCountDown.textContent = customTimerInput.value;

        // initializes the timer to the user's input minus one
        setTimeout(()=>{
            timerMinutesCountDown.textContent = customTimerInput.value - 1;
            timerSecondsCountDown.textContent = secondsInAMinute;
        },1000)


        //starts countdown and keep checking the conditons
        const secondsIntervalCountDown = setInterval(()=>{
            timerSecondsCountDown.textContent = secondsInAMinute;
            if(secondsInAMinute >= 1){
                secondsInAMinute--;
            }
    
            else{
                //removes one from the  minutes every time the seconds hits zero
                timerMinutesCountDown.textContent -= 1;
                secondsInAMinute = 59;
            }

            // checks if timer has reached zero to stop the the timer
            if(timerMinutesCountDown.textContent === '-1' && timerSecondsCountDown.textContent === '0'){
                clearInterval(secondsIntervalCountDown)
                timerMinutesCountDown.textContent = '0';
                timerSecondsCountDown.textContent = '00';
                // alert("Take a Break")
                // location.reload();

                // adds the timer input start button, and template buttons b ack to the ui
                customTimerInput.style.display = "block";
                startCustomTimer.style.display = "block";
                fifteenMinutesTemplateButton.style.display = "block";
                twentyfiveMinutesTemplateButton.style.display = "block";
                thirtyFiveMinutesTemplate.style.display = "block";
                // numberOfPodomoroSessions.textContent += 1; the timer shouldn't have a session count because we are not regulating it
            }
        }, 1000);
    }
})




// a function for the template buttons countdown timer

const minutesTemplatButton = (templateButton, removeAddTemplateButton1, removeAddTemplateButton2) =>{
    //hides all of the template buttons
    removeAddTemplateButton1.style.display = "none";
    removeAddTemplateButton2.style.display = "none";
    templateButton.style.display = "none";
    customTimerInput.style.display = "none";
    startCustomTimer.style.display = "none";
    // assigns the number of sessions to 0
    numberOfPodomoroSessions.textContent = podomoroSessionCount.length;

    // assign the value of the button to the  minutes timer
    timerMinutesCountDown.textContent = templateButton.textContent;

    setTimeout(()=>{
        timerMinutesCountDown.textContent = templateButton.textContent -1;
    }, 1000)
    // use setInterval to start the timer
    const templateMinuteInterval = setInterval(()=>{
            // assign the value of the button to the  second timer
            timerSecondsCountDown.textContent = secondsInAMinute;


            if(timerSecondsCountDown.textContent >= 1){
                secondsInAMinute--;
            }
            else{
                timerMinutesCountDown.textContent -= 1;
                secondsInAMinute = 59;
            }

            if(timerMinutesCountDown.textContent === '0' && timerMinutesCountDown.textContent === '0'){
                timerSecondsCountDown.textContent = '00';
                alert("Take a break too")
                clearInterval(templateMinuteInterval);
                // adds a finished session to the podomoro session count array and assigns the length of the array to the session
                podomoroSessionCount.push(1);
                numberOfPodomoroSessions.textContent = podomoroSessionCount.length;

                //shows all template button 
                removeAddTemplateButton1.style.display = "block";
                removeAddTemplateButton2.style.display = "block";
                templateButton.style.display = "block";
                customTimerInput.style.display = "block";
                startCustomTimer.style.display = "block";
            }
        }, 1000)
}




// event listeners for template buttons

fifteenMinutesTemplateButton.addEventListener("click", () =>{
    minutesTemplatButton(fifteenMinutesTemplateButton, twentyfiveMinutesTemplateButton, thirtyFiveMinutesTemplate);
})

twentyfiveMinutesTemplateButton.addEventListener("click", () =>{
    minutesTemplatButton(twentyfiveMinutesTemplateButton, fifteenMinutesTemplateButton, thirtyFiveMinutesTemplate);
})

thirtyFiveMinutesTemplate.addEventListener("click", () =>{
    minutesTemplatButton(thirtyFiveMinutesTemplate, fifteenMinutesTemplateButton, twentyfiveMinutesTemplateButton);
})

//listens for a click and reloads the entire application
giveUpButton.addEventListener("click", () =>{
    if(timerMinutesCountDown.textContent === '0'){
        alert("You haven't even gotten started yet!! LOL");
    }
    else{
        alert("You'll do better next time");
        location.reload();
    }
})



// adds a todo when a button is clicked

addTodo.addEventListener("click", () =>{
    addTodo.style.display = "none";
    todoInput.style.display = "none";
    todoCheckbox.style.display = "block";
    // a event listener that listens if the box is checked and runs line in todo
    userOngoingTodo.textContent = todoInput.value;
    todoCheckbox.addEventListener("click", () => {
        userOngoingTodo.style.color = "gray";
        userOngoingTodo.style.textDecoration = "line-through";
        localStorage.setItem("user-todo", userOngoingTodo);
        setTimeout(()=>{
            location.reload();
        }, 2000)
    })
})




const motivationApiUrlEndpoint = 'https://type.fit/api/quotes';

const getRandomQuote = (quote) =>{
    const randomQuote = Math.floor(Math.random() * quote.length);
    return randomQuote;
}


async function getQuote(url){
    const request = await fetch(url);
    const response = await request.json();
    return response;
}

async function retriveQuote(){
    const theQutoes = await getQuote(motivationApiUrlEndpoint);
    setInterval(()=>{
        const theRandomQuote = getRandomQuote(theQutoes);
        quoteContainer.textContent = theQutoes[theRandomQuote].text;
    }, 5000)
}

retriveQuote()






