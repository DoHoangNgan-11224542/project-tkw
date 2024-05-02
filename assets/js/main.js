const listImgs = [
  "./assets/images/background-image-1.jpg",
  "./assets/images/carousel-img-1.webp",
  "./assets/images/carousel-img-2.webp",
  "./assets/images/carousel-img-3.webp",
];

$(document).on("ready", () => {
  let i = 0;

  setInterval(() => {
    $("#banner-img").attr(
      "src",
      i === listImgs.length - 1 ? listImgs[0] : listImgs[i + 1]
    );
    i === listImgs.length - 1 ? (i = 0) : i++;
  }, 5000);

  $("#arr-btn").on("click", () => {
    $("#banner-img").attr(
      "src",
      i === listImgs.length - 1 ? listImgs[0] : listImgs[i + 1]
    );
    i === listImgs.length - 1 ? (i = 0) : i++;
  });

  let show = false;
  $("#nav-button").on("click", function () {
    if (!show) {
      $(".sticky-menu").show();
    } else $(".sticky-menu").hide();

    show = !show;
  });
});

// product

const LIST_PRODUCTS = [
  {
    id: 1,
    type: "light",
    name: "Hand Base Lamp",
    salePrice: "$35.00",
    price: "$55.00",
    image: "./assets/images/Image.png",
  },
  {
    id: 2,
    type: "chair",
    name: "Vintage Chair",
    salePrice: "$65.00",
    price: "$95.00",
    image: "./assets/images/chair-brown.png",
  },
  {
    id: 3,
    type: "light",
    name: "Lamp Tool",
    salePrice: "$35.00",
    price: "$45.00",
    image: "./assets/images/lamp-1.png",
  },
  {
    id: 4,
    type: "chair",
    name: "Stylish Chair",
    salePrice: "$45.00",
    price: "$55.00",
    image: "./assets/images/chair-orange.png",
  },
  {
    id: 5,
    type: "chair",
    name: "Vintage Chair",
    salePrice: "$65.00",
    price: "$95.00",
    image: "./assets/images/chair-white.png",
  },
  {
    id: 6,
    type: "chair",
    name: "Stackable Chair",
    salePrice: "$87.00",
    price: "$97.00",
    image: "./assets/images/chair-black.png",
  },
  {
    id: 7,
    type: "bed",
    name: "Flexible Bed",
    salePrice: "$100.00",
    price: "$112.00",
    image: "./assets/images/bed-1.png",
  },
  {
    id: 8,
    type: "bed",
    name: "Comfortable Bed",
    salePrice: "$99.00",
    price: "$122.00",
    image: "./assets/images/bed-2.png",
  },
  {
    id: 9,
    type: "sofa",
    name: "Supercomfortable Sofa",
    salePrice: "$99.00",
    price: "$122.00",
    image: "./assets/images/sofa-1.png",
  },
];

const reload = (list) => {
  $(".list-item-wrapper").remove();

  list.forEach((item) => {
    $(".p-list").append(`   <div class="list-item-wrapper">
    <img
      class="cart-icon"
      src="./assets/images/Cart Icon.png"
      alt=""
    />
    <div class="list-item">
      <div class="wrapper">
        <p class="i-title">${item.name}</p>
        <div class="price">
          <p class="sale-price">${item.salePrice}</p>
          <p class="old-price">${item.price}</p>
        </div>
      </div>
      <img class="item-img" src="${item.image}" alt="" />
    </div>
  </div>`);
  });
};

