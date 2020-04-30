import { Menu } from "./modules/categories.js"
import { Clocks } from "./modules/clocks.js"
import { client } from "./modules/client.js"

const menu = new Menu(onClick)
const clocks = new Clocks()
let appKey = ""

async function onClick(category) {
    await clocks.load(category)
}

const loop = async () => {
    await menu.load()
    await clocks.load(menu.category)
}

$(async () => {
    await loop()
    setInterval(() => {
        if (appKey !== "") { return }
        loop()
    }, 10000)
    $("#mcKey").click(async (event) => {
        event.preventDefault()
        appKey = prompt("Please enter MC Key.")
        let response = await client.get("/check", appKey)
        if (response.status == "Error") { appKey = ""; return }
        alert("Success")
    })
    $(".card .card-header").click((event) => {
        let element = $(event.currentTarget).find("H3")
        element.text(element.text() + " Blamo")
    })
})