var movie = Object.create(playlist)

movie.setup = () => {
    this.movieIframe = document.querySelector("#iframe")  
    this.movieId = this.selectedVideo
    console.log(this.movieId)
}

movie.run = () => {
    this.movieIframe.src = "https://www.youtube.com/embed/" + this.movieId + "?autoplay=1"
}