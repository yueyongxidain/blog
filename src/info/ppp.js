import React, { Component } from 'react';
// import { routerRedux, Route, Switch, Router, Redirect } from "dva/router";
import { Tabs, Icon } from "antd";
import { Card } from 'antd';
const TabPane = Tabs.TabPane;
class Demo extends Component {

    render() {
        return (
            <Card>
                <Tabs defaultActiveKey="2"  type="line" size="large" >
                    <TabPane tab={<span><Icon type="android" />Tab 2</span>} key="2">
                        Tab 2
                </TabPane>
                    <TabPane tab={<span><Icon type="android" />Tab 2</span>} key="3">
                        Tab 2
                </TabPane>
                    <TabPane tab={<span><Icon type="android" />Tab 2</span>} key="4">
                        Tab 2
                </TabPane>
                    <TabPane tab={<span><Icon type="android" />Tab 2</span>} key="5">
                        Tab 2
                </TabPane>
                </Tabs>
            </Card>

        )
    }

}
export default Demo
