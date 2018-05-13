const movie = (id) => {

    var movieIframe = document.querySelector("#iframe"),
        selectedId = id
 
    return {
        render(){
            movieIframe.src = "https://www.youtube.com/embed/" + selectedId + "?autoplay=1"
        }
    }

}