import React, { Component } from 'react';
// import { routerRedux, Route, Switch, Router, Redirect } from "dva/router";
import { Tabs, Icon } from "antd";
import { Card } from 'antd';
import { connect } from 'dva';
import "./index.less";
const TabPane = Tabs.TabPane;
class Demo extends Component {
    componentWillMount = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "tool/findtool",
            payload: {}
        })
    }
    render() {
        return (
            <Card style={{ "min-height": "70vh" }}>
                <Tabs defaultActiveKey="1" type="line" size="large" >
                    {this.props.tooldata.map((ele) => {
                        return (
                            <TabPane tab={<span><Icon type="tool" />{ele.title}</span>} key={ele.id}>
                                <div className="content-title"><font >工具介绍:</font></div>
                                <div className="content-content">{ele.content}</div>
                                <div className="content-title"><font>云盘链接:</font></div>
                                <Tabs defaultActiveKey={`${ele.id}-1`} type="line" size="large" tabPosition="left" >
                                    <TabPane tab={<span><Icon type="android" />百度云</span>} key={`${ele.id}-1`}>
                                        <div className="a_link">
                                            <a href={ele.baidu} target="view_window">{ele.baidu}</a>
                                        </div>
                                    </TabPane>
                                    <TabPane tab={<span><Icon type="android" />私有云</span>} key={`${ele.id}-2`}>
                                        <div className="a_link">
                                            <a href={ele.personal} target="view_window">{ele.personal}</a>
                                        </div>
                                    </TabPane>
                                </Tabs>
                            </TabPane>
                        )
                    })}
                </Tabs>
            </Card>
        )
    }

}
export default connect(({ tool }) => {
    let { tooldata } = tool;
    return {
        tooldata,
    }
})(Demo)
