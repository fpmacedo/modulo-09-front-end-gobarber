import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';

import { singInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', { email, password });

    const { token, user } = response.data;

    // console.tron.log(response.data);

    if (!user.provider) {
      toast.error('Usuario nao e prestador');
    }

    yield put(singInSuccess(token, user));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Falha na autenticacao, veirifique seus dados');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    history.push('/');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados!');

    yield put(signFailure());
  }
}
export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
