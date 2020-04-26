const clockTemplate = $("#clockTemplate")
const content = $("#clockTemplate")
clockTemplate.remove()
clockTemplate.removeAttr("id")
clockTemplate.removeClass("hidden")

const load = () => {
    return new Promise((resolve, reject) => {
        $.getJSON("")
    })
}

export class Clocks {
    constructor() {

    }
    load() {

    }
}