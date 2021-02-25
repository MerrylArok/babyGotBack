//keep track of last keydown
let previousAudio = "";

//get HTML target on mouse click, then get the value of the
//data-type attribute. 
window.addEventListener("click", function (e) {
    try {

        //clicking element without data-type attribute throws
        //an undefined error.
        const keyValue = e.target.attributes["data-type"].value;
        doTheThing(keyValue);

    } catch (error) {

        console.log("All good. Clicked unintended element:", e);

    }
})

//get the keyboard code on pressing a key
window.addEventListener("keydown", function (e) {

    const keyValue = e.code;
    doTheThing(keyValue);

})

//Function to play and highlight current keydown.
function doTheThing(keyValue) {

    // select element with .key && the (keyboard/mouse) event
    const button = document.querySelector(`.key[data-type="${keyValue}"]`);

    // if button without valid keycode is pressed, do nothing
    if (!button) {

        return;
    }

    //Get the corresponding audio element by matching data-type attribute
    const audio = document.querySelector(`audio[data-type="${keyValue}"]`);

    //Next 3 lines cut previous audio plaback immediately and starts current audio
    //Disabled due to latency (2-4 ms, which was jarring)

    // console.time("audioStop()"); 
    // audioStop();                   
    // console.timeEnd("audioStop()");

    //Rewind track  to start from 0:00:00 if same key was pressed again
    audio.currentTime = 0;

    audio.play();

    //remove .active class previous highlight
    removeActive();

    //Assign .active and .activeChild classes to focus highlight on current key
    button.classList.add("active");
    button.children[0].classList.add("activeChild");

    //keeps track of last key ==> to assist removeActive
    previousAudio = `${keyValue}`;

}


// function interrupts any sound to play keydown asap
// function audioStop() {
//        document.querySelector(`audio[data-type="${previousAudio}"]`).pause();
// }

//removes .active and .activeChild classes previous highlight
function removeActive() {

    if (!previousAudio) {
        return;
    }
    document.querySelector(`.key[data-type="${previousAudio}"]`).classList.remove("active");
    document.querySelector(`.key[data-type="${previousAudio}"]`).children[0].classList.remove("activeChild");

} 