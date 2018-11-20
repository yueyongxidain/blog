import React, { Component } from 'react';
import { Route, Switch, Link } from "dva/router";
import { Layout, Menu, Icon, Avatar, } from "antd";
import moment from "moment";
import III from "../left/iii.js";
import Info from "../info/index.js";
import PPP from "../info/ppp.js";
import "./index.less";
const { Header, Content, Footer, Sider } = Layout;
class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: this.props.location.pathname || []
        };
    }
    componentWillMount = () => {
        console.log("开始绘制", this.props)
    }
    componentWillReceiveProps = (nextProps) => {
        //重新定位menu
        if (nextProps.location.pathname != this.props.location.pathname) {
            //定位到了不同菜单下才会重新被选择
            if (this.props.location.pathname.indexOf(nextProps.location.pathname) <= -1) {
                this.setState({
                    selectedKeys: [nextProps.location.pathname]
                })
            }

        }
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
                    <Menu mode="inline" className="menu" selectedKeys={this.state.selectedKeys}>
                        <Menu.Item key="/ppp">
                            <Link className="nav-text" to="/ppp"> <Icon type="user" />nav 1</Link>
                        </Menu.Item>
                        <Menu.Item key="/iii">
                            <Link className="nav-text" extact to="/iii"><Icon type="video-camera" />nav 1</Link>
                        </Menu.Item>
                        <Menu.Item key="/iii/a">
                            <Link className="nav-text" to="/iii/a"> <Icon type="upload" />nav 1</Link>
                        </Menu.Item>
                        <Menu.Item key="/iii/b">
                            <Link className="nav-text" to="/iii/b"><Icon type="user" />nav 1</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} >
                        <span>博客建于：{moment("20181119", "YYYYMMDD").fromNow()}</span>
                    </Header>
                    <Content style={{ margin: '24px' }}>
                        <Switch>
                            <Route exact path="/iii" component={III} />
                            <Route exact path="/iii/b" component={Info} />
                            <Route exact path="/ppp" component={PPP} />
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