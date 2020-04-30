const methods = {
    get: "GET",
    post: "POST"
}

function getSettings(url, appKey, method) {
    let settings = { url: url, dataType: "json", method: method }
    if (appKey) {
        settings.headers = {
            "app-key": appKey
        }
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
    post: (url, appKey) => {
        let settings = getSettings(url, appKey, methods.post)
        return getPromis(settings)
    }
}