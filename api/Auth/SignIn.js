import API from "../Api";

export async function signInUser(formdata) {
	let url = "/auth/mobile/login";

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
				console.log("API ERROR: login user failed", err.response.data);
				reject(err);
			});
	});
}
