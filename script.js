console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [];

async function getSongs() {
    try {
        let response = await fetch("https://titanpro4.pythonanywhere.com/songs");
        songs = await response.json();
        updateSongList();
    } catch (error) {
        console.error("Error fetching songs:", error);
    }
}

const updateSongList = () => {
    songItems.forEach((element, i) => { 
        if(songs[i]) {
            element.getElementsByTagName("img")[0].src = songs[i].cover_path; 
            element.getElementsByClassName("songName")[0].innerText = songs[i].title; 
            element.style.display = "block";
        } else {
            element.style.display = "none"; 
        }
    });
}

getSongs();

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        if(!audioElement.src && songs.length > 0) {
            audioElement.src = songs[0].file_path;
        }
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', ()=>{ 
    if(audioElement.duration){
        let progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
        myprogressbar.value = progress;
    }
})

myprogressbar.addEventListener('change', ()=>{
    audioElement.currentTime = myprogressbar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = i;
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        
        if(songs[songIndex]) {
            audioElement.src = songs[songIndex].file_path; 
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
        }
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= songs.length - 1){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    
    audioElement.src = songs[songIndex].file_path;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    audioElement.currentTime = 0;
    audioElement.play();
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }

    audioElement.src = songs[songIndex].file_path;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    audioElement.currentTime = 0;
    audioElement.play();
})