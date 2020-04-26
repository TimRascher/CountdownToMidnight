import { Menu } from "./modules/categories.js"
import { Clocks } from "./modules/clocks.js"

var menu
var clocks

const loop = async () => {
    console.log("Loop Run")
    await menu.load()
    if (menu.category !== undefined) {
        await clocks.load(menu.category)
    }
}

$(() => {
    menu = new Menu()
    clocks = new Clocks()
    menu.addOnBind(async (id) => {
        console.log(id)
        clocks.clear()
        await clocks.load(menu.category)
    })
    loop()
    setInterval(() => {
        loop()
    }, 10000)
})