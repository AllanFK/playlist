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
        
        selectedVideo = playList[0].id


    return {
        init(){
            this.render()
            this.bindEvents()
        },
        render(){
            playlistDiv.innerHTML = this.getHtmlFromList
            movie(selectedVideo).render()
            this.resetFields()
        },
        bindEvents(){
            main.onclick = (e) => {
                if(e.target.className === "playlist-song-delete"){
                    this.deleteSong(e.target.id)
                } else if(e.target.id === "addSong") {
                    this.addSong()
                } else if(e.target.className === "playlist-song-title"){
                    this.setSelectedVideo = e.target.id
                }
            }   
        },
        get getHtmlFromList(){
            var html = ""
            playList.forEach(song => {
                const id = song.id
                const extraClass = id === selectedVideo ? "selected" : ""
                html += `<div class="playlist-song ${extraClass}">
                            <div id="${id}" class="playlist-song-title">${song.title}</div>
                            <div id="${id}" class="playlist-song-delete"> x </div>
                        </div>`            
            })
            return html
        },
        set setSelectedVideo(id){
            selectedVideo = id
            this.render()
        },
        set setPlaylist(newPlaylist){
            playList = newPlaylist
            this.render()
        },
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
    
            playList.push(song)
            this.setSelectedVideo = id
        },
        deleteSong(id){
            if(!confirm("Are you sure you want to delete the song?")) return
            this.setPlaylist = playList.filter(song => song.id !== id )
        },
        resetFields(){
            urlInput.value = ""
            titleInput.value = ""
            validation().render("")
        }
  
    }
}




// prependSongToList(id, title){
//     const songDiv = document.createElement('div')
//     const html = 
//     `<div class="playlist-song selected">
//         <div id="${id}">${title}</div>
//         <div id="delete${id}" class="playlist-song-delete"> x </div>
//     </div>`
//     songDiv.innerHTML = html
//     playlistDiv.insertBefore(songDiv, playlistDiv.firstChild);
// },