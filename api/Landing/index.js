import API from "../Api";
export async function getLandingData() {
  let url = `/mobile/landing`;
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
export async function searchLanding(searchString) {
  let url = `/mobile/landing/${searchString}`;
  console.log(url)
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
