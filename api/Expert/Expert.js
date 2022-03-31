import API from "../Api";

export async function getExperts() {
  let url = `/experts`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log("API ERROR: reset password failed", err.response.data);
        reject(err);
      });
  });
}
export async function getBestExperts(offset = 1) {
  let url = `/experts?best_expert=1&page=${offset}`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log("API ERROR: reset password failed", err.response.data);
        reject(err);
      });
  });
}
export async function getExpertASC(type = "full_name", page = 1, dir) {
  let url = `/experts?best_expert=1&sort_by=${type}&sort_direction=${dir}&page=${page}`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log("API ERROR: sorintg A-Z failed", err.response.data);
        reject(err);
      });
  });
}

export async function expertSearch(searchString) {
  let url = `/experts?best_expert=1&search=${searchString}`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log("API ERROR: sorintg A-Z failed", err.response.data);
        reject(err);
      });
  });
}
