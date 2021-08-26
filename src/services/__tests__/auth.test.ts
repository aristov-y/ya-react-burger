import store from '../store';
import {
  setUser, getUserAction, logoutAction, updateUserAction,
  loginAction
} from '../auth';
import { loginRequest,
  logoutRequest,
  registerRequest,
  resetPasswordRequest,
  updateUserInfo,
  userInfoRequest } from '../../utils/auth';

const mockLoginRequest = (loginRequest as jest.Mock);
const mockLogoutRequest = (logoutRequest as jest.Mock);
const mockRegisterRequest = (registerRequest as jest.Mock);
const mockResetPasswordRequest = (resetPasswordRequest as jest.Mock);
const mockUpdateUserInfo = (updateUserInfo as jest.Mock);
const mockUserInfoRequest = (userInfoRequest as jest.Mock);

jest.mock('../../utils/auth', () => ({
  loginRequest: jest.fn(),
  logoutRequest: jest.fn(),
  registerRequest: jest.fn(),
  resetPasswordRequest: jest.fn(),
  updateUserInfo: jest.fn(),
  userInfoRequest: jest.fn()
}));

type StoreType = typeof store;

function testInitialUser(store: StoreType) {
  const state = store.getState().auth;
  const oldUser = state.user;
  expect(oldUser.name).toBeFalsy();
  expect(oldUser.email).toBeFalsy();
}

function testNewUser(store, expectedName, expectedEmail) {
  const state = store.getState().auth;
  const newUser = state.user;
  expect(newUser.name).toBe(expectedName);
  expect(newUser.email).toBe(expectedEmail);
}

function testFail(store) {
  const state = store.getState().auth;
  const oldUser = state.user;
  expect(oldUser.name).toBeFalsy();
  expect(oldUser.email).toBeFalsy();
  expect(state.error).toBeTruthy();
}

beforeEach(() => {
  store.dispatch(setUser({
    name: '',
    email: ''
  }))
});

describe('Auth slice', () => {
  it('should setUser', () => {

    testInitialUser(store);

    store.dispatch(setUser({ name: "UserName", email: "email" }));

    testNewUser(store, "UserName", "email");
  });
  it('should get User Info', async () => {
    mockUserInfoRequest.mockImplementation(() => Promise.resolve({
      user: {
        name: "User",
        email: "user@mail.com"
      }
    }));

    testInitialUser(store);

    await store.dispatch(getUserAction());

    testNewUser(store, "User", "user@mail.com");
  });
  it('should fail get User Info', async () => {
    mockUserInfoRequest.mockImplementation(() => Promise.reject());

    testInitialUser(store);

    await store.dispatch(getUserAction());

    testFail(store);
  });
  it('should login and logout', async () => {
    mockLoginRequest.mockImplementation(() => Promise.resolve({
      user: {
        name: "User",
        email: "user@mail.com"
      }
    }));
    mockLogoutRequest.mockImplementation(() => Promise.resolve());

    testInitialUser(store);

    await store.dispatch(loginAction({email: "user", password: "pass" }));

    testNewUser(store, "User", "user@mail.com");

    await store.dispatch(logoutAction());

    testNewUser(store, "", "");
  });
  it('should update user', async () => {
    mockUpdateUserInfo.mockImplementation(() => Promise.resolve({
      user: {
        name: "UserNew",
        email: "user_new@mail.com"
      }
    }));

    store.dispatch(setUser({ name: "UserName", email: "email" }));
    testNewUser(store, "UserName", "email");

    await store.dispatch(updateUserAction({
      name: 'UserNew',
      email: 'user_new@mail.com'
    }));

    testNewUser(store, "UserNew", "user_new@mail.com");
  });
});
