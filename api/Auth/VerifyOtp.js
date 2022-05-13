import API from "../Api";
export async function VerifyOTP(formdata, type) {
  let url = `/auth/verify/${type}`;
  return new Promise(async function (resolve, reject) {
    API.post(url, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
