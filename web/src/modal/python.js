import { GET, POST } from "../request/index.js";
import { message } from "antd"
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
            const { errorCode, data } = yield call(POST, "http://123.207.236.49:8088/findpython", payload);
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
            const { errorCode, data } = yield call(POST, "http://123.207.236.49:8088/changepython", payload);
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
        *deletepython({ payload }, { call, put }) {
            const { errorCode, data } = yield call(POST, "http://123.207.236.49:8088/deletepython", payload);
            if (errorCode == "0") {
                message.success("删除成功")
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