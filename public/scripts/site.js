import { Menu } from "./modules/categories.js"
import { Clocks } from "./modules/clocks.js"
import { ElementManager } from "./modules/elementManager.js"

const menu = new Menu(onClick)
var clocks

function onClick(action) {
    console.log(action)
}

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
    await menu.load()
})