const UUID = require("uuid").v4

exports.validator = {
    uuid: (uuid) => {
        let regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        return regex.test(uuid)
    },
    clock: (clock) => {
        if (exports.validator.uuid(clock.id) === false) {
            clock.id = UUID()
        }
        clock.modifiedOn = new Date()
        var valid = true
        valid = valid && clock.value >= 0 && clock.value <= 6
        let check = (value) => { valid = valid && value.length >= 3 && value.length <= 50 }
        check(clock.name)
        check(clock.category)
        return { isValid: valid, clock: clock}
    }
}