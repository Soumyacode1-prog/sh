document.addEventListener('DOMContentLoaded', function() {
    let products = document.querySelector('.products');
    let sortingSelect = document.getElementById('sorting');
    let searchInput = document.getElementById('search');
    async function fetchProducts(url, sortBy,searchQuery) {
        try {
            let data = await fetch(url);
            let response = await data.json();

            if (sortBy === 'priceLowToHigh') {
              response.sort((a, b) => a.price - b.price);
          } else if (sortBy === 'priceHighToLow') {
              response.sort((a, b) => b.price - a.price);
          }

          if (searchQuery) {
            response = response.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        products.innerHTML = ''; 


            for (let i = 0; i < response.length; i++) {
                let description = response[i].description;
                let title = response[i].title;
                products.innerHTML += `
       <div class="product">
           <img src="${response[i].category.image}" alt="${
          response[i].category.name
        }" class="product-img">
           <div class="product-content">
           <h2 class="product-title">${
             title.length > 18 ? title.substring(0, 18).concat(' ...') : title
           }</h2>
           <h4 class="product-category">${response[i].category.name}</h4>
           <p class="product-description">${
             description.length > 80
               ? description.substring(0, 80).concat(' ...more')
               : description
           }</p>
           <div class="product-price-container">
               <h3 class="product-price">$${response[i].price}</h3>
               <a href="#!" data-productId="${
                 response[i].id
               }" class="add-to-cart"><ion-icon name="cart-outline"></ion-icon></a>
           </div>
           </div>
          
       </div>
       `;
            }
        } catch (err) {
            console.log(err);
        }
    }

    sortingSelect.addEventListener('change', function() {
      const selectedValue = sortingSelect.value;
      const searchValue = searchInput.value;
      fetchProducts('https://api.escuelajs.co/api/v1/products', selectedValue, searchValue);
  });

  searchInput.addEventListener('input', function() {
      const selectedValue = sortingSelect.value;
      const searchValue = searchInput.value;
      fetchProducts('https://api.escuelajs.co/api/v1/products', selectedValue, searchValue);
  });

  // Initial fetch
  fetchProducts('https://api.escuelajs.co/api/v1/products', 'default', '');
});







