import React, { Component } from 'react';
// import { routerRedux, Route, Switch, Router, Redirect } from "dva/router";
import { List, Avatar, Icon } from "antd";
import { connect } from 'dva';
class Demo extends Component {
    componentWillMount = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "demo/findhtmlDemo",
            payload: {
                id: this.props.match.params.id
            }
        })
        // console.log("88888888888888888",this.props)
        // const democontent = this.props.demodata.filter(ele => ele.id = this.props.match.params.id)[0]
        // console.log("999999999999999", democontent)
    }

    render() {
        return (
            <div>
                <img src="https://picsum.photos/300/300/?random" style={{ float: "left" }} />
                <font size="4" style={{ display: "inline-block", width: "60%" }}>
                    33333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                    的附属国豆腐干士大夫感到十分个豆腐干岁的法国士大夫告诉对方感到附属国是豆腐干士大夫广泛大使馆士
                    大夫敢死队风格收费的公司风电公司梵蒂冈22222222222
                    </font>


            </div>
        )
    }

}
export default connect(({ demo }) => {
    let { demodata } = demo;
    return {
        demodata,
    }
})(Demo)
