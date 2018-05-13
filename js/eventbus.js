const eventbus =  {
    events: [],
    emit(eventName, payload){
        this.events.forEach(event => {
            if(eventName === event.name){
                event.callback(payload)
            }
        })
    },
    on(eventNames, callback){
        if(!Array.isArray(eventNames)){
            eventNames = [eventNames]
        }

        eventNames.forEach(name => {
            this.events.push({
                name,
                callback
            })
        })
    }
}