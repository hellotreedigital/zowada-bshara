import API from "../Api";

export async function requestMailOTP(email) {
  let url = `/auth/request-email-verification/${email}`;

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

export async function requestMobileOTP(email) {
  let url = `/auth/request-phone-verification/${email}`;
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
export async function requestSocialOTP(fb_id, type) {
  let url = `/auth/request-phone-verification/${type}/${fb_id}`;

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
