const validation = (eventbus) => {

    var errorMsgDiv = document.querySelector("#errorMsg"),
        errorMessage = ""

    return {
        init(){
            this.render()
            this.bindEvents()
        },

        render(){
            
            errorMsgDiv.innerHTML = errorMessage
        },

        bindEvents(){
            eventbus.on("validate", (params) => this.isValidInput(params) )
            eventbus.on("resetFields", () => this.setErrorMessage = "" )
        },

        set setErrorMessage(msg){
            console.log("setErrorMessage", errorMessage)
            errorMessage = msg
            this.render()
        },

        isValidInput(params){
            const { playlist, id, url, title } = params

            var isValid = true
            const isInPlaylist = playlist.find(song => song.id === id) 
        
            if(url === "" || title === ""){
                this.setErrorMessage = "All fields must be filled out"
                isValid = false
            }
    
            if(isInPlaylist){
                this.setErrorMessage = "Song already exist in playlist"
                isValid = false
            }

            eventbus.emit("validated", { isValid, id, title })
        }
    }
}