import React, { Component } from 'react';
import { Card, Button } from "antd";
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

    }
    goback = () => {
        this.props.history.goBack();
    }
    render() {
        const { demodata } = this.props;
        console.log(demodata)
        return (
            demodata.map((ele) => {
                return (
                    <div>
                        <Button icon="left" type="dashed" onClick={this.goback}>返回</Button>
                        <Card className="demoinfo">
                            <div className="title">{ele.title}</div>
                            <div className="content" dangerouslySetInnerHTML={{ __html: ele.content }}>
                            </div>
                        </Card>
                    </div>


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
