class Playlist {
    //initialize playlist with list from localstorage or default song and add eventlistener to "add song" button
    constructor(){
        this.playList = this.getListFromLocalStorage() || [{
            id: "tgbNymZ7vqY",
            title: "Muppets"
        }]
        
        this.selectedVideo = this.getSelectedVideoFromLocalStorage() || this.playList[0].id
        this.errorMessage = ""

        document.getElementById("addSong").onclick = () => this.addSong()
    }

    //renders playlist and iframe with selected video. Reset fields, add eventlistener to songs and update LS
    render(){
        const playlist = this.getList()
        document.getElementById("playlist").innerHTML = this.getList()
        document.getElementById("iframe").src = "https://www.youtube.com/embed/" + this.selectedVideo + "?autoplay=1"
        this.resetFields()
        this.addOnClickEventsToSongs()

        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("playlist", JSON.stringify(this.playList))
            localStorage.setItem("selectedVideo", this.selectedVideo)
        }
    }


    //render error message when input is empty or song is already added
    renderErrorMessage(){
        document.getElementById("errorMsg").innerHTML = this.errorMessage
        this.resetFields(false)
    }
    

    //add a song with id and title
    addSong(){
        const url = document.getElementById("url").value
        const id = url.substr(url.indexOf("=") + 1)
        const title = document.getElementById("title").value

        if(!this.isValidInput(id, url, title)){
            return this.renderErrorMessage()
        }
        
        const song = {
            id: id,
            title: title
        }

        this.selectedVideo = id 
        this.playList.push(song)
        this.render()
    }


    //get array of songs and convert to html
    getList(){
        var html = ""
        this.playList.forEach(song => {
            const id = song.id
            const extraClass = id === this.selectedVideo ? "selected" : ""
            html += `<div class="playlist-song ${extraClass}">
                        <div id="${id}">${song.title}</div>
                        <div id="delete${id}" class="playlist-song-delete"> x </div>
                    </div>`
                    
        })
        return html
    }


    //add onclick event listeners to a song
    addOnClickEventsToSongs(){
        this.playList.forEach(song => {
            const id = song.id
            if(!document.getElementById(id).onclick){
                document.getElementById(id).onclick = () => this.selectSong(id)
                document.getElementById("delete" + id).onclick = () => this.deleteSong(id)
            }
        })
    }


    //promt the user and remove selected song from the playlist
    deleteSong(id){
        if(!confirm("Are you sure you want to delete the song?")) return
        this.playList = this.playList.filter(song => song.id !== id )
        this.render()
    }


    selectSong(id){
        this.selectedVideo = id
        this.render()
    }


    //empty all inputs and error message
    resetFields(resetErrorMessage = true){
        document.getElementById("url").value = ""
        document.getElementById("title").value = ""
        if(resetErrorMessage){
            document.getElementById("errorMsg").innerHTML = ""
        }
    }


    //check for empty input and if song already is in the playlist
    isValidInput(id, url, title){
        var isValid = true
        const isInPlaylist = this.playList.find(song => song.id === id) 

        if(url === "" || title === ""){
            this.errorMessage = "All fields must be filled out"
            isValid = false
        }

        if(isInPlaylist){
            this.errorMessage = "Song already exist in playlist"
            isValid = false
        }
        return isValid
    }

    getListFromLocalStorage(){
        return typeof(Storage) !== "undefined" && localStorage.getItem("playlist")
            ? JSON.parse(localStorage.getItem("playlist"))
            : null
    }

    getSelectedVideoFromLocalStorage(){
        return typeof(Storage) !== "undefined"
            ? localStorage.getItem("selectedVideo")
            : null
    }
}