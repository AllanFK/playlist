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
            playlistDiv.innerHTML = ""
            playlist
                .map(song => this.createNode(song.id, song.title))
                .forEach(song => playlistDiv.appendChild(song))
                
            this.resetFields()
        },

        bindEvents(){
            songBtn.onclick = () => this.validateSong()
            eventbus.on("validated", params => this.addSong(params))
        },

        createNode(id, title){
            const wrapperDiv = document.createElement("div")
            const titleDiv = document.createElement("div")
            const deleteDiv = document.createElement("div")
            
            wrapperDiv.className = "playlist-song"

            if(id === selectedVideo){
                wrapperDiv.classList.add("selected")
            }
            
            titleDiv.id = id
            titleDiv.className = "playlist-song-title"
            titleDiv.innerHTML = title
            titleDiv.onclick = e => this.setSelectedVideo = e.target.id
            
            deleteDiv.id = id
            deleteDiv.className = "playlist-song-delete"
            deleteDiv.innerHTML = " x "
            deleteDiv.onclick = (e) => this.deleteSong(e.target.id)

            wrapperDiv.appendChild(titleDiv)
            wrapperDiv.appendChild(deleteDiv)

            return wrapperDiv
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