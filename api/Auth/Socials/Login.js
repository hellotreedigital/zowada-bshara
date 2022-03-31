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
        console.log("API ERROR: signup user failed", err.response.data);
        reject(err);
      });
  });
}
