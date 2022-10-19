console.log("welcome to spotify");

//initialize the variables 
let songIndex = 0;



let audioElement = new Audio('songs/0.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
// the above code will create array of songitem html collection & we will store in songItems varibale

let songs = [
    { songName: "Unstoppable", filepath: "songs/0.mp3", coverPath: "covers/1.jpg" },
    { songName: "Ishq wala love", filepath: "songs/1.mp3", coverPath: "covers/2.jpg" },
    { songName: "We Rollin", filepath: "songs/2.mp3", coverPath: "covers/3.jpg" },
    { songName: "Let me love you", filepath: "songs/3.mp3", coverPath: "covers/4.jpg" },
    { songName: "Levitating", filepath: "songs/4.mp3", coverPath: "covers/5.jpg" },
    { songName: "Dont let me down", filepath: "songs/5.mp3", coverPath: "covers/6.jpg" },
    { songName: "Desires", filepath: "songs/6.mp3", coverPath: "covers/7.jpg" },
    { songName: "Sakhiyaan", filepath: "songs/7.mp3", coverPath: "covers/8.jpg" }

];




songItems.forEach((element, index) => {       // loop through elements
    //console.log(element, index);    //index will start from 0
    element.getElementsByTagName("img")[0].src = songs[index].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[index].songName;

});
//the above code is for name and img change of songs //

//handle play /pause click

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {  //audio element agr paused hai ya phr start hi nai hua then play kro//
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.play();

        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

        //console.log(songIndex);

        gif.style.opacity = 1;

       

        
    }

    else {
        audioElement.pause();  //audio chalri hai upar to audio pause rkho
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;

        



    }
});

audioElement.addEventListener('ended',() => {
    songIndex++;
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    console.log('next song playing');

});

// the above code is for automatically playing next song if one song is completed //

//listen to events
audioElement.addEventListener('timeupdate', () => {
    //update seekbar position
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
    //change aaudio position if seekbar is changed 
});



//upar kisne change kiya gane ko age badhayaje to function m audio ko bj wahi seek krduga mylb age jana chahaiy

//formula for above code
///100 * CurrentTime/audioelement.duration = percentage * 100
// currentTime = percentage * duration/100



function makeAllPlays() {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    });

}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    //console.log(element);
    element.addEventListener('click', (e) => {     // e mtlb ki jisepe click hua hai 
        //console.log(e.target);   //iska mtlb ki jispe click hua usko target kro
        if (audioElement.paused || audioElement.duration <= 0) {

            makeAllPlays();
            let songIndex = parseInt(e.target.id);
            console.log(songIndex);          //iska value song me aayga jaise ki skhiyaan naam aayga song ka is variable me 
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');



            audioElement.src = `songs/${songIndex}.mp3`;   // yaha phir aake wo gana bjega //
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;

            masterPlay.classList.add('fa-circle-pause');
            masterPlay.classList.remove('fa-circle-play');
        }

        else{
            audioElement.pause();
            e.target.classList.add('fa-circle-play');
            e.target.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            gif.style.opacity = 0;

        }
        
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 7) {
        songIndex = 0;

    }
    else {
        songIndex++;
        
    }

    audioElement.src = `songs/${songIndex}.mp3`;   //this is template literals
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;


    masterPlay.classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');

    
   


});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;

    }
    else {
        songIndex--;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;


    masterPlay.classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');


});