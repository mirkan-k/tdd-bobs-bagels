class BasketPublic {
    constructor() {
        this.basket = []
        this.stock = require("../inventory.json")
    }

    addItem(itemSku, numOfItems = 1) {
        if (this.stock.inventory.some(e => e.sku === itemSku)) {
            const newItem = {
                ...this.stock.inventory.find(element => element.sku === itemSku),
                quantity: numOfItems
            }
            this.basket.push(newItem)
    
            return this.basket
        }
        return "This Item Does Not Exist! :("
    }

    test() {
        return this.stock.inventory
    }
}

const basketPublic = new BasketPublic()

console.log(basketPublic.addItem("BGLP"))
// console.log(basketPublic.test())

module.exports = {
    BasketPublic
}