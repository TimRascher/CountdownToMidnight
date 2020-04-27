import { Menu } from "./modules/categories.js"
import { Clocks } from "./modules/clocks.js"
import { ElementManager } from "./modules/elementManager.js"

var menu
var clocks

const loop = async () => {
    console.log("Loop Run")
    await menu.load()
    if (menu.category !== undefined) {
        await clocks.load(menu.category)
    }
}

$(async () => {
    // menu = new Menu()
    // clocks = new Clocks()
    // menu.addOnBind(async (id) => {
    //     console.log(id)
    //     clocks.clear()
    //     await clocks.load(menu.category)
    // })
    // loop()
    // setInterval(() => {
    //     loop()
    // }, 10000)
    let elementManager = new ElementManager("navbarTemplate", "navbarContainer", (item, element) => {
        element.text(item.category)
    }, (objects) => {
        Object.values(objects)[0].element.addClass("active")
    })
    await elementManager.load("/categories")
})