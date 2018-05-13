const validation = () => {

    var errorMsgDiv = document.querySelector("#errorMsg"),
        errorMessage = ""

    return {
        render(){
            errorMsgDiv.innerHTML = errorMessage
        },
        isValidInput(playlist, id, url, title){
            var isValid = true
            const isInPlaylist = playlist.find(song => song.id === id) 
    
            if(url === "" || title === ""){
                errorMessage = "All fields must be filled out"
                isValid = false
            }
    
            if(isInPlaylist){
                errorMessage = "Song already exist in playlist"
                isValid = false
            }
            return isValid
        }
    }
}