import { Menu } from "./modules/menu.js"
import { Clocks } from "./modules/clocks.js"
import { client } from "./modules/client.js"
import { Editor, mcModes } from "./modules/editor.js"

const menu = new Menu(onClick)
const clocks = new Clocks()
const editor = new Editor(menu, clocks)

async function onClick(category) {
    await clocks.load(category)
    editor.bind()
}

const loop = async () => {
    await menu.load()
    await clocks.load(menu.category)
}

$(async () => {
    editor.bindMCKeyButton()
    await loop()
    setInterval(async () => {
        if (editor.mcMode === mcModes.on) { return }
        await loop()
    }, 10000)
})