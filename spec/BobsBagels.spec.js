const { BasketPublic, BasketStaff } = require("../src/bobsBagels.js")

describe("BasketPublic", () => {
  it("adds item to Customer Basket Array via sku ID", () => {
    // set up
    const basketPublic = new BasketPublic()
    const expected = [{
      sku: "BGLP",
      price: 0.39,
      name: "Bagel",
      variant: "Plain",
      quantity: 1
    }]
    // execute
    const result = basketPublic.addItem("BGLP")
    // verify
    expect(result).toEqual(expected)
  });

  it("adds onto item quantity to existing entry", () => {
    // set up
    const basketPublic = new BasketPublic()
    basketPublic.addItem("BGSE", 2)

    const expected = [{
        sku: "BGSE",
        price: 2.99,
        name: "Bagel Sandwich",
        variant: "Everything",
        fillings: [
          "Bacon",
          "Egg",
          "Cheese"
        ],
        quantity: 3
      }]
    // execute
    const result = basketPublic.addItem("BGSE")
    // verify
    expect(result).toEqual(expected)
  });

  it("shows error msg when addItem input is invalid", () => {
    // set up
    const basketPublic = new BasketPublic()
    // execute
    const result = basketPublic.addItem("HELLO", 2)
    // verify
    expect(result).toEqual("This Item Does Not Exist or you may have entered an Invalid Quantity :(")
  });

  it("removes item from Customer Basket Array via sku ID", () => {
    // set up
    const basketPublic = new BasketPublic()

    basketPublic.addItem("BGLP", 2)
    basketPublic.addItem("COF")
    basketPublic.addItem("BGSE")

    const expected = [{
      sku: "BGLP",
      price: 0.39,
      name: "Bagel",
      variant: "Plain",
      quantity: 2
    }, {
      sku: "BGSE",
      price: 2.99,
      name: "Bagel Sandwich",
      variant: "Everything",
      fillings: [
        "Bacon",
        "Egg",
        "Cheese"
      ],
      quantity: 1
    }]
    // execute
    const result = basketPublic.removeItem("COF")
    // verify
    expect(result).toEqual(expected)
  });
  
  it("shows error msg when removeItem input is invalid", () => {
    // set up
    const basketPublic = new BasketPublic()
    basketPublic.addItem("COF")
    // execute
    const result = basketPublic.removeItem("OF")
    // verify
    expect(result).toEqual("This Item Does Not Exist :(")
  });

  it("shows error/warning msg when customer is trying to go over basket max capacity", () => {
    // set up
    const basketPublic = new BasketPublic(10)
    // execute
    const result = basketPublic.addItem("BGLS", 11) // basket has capacity of 10
    // verify
    expect(result).toEqual("Sorry the Basket is Full or you may have entered a number beyond the Basket Limit, please try entering a lower amount.")
  });

  it("shows ability to change basket capacity", () => {
    // set up
    const basketPublic = new BasketPublic(10)
    const expected = [{
      sku: "BGLP",
      price: 0.39,
      name: "Bagel",
      variant: "Plain",
      quantity: 11
    }]
    // execute
    basketPublic.changeMaxCapacity(11)
    const result = basketPublic.addItem("BGLP", 11) // basket now has a capacity of 11
    // verify
    expect(result).toEqual(expected)
  });

  it("checks price of item", () => {
    // set up
    const basketPublic = new BasketPublic()
    const menuItem = {
      sku: "BGSS",
      price: 4.99,
      name: "Bagel Sandwich",
      variant: "Sesame",
      fillings: [
        "Cream Cheese",
        "Smoked Salmon"
      ]
    }
    
    const expected = Number((menuItem.price * 2).toFixed(2))
    // execute
    const result = basketPublic.checkPrice("BGSS", 2)
    // verify
    expect(result).toEqual(expected)
  });

  it("shows error msg when checking price with invalid inputs", () => {
    // set up
    const basketPublic = new BasketPublic()
    // execute
    const result = basketPublic.checkPrice("ABCDEFG", 2)
    // verify
    expect(result).toEqual("This Item Does Not Exist or you may have entered an Invalid Quantity :(")
  });

  it("checks total sum of basket", () => {
    // set up
    const basketPublic = new BasketPublic()
    basketPublic.addItem("BGLO")
    basketPublic.addItem("COF")
    basketPublic.addItem("BGSE")
    
    const expected = 4.47;
    // execute
    const result = basketPublic.checkout()
    // verify
    expect(result).toEqual(expected)
  });

  it("shows error msg if basket is empty when trying to checkout", () => {
    // set up
    const basketPublic = new BasketPublic()
    // execute
    const result = basketPublic.checkout()
    // verify
    expect(result).toEqual("Your Basket is empty, please continue shopping.")
  });

  //
  //
  /* Extension 1: */
  it("checks if Onion Bagel Special Offer of 2.49 is applied when quantity is 6", () => {
    // set up
    const basketPublic = new BasketPublic(30)
    basketPublic.addItem("BGLO", 6)
    
    const expected = 2.49
    // execute
    const result = basketPublic.checkout()
    // verify
    expect(result).toEqual(expected)
  });

  it("checks if Onion Bagel Special Offer of 2.49 is applied twice when quantity is 12 resulting in a total price of 4.98", () => {
    // set up
    const basketPublic = new BasketPublic(30)
    basketPublic.addItem("BGLO", 12)
    
    const expected = 4.98
    // execute
    const result = basketPublic.checkout()
    // verify
    expect(result).toEqual(expected)
  });

  it("checks to make sure the Onion Bagel Special Offer does not have an effect on the Onion Bagels outside the factor of 6", () => {
    // set up
    const basketPublic = new BasketPublic(30)
    basketPublic.addItem("BGLO", 7)
    
    const expected = 2.98
    // execute
    const result = basketPublic.checkout()
    // verify
    expect(result).toEqual(expected)
  });
  
  it("checks if Plain Bagel Special Offer of 3.99 is applied when quantity is 12", () => {
    // set up
    const basketPublic = new BasketPublic(30)
    basketPublic.addItem("BGLP", 12)
    
    const expected = 3.99
    // execute
    const result = basketPublic.checkout()
    // verify
    expect(result).toEqual(expected)
  });

  it("checks if Plain Bagel Special Offer of 2.49 is applied twice when quantity is 12 resulting in a total price of 7.98", () => {
    // set up
    const basketPublic = new BasketPublic(30)
    basketPublic.addItem("BGLP", 24)
    
    const expected = 7.98
    // execute
    const result = basketPublic.checkout()
    // verify
    expect(result).toEqual(expected)
  });

  it("checks to make sure the Plain Bagel Special Offer does not have an effect on the Plain Bagels outside the factor of 12", () => {
    // set up
    const basketPublic = new BasketPublic(30)
    basketPublic.addItem("BGLP", 13)
    
    const expected = 4.38
    // execute
    const result = basketPublic.checkout()
    // verify
    expect(result).toEqual(expected)
  });

  it("checks if Everything Bagel Special Offer of 2.49 is applied when quantity is 6", () => {
    // set up
    const basketPublic = new BasketPublic(30)
    basketPublic.addItem("BGLE", 6)
    
    const expected = 2.49
    // execute
    const result = basketPublic.checkout()
    // verify
    expect(result).toEqual(expected)
  });

  it("checks if Everything Bagel Special Offer of 2.49 is applied twice when quantity is 12 resulting in a total price of 4.98", () => {
    // set up
    const basketPublic = new BasketPublic(30)
    basketPublic.addItem("BGLE", 12)
    
    const expected = 4.98
    // execute
    const result = basketPublic.checkout()
    // verify
    expect(result).toEqual(expected)
  });

  it("checks to make sure the Everything Bagel Special Offer does not have an effect on the Everything Bagels outside the factor of 6", () => {
    // set up
    const basketPublic = new BasketPublic(30)
    basketPublic.addItem("BGLE", 7)
    
    const expected = 2.98
    // execute
    const result = basketPublic.checkout()
    // verify
    expect(result).toEqual(expected)
  });

  it("checks if Coffee & Plain Bagel Special Offer of 1.25 is applied", () => {
    // set up
    const basketPublic = new BasketPublic()
    basketPublic.addItem("BGLP")
    basketPublic.addItem("COF")
    
    const expected = 1.25
    // execute
    const result = basketPublic.checkout()
    // verify
    expect(result).toEqual(expected)
  });

  it("checks if Coffee & Plain Bagel Special Offer of 1.25 is only applied twice when coffee quantity is 2, even if Plain Bagel Quanitiy is higher", () => {
    // set up
    const basketPublic = new BasketPublic(30)
    basketPublic.addItem("BGLP", 4)
    basketPublic.addItem("COF", 2)
    
    const expected = 3.28
    // execute
    const result = basketPublic.checkout()
    // verify
    expect(result).toEqual(expected)
  });

  it("checks to make sure the Coffee & Plain Bagel Special Offer does not have an effect on the Plain Bagel Offer", () => {
    // set up
    const basketPublic = new BasketPublic(30)
    basketPublic.addItem("BGLP", 12)
    basketPublic.addItem("COF", 1)
    
    const expected = 4.98
    // execute
    const result = basketPublic.checkout()
    // verify
    expect(result).toEqual(expected)
  });
})
