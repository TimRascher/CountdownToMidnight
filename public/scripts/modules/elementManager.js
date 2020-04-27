function readyTemplate(template) {
    template.removeAttr("id")
    template.removeClass("hidden")
    template.remove()
}
function loadData(url) {
    return new Promise((resolve, reject) => {
        $.getJSON(url).done((data) => {
            resolve(data)
        }).fail((error) => {
            reject(error)
        })
    })
}
function removeOld(data, exsistingObjects) {
    const importedIds = data.map(x => x.id)
    let returnData = { data : data, exsistingObjects: {}, importedIds: importedIds }
    if (exsistingObjects === undefined) { return returnData }
    const exsistingIds = Object.keys(exsistingObjects)
    const removedIds = exsistingIds.filter(x => !importedIds.includes(x))
    for (const id of removedIds) {
        let object = exsistingObjects[id]
        delete exsistingObjects[id]
        object.element.remove()
    }
    returnData.exsistingObjects = exsistingObjects
    return returnData
}
function addNew(collection, template, container, mapNew) {
    let exsistingObjects = collection.exsistingObjects
    for (const id of collection.importedIds) {
        const item = collection.data.filter(x => x.id === id)[0]
        let element = template.clone()
        element.attr("id", id)
        mapNew(item, element)
        container.append(element)
        exsistingObjects[id] = { id: id, item: item, element: element }
    }
    return exsistingObjects
}

export class ElementManager {
    constructor(templateId, containerId, mapNew, afterLoad) {
        this.template = $("#" + templateId)
        readyTemplate(this.template)
        this.container = $("#" + containerId)
        this.mapNew = mapNew
        this.afterLoad = afterLoad
    }
    async load(url) {
        const data = await loadData(url)
        const collection = removeOld(data, this.objects)
        this.objects = addNew(collection, this.template, this.container, this.mapNew)
        this.afterLoad(this.objects)
    }
}