import API from "../Api";

export async function getOnboardings() {
  let url = `/mobile/onboardings`;

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
