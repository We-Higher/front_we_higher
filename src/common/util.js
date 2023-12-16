const MY_PORT = process.env.REACT_APP_MY_PORT

let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'localhost') {
  backendHost = `http://localhost:${MY_PORT}`
} else {
  backendHost = `http://localhost:${MY_PORT}`
}

export { MY_PORT }

export const API_BASE_URL = backendHost