import { Menu } from "./modules/categories.js"
import { Clocks } from "./modules/clocks.js"
import { ElementManager } from "./modules/elementManager.js"

const menu = new Menu(onClick)
const clocks = new Clocks()

async function onClick(category) {
    await clocks.load(category)
}

const loop = async () => {
    console.log("Loop Run")
    await menu.load()
    await clocks.load(menu.category)
}

$(async () => {
    await loop()
    setInterval(() => {
        loop()
    }, 10000)
})