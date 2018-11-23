import { routerRedux } from "dva/router";
import { GET, POST } from "../request/index.js";
// import { getAuthority, setAuthority } from "../authority/index.js";
import fetch from "dva/fetch";
export default {
    namespace: "python",
    state: {
        demodata: [],
        visible: false,
        changedata: {},
        addvisible: false
    },
    effects: {
        //登录
        *findpython({ payload }, { call, put }) {
            const { errorCode, data } = yield call(POST, "/findpython", payload);
            if (errorCode == "0") {
                yield put({
                    type: "save",
                    payload: {
                        demodata: data
                    }
                })
            }
        },
        *changepython({ payload }, { call, put }) {
            const { errorCode, data } = yield call(POST, "/changepython", payload);
            if (errorCode == "0") {
                yield put({
                    type: "save",
                    payload: {
                        visible: false,
                        addvisible: false
                    }
                })
                yield put({
                    type: "findpython",
                    payload: {}
                })
            }
        },
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state, ...payload
            };
        },
    },
    subscriptions: {

    }
}