import { ElementManager } from "./elementManager.js"
import { endPoints } from "./client.js"

const templateName = "navbarTemplate"
const containerName = "navbarContainer"

function mapNew(item, element) {
    element.text(item.category)
}
function afterLoad(active, objects, onClick) {
    let elements = $("#navbarContainer .nav-item")
    elements.off()
    elements.click(onClick)
    if (active === undefined || !Object.keys(objects).includes(active)) {
        let object = Object.values(objects)[0]
        object.element.click()
    }
}

export class Menu {
    constructor(onClick) {
        this.manager = new ElementManager(templateName, containerName, mapNew)
        this.active = undefined
        this.onClick = (event) => {
            event.preventDefault()
            if (this.active !== undefined) {
                let oldElement = this.manager.objects[this.active].element
                oldElement.removeClass("active")
            }
            let newElement = $(event.currentTarget)
            this.active = newElement.attr("id")
            newElement.addClass("active")
            onClick(this.category)
        }
    }
    get category() {
        return this.manager.objects[this.active].item.category
    }
    async load() {
        await this.manager.load(endPoints.categories)
        afterLoad(this.active, this.manager.objects, this.onClick)
    }
}