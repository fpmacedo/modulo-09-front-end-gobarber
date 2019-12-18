import { all, takeLatest, call, put } from 'redux-saga/effects';

import history from '~/services/history';
import api from '~/services/api';

import { singInSuccess } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  const response = yield call(api.post, 'sessions', { email, password });

  const { token, user } = response.data;

  // console.tron.log(response.data);

  if (!user.provider) {
    console.tron.error('Usuario nao e prestador');
  }

  yield put(singInSuccess(token, user));

  history.push('/dashboard');
}
export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
