import { ElementManager } from "./elementManager.js"
import { endPoints } from "./client.js"

const templateName = "clockTemplate"
const containerName = "content"

function mapNew(item, element) {
    element.find("img.main").attr("src", "/images/CountdownClock" + item.value + ".svg")
    element.find("h3").text(item.name)
}
function backup(object) {
    object.original = object.original || deepCopy(object.item)
}
function deepCopy(object) {
    return JSON.parse(JSON.stringify(object))
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
        backup(object)
        object.item.name = values.name === undefined ? object.item.name : values.name
        object.item.value = values.value === undefined ? object.item.value : values.value
        object.hasChanges = true
        mapNew(object.item, object.element)
    }
    delete(id) {
        let object = this.manager.objects[id]
        backup(object)
        delete object.hasChanges
        object.shouldDelete = true
        object.element.remove()
    }
    revert() {
        for (const object of Object.values(this.manager.objects)) {
            if (object.hasChanges || object.shouldDelete) {
                if (object.shouldDelete) {
                    delete object.shouldDelete
                    $("#"+containerName).append(object.element)
                }
                delete object.hasChanges
                object.item = deepCopy(object.original)
                mapNew(object.item, object.element)
            }
        }
    }
}