import { ElementManager } from "./elementManager.js"

const templateName = "clockTemplate"
const containerName = "content"

function mapNew(item, element) {
    element.find("img").attr("src", "/images/CountdownClock" + item.value + ".svg")
    element.find("h3").text(item.name)
}

export class Clocks {
    constructor() {
        this.manager = new ElementManager(templateName, containerName, mapNew)
    }
    async load(category) {
        await this.manager.load("/clocks/" + category)

    }
}