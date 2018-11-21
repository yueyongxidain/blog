import { routerRedux } from "dva/router";
import { GET, POST } from "../request/index.js";
// import { getAuthority, setAuthority } from "../authority/index.js";
import fetch from "dva/fetch";
export default {
    namespace: "python",
    state: {
        demodata:[]
    },
    effects: {
        //登录
        *findpython({ payload }, { call, put }) {
            const { errorCode ,data} = yield call(POST, "/findpython", payload);
            if (errorCode == "0") {
                yield put({
                    type:"save",
                    payload:{
                        demodata:data
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