let previousAudio = ""; //keep track of last keydown

window.addEventListener("click", function (e) {
    //get  HTML target on mouse click, then get the value of the
    //data-type attribute. 

    try {
        const keyValue = e.target.attributes["data-type"].value;
        doTheThing(keyValue);
        //clicking any element without data-type attribute throws
        //an undefined error.
    } catch (error) {
        console.log("All good. Clicked unintended element:", e);
    }
})

window.addEventListener("keydown", function (e) {
    const keyValue = e.code;
    doTheThing(keyValue);
})

function doTheThing(keyValue) {
    const button = document.querySelector(`.key[data-type="${keyValue}"]`);
    // select element with .key && the (keyboard/mouse) event
    if (!button) {
        // if unidentified button played, do nothing
        return;
    }

    const audio = document.querySelector(`audio[data-type="${keyValue}"]`);

    // console.time("audioStop()"); 
    // audioStop();  s                   //disabled due to latency
    // console.timeEnd("audioStop()");

    audio.currentTime = 0; //rewind track to start from 00:00:00
    audio.play();
    removeActive();
    button.classList.add("active");
    button.children[0].classList.add("activeChild");
    previousAudio = `${keyValue}`;
}

// function audioStop() {
//     // function interrupts any sound to play keydown asap
//     document.querySelector(`audio[data-type="${previousAudio}"]`).pause();
// }

function removeActive() {
    if (!previousAudio) {
        return;
    }
    document.querySelector(`.key[data-type="${previousAudio}"]`).classList.remove("active");
    document.querySelector(`.key[data-type="${previousAudio}"]`).children[0].classList.remove("activeChild");
} 