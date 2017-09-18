export function authToken() {
  let token = localStorage.getItem('userToken');
  return token;
}
