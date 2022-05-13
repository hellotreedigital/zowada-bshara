import API from "../../Api";

export async function authCheckAndLogin(type, formdata) {
  let url = `/auth/users/${type}/check`;

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
export async function logout(formdata) {
  let url = `/auth/logout`;

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
