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

    applyOnionOffer() {
        const onionBagel = this.basket.find(e => e.sku === 'BGLO')
        let specialOffer = 2.49
        let specialOfferNum = 6
        const remainder = onionBagel.quantity % specialOfferNum
        const calculatedQuantity = onionBagel.quantity - remainder

        const appliedOffer = (calculatedQuantity/specialOfferNum) * specialOffer
        const pricePostOffer = Number(((remainder * onionBagel.price) + appliedOffer).toFixed(2))

        return pricePostOffer
    }

    applyPlainOffer() {
        const plainBagel = this.basket.find(e => e.sku === 'BGLP')
        let specialOffer = 3.99
        let specialOfferNum = 12
        const remainder = plainBagel.quantity % specialOfferNum
        const calculatedQuantity = plainBagel.quantity - remainder

        const appliedOffer = (calculatedQuantity/specialOfferNum) * specialOffer
        const pricePostOffer = Number(((remainder * plainBagel.price) + appliedOffer).toFixed(2))
        
        return pricePostOffer
    }

    applyEverythingOffer() {
        const everythingBagel = this.basket.find(e => e.sku === 'BGLE')
        let specialOffer = 2.49
        let specialOfferNum = 6
        const remainder = everythingBagel.quantity % specialOfferNum
        const calculatedQuantity = everythingBagel.quantity - remainder

        const appliedOffer = (calculatedQuantity/specialOfferNum) * specialOffer
        const pricePostOffer = Number(((remainder * everythingBagel.price) + appliedOffer).toFixed(2))

        return pricePostOffer
    }

    applyCoffeeOffer() {
        const coffee = this.basket.find(e => e.sku === 'COF')
        const plainBagel = this.basket.find(e => e.sku === 'BGLP')
        let specialOffer = 0.86
        let plainSpecialOfferNum = 12
        const remainder = plainBagel.quantity % plainSpecialOfferNum

        let appliedQuantity = 0
        if (coffee.quantity >= remainder) {
            appliedQuantity += remainder
        } else if (coffee.quantity < remainder) {
            appliedQuantity += coffee.quantity
        };
        
        const calculatedQuantity = coffee.quantity - appliedQuantity
        const appliedOffer = appliedQuantity * specialOffer
        const pricePostOffer = Number(((coffee.price * calculatedQuantity) + appliedOffer).toFixed(2))
        
        return pricePostOffer
    }

    checkout() {
        let basketTotal = 0
        
        if (this.basket.length !== 0) {
            for (let i = 0; i < this.basket.length; i++) {
                    if (this.basket[i].sku === 'BGLO') {
                        basketTotal += this.applyOnionOffer();
                        // console.log('onion', basketTotal)
                    } else if (this.basket[i].sku === 'BGLP') {
                        basketTotal += this.applyPlainOffer()
                        // console.log('plain', basketTotal)
                    } else if (this.basket[i].sku === 'BGLE') {
                        basketTotal += this.applyEverythingOffer()
                        // console.log('everything variant', basketTotal)
                    } 
                    else if (this.basket[i].sku === 'COF' && this.basket.some(e => e.sku === 'BGLP')) {
                        basketTotal += this.applyCoffeeOffer()
                        // console.log('coffee', basketTotal)
                    } 
                    else {
                        basketTotal += this.basket[i].quantity * this.basket[i].price
                    }
            }
            return Number(basketTotal.toFixed(2))
        }
        return "Your Basket is empty, please continue shopping."
    }


    test() {
        return this.stock
    }
}

// const basketPublic = new BasketPublic(30)

// console.log(basketPublic.addItem("BGSE", 4))
// console.log(basketPublic.checkMaxCapacity())
// console.log(basketPublic.addItem("BGLO", 12))
// console.log(basketPublic.addItem("BGLP", 11))
// console.log(basketPublic.addItem("COF", 2))
// console.log(basketPublic.addItem("BGLE", 2))
// console.log(basketPublic.removeItem("COF"))
// console.log(basketPublic.getCurrentCapacity())
// console.log(basketPublic.checkMaxCapacity())
// console.log(basketPublic.checkPrice("COF", 3))
// console.log(basketPublic.applyCoffeeOffer())
// console.log(basketPublic.checkout())
// console.log(basketPublic.test())

module.exports = {
    BasketPublic
}