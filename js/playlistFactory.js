const playlist = (id, eventbus) => {

    var main = document.querySelector("main"),
        urlInput = main.querySelector("#url"),
        titleInput = main.querySelector("#title"),
        songBtn = main.querySelector("#addSong"),
        playlistDiv = main.querySelector("#playlist"),

        playlist = [{
            id: id,
            title: "Muppets"
        }],
        
        selectedVideo = playlist[0].id

    return {
        init(){
            this.render()
            this.bindEvents()
        },

        render(){
            playlistDiv.innerHTML = this.getHtmlFromList
            this.resetFields()
        },

        bindEvents(){
            main.onclick = (e) => {
                if(e.target.className === "playlist-song-delete"){
                    this.deleteSong(e.target.id)
                } else if(e.target.id === "addSong") {
                    this.validateSong()
                } else if(e.target.className === "playlist-song-title"){
                    this.setSelectedVideo = e.target.id
                }
            }   

            eventbus.on("validated", params => this.addSong(params))
        },

        get getHtmlFromList(){
            var html = ""
            playlist.forEach(song => {
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
            eventbus.emit("update", id)
            selectedVideo = id
            this.render()
        },

        set setPlaylist(newPlaylist){
            playlist = newPlaylist
            this.render()
        },

        validateSong(){
            const url = urlInput.value
            const id = url.substr(url.indexOf("=") + 1)
            const title = titleInput.value
    
            eventbus.emit("validate", { playlist, id, url, title })
        },

        addSong(params){
            const { isValid, id, title }  = params
            if(!isValid) return
            
            playlist.push({ id, title })
            this.setSelectedVideo = id
        },

        deleteSong(id){
            if(!confirm("Are you sure you want to delete the song?")) return
            this.setPlaylist = playlist.filter(song => song.id !== id )
        },

        resetFields(){
            urlInput.value = ""
            titleInput.value = ""
            eventbus.emit("resetFields")
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