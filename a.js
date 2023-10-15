const allSongs = [
    {
        id: "1",
        name: "Jailer",
        artist: "Anirudh",
        image: "https://naasongslyrics.com/wp-content/uploads/2023/07/Kavali-song-2023-jailer-telugu-songs-download-300x225.jpg",
        src: "https://naasongs.vip/myuploads/uploads/Jailer%20/Kaavaali.mp3",
    },
    {
        id: "2",
        name: "SIR",
        artist: "GV Prakash Kumar",
        image: "https://naasongslyrics.com/wp-content/uploads/2022/11/Sir-Telugu-2022-Mastaaru-Mastaaru-250x250-1.jpg",
        src: "https://naasongs.vip/myuploads/uploads/SIR/01%20-%20Mastaaru%20Mastaaru.mp3",
    },
    {
        id: "3",
        name: "kushi",
        artist: "Hesham Abdul Wahab , Manju Sri",
        image: "https://naasongslyrics.com/wp-content/uploads/2023/05/Kushi-2023-Songs-Download-Naa-Songs-1-300x436.jpg",
        src: "https://naasongs.vip/myuploads/uploads/Khushi/Na%20Roja%20Nuvve.mp3",
    },
    {
        id: "4",
        name: "Ooru Peru Bhairavakona",
        artist: "Shekar Chandra",
        image: "https://naasongslyrics.com/wp-content/uploads/2023/04/Ooru-Peru-Bhairavakona-2023-Songs-Download-Naa-Songs-300x300.jpg",
        src: "https://naasongs.vip/myuploads/uploads/Ooru%20Peru%20Bhairavakona/Nijame%20Ne%20Chebuthunna.mp3",
    },
    {
        id: "5",
        name: "Baby",
        artist: "Vijai Bulganin",
        image: "https://pagalworld.cool/siteuploads/thumb/sft2/800_resize2x_250x250.webp",
        src: "https://naasongs.vip/myuploads/uploads/Baby/O%20Rendu%20Prema%20Meghaalila.mp3",
    },
    {
        id: "6",
        name: "Shape of You ",
        artist: "Ed Sheeran",
        image: "https://t2.genius.com/unsafe/425x425/https%3A%2F%2Fimages.genius.com%2F86dcab92e27599f8556b5b8f21932449.1000x1000x1.png",
        src: "https://files.gospeljingle.com/uploads/music/2023/01/Ed_Sheeran_-_Shape_Of_You.mp3",
    },
    {
        id: "7",
        name: "LEO",
        artist: "Anirudh",
        image: "https://img.wynk.in/unsafe/248x248/filters:no_upscale():strip_exif():format(webp)/http://s3.ap-south-1.amazonaws.com/wynk-music-cms/srch_sonymusic/A10301A00050912496_20230622145652035/1687439706430/resources/A10301A00050912496.jpg",
        src: "https://naasongs.vip/myuploads/uploads/Leo/Bloody%20Sweet.mp3",
    },
    {
        id: "8",
        name: "Vikram",
        artist: "Anirudh",
        image: "https://naasongslyrics.com/wp-content/uploads/2022/06/vikram-songs-198x300.jpg",
        src: "https://naasongs.vip/myuploads/uploads/Vikram%20Hitlist/Once-Upon-a-Time-MassTamilan.in.mp3",
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
