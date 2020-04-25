import { Menu } from "./modules/categories.js"

var menu

const loop = () => {
    console.log("Loop Run")
    menu.load()
}

$(() => {
    menu = new Menu()
    menu.addOnBind((id) => {
        console.log(id)
    })
    loop()
    setInterval(() => {
        loop()
    }, 10000)
})