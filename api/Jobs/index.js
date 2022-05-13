import API from "../Api";

export async function createJob(formdata) {
  let url = `/me/jobs`;
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
export async function updateJob(id, formdata) {
  let url = `/me/jobs/${id}`;
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
export async function jobs(size) {
  let url = `/jobs?page_size=${size}`;
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

export async function JobsType(size, id) {
  let url = `/jobs?page_size=${size}&job_type_id=${id}`;

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

export async function searchJobs(searchString) {
  let url = `/jobs?search=${searchString}`;
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

export async function singleJob(id) {
  let url = `/jobs/${id}`;
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
export async function apply(id, formdata) {
  let url = `/me/jobs/${id}/apply`;
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
export async function myPostedJobs() {
  let url = `/me/posted/jobs`;
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

export async function myAppliedJobs() {
  let url = `/me/applied/jobs`;
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
export async function filter(searchString, id, from, to) {
  let url = `/jobs?search=${searchString}&district_id=${id}&from=${from}&to=${to}`;

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
export async function jobApplicant(job_id) {
  let url = `/me/jobs/${job_id}/applicants`;
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

export async function underReview(id) {
  let url = `/me/applications/${id}/review`;
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
export async function rejectApplicant(id) {
  let url = `/me/applications/${id}/reject`;
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
export async function removeJob(job_id,fd) {
  let url = `/me/jobs/${job_id}/delete`;
  return new Promise(async function (resolve, reject) {
    API.post(url,fd)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function closeJob(job_id,fd) {
  let url = `/me/jobs/${job_id}/close`;

  return new Promise(async function (resolve, reject) {
    API.post(url,fd)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function applications(id) {
  let url = `/me/applications/${id}`;

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
export async function promotedJobs() {
  let url = `/jobs/promoted`;
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
