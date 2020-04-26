const addZero = (value) => {
    if (value <= 9) { return "0" + value }
    return value
}

exports.date = (date) => {
    var formattedString = date.getUTCFullYear() + "-" + addZero(date.getUTCMonth()) + "-" + addZero(date.getUTCDay())
    formattedString += " " + addZero(date.getUTCHours()) + ":" + addZero(date.getUTCMinutes()) + ":" + addZero(date.getUTCSeconds())
    formattedString += "." + date.getUTCMilliseconds()
    return formattedString
}
exports.categories = (categories) => {
    var categoriesArray = []
    for (const category of categories) {
        categoriesArray.push(category.category)
    }
    return categoriesArray.sort()
}
exports.clocks = (clocks) => {
    return clocks.sort((lhs, rhs) => { lhs.name < rhs.name })
}