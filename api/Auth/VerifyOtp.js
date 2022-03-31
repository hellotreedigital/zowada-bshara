import API from "../Api";
export async function VerifyOTP(formdata, type) {
  let url = `/auth/verify/${type}`;
  console.log(url);
  console.log(formdata);
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
        console.log("API ERROR: Verify otp failed", err.response.data);
        reject(err);
      });
  });
}
