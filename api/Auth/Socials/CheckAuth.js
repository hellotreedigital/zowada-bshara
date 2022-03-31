import API from "../../Api";

export async function checkAuth(type, formdata) {
  let url = `/auth/${type}/check`;
  console.log(url);
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

export async function googleAuthAndLogin(formdata) {
  console.log(formdata);
  let url = `/auth/google-auth/check`;
  console.log(url);
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

export async function userAuth(type, formdata) {
  let url = `/auth/users/${type}`;

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
export async function expertAuth(type, formdata) {
  let url = `/auth/experts/mobile/${type}`;
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
