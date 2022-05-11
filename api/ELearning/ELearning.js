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
  
  export async function getSingleCourseComments(id) {
      let url = `/me${rootUrl}/${id}/comments`;
      return new Promise(async function (resolve, reject) {
        API.get(url)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            console.log("API ERROR: getting course comments failed", err.response.data);
            reject(err);
          });
      });
  }


  export async function commentCourse(courseId, formdata) {
      let url = `/me${rootUrl}/${courseId}/rating`;
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
  

  
  
  
    /** Cart */
    
    export async function addToCart(id) {
        let url = `/me${rootUrl}/${id}/cart`;
      
        return new Promise(async function (resolve) {
          API.get(url)
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
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
      
    
    export async function getLessonExam(courseId, lessonId) {
        let url = `/me${rootUrl}/${courseId}/lessons/${lessonId}/exam`;
      
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
  
export async function getVideoComments(courseId, lessonId, videoId) {
    let url = `/me${rootUrl}/${courseId}/lessons/${lessonId}/videos/${videoId}/comment`;
  
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

export async function setVideoWatched(courseId, lessonId, videoId) {
    let url = `/me${rootUrl}/${courseId}/lessons/${lessonId}/videos/${videoId}/watched`;
    return new Promise(async function (resolve, reject) {
      API.get(url)
        .then((res) => {
    console.log(res)
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
  
  // Exam

  export async function answerExam(courseId, lessonId, formdata) {
    let url = `/me${rootUrl}/${courseId}/lessons/${lessonId}/exam`;
    return new Promise(async function (resolve, reject) {
      API.post(url, formdata, {
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then((res) => {
          console.log(res)
          resolve(res);
        })
        .catch((err) => {
          console.log("API ERROR: answering failed", err.response.data);
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

    // Articles

    export async function getArticle(courseId, lessonId, articleId) {
      let url = `/me${rootUrl}/${courseId}/lessons/${lessonId}/articles/${articleId}`;
    
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
    
  
  export async function getArticleComments(courseId, lessonId, articleId) {
      let url = `/me${rootUrl}/${courseId}/lessons/${lessonId}/articles/${articleId}/comment`;
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

  export async function likeUnlikeArticle(courseId, lessonId, articleId) {
    let url = `/me${rootUrl}/${courseId}/lessons/${lessonId}/articles/${articleId}/like`;
  
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

export async function commentArticle(courseId, lessonId, articleId, formdata) {
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

// Stickers

export async function getStickerComments(courseId, lessonId, stickerId) {
  let url = `/me${rootUrl}/${courseId}/lessons/${lessonId}/stickers/${stickerId}/comment`;
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

export async function likeUnlikeSticker(courseId, lessonId, stickerId) {
let url = `/me${rootUrl}/${courseId}/lessons/${lessonId}/stickers/${stickerId}/like`;

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

export async function commentSticker(courseId, lessonId, stickerId, formdata) {
let url = `/me${rootUrl}/${courseId}/lessons/${lessonId}/stickers/${stickerId}/comment`;
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
    console.log("API ERROR: commenting failed", err.response.data);
    reject(err);
  });
});
}









  export async function post(url, formdata) {
  
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

