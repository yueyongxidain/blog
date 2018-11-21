import { routerRedux } from "dva/router";
import { GET, POST } from "../request/index.js";
// import { getAuthority, setAuthority } from "../authority/index.js";
import fetch from "dva/fetch";
export default {
    namespace: "react",
    state: {
        reactdata:[]
    },
    effects: {
        //登录
        *findreact({ payload }, { call, put }) {
            const { errorCode ,data} = yield call(POST, "/findreact", payload);
            if (errorCode == "0") {
                yield put({
                    type:"save",
                    payload:{
                        reactdata:data
                    }
                })
            }
           
        }
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