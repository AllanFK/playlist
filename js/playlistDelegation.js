var playlist = {
    init(){
        this.main = document.querySelector("main")
        this.urlInput = this.main.querySelector("#url")
        this.titleInput = this.main.querySelector("#title")
        this.songBtn = this.main.querySelector("#addSong")
        this.playlistDiv = this.main.querySelector("#playlist")

        this.playList = [{
            id: "tgbNymZ7vqY",
            title: "Muppets"
        }]
        
        this.selectedVideo = "tgbNymZ7vqY"

    },

    render(){
        this.playlistDiv.innerHTML = this.getList()
        this.resetFields()
        this.bindEvents()

        // delegate movie().render(selectedVideo)
    },

    bindEvents(id){
        this.songBtn.onclick = () => this.addSong()
        this.playList.forEach(song => {
            const id = song.id
            if(!this.main.querySelector("#" + id).onclick){
                this.main.querySelector("#" + id).onclick = () => this.selectSong(id)
                this.main.querySelector("#delete" + id).onclick = () => this.deleteSong(id)
            }
        })
    },

    addSong(){
        const url = this.urlInput.value
        const id = url.substr(url.indexOf("=") + 1)
        const title = this.titleInput.value

        // delegate
        // var validate = validation()
        // if(!validate.isValidInput(playList, id, url, title)){
        //     return validate.render()
        // }
        
        const song = {
            id: id,
            title: title
        }

        this.selectedVideo = id 
        this.playList.push(song)
        this.render()
    },

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
    },

    deleteSong(id){
        if(!confirm("Are you sure you want to delete the song?")) return
        this.playList = this.playList.filter(song => song.id !== id )
        this.render()
    },

    selectSong(id){
        this.selectedVideo = id
        this.render()
    },

    resetFields(){
        this.urlInput.value = ""
        this.titleInput.value = ""

        // delegate
        // validation().render("")
    },

    test(){
        return "hej"
    }
}


var movie = Object.create(playlist)

movie.setup = function(){
    this.movieIframe = document.querySelector("#iframe")  
    this.movieId = this.selectedVideo
}

movie.run = function(){
    this.movieIframe.src = "https://www.youtube.com/embed/" + this.movieId + "?autoplay=1"
}

movie.onClick = function(id){
    console.log(1, id)
}


// const test = {
//     hej(){
//         console.log("hej2")
//     }
// }

// const test2 = Object.create( test )
// test2.hej() 