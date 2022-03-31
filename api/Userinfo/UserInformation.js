import API from "../Api";
export async function getUserData() {
  let url = `/me`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log("API ERROR: get user data failed", err.response.data);
        reject(err);
      });
  });
}
