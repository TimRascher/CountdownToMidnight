var menuTemplate
const menuContainer = $("#navbarContainer")
const loadTemplate = () => {
    var template = $("#navbarTemplate")
    template.removeAttr("id")
    template.removeClass("hidden")
    template.remove()
    menuTemplate = template
}
const loadCategories = () => {
    return new Promise((resolve, reject) => {
        $.getJSON("/categories", (categories) => {
            resolve(categories)
        }).fail((error) => {
            reject(error)
        })
    })
}
const getKeys = (categories) => {
    let categoriesDict = {}
    for (const category of categories) {
        let key = "menu-" + category.replace(/\s+/g, "")
        categoriesDict[key] = {key: key, name: category, addStatus: 0}
    }
    return categoriesDict
}
const createItem = (key) => {
    let item = menuTemplate.clone()
    item.attr("id", key.key)
    item.text(key.name)
    return item
}
const transferItems = (newKeys, oldKeys) => {
    var updatedKeys = {}
    let newValues = Object.values(newKeys)
    for (var key of newValues) {
        if (oldKeys !== undefined && key.key in oldKeys) {
            let oldKey = oldKeys[key.key]
            key.item = oldKey.item
            key.item.unbind()
        } else {
            key.item = createItem(key)
            key.addStatus = 1
        }
        updatedKeys[key.key] = key
    }
    if (oldKeys !== undefined) {
        let oldValues = Object.values(oldKeys)
        for (var key of oldValues) {
            if ((key.key in newKeys) === false) {
                key.addStatus = 2
                updatedKeys[key.key] = key
            }
        }
    }
    return updatedKeys
}
const updateMenu = (categories) => {
    let values = Object.values(categories)
    for (var i = 0; i < values.length; i++) {
        const category = values[i]
        switch (category.addStatus) {
            case 1:
                if (i === 0) {
                    menuContainer.append(category.item)
                } else {
                    const lastItem = values[i-1]
                    let id = "#" + lastItem.key
                    category.item.insertAfter(id)
                }
                break
            case 2:
                category.item.remove()
                break
            default: break
        }
    }
}
const bindNewElements = (menu) => {
    $(".nav-item").click(function(event) {
        event.preventDefault()
        $("#" + menu.active).removeClass("active")
        let item = $(this)
        let id = item.attr("id")
        item.addClass("active")
        menu.active = id
        if (menu.clicked !== undefined) {
            menu.clicked(menu.categories[id].name)
        }
    })
}

export class Menu {
    constructor() {
        loadTemplate()
        this.active = undefined
    }
    async load() {
        let categories = await loadCategories()
        let newKeys = getKeys(categories)
        this.categories = transferItems(newKeys, this.categories)
        updateMenu(this.categories)
        if (this.active === undefined) {
            let item = Object.values(this.categories)[0].item
            item.addClass("active")
            this.active = item.attr("id")
        }
        bindNewElements(this)
    }
    addOnBind(clicked) {
        this.clicked = clicked
    }
}