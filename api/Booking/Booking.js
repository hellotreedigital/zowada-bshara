import API from "../Api";

export async function getUnavailableDays(id) {
  let url = `/experts/${id}/unavailable-days`;

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

export async function getAvailableHours(date, interval = 60, id) {
  let url = `/experts/${id}/available-intervals/${date}?interval=${interval}`;

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
export async function validateNewCase(formdata) {
  let url = `/me/case/open/validate`;
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
export async function bookNewCase(formdata) {
  let url = `/me/case/open`;

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

export async function reopenCase(formdata) {
  let url = `/me/case/reopen`;

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

export async function rateNewCase(formdata) {
  let url = `/me/case/rate`;

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

export async function askNormalQuestion(formdata) {
  let url = `/me/questions`;

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
export async function getQuestions() {
  let url = `/me/questions`;

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
