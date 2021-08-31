import { all } from "redux-saga/effects";
import { twitterSaga } from "./twitterSaga";

function* rootSaga() {
    yield all([twitterSaga()]);
}

export default rootSaga;
