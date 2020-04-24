const addZero = (value) => {
    if (value <= 9) { return "0" + value }
    return value
}

exports.dateFormatter = (date) => {
    var formattedString = date.getUTCFullYear() + "-" + addZero(date.getUTCMonth()) + "-" + addZero(date.getUTCDay())
    formattedString += " " + addZero(date.getUTCHours()) + ":" + addZero(date.getUTCMinutes()) + ":" + addZero(date.getUTCSeconds())
    formattedString += "." + date.getUTCMilliseconds()
    return formattedString
}