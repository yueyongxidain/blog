import { routerRedux } from "dva/router";
import { GET, POST } from "../request/index.js";
// import { getAuthority, setAuthority } from "../authority/index.js";
import { message } from "antd"
export default {
    namespace: "demo",
    state: {
        demodata: [],
        visible: false,
        changedata: {},
        addvisible: false
    },
    effects: {
        //登录
        *findhtmlDemo({ payload }, { call, put }) {
            const { errorCode, data } = yield call(POST, "http://123.207.236.49:8088/findhtmlDemo", payload);
            if (errorCode == "0") {
                yield put({
                    type: "save",
                    payload: {
                        demodata: data
                    }
                })
            }

        },
        *changedemo({ payload }, { call, put }) {
            const { errorCode, data } = yield call(POST, "http://123.207.236.49:8088/changedemo", payload);
            if (errorCode == "0") {
                yield put({
                    type: "save",
                    payload: {
                        visible: false,
                        addvisible: false
                    }
                })
                yield put({
                    type: "findhtmlDemo",
                    payload: {}
                })
            }
        },
        *deletedemo({ payload }, { call, put }) {
            const { errorCode, data } = yield call(POST, "http://123.207.236.49:8088/deletedemo", payload);
            if (errorCode == "0") {
                message.success("删除成功")
                yield put({
                    type: "findhtmlDemo",
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