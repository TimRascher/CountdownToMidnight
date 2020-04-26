const clockTemplate = $("#clockTemplate")
const content = $("#content")
clockTemplate.remove()
clockTemplate.removeAttr("id")
clockTemplate.removeClass("hidden")

const load = (category) => {
    return new Promise((resolve, reject) => {
        $.getJSON("/clocks/" + category, (clocks) => {
            resolve(clocks)
        }).fail((error) => {
            reject(error)
        })
    })
}
const compileData = (incomingClocks, exsistingClocks) => {
    let exsistingIds = exsistingClocks !== undefined ? Object.keys(exsistingClocks) : []
    let incomingIds = incomingClocks.map(x => x.id)
    let newIds = incomingIds.filter(x => exsistingIds.includes(x) === false)
    let removedIds = exsistingIds.filter(x => incomingIds.includes(x) === false)
    let currentIds = exsistingIds.filter(x => removedIds.includes(x) === false)
    return { ids: { new: newIds, removed: removedIds, current: currentIds },
    clocks: { incoming: incomingClocks, exsiting: exsistingClocks || {}, final: {} } }
}
const image = (value) => {
    return "/images/CountdownClock" + value + ".svg"
}
const createNewClocks = (compiledData) => {
    var compiledData = compiledData
    for (const id of compiledData.ids.new) {
        let clock = compiledData.clocks.incoming.filter(x => x.id === id)[0]
        let item = clockTemplate.clone()
        item.attr("id", id)
        item.find("img").attr("src", image(clock.value))
        item.find("h3").text(clock.name)
        content.append(item)
        compiledData.clocks.final[id] = {id: id, clock: clock, item: item}
    }
    return compiledData
}
const updateExsistingClocks = (compiledData) => {
    var compiledData = compiledData
    for (const id of compiledData.ids.current) {
        let object = compiledData.clocks.exsiting[id]
        let clock = compiledData.clocks.incoming.filter(x => x.id === id)[0]
        object.item.find("img").attr("src", image(clock.value))
        object.item.find("h3").text(clock.name)
    }
    return compiledData
}
const removeOldClocks = (compiledData) => {
    var final = compiledData.clocks.final
    var exsisting = compiledData.clocks.exsiting
    for (const id of compiledData.ids.removed) {
        let object = exsisting[id]
        delete exsisting[id]
        object.item.remove()
    }
    final = Object.assign(final, exsisting)
    return final
}

export class Clocks {
    constructor() {}
    async load(category) {
        let clocks = await load(category)
        var compiledData = compileData(clocks, this.clocks)
        compiledData = createNewClocks(compiledData)
        compiledData = updateExsistingClocks(compiledData)
        this.clocks = removeOldClocks(compiledData)
    }
    clear() {
        content.children().remove()
        this.clocks = undefined
    }
}