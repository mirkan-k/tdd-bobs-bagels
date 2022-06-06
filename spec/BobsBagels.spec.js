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
    basketPublic.addItem("BGLP")
    basketPublic.addItem("COF")
    basketPublic.addItem("BGSE")
    
    const expected = 4.37;
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
})
