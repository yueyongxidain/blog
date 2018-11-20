import { routerRedux } from "dva/router";
import { GET, POST } from "../request/index.js";
// import { getAuthority, setAuthority } from "../authority/index.js";
import fetch from "dva/fetch";
export default {
    namespace: "tool",
    state: {
        tooldata:[]
    },
    effects: {
        *findtool({ payload }, { call, put }) {
            const { errorCode ,data} = yield call(POST, "/findtool", payload);
            if (errorCode == "0") {
                yield put({
                    type:"save",
                    payload:{
                        tooldata:data
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