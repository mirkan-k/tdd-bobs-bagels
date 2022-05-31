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

## basket (array)

- PROPERTIES
  - menuItem {object}

## BobsBagelsPublic (class)

- PROPERTIES
  - basket (array of menuItem objects)
  - stock (linked to inventory.json)

- METHODS (functions)
  - addItem(inputs: itemSku, numOfItems): return updated basket after adding 'integer' amount of menuItem with corresponding sku.
  - removeItem(inputs: itemSku, numOfItems): return updated basket after removing 'integer' amount of menuItem with corresponding sku.

## BobsBagelsStaff (class)