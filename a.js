const allSongs = [
    {
        id: "1",
        name: "Falling Down",
        artist: "Alex Skrindo",
        image: "https://drive.google.com/uc?id=15bTbmGwT0ufWFIJ-pi2wXm3E5_mhLkB4&export=download",
        src: "https://drive.google.com/uc?id=1AErADbHUjFwlJYEykZh5VfHvaZGOuacD&export=download",
    },
    {
        id: "2",
        name: "Everything",
        artist: "JJL. Malarkey",
        image: "https://drive.google.com/uc?id=1k9l98chcAjFCSBoF1A-mpUFm08BqGdzI&export=download",
        src: "https://drive.google.com/uc?id=1xjCQsCQt6WNWDjX7T7ov6nIheit49hZx&export=download",
    },
    {
        id: "3",
        name: "Dreamer",
        artist: "Alan Walker",
        image: "https://drive.google.com/uc?id=1iYN0uTd9nLcy2O_qlrTAKR1bWpq5Vbyl&export=download",
        src: "https://drive.google.com/uc?id=1WJRLLBPXf6VxwwkNhBTBoXs5-XhFcga_&export=download",
    },
    {
        id: "4",
        name: "094",
        artist: "JOXION",
        image: "https://drive.google.com/uc?id=16FkUQPPuZ-cli6_JjLBzyCc-f30N5YTo&export=download",
        src: "https://drive.google.com/uc?id=1cEsAs0JQfY_0e32c2Ic8RIDQJuqFUh11&export=download",
    },
    {
        id: "5",
        name: "Immortal",
        artist: "CITYWLKR",
        image: "https://drive.google.com/uc?id=1Dh2N46sgkKJ1dV6kA6JAzJbjYKcK4nhp&export=download",
        src: "https://drive.google.com/uc?id=1ht0O21NIodPWNkMOl4ny3fQp9IWovnpL&export=download",
    },
]

const mainPlayBtn = document.querySelector('.playAlbum')
backToAlbumBtn = document.querySelector('.backToAlbumBtn')
songsList = document.querySelector('.songsList')
music = document.querySelector('#mainAudio')
playNPauseBtn = document.querySelector('.playSongBtn')
muteNUnmuteBtn = document.querySelector('.muteNUnmuteBtn')
returnToAlbumBtn = document.querySelector('.returnToAlbumBtn')
prevBtn = document.querySelector('.prevBtn')
nextBtn = document.querySelector('.nextBtn')
songTime = document.querySelector('#songTime')
repeatBtn = document.querySelector('.repeatBtn')
shuffleBtn = document.querySelector('.shuffleBtn')
mainPlayer = document.querySelector('.mainPlayer');

mainPlayBtn.addEventListener('click', (e) => {
    mainPlayer.classList.add('active')
})

backToAlbumBtn.addEventListener('click', (e) => {
    mainPlayer.classList.remove('active')
})

const loadMusic = (index) => {
    document.querySelector('.musicPlayerArea .albumDetails .title').innerText = allSongs[index - 1].name
    document.querySelector('.musicPlayerArea .albumDetails .artist').innerText = allSongs[index - 1].artist
    document.querySelector('.musicPlayerArea .albumDetails .albumCover').src = allSongs[index - 1].image
    music.setAttribute('data-currentIndex', index)
    music.src = allSongs[index - 1].src
}

const openPlayer = (index) => {
    mainPlayer.classList.add('muted', 'active', 'paused')
    if (mainPlayer.classList.contains("paused")) {
        playNPauseBtn.querySelector("i").classList.remove('fa-play')
        playNPauseBtn.querySelector("i").classList.add('fa-pause')
    }
    loadMusic(index)
    music.play()
}

const playMusic = () => {
    mainPlayer.classList.add('paused')
    playNPauseBtn.querySelector("i").classList.remove('fa-play')
    playNPauseBtn.querySelector("i").classList.add('fa-pause')
    music.play()
}

const pauseMusic = () => {
    mainPlayer.classList.remove('paused')
    playNPauseBtn.querySelector("i").classList.remove('fa-pause')
    playNPauseBtn.querySelector("i").classList.add('fa-play')
    music.pause()
}

