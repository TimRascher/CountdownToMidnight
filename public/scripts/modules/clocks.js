import { ElementManager } from "./elementManager.js"
import { endPoints } from "./client.js"

const templateName = "clockTemplate"
const containerName = "content"

function mapNew(item, element) {
    element.find("img.main").attr("src", "/images/CountdownClock" + item.value + ".svg")
    element.find("h3").text(item.name)
}

export class Clocks {
    constructor() {
        this.manager = new ElementManager(templateName, containerName, mapNew)
    }
    async load(category) {
        await this.manager.load(endPoints.clocks(category))
    }
    nameOf(id) {
        return this.manager.objects[id].item.name
    }
    valueOf(id) {
        return this.manager.objects[id].item.value
    }
    change(id, values) {
        let object = this.manager.objects[id]
        object.item.name = values.name === undefined ? object.item.name : values.name
        object.item.value = values.value === undefined ? object.item.value : values.value
        object.item.hasChanges = true
        mapNew(object.item, object.element)
    }
}