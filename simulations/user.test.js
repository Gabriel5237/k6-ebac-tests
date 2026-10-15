import { group } from 'k6';
import Login from '../request/login.request.js';
import User from '../request/user.request.js';


const data = {
  usuarioOk: {
    user: "admin@biblioteca.com",
    pass: "admin123"
  }
};


export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '5s', target: 50 },
    { duration: '10s', target: 10 },
    { duration: '5s', target: 0 }

  ],

  thresholds: {
    http_req_duration: ['p(99) < 1000'],
    http_req_failed: ['rate < 0.01'],
    checks: ['rate > 0.99']
  }

}

export default function () {

  let login = new Login()
  let user = new User()

  group('login and get token', () => {
    login.access(data.usuarioOk.user, data.usuarioOk.pass)
  })

  group('list users', () => {
    user.list(login.getToken())
  })

}
