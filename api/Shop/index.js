import API from "../Api";

export async function createShop(formdata) {
  let url = `/me/shop`;

  return new Promise(async function (resolve, reject) {
    API.post(url, formdata)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function editShop(id, formdata) {
  let url = `/me/shop/${id}`;

  return new Promise(async function (resolve, reject) {
    API.post(url, formdata)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function favShops() {
  let url = `/me/shop/favorite`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function searchFavorites(searchString) {
  let url = `/me/shop/favorite?search=${searchString}`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function searchShop(searchString) {
  let url = `/shop?search=${searchString}`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function searchMyShops(searchString) {
  let url = `/me/shop?search=${searchString}`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function getFilteredShops(id) {
  let url = `/shop?product_type=${id}`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function getFilteredProducts(id, s_id) {
  let url = `/shop/${s_id}?product_type=${id}`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function getShops() {
  let url = `/shop`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function getAllShops(page) {
  let url = `/shop?page=${page}`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function filterShops(selected_filters_ids) {
  let url = `/shop?${`product_type=${selected_filters_ids.join()}`}`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function gettOwnerShops() {
  let url = `/me/shop`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function getShopsById(id) {
  let url = `/shop/${id}`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function shopHome() {
  let url = `/shop/home`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function dropdownProducts(id) {
  let url = `/shop/${id}/products/related`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function removeFromCart(id) {
  let url = `/me/cart/${id}`;

  return new Promise(async function (resolve, reject) {
    API.delete(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function toogleFavorite(id) {
  let url = `/me/shop/${id}/favorite`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function addToCart(formdata) {
  let url = `/me/cart`;

  return new Promise(async function (resolve, reject) {
    API.post(url, formdata)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function createProduct(id, formdata) {
  let url = `/me/shop/${id}/products`;

  return new Promise(async function (resolve, reject) {
    API.post(url, formdata)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function updateProducts(id, formdata, p_id) {
  let url = `/me/shop/${id}/products/${p_id}`;

  return new Promise(async function (resolve, reject) {
    API.post(url, formdata)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function singleProduct(id, p_id) {
  let url = `/shop/${id}/products/${p_id}`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function updateCart(p_id, formdata) {
  let url = `/me/cart/${p_id}`;

  return new Promise(async function (resolve, reject) {
    API.post(url, formdata)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function getCart() {
  let url = `/me/cart`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function createOrder(fd) {
  let url = `/me/orders`;

  return new Promise(async function (resolve, reject) {
    API.post(url, fd)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function getVillages(id) {
  let url = `/villages/${id}`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
