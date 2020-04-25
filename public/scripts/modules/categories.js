const loadTemplate = () => {
    var template = $("#navbarTemplate")
    template.removeAttr("id")
    template.removeClass("hidden")
    template.remove()
    return template
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
const loadMenuItems = (categories, template) => {
    let menuItems = []
    for (const category of categories) {
        let menuItem = template.clone()
        menuItem.attr("id", "menu-" + category)
        menuItem.text(category)
        menuItems.push(menuItem)
    }
    return menuItems
}
const removeAllItems = (menuContainer) => {
    for (const menuItem of menuContainer.children()) {
        menuItem.remove()
    }
}
const checkForActive = (active, menuItems) => {
    var newActive
    for (const menuItem of menuItems) {
        if (menuItem.attr("id") === active) {
            newActive = active
            menuItem.addClass("active")
            break
        }
    }
    if (newActive === undefined) {
        newActive = menuItems[0].attr("id")
        menuItems[0].addClass("active")
    }
    return newActive
}
const bindNewElements = (clicked) => {
    $(".nav-item").click(function(event) {
        event.preventDefault()
        if (clicked !== undefined) {
            let id = $(this).attr("id")
            clicked(id)
        }
    })
}

export class Menu {
    constructor() {
        this.template = loadTemplate()
        this.active = undefined
        this.menuContainer = $("#navbarContainer")
    }
    async load() {
        removeAllItems(this.menuContainer)
        this.categories = await loadCategories()
        this.menuItems = loadMenuItems(this.categories, this.template)
        this.active = checkForActive(this.active, this.menuItems)
        this.menuContainer.append(this.menuItems)
        bindNewElements(this.clicked)
    }
    addOnBind(clicked) {
        this.clicked = clicked
    }
}