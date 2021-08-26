import { deleteCookie, getCookie, setCookie } from './cookies';
import { TSimpleUserInfo } from '../types';

interface RegisterResponse {
  success: boolean,
  accessToken: string,
  "refreshToken": string,
  user: {
    email: string,
    name: string
  }
}

interface RefreshResponse {
  success: boolean,
  accessToken: string,
  refreshToken: string
}

interface UserResponse {
  success: boolean,
  user: {
    email: string,
    name: string
  }
}

interface SimpleResponse {
  success: boolean;
  message: string;
}

function responseParse(response: Response) {
  if (response.ok) {
    return response.json();
  }
  return response.json().then(err => Promise.reject(err));
}

function loginRequest(email: string, password: string): Promise<RegisterResponse> {
  return fetch('https://norma.nomoreparties.space/api/auth/login', {
    method: 'post',
    body: JSON.stringify({
      email,
      password
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(responseParse)
    .then((data: RegisterResponse) => {
      if (data.success) {
        setCookie('token', data.accessToken);
        localStorage.setItem('token', data.refreshToken)
        return data;
      }
      return Promise.reject();
    });
}

function registerRequest(email: string, name: string, password: string): Promise<RegisterResponse> {
  return fetch('https://norma.nomoreparties.space/api/auth/register', {
    method: 'post',
    body: JSON.stringify({
      email,
      password,
      name
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(responseParse)
    .then((data: RegisterResponse) => {
      if (data.success) {
        setCookie('token', data.accessToken);
        localStorage.setItem('token', data.refreshToken)
        return data;
      }
      return Promise.reject()
    })
}

function logoutRequest(): Promise<SimpleResponse> {
  const token = localStorage.getItem('token');
  return fetch('https://norma.nomoreparties.space/api/auth/logout', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      token
    })
  })
    .then(responseParse)
    .then(data => {
      if (data.success) {
        deleteCookie('token');
        localStorage.removeItem('token');
      }
      return data;
    })
}

function tokenRequest(): Promise<RefreshResponse> {
  const token = localStorage.getItem('token');
  return fetch('https://norma.nomoreparties.space/api/auth/token', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      token
    })
  })
    .then(responseParse)
    .then((data: RefreshResponse) => {
      if (data.success) {
        localStorage.setItem('token', data.refreshToken);
        return data;
      }
      return Promise.reject();
    })
}

function userInfoRequest(): Promise<UserResponse> {
  return fetch('https://norma.nomoreparties.space/api/auth/user', {
    method: 'get',
    headers: {
      'Authorization': getCookie('token') as string
    }
  })
    .then(responseParse)
    .then(data => {
      if (data.success) {
        return data;
      }
      return Promise.reject(data);
    })
    .catch(err => {
      if (err.message === 'jwt expired') {
        return tokenRequest()
          .then(data => {
            setCookie('token', data.accessToken);
            localStorage.setItem('token', data.refreshToken)
            return fetch('https://norma.nomoreparties.space/api/auth/user', {
              method: 'get',
              headers: {
                'Authorization': getCookie('token') as string
              }
            })
              .then(responseParse)
          })
      } else {
        return Promise.reject(err);
      }
    })
}

function updateUserInfo(user: TSimpleUserInfo): Promise<UserResponse> {
  return fetch('https://norma.nomoreparties.space/api/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getCookie('token') as string
    },
    body: JSON.stringify(user)
  })
    .then(responseParse)
    .then(data => {
      if (data.success) {
        return data;
      }
      return Promise.reject();
    })
}

function resetPasswordRequest(email: string): Promise<SimpleResponse> {
  return fetch('https://norma.nomoreparties.space/api/password-reset', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      email
    })
  })
    .then(responseParse)
    .then(data => {
      if (data.success) {
        return data;
      }
      return Promise.reject(data);
    })
}

function resetPassword(token: string, password: string) {
  return fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      token,
      password
    })
  })
    .then(responseParse)
    .then(data => {
      if (data.success) {
        return data;
      }
      return Promise.reject(data);
    })
}

export {
  tokenRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
  updateUserInfo,
  userInfoRequest,
  resetPasswordRequest,
  resetPassword
}