$(document).on("ready", () => {
  let i = 0;

  setInterval(() => {
    $("#banner-img").attr(
      "src",
      i === listImgs.length - 1 ? listImgs[0] : listImgs[i + 1]
    );
    i === listImgs.length - 1 ? (i = 0) : i++;
  }, 5000);

  $("#arr-btn").on("click", () => {
    $("#banner-img").attr(
      "src",
      i === listImgs.length - 1 ? listImgs[0] : listImgs[i + 1]
    );
    i === listImgs.length - 1 ? (i = 0) : i++;
  });

  reload(LIST_PRODUCTS);

  // set id
  $.each($(".list-item-wrapper"), function (index, item) {
    $(item).attr("id", index + 1);
  });

  let selectedTag = "all";

  const LIST_TAGS = ["All", "Bed", "Sofa", "Chair", "Light"];
  LIST_TAGS.forEach((item) =>
    $(".p-filter").append(
      `<p id=${item.toLowerCase()} class="txt filter-tag ${
        item.toLowerCase() === selectedTag ? "selected" : ""
      }">${item}</p>`
    )
  );

  $(document).on("click", ".cart-icon", function (e) {
    e.preventDefault();
    e.stopPropagation();
    const id = $(this).parent().attr("id");
    console.log(id);
    if (window.confirm("Do you want to add this item to cart?")) {
      const saved = window.localStorage.getItem("saved");
      if (!saved) {
        const record = {};
        record[id] = 1;
        window.localStorage.setItem("saved", JSON.stringify(record));
      } else {
        const jsonData = JSON.parse(saved);
        console.log(jsonData[id]);
        if (jsonData[id]) {
          jsonData[id] = jsonData[id] + 1;
        } else jsonData[id] = 1;

        window.localStorage.setItem("saved", JSON.stringify(jsonData));
      }
    }
  });

  $(document).on("click", ".list-item-wrapper", function () {
    const id = $(this).attr("id");
    window.location.href = "/11224542_DoHoangNgan/product-detail.html?id=" + id;
  });

  $(document).on("click", ".filter-tag", function () {
    $(`#${selectedTag}`).removeClass("selected");
    const tag = $(this).text()?.toLowerCase();
    selectedTag = tag;
    $(`#${tag}`).addClass("selected");

    // then filter
    reload(
      tag === "all"
        ? LIST_PRODUCTS
        : LIST_PRODUCTS.filter((item) => item.type === tag)
    );
  });
});

// product details
$(document).on("ready", () => {
  let selected = 2;

  // get id
  let params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    const item = LIST_PRODUCTS.find((item) => item.id === Number(id));
    if (item) {
      $(".product-title").html(item.name);
      $(".sale-price").html(item.salePrice);
      $(".old-price").html(item.price);
      console.log(item.image);
      let imgHtmls = "";

      [2, 3, 4, 5].forEach(
        (x) =>
          (imgHtmls += `<img id=${x} src=${item.image} alt="" class="preview-img"/>`)
      );
      $("#previews").append(imgHtmls);

      $("#detail-img").attr("src", item.image);
    }
  }

  $(document).on("click", "#previews .preview-img", function () {
    const id = $(this).attr("id");
    $(`img#${selected}`).removeClass("selected");
    selected = id;
    $(this).addClass("selected");

    // $("#detail-img").attr("src", `./assets/images/${id}.png`);
  });

  const LIST_COLORS = ["059669", "EA580C", "6366F1", "334155"];

  let selectedColor = LIST_COLORS[0];
  $("#colors").append(
    LIST_COLORS.map(
      (item) =>
        `<div id=${item} class="color-item" style="background: #${item}">
          <img src="./assets/images/check.png" style="display:  ${
            item === selectedColor ? "" : "none"
          }" class="check" />
        </div>`
    ).join("")
  );

  $(document).on("click", "#colors .color-item", function () {
    const color = $(this).attr("id");
    $(`#${selectedColor} img`).hide();
    selectedColor = color;
    $(`#${color} img`).show();
  });

  let currentTab = "review";
  $(document).on("click", ".tab-item", function () {
    const id = $(this).attr("id");
    $(`#${currentTab}`).removeClass("tab-selected");
    currentTab = id;
    $(`#${id}`).addClass("tab-selected");
  });

  $(document).on("click", ".atc-btn", function () {
    console.log(id);
    if (window.confirm("Do you want to add this item to cart?")) {
      const saved = window.localStorage.getItem("saved");
      if (!saved) {
        const record = {};
        record[id] = 1;
        window.localStorage.setItem("saved", JSON.stringify(record));
      } else {
        const jsonData = JSON.parse(saved);
        console.log(jsonData[id]);
        if (jsonData[id]) {
          jsonData[id] = jsonData[id] + 1;
        } else jsonData[id] = 1;

        window.localStorage.setItem("saved", JSON.stringify(jsonData));
      }
    }
  });
});
