const audio = document.querySelector('audio');
const playPausedBtn = document.querySelector('.play-paused-btn');
const audioContainer = document.querySelector('.audio-container');
const currentTimeElem = document.querySelector('.current-time');
const totalTimeElem = document.querySelector('.total-time');
const timelineContainer = document.querySelector('.timeline-container');
const loopingBtn = document.querySelector('.looping-btn');
const slider = document.querySelector('.volume-slider');

const fowardBtn = document.querySelector('.foward-btn');
const mutedBtn = document.querySelector('.muted-btn');
const playbackBtn = document.querySelector('.playback-btn');



//implement the speed of the audio

playbackBtn.addEventListener('click', ()=>{
    let newplayBackRate = audio.playbackRate + .25;

    if(newplayBackRate > 2)newplayBackRate = .25;
    audio.playbackRate = newplayBackRate;
    playbackBtn.textContent = `${newplayBackRate}x`
    

    console.log(newplayBackRate);
})

//initialing the volume level of input
slider.addEventListener('input', e=>{
    audio.muted = e.target.value === 0
    audio.volume = e.target.value

})

//setting the volume level of input when it is move and the icon to show
audio.addEventListener('volumechange', ()=>{
     slider.value = audio.volume

    console.log(slider.value);
    let volumeLevel;

     if (audio.muted || audio.volume ===0) {
        slider.value = 0
        volumeLevel = "muted"
     }else if(audio.volume < .5) {
        volumeLevel = "low"
     } else {
        volumeLevel = "high"
     }

    audioContainer.dataset.volumeLevel = volumeLevel
     
})

//muting and giving the audio sound
mutedBtn.addEventListener('click', ()=>{
    audio.muted = !audio.muted
})


//audio listed array
const audioList =[
    {
        id: 1,
        music: "assests/music/Dax_-__Book_Of_Revelations__(Official_Music_Video)(256k).mp3",
        atist: "Dax",
        music_name: "Book of Revelations",
        duration: audio.duration,
        },
    {
        id: 2,
        music: "assests/music/`TEDDYRIDE_King_Solomon(360p).mp3",
        atist: "TeddyRide",
        music_name: "King Solomon",
        duration: audio.duration,
    },
    {
        id: 3,
        music: "assests/music/Dax_-__Dear_Mom__(Official_Music_Video)(256k).mp3",
        atist: "Dax",
        music_name: "Dear Mom",
        duration: audio.duration, 
    },
    {
        id: 4,
        music: "assests/music/Dax_-__Depression__(Official_Music_Video)(256k).mp3",
        atist: "Dax",
        music_name: "Depression Official",
        duration: audio.duration,
    },
    {
        id: 5,
        music: "assests/music/Dax_-__I_Can't_Breathe__(Official_Music_Video)(256k).mp3",
        atist: "Dax",
        music_name: "I can't Breathe",
        duration: audio.duration,
    },
]

//popular music list
const middleLeftSection = document.getElementsByClassName('middle-left-section');
let popularMusicContainer = document.querySelector('.popular-music-container');


/*

for (let i = 0; i < audioList.length; i++) {
    let list = audioList[i]
    console.log(list)
    let popularMusic = document.createElement('div');
     popularMusic.classList.add('popular-music');

     popularMusic.innerHTML=`<div class="id-icon-wrapper">
                            <div class="id">${list.id}</div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="play-music-icon" viewBox="0 0 16 16">
                                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                            </svg>
                        </div>
        
                        <div class="popular-music-name">
        
                            <div class="artist-name-wrapper">
                                <p class="music-name">${list.music_name}</p>
                                <p class="artist-name">${list.atist}</p>
                            </div>
                        </div>
        
                        <div class="audio-info">
                            <div class="audio-duration">02:22</div>
                        </div>`

     popularMusicContainer.appendChild(popularMusic)
     
 
                            
}

*/

//repeating mode of the audio
loopingBtn.addEventListener('click', toggleRepeateMode);

function toggleRepeateMode() {
    audioContainer.classList.toggle('repeate')
}



function repeate() {

    if (audioContainer.classList.contains('repeate')) {
        let currentTime = audio.currentTime = 0;
        audio.play()
        
    }
    
}

audio.addEventListener('ended', repeate)


//nexting the audio to the next music
fowardBtn.addEventListener('click', nextVideo);

function nextVideo() {
    let lastElem =audioList.pop();
    audioList.unshift(lastElem)
    //console.log(shiftedData);
    
    if (lastElem) {
        audio.src = lastElem.music;
        audio.play()
    }   
   
}
audio.src = audioList[0].music



//timeline function
timelineContainer.addEventListener('mousedown', (e)=>{
    console.log('mouse is over the timeline');

    const rect = timelineContainer.getBoundingClientRect()
    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width)/ rect.width;
    timelineContainer.style.setProperty("--preview-position", percent)

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

    const percent = audio.currentTime / audio.duration
    timelineContainer.style.setProperty("--progress-position", percent)
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



