import { ElementManager } from "./elementManager.js"

const templateName = "navbarTemplate"
const containerName = "navbarContainer"

function mapNew(item, element) {
    element.text(item.category)
}
function afterLoad(active, objects, onClick) {
    let elements = $(".nav-item")
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
        this.onClick = function(event) {
            event.preventDefault()
            let element = $(this)
            $("#" + this.active).removeClass("active")
            element.addClass("active")
            this.active = element.attr("id")
            onClick(this.active)
        }
    }
    async load() {
        await this.manager.load("/categories")
        afterLoad(this.active, this.manager.objects, this.onClick)
    }
}