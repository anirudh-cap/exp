import { all } from 'redux-saga/effects';
import { loginFlow, logoutFlow } from './components/pages/Cap/saga';
export default function*() {
  yield all([loginFlow()]);
}
