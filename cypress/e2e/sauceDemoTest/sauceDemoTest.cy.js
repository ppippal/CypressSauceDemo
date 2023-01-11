describe("Sauce demo assignment", () => {
  let loginDetails;

  before(() => {
    cy.fixture("login").then((loginJson) => {
      loginDetails = loginJson;
    });
  });

  beforeEach(()=>{
    cy.clearAllCookies();
    cy.visit(loginDetails.url);
  })

  it("Verify the title as Swag Labs", () => {
    cy.title().should("eq", "Swag Labs");
    cy.log("Navigated to Swag Labs successfully");
  });

  it("Verify the login button text is capitalized", () => {
    cy.title().should("eq", "Swag Labs");
    cy.log("Navigated to Swag Labs successfully");
    //Verifying Login button has text in uppercase
    cy.get("#login-button")
      .should("have.css", "text-transform", "uppercase")
      .and("have.value", "Login");
  });

  it("Login with standard_user & secret_sauce", () => {
    cy.title().should("eq", "Swag Labs");
    cy.log("Navigated to Swag Labs successfully");
    //Entering credentials
    cy.get("#user-name").type(loginDetails.userName);
    cy.get("#password").type(loginDetails.password);
    cy.get("#login-button").click();
    //Verifying login
    cy.get(".title").should("have.text", "Products");
    cy.log("Login successful");
  });

  it("Verify default filter dropdown is A-Z", () => {
    cy.title().should("eq", "Swag Labs");
    cy.log("Navigated to Swag Labs successfully");
    //Entering credentials
    cy.get("#user-name").type(loginDetails.userName);
    cy.get("#password").type(loginDetails.password);
    cy.get("#login-button").click();
    //Verifying login
    cy.get(".title").should("have.text", "Products");
    cy.log("Login successful");
    //Verifying default filter dropdown value is A-Z
    cy.get(".select_container")
      .find(".active_option")
      .should("have.text", "Name (A to Z)");
    cy.log("Default filter dropdown is A-Z");
  });

  it("Add the first product to the cart and verify the cart badge has 1 product", () => {
    cy.title().should("eq", "Swag Labs");
    cy.log("Navigated to Swag Labs successfully");
    //Entering credentials
    cy.get("#user-name").type(loginDetails.userName);
    cy.get("#password").type(loginDetails.password);
    cy.get("#login-button").click();
    //Verifying login
    cy.get(".title").should("have.text", "Products");
    cy.log("Login successful");
    //Adding first product to cart
    cy.get(".inventory_item").find("button").first().click();
    //Verifying cart badge has 1 product
    cy.get(".shopping_cart_badge").should("have.text", "1");
    cy.log("Cart badge has 1 product");
  });

  it("Add the last product to the cart and Verify the cart badge value is increased", () => {
    cy.title().should("eq", "Swag Labs");
    cy.log("Navigated to Swag Labs successfully");
    //Entering credentials
    cy.get("#user-name").type(loginDetails.userName);
    cy.get("#password").type(loginDetails.password);
    cy.get("#login-button").click();
    //Verifying login
    cy.get(".title").should("have.text", "Products");
    cy.log("Login successful");
    //Adding first product to cart
    cy.get(".inventory_item").find("button").as("addToCartButtons");
    cy.get("@addToCartButtons").first().click();
    //Taking the cart badge product count after adding first product
    var cartCount = 0;
    cy.get(".shopping_cart_badge").then((ele) => {
      cartCount = Number(ele.text());
    });
    //Adding last product to cart and verifying that the cart badge value has increased by 1
    cy.get("@addToCartButtons")
      .last()
      .click()
      .then(() => {
        cartCount++;
        cy.get(".shopping_cart_badge").should(
          "have.text",
          cartCount.toString()
        );
      });
    cy.log("cart badge value has increased");
  });

  it("Remove the first product from the cart and Verify the cart badge has 1 product", () => {
    cy.title().should("eq", "Swag Labs");
    cy.log("Navigated to Swag Labs successfully");
    //Entering credentials
    cy.get("#user-name").type(loginDetails.userName);
    cy.get("#password").type(loginDetails.password);
    cy.get("#login-button").click();
    //Verifying login
    cy.get(".title").should("have.text", "Products");
    cy.log("Login successful");
    //Adding first and last product to cart
    cy.get(".inventory_item").find("button").as("addToCartButtons");
    cy.get("@addToCartButtons").first().click();
    cy.get("@addToCartButtons").last().click();
    //Removing first product from cart
    cy.get(".inventory_item").find("button").contains("Remove").first().click();
    //Verifying the cart badge has 1 product
    cy.get(".shopping_cart_badge").should("have.text", "1");
    cy.log("The cart badge has 1 product");
  });

  it("Click on cart icon and Verify the added product is available", () => {
    cy.title().should("eq", "Swag Labs");
    cy.log("Navigated to Swag Labs successfully");
    //Entering credentials
    cy.get("#user-name").type(loginDetails.userName);
    cy.get("#password").type(loginDetails.password);
    cy.get("#login-button").click();
    //Verifying login
    cy.get(".title").should("have.text", "Products");
    cy.log("Login successful");
    //Adding first and last product to cart
    cy.get(".inventory_item").find("button").as("addToCartButtons");
    cy.get("@addToCartButtons").first().click();
    cy.get("@addToCartButtons").last().click();
    //Removing first product from cart
    cy.get(".inventory_item").find("button").contains("Remove").first().click();
    //Fetching the added item name for later validation on cart page
    cy.get(".inventory_item_name")
      .last()
      .then((ele) => {
        const addedItemName = ele.text();
        cy.wrap(addedItemName).as("addedItemName");
      });
    //Navigating to cart page
    cy.get(".shopping_cart_link").click();
    cy.get(".title").should("have.text", "Your Cart");
    cy.log("Navigated to cart page successfully");
    //Verifying the added product in available in cart
    cy.get("@addedItemName").then((ele) => {
      cy.get(".inventory_item_name").should("have.text", ele);
    });
    cy.log("The added product is available");
  });

  it("Click on the continue shopping, Change the price filter from low to high and Verify the price sorted properly", () => {
    cy.title().should("eq", "Swag Labs");
    cy.log("Navigated to Swag Labs successfully");
    //Entering credentials
    cy.get("#user-name").type(loginDetails.userName);
    cy.get("#password").type(loginDetails.password);
    cy.get("#login-button").click();
    //Verifying login
    cy.get(".title").should("have.text", "Products");
    cy.log("Login successful");
    //Adding first and last product to cart
    cy.get(".inventory_item").find("button").as("addToCartButtons");
    cy.get("@addToCartButtons").first().click();
    cy.get("@addToCartButtons").last().click();
    //Removing first product from cart
    cy.get(".inventory_item")
      .find("button")
      .contains("Remove")
      .as("removeButtons");
    cy.get("@removeButtons").first().click();
    //Navigating to cart page
    cy.get(".shopping_cart_link").click();
    cy.get(".title").should("have.text", "Your Cart");
    cy.log("Navigated to cart page successfully");
    //Navigating to home page by clicking on Continue Shopping
    cy.get("#continue-shopping").click();
    cy.title().should("eq", "Swag Labs");
    cy.log("Navigated to Swag Labs successfully");
    //Selecting filter value "low to high"
    cy.get(".product_sort_container").select("Price (low to high)");
    cy.get(".product_sort_container").should("have.value", "lohi");
    //Verifying the prices sorted as low to high
    cy.get(".inventory_item_price").invoke("text").as("itemprices");
    cy.get("@itemprices").then(($ele) => {
      var allItemPrices = $ele.split("$");
      var sortedArray = allItemPrices.slice().sort(function (a, b) {
        return a - b;
      });
      cy.wrap(allItemPrices).should("deep.equal", sortedArray);
      cy.log("Price sorted as Low to High");
    });
  });
});
