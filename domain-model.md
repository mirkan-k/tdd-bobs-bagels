# Domain Model

## inventory (array)

- PROPERTIES
  - menuItem {object}

## menuItem {object}

- PROPERTIES
  - sku: (string)
  - price: (number)
  - name: (string)
  - variant: (string)
  - fillings?: (array)

## basket (array)

- PROPERTIES
  - menuItem {object}

## BobsBagelsPublic (class)

- PROPERTIES
  - basket (array of menuItem objects)
  - stock (linked to inventory.json)
  - maxCapacity (integer)

- METHODS (functions)
  - addItem(inputs: itemSku, numOfItems): return updated basket after adding 'integer' amount of menuItem if itemSku/numOfItems is valid && if there space for it in the Basket, else error msg.
  - removeItem(inputs: itemSku): return updated basket after removing menuItem if itemSku is valid, else return erorr msg.

  - getCurrentCapacity(): return currentCapacity which is a sum of all menuItem.quantity's in the basket array.
  - checkMaxCapacity(): return true if getCurrenCapacity >= this.maxCapacity else return false.
  - changeMaxCapacity(input: newCapacity): return this.maxCapacity after replacing it with newCapacity.
  
  - checkPrice(inputs: itemSku, numOfItems): return price of menuItem * numOfItems if itemSku & numOfItems is valid else error msg.
  - checkout(): return total sum of menuItems in Basket, if Basket is empty then return error msg.

- Extenstion METHODS (functions)
  - onionOffer(): return price of BGLO Special Offer(15.31%)
  - plainOffer(): return price of BGLP Special Offer(14.74%)
  - everythingOffer(): return price of BGLE Special Offer(15.31%)
  - coffeeOffer(): return price of COF and BGLP Special Offer(9.24%)
    - 6 bagel onion discount = 84.69% || 15.31%
    - 12 bagel plain discount = 85.26% || 14.74%
    - 6 bagel everything discount = 84.69% || 15.31%
    - coffee and bagel plain discount = 90.58% || 9.42%

  - 
