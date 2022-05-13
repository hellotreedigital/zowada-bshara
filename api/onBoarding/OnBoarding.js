import API from "../Api";

export async function getOnboardings() {
  let url = `/mobile/onboardings`;

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
