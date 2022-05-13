import API from "../Api";

export async function getExperts() {
  let url = `/me/experts?no_pagination=1`;

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
export async function getBestExperts(offset = 1) {
  let url = `/me/experts?best_expert=1&page=${offset}`;

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
export async function getExpertASC(type = "full_name", page = 1, dir) {
  let url = `/me/experts?sort_by=${type}&sort_direction=${dir}&no_pagination=1`;

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

export async function expertSearch(searchString) {
  let url = `/me/experts?search=${searchString}`;

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
export async function getByExperienceDomain(id) {
  let url = `/me/experts?experience_domain=${id}&no_pagination=1`;

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

export async function getByExperienceType(id) {
  let url = `/me/experts?experience_type=${id}&no_pagination=1`;
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
