import { routerRedux } from "dva/router";
import { GET, POST } from "../request/index.js";
import { message } from "antd"
export default {
    namespace: "tool",
    state: {
        tooldata: [],
        visible: false,
        changedata: {},
        addvisible: false
    },
    effects: {
        *findtool({ payload }, { call, put }) {
            const { errorCode, data } = yield call(POST, "/findtool", payload);
            if (errorCode == "0") {
                yield put({
                    type: "save",
                    payload: {
                        tooldata: data
                    }
                })
            }
        },
        *change({ payload }, { call, put }) {
            const { errorCode, data } = yield call(POST, "/changetool", payload);
            if (errorCode == "0") {
                yield put({
                    type: "save",
                    payload: {
                        visible: false,
                        addvisible: false
                    }
                })
                yield put({
                    type: "findtool",
                    payload: {}
                })
            }
        },
        *deletetool({ payload }, { call, put }) {
            const { errorCode, data } = yield call(POST, "/deletetool", payload);
            if (errorCode == "0") {
                message.success("删除成功")
                yield put({
                    type: "findtool",
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