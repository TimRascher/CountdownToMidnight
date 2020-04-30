import { client, endPoints } from "./client.js"

const elements = {
    header: ".card .card-header",
    adjustButtonsGroup: ".adjustButtons",
    adjustButtons: ".adjustButtons .btn",
    image: "img.main",
    editingButtons: "#editingButtons"
}

function bindAllHeaders(clocks) {
    const headerBind = (event) => {
        let h3 = $(event.currentTarget).find("H3")
        let id = $(event.currentTarget).parent().attr("id")
        let title = h3.text()
        h3.remove()
        let textBox = $("<input type='text' />").val(title)
        const swapBack = () => {
            const name = textBox.val()
            textBox.remove()
            $(event.currentTarget).append(h3)
            $(event.currentTarget).click(headerBind)
            clocks.change(id, { name: name })
        }
        textBox.focusout((event) => {
            swapBack()
        })
        textBox.keypress((event) => {
            if (event.which == 13) {
                event.preventDefault()
                swapBack()
            }
        })
        $(event.currentTarget).append(textBox)
        textBox.focus()
        $(event.currentTarget).off()
    }
    $(elements.header).click(headerBind)
}
function bindAdjustButtons(clocks) {
    $(elements.adjustButtonsGroup).removeClass("hidden")
    $(elements.adjustButtons + ".adjust").click((event) => {
        event.preventDefault()
        const isPlus = $(event.currentTarget).hasClass("plus")
        const id = $(event.currentTarget).parent().parent().parent().attr("id")
        let value = clocks.valueOf(id)
        if (isPlus && value != 6) { value++ }
        else if (!isPlus && value > 0) { value-- }
        clocks.change(id, { value: value })
    })
}
function unbindAdjustButtons() {
    $(elements.adjustButtonsGroup).addClass("hidden")
    $(elements.adjustButtons).off()
}
function bindEditingButton(editor) {
    $(elements.editingButtons).removeClass("hidden")
    $(elements.editingButtons + " .btn.save").click(async (event) => {
        event.preventDefault()
        const objects = Object.values(editor.clocks.manager.objects)
        for (let object of objects) {
            let item = object.item
            if (object.hasChanges) {
                item.category = editor.menu.category
                delete object.hasChanges
                delete item.modifiedOn
                delete object.original
                await client.post(endPoints.clock, editor.key, JSON.stringify(item))
            } else if (object.shouldDelete) {
                delete editor.clocks.manager.objects[item.id]
                // Delete Call Here
            }
        }
    })
    $(elements.editingButtons + " .btn.close").click(async (event) => {
        event.preventDefault()
        await editor.has("")
    })
}
function unbindEditingButtons() {
    $(elements.editingButtons).addClass("hidden")
    $(elements.editingButtons).off()
}

export const mcModes = {
    on: "On",
    off: "Off"
}

export class Editor {
    constructor(menu, clocks) {
        this.menu = menu
        this.clocks = clocks
        this.key = ""
    }
    get mcMode() {
        if (this.key !== "") { return mcModes.on }
        return mcModes.off
    }
    bind() {
        if (this.key === "") { this.unBind(); return }
        bindAllHeaders(this.clocks)
        bindAdjustButtons(this.clocks)
        bindEditingButton(this)
    }
    unBind() {
        $(elements.header).off()
        unbindAdjustButtons()
        unbindEditingButtons()
        this.clocks.revert()
    }
    bindMCKeyButton() {
        $("#mcKey").click(async (event) => {
            event.preventDefault()
            const appKey = prompt("Please enter MC Key.")
            await this.has(appKey)
        })
    }
    async has(key) {
        let result = await client.get(endPoints.check, key)
        if (result.status === "Error") { this.key = ""; this.unBind(); return }
        this.key = key
        this.bind()
    }
}