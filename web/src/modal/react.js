import { routerRedux } from "dva/router";
import { GET, POST } from "../request/index.js";
import {message} from "antd";
export default {
    namespace: "react",
    state: {
        reactdata: [],
        visible: false,
        changedata: {},
        addvisible: false
    },
    effects: {
        //登录
        *findreact({ payload }, { call, put }) {
            const { errorCode, data } = yield call(POST, "http://123.207.236.49:8088/findreact", payload);
            if (errorCode == "0") {
                yield put({
                    type: "save",
                    payload: {
                        reactdata: data
                    }
                })
            }

        },
        *changereact({ payload }, { call, put }) {
            const { errorCode, data } = yield call(POST, "http://123.207.236.49:8088/changereact", payload);
            if (errorCode == "0") {
                yield put({
                    type: "save",
                    payload: {
                        visible: false,
                        addvisible: false
                    }
                })
                yield put({
                    type: "findreact",
                    payload: {}
                })
            }
        },
        *deletereact({ payload }, { call, put }) {
            const { errorCode, data } = yield call(POST, "http://123.207.236.49:8088/deletereact", payload);
            if (errorCode == "0") {
                message.success("删除成功")
                yield put({
                    type: "findreact",
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