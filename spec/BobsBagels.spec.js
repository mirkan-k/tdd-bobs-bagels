const { BasketPublic, BasketStaff } = require("../src/BobsBagels.js")

describe("BasketPublic", () => {
  it("adds item to Customer Basket", () => {
    // set up
    const basketPublic = new BasketPublic()
    const expected = [{
      sku: "BGLP",
      price: 0.39,
      name: "Bagel",
      variant: "Plain",
      quantity: 2
    }]
    // execute
    const result = basketPublic.addItem("BGLP", 2)
    // verify
    expect(result).toEqual(expected)
  });

  it("shows error msg if invalid sku is inputted", () => {
    // set up
    const basketPublic = new BasketPublic()
    // execute
    const result = basketPublic.addItem("HELLO", 2)
    // verify
    expect(result).toEqual("This Item Does Not Exist! :(")
  });
})
