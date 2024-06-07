const audio = document.querySelector('audio');
const playPausedBtn = document.querySelector('.play-paused-btn');
const audioContainer = document.querySelector('.audio-container');
const currentTimeElem = document.querySelector('.current-time');
const totalTimeElem = document.querySelector('.total-time');
const timelineContainer = document.querySelector('.timeline-container');



//timeline function
timelineContainer.addEventListener('mouseover', (e)=>{
    console.log('mouse is over the timeline');

    const rect = timelineContainer.getBoundingClientRect()
    //let percent = Math.
    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width)/ rect.width;
    timelineContainer.style.setProperty('--perview-position', percent)

    console.log(percent);
})



playPausedBtn.addEventListener('click', playPaused)

function playPaused() {
    audio.paused? audio.play(): audio.pause()
}

audio.addEventListener('play', ()=>{
    audioContainer.classList.add('paused')
})

audio.addEventListener('pause', ()=>{
    audioContainer.classList.remove('paused')
})

audio.addEventListener('loadeddata', ()=>{
    totalTimeElem.textContent = formatDuration(audio.duration)
})

audio.addEventListener('timeupdate', ()=>{
    currentTimeElem.textContent = formatDuration(audio.currentTime)
})

const leadingZero = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
})



function formatDuration(time) {
    const second = Math.floor(time % 60);
    const minute = Math.floor(time /60)%60;
    const hour = Math.floor(time /3600)

    if (hour === 0) {
        return `${leadingZero.format(minute)}:${leadingZero.format(second)}`
    }else if(hour>1) {
        `${leadingZero.format(hour)}:${leadingZero.format(minute)}:${leadingZero.format(second)}`
    }
}

document.addEventListener('keydown', (e)=>{
    switch (e.key.toLocaleLowerCase()) {
        case ' ':
         playPaused()
         break;

        case 'arrowright':
            skip(5)
            break;
        
        case 'arrowleft':
            skip(-5)
            break;
    }

})


//skippiing the music
function skip(duration) {
    audio.currentTime+=duration
}



