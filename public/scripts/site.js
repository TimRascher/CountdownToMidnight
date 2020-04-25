import { Menu } from "./modules/categories.js"
import { Clocks } from "./modules/clocks.js"

var menu
var clocks

const loop = () => {
    console.log("Loop Run")
    menu.load()
}

$(() => {
    menu = new Menu()
    clocks = new Clocks()
    menu.addOnBind((id) => {
        console.log(id)
    })
    loop()
    setInterval(() => {
        loop()
    }, 10000)
})