const Content = (eventbus) => {

    // cache DOM
    var contentDiv = document.querySelector("#content")
    
    //local state
    var content = ""

    return {
        init(){
            this.render()
            this.bindEvents()
        },
        render(){
            var html = content
            contentDiv.innerHTML = html
        },
        bindEvents(){
            eventbus.on(["load", "update"], payload => this.setContent = payload)
        },
        set setContent(newContent){
            content = newContent
            this.render()
        }
    }
}