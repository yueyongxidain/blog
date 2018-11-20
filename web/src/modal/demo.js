import { routerRedux } from "dva/router";
import { GET, POST } from "../request/index.js";
// import { getAuthority, setAuthority } from "../authority/index.js";
import fetch from "dva/fetch";
export default {
    namespace: "demo",
    state: {
        demodata:[]
    },
    effects: {
        //登录
        *findhtmlDemo({ payload }, { call, put }) {
            const { errorCode ,data} = yield call(POST, "/findhtmlDemo", payload);
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