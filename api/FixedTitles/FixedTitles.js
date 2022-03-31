import API from "../Api";

export async function getFixedTitles() {
  let url = `/mobile/global`;

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
