import API from "../Api";

export async function getAllFundings() {
  let url = `/crowdfunding`;
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
export async function getFundingsById(id) {
  let url = `/crowdfunding/${id}`;
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
export async function validatePersonalFunding(formdata) {
  let url = `/me/crowdfunding/personal/validate`;
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
export async function addFunding(formdata) {
  let url = `/me/crowdfunding`;
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
export async function searchFundings(searchString) {
  let url = `/crowdfunding?search=${searchString}`;

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
export async function filterFundings(type, id) {
  let url = `/crowdfunding?${type}=${id}`;
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
export async function donateFunding(id, formdata) {
  let url = `/crowdfunding/${id}/donate`;
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
export async function validateDonateFunding(id, formdata) {
  let url = `/crowdfunding/${id}/donate/validation`;
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
export async function updateFunding(id, formdata) {
  let url = `/me/crowdfunding/${id}`;

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

export async function userFundings() {
  let url = `/me/crowdfunding`;
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
export async function removeFunding(id) {
  let url = `/me/crowdfunding/${id}/delete`;
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

export async function editFundingData(id) {
  let url = `/me/crowdfunding/${id}/edit`;
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
