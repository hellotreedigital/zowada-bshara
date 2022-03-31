import API from "../Api";

export async function requestMailOTP(email) {
  let url = `/auth/request-email-verification/${email}`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log("API ERROR: login user failed", err.response.data);
        reject(err);
      });
  });
}

export async function requestMobileOTP(email) {
  let url = `/auth/request-phone-verification/${email}`;
  console.log(url);
  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log("API ERROR: login user failed", err.response.data);
        reject(err);
      });
  });
}
export async function requestSocialOTP(fb_id, type) {
  let url = `/auth/request-phone-verification/${type}/${fb_id}`;

  return new Promise(async function (resolve, reject) {
    API.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log("API ERROR: Verify otp failed", err.response.data);
        reject(err);
      });
  });
}
