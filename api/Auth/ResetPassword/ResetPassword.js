import API from "../../Api";

export async function requestOTP(formdata) {
  let url = `/auth/forgot-password`;

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
        console.log(
          "API ERROR: requesting reset pass otp failed",
          err.response.data
        );
        reject(err);
      });
  });
}
export async function verifyOTP(formdata) {
  let url = `/auth/forgot-password/token-check`;

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
        console.log("API ERROR: Verifying otp has failed", err.response.data);
        reject(err);
      });
  });
}
export async function resetPassword(formdata) {
  let url = `/auth/reset-password`;

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
        console.log("API ERROR: reset password failed", err.response.data);
        reject(err);
      });
  });
}
