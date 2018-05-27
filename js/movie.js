const movie = (id, eventbus) => {

    var movieIframe = document.querySelector("#iframe"),
        selectedId = id  
        
    return {
        init(){
            this.render()
            this.bindEvents()
        },

        render(){
            movieIframe.src = "https://www.youtube.com/embed/" + selectedId + "?autoplay=1"
        },

        bindEvents(){
            eventbus.on("update", id => this.setSelectedId = id)
        },

        set setSelectedId(id){
            selectedId = id
            this.render()
        }
    }
}