const audio = document.querySelector('audio');
const playPausedBtn = document.querySelector('.play-paused-btn');
const audioContainer = document.querySelector('.audio-container');
const currentTimeElem = document.querySelector('.current-time');
const totalTimeElem = document.querySelector('.total-time');
const timelineContainer = document.querySelector('.timeline-container');
const loopingBtn = document.querySelector('.looping-btn');
const slider = document.querySelector('.volume-slider');

const forwardBtn = document.querySelector('.forward-btn');
const backWardBtn = document.querySelector('.backward-btn');
const mutedBtn = document.querySelector('.muted-btn');
const playbackBtn = document.querySelector('.playback-btn');

const musicPicture = document.querySelector('.music-picture')
const musicImg = document.querySelector('.music-img')
const musicTitle = document.querySelector('.music-title')
const musicName = document.querySelector('.music-name')
const musicArtist = document.querySelector('.music-artist')
const musicArtistName = document.querySelector('.music-artist-name')

console.log(backWardBtn);

//audio listed array
const audioList =[
    {
        id: 1,
        music: "assests/music/Dax_-__Book_Of_Revelations__(Official_Music_Video)(256k).mp3",
        atist: "Dax",
        music_name: "Book of Revelations",
        image: "assests/img/img1.jpg",
        },
    {
        id: 2,
        music: "assests/music/`TEDDYRIDE_King_Solomon(360p).mp3",
        atist: "TeddyRide",
        music_name: "King Solomon",
        image: "assests/img/img2.jpg",
    },
    {
        id: 3,
        music: "assests/music/Dax_-__Dear_Mom__(Official_Music_Video)(256k).mp3",
        atist: "Dax",
        music_name: "Dear Mom",
        image: "assests/img/img3.png",
    },
    {
        id: 4,
        music: "assests/music/Dax_-__Depression__(Official_Music_Video)(256k).mp3",
        atist: "Dax",
        music_name: "Depression",
        image: "assests/img/img4.png",
    },
    {
        id: 5,
        music: "assests/music/Dax_-__I_Can't_Breathe__(Official_Music_Video)(256k).mp3",
        atist: "Dax",
        music_name: "I can't Breathe",
        image: "assests/img/img1.jpg",
    },
    {
        id: 6,
        music: "assests/music/Dax_-_My_Eyes_Bleed_(Official_Audio)(256k).mp3",
        atist: "Dax",
        music_name: "My Eyes Bleed",
        image: "assests/img/img3.png",
    },
    {
        id: 7,
        music: "assests/music/MattyBRaps_-_Can’t_Get_You_Off_My_Mind(360p).mp3",
        atist: "MattyBRaps",
        music_name: "Can't get you off my mind",
        image: "assests/img/img4.png",
    },
    {
        id: 8,
        music: "assests/music/Rema_Calm_Down_(Official_Music_Video)(480p).mp3",
        atist: "Rema",
        music_name: "Calm Down",
        image: "assests/img/img3.png",
    },
    {
        id: 9,
        music: "assests/music/MattyBRaps_-_Here_We_Go_Again_(ft_Auti_G)(360p).mp3",
        atist: "MattyBRaps",
        music_name: "Here we go Again",
        image: "assests/img/img2.jpg",
    },
    {
        id: 10,
        music: "assests/music/MattyBRaps_-_Ready_This_Time_(Lyrics)(480p).mp3",
        atist: "MattyBRaps",
        music_name: "Ready This Time",
        image: "assests/img/img1.jpg",
    },


]

audio.src = audioList[0].music
musicPicture.src = audioList[0].image
musicImg.src = audioList[0].image
musicArtist.textContent = audioList[0].atist
musicName.textContent = audioList[0].music_name
musicArtistName.textContent = audioList[0].atist
musicTitle.textContent = audioList[0].music_name

// looping the audios in sequence 
function loopingThroughAudio() {
    let lastElem = audioList.pop()
    audioList.unshift(lastElem)
    console.log(lastElem);
    
    if (!audioContainer.classList.contains('repeate') && lastElem) {

        audio.src = lastElem.music;
        musicPicture.src = lastElem.image;
        musicImg.src = lastElem.image;
        musicArtist.textContent = lastElem.atist;
        musicArtistName.textContent = `(prod by ${lastElem.atist})`;
        musicTitle.textContent = lastElem.music_name;
        musicName.textContent = lastElem.music_name;
        audio.play()
    }
}

//executing the loopingThroughAudio function above
audio.addEventListener('ended', loopingThroughAudio)

// fowarding audio 5 seconds 
forwardBtn.addEventListener('click', ()=>{
    audio.currentTime +=5
});

//backwading the audio 5 second
backWardBtn.addEventListener('click', ()=>{
    audio.currentTime -=5
});

//implement the playback speed of each audio
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
    console.log(audio.volume);
})

//setting the volume level of input when it is move and the icon to show
audio.addEventListener('volumechange', ()=>{
     slider.value = audio.volume
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



//repeating mode of the audio
loopingBtn.addEventListener('click', ()=>{
    audioContainer.classList.toggle('repeate')
});

function repeate() {
    if (audioContainer.classList.contains('repeate')) {
       audio.currentTime = 0;
        audio.play();
    } 
}

//executing the reeate function above
audio.addEventListener('ended', repeate);



//nexting the audio to the next music




//timeline function
timelineContainer.addEventListener('mousedown', (e)=>{
    console.log('mouse is over the timeline');

    const rect = timelineContainer.getBoundingClientRect()
    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width)/ rect.width;
    timelineContainer.style.setProperty("--preview-position", percent)
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
    }else{
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



