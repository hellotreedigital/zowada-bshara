import API from '../Api';

const rootUrl=`/courses`;

/** Home Page */
/** Get All Home Page Data */
export async function getHomeData() {
    let url = `${rootUrl}/home`;
  
    return new Promise(async function (resolve, reject) {
      API.get(url)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log("API ERROR: getting data failed", err.response.data);
          reject(err);
        });
    });
  }
  
  /** All Courses */
  
  export async function getAllCourses(appendedUrl) {
      let url = `${rootUrl}${appendedUrl}`;
      return new Promise(async function (resolve, reject) {
        API.get(url)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            console.log("API ERROR: getting all courses failed", err.response.data);
            reject(err);
          });
      });
  }
  
  /** My Courses */
  
  export async function getMyCourses() {
      let url = `/me${rootUrl}`;
    
      return new Promise(async function (resolve, reject) {
        API.get(url)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            console.log("API ERROR: getting all courses failed", err.response.data);
            reject(err);
          });
      });
  }


  /** SingleCourse */
  
  export async function getSingleCourse(id) {
      let url = `${rootUrl}/${id}`;
    
      return new Promise(async function (resolve, reject) {
        API.get(url)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            console.log("API ERROR: getting course data failed", err.response.data);
            reject(err);
          });
      });
  }
  
  
  
  
    /** Cart */
    
    export async function addToCart(id) {
        let url = `/me${rootUrl}/${id}/cart`;
      
        return new Promise(async function (resolve, reject) {
          API.get(url)
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              //console.log("API ERROR: adding item to cart failed", err.response.data);
              resolve(err.response.data);
            });
        });
    }
    
    export async function getCart() {
        let url = `/me${rootUrl}/cart`;
      
        return new Promise(async function (resolve, reject) {
          API.get(url)
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              console.log("API ERROR: getting your cart failed", err.response.data);
              reject(err);
            });
        });
    }
  
  export async function buyCourses() {
        let url = `/me${rootUrl}/buy`;
      
        return new Promise(async function (resolve, reject) {
          API.get(url)
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              console.log("API ERROR: purchase failed", err.response.data);
              reject(err);
            });
        });
    }
    
    
    export async function deleteFromCart(id) {
          let url = `/me${rootUrl}/${id}/cart`;
          console.log(url)
        
          return new Promise(async function (resolve, reject) {
            API.delete(url)
              .then((res) => {
                console.log('success')
                resolve(res);
              })
              .catch((err) => {
                console.log("API ERROR: deleting item failed", err.response.data);
                reject(err);
              });
          });
      }


      /** Lesssons */

      export async function getSingleLesson(courseId, lessonId) {
        let url = `/me${rootUrl}/${courseId}/lessons/${lessonId}`;
      
        return new Promise(async function (resolve, reject) {
          API.get(url)
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              console.log("API ERROR: getting lesson data failed", err.response.data);
              reject(err);
            });
        });
    }

    // Stickers

    export async function likeUnlikeSticker(courseId, lessonId, articleId, action) {
      let url = `/me${rootUrl}/${courseId}/lessons/${lessonId}/articles/${articleId}/${action}`;
    
      return new Promise(async function (resolve, reject) {
        API.get(url)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            console.log("API ERROR: rlike/unlike failed", err.response.data);
            reject(err);
          });
      });
  }
    
  export async function commentSticker(courseId, lessonId, articleId, formdata) {
      let url = `/me${rootUrl}/${courseId}/lessons/${lessonId}/articles/${articleId}/comment`;
    
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
            console.log("API ERROR: commenting failed", err.response.data);
            reject(err);
          });
      });
  }
    
  // Videos

  export async function likeUnlikeVideo(courseId, lessonId, videoId, action) {
    let url = `/me${rootUrl}/${courseId}/lessons/${lessonId}/videos/${videoId}/${action}`;
  
    return new Promise(async function (resolve, reject) {
      API.get(url)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log("API ERROR: rlike/unlike failed", err.response.data);
          reject(err);
        });
    });
}

  export async function commentVideo(courseId, lessonId, videoId, formdata) {
      let url = `/me${rootUrl}/${courseId}/lessons/${lessonId}/videos/${videoId}/comment`;
    
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
            console.log("API ERROR: commenting failed", err.response.data);
            reject(err);
          });
      });
  }
  
  // Case Study
  
  
    export async function getCaseStudy(courseId, lessonId, casestudyId) {
      let url = `/me${rootUrl}/${courseId}/lessons/${lessonId}/casestudy/${casestudyId}`;
    
      return new Promise(async function (resolve, reject) {
        API.get(url)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            console.log("API ERROR: getting case study failed", err.response.data);
            reject(err);
          });
      });
  }
  
    export async function answerCaseStudy(courseId, lessonId, casestudyId, formdata) {
        let url = `/me${rootUrl}/${courseId}/lessons/${lessonId}/casestudy/${casestudyId}/answer`;
      
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
              console.log("API ERROR: aswering failed", err.response.data);
              reject(err);
            });
        });
    }













  export async function post(url, formdata) {
    //let url = `/me`;
  
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