playNPauseBtn.addEventListener('click', () => {
    const isMusicPaused = mainPlayer.classList.contains("paused")
    isMusicPaused ? pauseMusic() : playMusic()
})

const mute = () => {
    mainPlayer.classList.remove('muted')
    muteNUnmuteBtn.querySelector("i").classList.remove('fa-volume-high')
    muteNUnmuteBtn.querySelector("i").classList.add('fa-volume-xmark')
    music.volume = 0;
}

const unmute = () => {
    mainPlayer.classList.add('muted')
    muteNUnmuteBtn.querySelector("i").classList.remove('fa-volume-xmark')
    muteNUnmuteBtn.querySelector("i").classList.add('fa-volume-high')
    music.volume = 1;
}

muteNUnmuteBtn.addEventListener('click', () => {
    const isMuted = mainPlayer.classList.contains("muted")
    isMuted ? mute() : unmute()
})

returnToAlbumBtn.addEventListener('click', () => {
    mainPlayer.classList.remove('active')
})

mainPlayBtn.addEventListener('click', () => {
    openPlayer(1)
})

prevBtn.addEventListener('click', () => {
    let currentIndex = music.getAttribute('data-currentIndex')
    if ((currentIndex - 1) <= 0) {
        loadMusic(1)
    } else {
        loadMusic(currentIndex - 1)
    }
    mainPlayer.classList.add('paused')
    music.play()
})

nextBtn.addEventListener('click', () => {
    let currentIndex = music.getAttribute('data-currentIndex')
    if ((parseInt(currentIndex) + 1) >= allSongs.length) {
        loadMusic(allSongs.length)
    } else {
        loadMusic(parseInt(currentIndex) + 1);
    }
    mainPlayer.classList.add('paused')
    music.play()
})

music.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    songTime.value = progressWidth
    document.documentElement.style.cssText = `--progressWidth: ${progressWidth}%`;

    let musicCurrentTime = document.querySelector('#currentTime');
    musicDuration = document.querySelector('#totalDuration');

    music.addEventListener("loadeddata", (e) => {
        totalMin = Math.floor(music.duration / 60);
        totalSec = Math.floor(music.duration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`
        }
        musicDuration.innerHTML = `${totalMin}:${totalSec}`;

    })
    let currentMin = Math.floor(currentTime / 60);
    currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`
    }
    musicCurrentTime.innerHTML = `${currentMin}:${currentSec}`;
})

songTime.addEventListener('click', (e) => {
    let progressWidthVal = songTime.clientWidth
    clickedOffsetX = e.offsetX
    songDuration = music.duration
    music.currentTime = (clickedOffsetX / progressWidthVal) * songDuration
})

repeatBtn.addEventListener('click', () => {
    if(repeatBtn.classList.contains("on")){
        repeatBtn.classList.remove("on")
        shuffleBtn.removeAttribute("disabled")
    }else{
        repeatBtn.classList.add("on")
        shuffleBtn.setAttribute("disabled", "disabled")
        shuffleBtn.classList.remove("on")
    }
})

shuffleBtn.addEventListener('click', () => {
    if(shuffleBtn.classList.contains("on")){
        shuffleBtn.classList.remove("on")
        repeatBtn.removeAttribute("disabled")
    }else{
        shuffleBtn.classList.add("on")
        repeatBtn.setAttribute("disabled", "disabled")
        repeatBtn.classList.remove("on")
    }
})

music.addEventListener("ended", () => {
    if(repeatBtn.classList.contains("on")){
        music.currentTime = 0
        music.play()
    }
    
    if(shuffleBtn.classList.contains("on")){
        let randomIndex = Math.floor((Math.random() * allSongs.length) + 1)
        console.log(randomIndex);
        loadMusic(randomIndex)
        music.play()
    }

})

allSongs.forEach((song) => {
    songsList.innerHTML += `<div class="song">
    <div class="icon" onClick="openPlayer(${song.id})"><i class="fa-solid fa-play"></i></div>
    <div class="details">
    <div class="title">${song.name}</div>
    <div class="info">
    <div class="artist">${song.artist}</div>
    </div>
    </div>
    </div>`;
})