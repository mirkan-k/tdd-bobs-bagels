class BasketPublic {
    constructor(maxCapacity = 10) {
        this.basket = []
        this.stock = require("../inventory.json").inventory
        this.maxCapacity = maxCapacity
    }

    addItem(itemSku, numOfItems = 1) {
        const objIndex = this.basket.findIndex((menuItem => menuItem.sku === itemSku))
        const postCapacity = numOfItems + this.getCurrentCapacity()

        if (!this.checkMaxCapacity() && postCapacity <= this.maxCapacity) {
            if (this.basket.some(e => e.sku === itemSku) && !isNaN(numOfItems)) {
                this.basket[objIndex].quantity += numOfItems
                return this.basket
            }else if (this.stock.some(e => e.sku === itemSku) && !isNaN(numOfItems)) {
                const newItem = {
                    ...this.stock.find(element => element.sku === itemSku),
                    quantity: numOfItems
                }
                this.basket.push(newItem)
    
                return this.basket
            }
            return "This Item Does Not Exist or you may have entered an Invalid Quantity :("
        }
        return "Sorry the Basket is Full or you may have entered a number beyond the Basket Limit, please try entering a lower amount."
    }

    removeItem(itemSku) {
        for (let i = 0; i < this.basket.length; i++) {
            if (this.basket[i].sku === itemSku) {
                this.basket.splice(i, 1)
                return this.basket
            }
        }
        return "This Item Does Not Exist :("
    }

    getCurrentCapacity() {
        let currentCapacity = 0
        this.basket.map(menuItem => currentCapacity += menuItem.quantity)
        return currentCapacity
    }

    checkMaxCapacity() {
        if (this.getCurrentCapacity() >= this.maxCapacity) {
            return true
        }
        return false
    }

    changeMaxCapacity(newCapacity) {
        this.maxCapacity = newCapacity
        return this.maxCapacity
    }

    checkPrice(itemSku, numOfItems = 1) {
        if (this.stock.some(e => e.sku === itemSku) && !isNaN(numOfItems)) {
            const newItem = {
                ...this.stock.find(element => element.sku === itemSku),
            }
            return Number((newItem.price * numOfItems).toFixed(2))
        }
        return "This Item Does Not Exist or you may have entered an Invalid Quantity :("
    }

    checkout() {
        let basketTotal = 0
        if (this.basket.length !== 0) {
            this.basket.map(menuItem => basketTotal += menuItem.quantity * menuItem.price)
            return Number(basketTotal.toFixed(2))
        }
        return "Your Basket is empty, please continue shopping."
    }
    
    test() {
        return this.stock
    }
}

const basketPublic = new BasketPublic()

// console.log(basketPublic.addItem("BGSE", 4))
// console.log(basketPublic.checkMaxCapacity())
// console.log(basketPublic.addItem("BGSE", 2))
// console.log(basketPublic.addItem("COF", 2))
// console.log(basketPublic.addItem("BGLS"))
// console.log(basketPublic.removeItem("COF"))
// console.log(basketPublic.getCurrentCapacity())
// console.log(basketPublic.checkMaxCapacity())
// console.log(basketPublic.checkPrice("COF", 3))
console.log(basketPublic.checkout())
// console.log(basketPublic.test())

module.exports = {
    BasketPublic
}