const LIST_PRODUCTS = [
  {
    id: 1,
    name: "Hand Base Lamp",
    salePrice: 35,
    price: 55,
    image: "./assets/images/Image.png",
  },
  {
    id: 2,
    name: "Vintage Chair",
    salePrice: 65,
    price: 95,
    image: "./assets/images/chair-brown.png",
  },
  {
    id: 3,
    name: "Lamp Tool",
    salePrice: 35,
    price: 45,
    image: "./assets/images/lamp-1.png",
  },
  {
    id: 4,
    name: "Stylish Chair",
    salePrice: 45,
    price: 55,
    image: "./assets/images/chair-orange.png",
  },
  {
    id: 5,
    name: "Vintage Chair",
    salePrice: 65,
    price: 95,
    image: "./assets/images/chair-white.png",
  },
  {
    id: 6,
    name: "Stackable Chair",
    salePrice: 87,
    price: 97,
    image: "./assets/images/chair-black.png",
  },
  {
    id: 7,
    type: "bed",
    name: "Flexible Bed",
    salePrice: 100,
    price: 112,
    image: "./assets/images/bed-1.png",
  },
  {
    id: 8,
    type: "bed",
    name: "Comfortable Bed",
    salePrice: 99,
    price: 122,
    image: "./assets/images/bed-2.png",
  },
  {
    id: 9,
    type: "sofa",
    name: "Supercomfortable Sofa",
    salePrice: 99,
    price: 122,
    image: "./assets/images/sofa-1.png",
  },
];

const reload = (listItems) => {
  $(".list").remove();
  if (listItems.length > 0) {
    let subtotal = 0;

    listItems.forEach((item) => {
      subtotal += item.salePrice * item.count;
      $(".list-wrapper").append(`  <div class="list" id=${item.id}>
              <div style="display: flex; align-items: center">
                <img class="item-img" src=${item.image} alt="" />
                <div class="text" style="margin-left: 15px">
                  <p style="font-size: 16px; font-weight: 500">${item.name}</p>
                  <p style="font-size: 12px">Lorem ipsum abababa</p>
                </div>
              </div>
              <div class="total">
                <p>${item.count}</p>
                <img class="modify-icon" src="./assets/images/modify.png" alt="" />
              </div>
              <div style="display: flex; align-items: center">
                <div class="cost">
                  <p>$${item.salePrice * item.count}.00</p>
                </div>
                <img class="trash-icon" src="./assets/images/Trash Can.png" alt="" />
              </div>
            </div>`);
    });

    //   set total, subtotal
    console.log();
    $("#sub-total").text("$" + subtotal);

    $("#total, #total11").text("$" + (subtotal + 4));
  }
};

$(document).ready(() => {
  let listItems = [];
  let subtotal = 0;
  let total = 0;
  const savedRaw = window.localStorage.getItem("saved");
  if (savedRaw) {
    const parsed = JSON.parse(savedRaw);
    console.log(parsed);
    Object.keys(parsed).forEach((k) => {
      const found = LIST_PRODUCTS.find((item) => item.id == k);

      if (found) listItems.push({ ...found, count: parsed[k] });
    });
  }
  reload(listItems);

  $(document).on("click", ".modify-icon", function () {
    const id = $(this).parent().parent().attr("id");

    // change in local
    const data = JSON.parse(window.localStorage.getItem("saved"));
    data[id] = data[id] + 1;
    window.localStorage.setItem("saved", JSON.stringify(data));

    // change variable
    listItems.forEach((item) => {
      if (item.id == id) {
        item.count = item.count + 1;
      }
    });
    console.log(listItems);
    reload(listItems);
  });

  $(document).on("click", ".trash-icon", function () {
    const id = $(this).parent().parent().attr("id");

    // remove local
    const data = JSON.parse(window.localStorage.getItem("saved"));
    delete data[id];
    window.localStorage.setItem("saved", JSON.stringify(data));

    // remove variable
    listItems = listItems.filter((item) => item.id != id);
    reload(listItems);
  });
});
