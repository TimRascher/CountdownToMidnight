const methods = {
    get: "GET",
    post: "POST"
}

function getSettings(url, appKey, method, body) {
    let settings = { url: url, dataType: "json", method: method }
    if (appKey) {
        settings.headers = {
            "app-key": appKey
        }
    }
    if (body) {
        settings.contentType = 'application/json'
        // settings.json = true
        settings.data = body
    }
    return settings
}
function getPromis(settings) {
    return new Promise((resolve, reject) => {
        $.ajax(settings).done((data) => {
            resolve(data)
        }).fail((error) => {
            reject(error)
        })
    })
}

export const client = {
    get: (url, appKey) => {
        let settings = getSettings(url, appKey, methods.get)
        return getPromis(settings)
    },
    post: (url, appKey, body) => {
        let settings = getSettings(url, appKey, methods.post, body)
        return getPromis(settings)
    }
}

export const endPoints = {
    clocks: (category) => { return "/clocks/" + category },
    categories: "/categories",
    check: "/check",
    clock: "/clock"
}