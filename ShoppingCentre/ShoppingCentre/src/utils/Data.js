let fetcheddata;
const productContainer = document.querySelector(".productContainer");
let display = [];

const fetchingData = () => {
  document.addEventListener("DOMContentLoaded", function () {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        fetcheddata = structuredClone(data);

        for (var key in fetcheddata) {
          let title = fetcheddata[key].title;
          let rating = fetcheddata[key].rating.rate;
          let svgStart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
             <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
          </svg>

          `;

          let stars = "";
          for (let i = 0; i < rating && i < 5; i++) {
            stars += svgStart;
          }
          productContainer.innerHTML += ` <div class="product" id="${key}">
          <h3 class="productRating">${stars}</h3>
          <img src="${fetcheddata[key].image}" alt="" class="productImage">
           <h2 class="productTitle">${
             title.length > 18 ? title.substring(0, 30).concat("...") : title
           }</h2>
            <div class="productPriceRating"> 
              <h2 class="productPrice">$${fetcheddata[key].price}</h2>
            </div>
         
            <div class="priceButtonContainer">
            <button class="btn addtoCart" id="${key}">Add to cart</button>
            <button class="btn">Buy</button>
            </div>
        </div>`;
        }

        const product = productContainer.querySelectorAll(".product");
        getArray(product, fetcheddata); // returns
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  });

  function getArray(product, fetcheddata) {
    Array.from(product).forEach((e) => {
      let button = e.querySelectorAll("button");

      button.forEach((e) => {
        e.addEventListener("click", (c) => {
          if (c.target.classList.contains("addtoCart")) {
            let added = c.target.id;
            displayCart(added, fetcheddata);
          }
        });
      });
    });
  }

  function displayCart(item, fetchedData) {
    let addToContainer = document.querySelector(".addtoCartContainer");
    let count = 0;
    let elements = addToContainer.querySelectorAll(`#${CSS.escape(item)}`);

    if (elements.length === 0) {
      // Create a parent container
      let addToCartItem = document.createElement("div");
      addToCartItem.classList.add("itemInCart");
      addToCartItem.id = item;
      addToContainer.appendChild(addToCartItem);

      // Add image in the div
      let ItemImage = document.createElement("img");
      ItemImage.src = fetchedData[item].image;

      // Add another div for description
      let descriptionHolder = document.createElement("div");
      descriptionHolder.classList.add("descriptionHolder");
      addToCartItem.appendChild(ItemImage);
      addToCartItem.appendChild(descriptionHolder);

      // Create and append description elements
      let titleElement = document.createElement("h4");
      titleElement.textContent =
        fetchedData[item].title.length > 10
          ? fetchedData[item].title.substring(0, 20).concat("...")
          : fetchedData[item].title;

      //${ title.length > 18 ? title.substring(0, 30).concat("...") : title}

      let descriptionElement = document.createElement("h5");
      descriptionElement.textContent =
        fetchedData[item].description.length > 10
          ? fetchedData[item].description.substring(0, 20).concat("...")
          : fetchedData[item].description;

      let priceElement = document.createElement("h5");
      priceElement.textContent = fetchedData[item].price;

      let buttondiv = document.createElement("div");
      buttondiv.classList = "buttonAddLess";

      let buttonAdd = document.createElement("button");
      buttonAdd.classList.add("buttonadd");

      let buttonMinus = document.createElement("button");
      buttonMinus.classList.add("buttonminus");
      // Create an img element
      buttonAdd.innerHTML = ``;

      buttondiv.appendChild(addimg);
      buttondiv.appendChild(buttonAdd);
      buttondiv.appendChild(buttonMinus);

      descriptionHolder.appendChild(buttondiv);
      descriptionHolder.appendChild(titleElement);
      descriptionHolder.appendChild(descriptionElement);
      descriptionHolder.appendChild(priceElement);

      count++;
    } else {
      count = elements.length; // Update count based on found elements
    }

    console.log(elements);
  }
};

export default fetchingData;

// let imageSrc = fetcheddata[item].image;
// let addtocartContainer = document.querySelector(".addtocartContainer");

// let existingImages = addtocartContainer.querySelectorAll(
//   `img[src="${imageSrc}"]`
// );

// if (existingImages.length === 0) {
//   const imageElement = document.createElement("img");
//   imageElement.src = imageSrc;

//   addtocartContainer.appendChild(imageElement);
// }
