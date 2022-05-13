import API from "../Api";

export async function postChat(formdata) {
  let url = `/me/chats`;

  return new Promise(async function (resolve, reject) {
    API.post(url, formdata)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function getChats(id) {
  let url = `/me/chats/${id}?platform=mobile`;

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
export async function getChatters() {
  let url = `/me/chats`;

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
