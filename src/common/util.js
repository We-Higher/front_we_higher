const MY_PORT = process.env.REACT_APP_MY_PORT

let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'localhost') {
  backendHost = `http://localhost:${MY_PORT}`
} else {
  backendHost = `http://localhost:${MY_PORT}`
}

export function formatFullDate(date) {
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  var hour = ("0" + date.getHours()).slice(-2);
  var minute = ("0" + date.getMinutes()).slice(-2);
  var second = ("0" + date.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export { MY_PORT }

export const API_BASE_URL = backendHost