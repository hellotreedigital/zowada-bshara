import API from "../Api";

export async function editImage(formdata) {
  let url = `/me/image`;

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
        reject(err);
      });
  });
}
export async function otherUser(id) {
  let url = `/user/${id}`;

  return new Promise(async function (resolve, reject) {
    API.get(url, {
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
export async function acceptTerms(formdata) {
  let url = `/me/terms`;

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
export async function getCasesList() {
  let url = `/me/cases?no_pagination=1`;

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
export async function searchCasesList(string) {
  let url = `/me/cases?search=${string}`;

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
export async function getQuestionList() {
  let url = `/me/questions?platform=mobile`;

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

export async function answerQuestion(formdata) {
  let url = `/me/questions/answer`;

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
export async function getAppointments(formdata) {
  let url = `/me/appointments?combined=1`;
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
export async function getClientView(case_id) {
  let url = `/me/case/${case_id}`;

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
export async function getNotifications(page = 1) {
  let url = `/me/notifications?page=${page}`;
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
export async function askCaseQuestion(formdata) {
  let url = `/me/cases/questions`;

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
export async function getCasesQuestions(id) {
  let url = `/me/case/${id}/questions`;
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
export async function getRatings(id) {
  let url = `/ratings/${id}`;
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
export async function getAvailableHours() {
  let url = `/me/availability`;
  return new Promise(async function (resolve, reject) {
    API.post(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function updateWorkingHours(data) {
  let url = `/me/availability`;
  return new Promise(async function (resolve, reject) {
    API.post(url, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function getWithdrawal(formdata) {
  let url = `/me/withdraw/history`;
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

export async function requestWithdrawal(formdata) {
  let url = `/me/withdraw`;
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
