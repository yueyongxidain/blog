import React, { Component } from 'react';
// import { routerRedux, Route, Switch, Router, Redirect } from "dva/router";
import { Card } from "antd";
import { connect } from 'dva';
import "./index.less";
class Demo extends Component {
    componentWillMount = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "python/findpython",
            payload: {
                id: this.props.match.params.id
            }
        })
        // console.log("88888888888888888",this.props)
        // const democontent = this.props.demodata.filter(ele => ele.id = this.props.match.params.id)[0]
        // console.log("999999999999999", democontent)
    }

    render() {
        const { demodata } = this.props;
        console.log(demodata)
        return (
            demodata.map((ele) => {
                return (
                    <Card className="demoinfo">
                        <div className="title">{ele.title}</div>
                        {/* <img width={272} heigth={170} alt="logo" src={ele.img} style={{ float: "left" }} /> */}
                        {/* <img src="https://picsum.photos/300/300/?random" style={{ float: "left" }} /> */}
                        <div className="content" dangerouslySetInnerHTML={{ __html: ele.content }}>
                            {/* {ele.content} */}
                        </div>
                    </Card>

                )
            })
        )
    }

}
export default connect(({ python }) => {
    let { demodata } = python;
    return {
        demodata,
    }
})(Demo)
