import API from "../Api";

export async function editImage(formdata) {
  let url = `/me/image`;

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
        console.log("API ERROR: editing image failed", err.response.data);
        reject(err);
      });
  });
}
export async function editUser(formdata) {
  let url = `/me`;

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
        console.log("API ERROR: editing image failed", err.response.data);
        reject(err);
      });
  });
}
