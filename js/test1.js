const Person = (eventbus) => {

    // cache DOM
    var main = document.querySelector("main") 
    var playlist = main.querySelector("#playlist")
    var btn = main.querySelector("#addSong")
    var contentDiv = document.querySelector("#content")

    //local state
    var name = "Per"


    return {
        init(){
            this.render()
            this.bindEvents()
        },
        render(){
            var html = name
            playlist.innerHTML = html
        },
        bindEvents(){
            btn.onclick = () => this.setName = "Allan"
        },
        get getName(){
            return name
        },
        set setName(newName){
            name = newName
            eventbus.emit("update", newName)
            this.render()
        }
    }
}