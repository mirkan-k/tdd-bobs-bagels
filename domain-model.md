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
  - onionOffer(): apply Special Offer Price '2.49' for every '6' amount of Onion Bagels in basket
  - plainOffer(): apply Special Offer Price '3.99' for every '12' amount of Plain Bagels in basket
  - everythingOffer(): apply Special Offer Price '2.49' for every '6' amount of Everything Bagels in basket
  - coffeeOffer(): apply Special Offer Price '1.25' for every 1:1 amount of Plain Bagels and Coffee in basket
