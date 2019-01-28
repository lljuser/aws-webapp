import request from '../util/request';
const domain = "http://demo.cityhouses.net";
export function getUsers() {
  return request(`${domain}/demo/getusers`);
}

export function saveUser(data) {
  return request(`${domain}/demo/saveuser`, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function removeUser(id) {
  return request(`${domain}/demo/removeuser/${id}`);
}
