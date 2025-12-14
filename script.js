console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songname: "Warriyo - Mortals", filepath: "songs/1.mp3", coverpath: "covers/1.jpg"},
    {songname: "Cielo - Huma-Huma", filepath: "songs/2.mp3", coverpath: "covers/2.jpg"},
    {songname: "Deaf Kev - Invincible", filepath: "songs/3.mp3", coverpath: "covers/3.jpg"},
    {songname: "Different Heaven & EH!DE", filepath: "songs/4.mp3", coverpath: "covers/4.jpg"},
    {songname: "Janji-Heroes-Tonight", filepath: "songs/5.mp3", coverpath: "covers/5.jpg"},
    {songname: "Rabba - Salam-e-Ishq", filepath: "songs/6.mp3", coverpath: "covers/6.jpg"},
    {songname: "Sakhiyaan - Salam-e-Ishq", filepath: "songs/7.mp3", coverpath: "covers/7.jpg"},
    {songname: "Bhula Dena - Salam-e-Ishq", filepath: "songs/8.mp3", coverpath: "covers/8.jpg"},
    {songname: "Tumhari Kasam - Salam-e-Ishq", filepath: "songs/9.mp3", coverpath: "covers/9.jpg"},
    {songname: "Na Jaana - Salam-e-Ishq", filepath: "songs/10.mp3", coverpath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    if(songs[i]) {
        element.getElementsByTagName("img")[0].src = songs[i].coverpath; 
        element.getElementsByClassName("songName")[0].innerText = songs[i].songname; 
    }
})

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
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
    let progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myprogressbar.value = progress;
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
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
    })
})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
            audioElement.src = `songs/${songIndex+1}.mp3`;

    audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
            audioElement.src = `songs/${songIndex+1}.mp3`;

    audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})