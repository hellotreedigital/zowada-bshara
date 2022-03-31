import API from "../Api";

export async function signUpUser(formdata) {
  let url = "/auth/users/signup";

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

export async function expertSignUp(formdata) {
  let url = "/auth/experts/mobile/signup";

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
