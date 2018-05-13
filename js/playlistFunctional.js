const playlist = (movie, validation) => {

    var main = document.querySelector("main"),
        urlInput = main.querySelector("#url"),
        titleInput = main.querySelector("#title"),
        songBtn = main.querySelector("#addSong"),
        playlistDiv = main.querySelector("#playlist"),

        playList = [{
            id: "tgbNymZ7vqY",
            title: "Muppets"
        }],
        
        selectedVideo = "tgbNymZ7vqY"
        

    return {
        render(){
            const playlist = this.getList()
            playlistDiv.innerHTML = playlist 
            this.resetFields()
            this.bindEvents()
            movie().render(selectedVideo)

        },
        bindEvents(id){
            songBtn.onclick = () => this.addSong()
            playList.forEach(song => {
                const id = song.id
                if(!main.querySelector("#" + id).onclick){
                    main.querySelector("#" + id).onclick = () => this.selectSong(id)
                    main.querySelector("#delete" + id).onclick = () => this.deleteSong(id)
                }
            })
        },
        
    
        //add a song with id and title
        addSong(){
            const url = urlInput.value
            const id = url.substr(url.indexOf("=") + 1)
            const title = titleInput.value
    
            var validate = validation()
            if(!validate.isValidInput(playList, id, url, title)){
                return validate.render()
            }
            
            const song = {
                id: id,
                title: title
            }
    
            selectedVideo = id 
            playList.push(song)
            this.render()
        },
    
    
        //get array of songs and convert to html
        getList(){
            var html = ""
            playList.forEach(song => {
                const id = song.id
                const extraClass = id === selectedVideo ? "selected" : ""
                html += `<div class="playlist-song ${extraClass}">
                            <div id="${id}">${song.title}</div>
                            <div id="delete${id}" class="playlist-song-delete"> x </div>
                        </div>`            
            })
            return html
        },

    
    
        //promt the user and remove selected song from the playlist
        deleteSong(id){
            if(!confirm("Are you sure you want to delete the song?")) return
            playList = playList.filter(song => song.id !== id )
            this.render()
        },
    
    
        selectSong(id){
            selectedVideo = id
            this.render()
        },
    
    
        //empty all inputs and error message
        resetFields(){
            urlInput.value = ""
            titleInput.value = ""
            validation().render("")
        }
    
  
    }
}