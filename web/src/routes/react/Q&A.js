import React, { Component } from 'react';
// import { routerRedux, Route, Switch, Router, Redirect } from "dva/router";
import { Card, Button } from "antd";
import { connect } from 'dva';
import "./index.less";
class Demo extends Component {
    componentWillMount = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "react/findreact",
            payload: {
                id: this.props.match.params.id
            }
        })
    }
    goback = () => {
        if (!!this.props.history)
            this.props.history.goBack();
    }
    render() {
        const { reactdata } = this.props;
        // console.log(demodata)
        return (
            reactdata.map((ele) => {
                return (
                    <div>
                        <Button icon="left" type="dashed" onClick={this.goback}>返回</Button>

                        <Card className="demoinfo">
                            <div className="title">{ele.title}</div>
                            {/* <img width={272} heigth={170} alt="logo" src={ele.img} style={{ float: "left" }} /> */}
                            {/* <img src="https://picsum.photos/300/300/?random" style={{ float: "left" }} /> */}
                            <div className="content" dangerouslySetInnerHTML={{ __html: ele.content }}>
                                {/* {ele.content} */}
                            </div>
                        </Card>
                    </div>


                )
            })
        )
    }

}
export default connect(({ react }) => {
    let { reactdata } = react;
    return {
        reactdata,
    }
})(Demo)
