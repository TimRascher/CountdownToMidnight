import { client } from "./client.js"

function readyTemplate(template) {
    template.removeAttr("id")
    template.removeClass("hidden")
    template.remove()
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
        let element
        if (Object.keys(exsistingObjects).includes(id)) {
            element = exsistingObjects[id].element
        } else {
            element = template.clone()
            element.attr("id", id)
            container.append(element)
            exsistingObjects[id] = { id: id, item: item, element: element }
        }
        mapNew(item, element)
    }
    return exsistingObjects
}

export class ElementManager {
    constructor(templateId, containerId, mapNew) {
        this.template = $("#" + templateId)
        readyTemplate(this.template)
        this.container = $("#" + containerId)
        this.mapNew = mapNew
    }
    async load(url) {
        const data = await client.get(url)
        const collection = removeOld(data, this.objects)
        this.objects = addNew(collection, this.template, this.container, this.mapNew)
    }
}