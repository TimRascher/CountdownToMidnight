const utilities = require("../utilities")

exports.clock = class {
    constructor(name, category) {
        this.id = utilities.UUID()
        this.name = name
        this.category = category
        this.modifiedOn = new Date()
    }
    updateDate = () => {
        this.modifiedOn = new Date()
    }
}