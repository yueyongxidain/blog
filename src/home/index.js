import React, { Component } from 'react';
import { Route, Switch, Link } from "dva/router";
import { Layout, Menu, Icon, Avatar, } from "antd";
import moment from "moment";
import III from "../left/iii.js";
import Info from "../info/index.js";
import "./index.less";
const { Header, Content, Footer, Sider } = Layout;
class Demo extends Component {
    componentWillMount = () => {
        console.log("开始绘制")
    }
    render() {
        return (
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => { console.log(broken); }}
                    onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                    className="left"
                    style={{ 'min-height': "100vh" }}
                    width={260}
                >
                    <div className="Avatar">
                        <Avatar size={164} style={{ display: "block", margin: " 0 auto" }} src="https://picsum.photos/200/300/?random" />
                    </div>
                    <Menu mode="inline" defaultSelectedKeys={['1']} className="menu">
                        <Menu.Item key="1">
                            <Link className="nav-text" to="/ppp"> <Icon type="user" />nav 1</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link className="nav-text" extact to="/iii"><Icon type="video-camera" />nav 1</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link className="nav-text" to="/iii/a"> <Icon type="upload" />nav 1</Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link className="nav-text" to="/iii/b"><Icon type="user" />nav 1</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} >
                        <span>博客建于：{moment("20181119", "YYYYMMDD").fromNow()}</span>
                    </Header>
                    <Content style={{ margin: '24px'}}>
                        <Switch>
                            <Route exact path="/iii" component={III} />
                            <Route exact  path="/iii/b" component={Info}/>
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        yueyong@liangtou 2018
                    </Footer>
                </Layout>
            </Layout >
        )
    }

}
export default Demo