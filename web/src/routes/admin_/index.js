import React, { Component } from 'react';
import { Route, Switch, Link } from "dva/router";
import { Layout, Menu, Icon, Avatar, } from "antd";
import moment from "moment";
import Tools from "../tools/index_admin.js";
import Htmldemo from "../htmldemo/index_admin.js";
import Python from "../python/index_admin.js";
import ReactList from "../react/index_admin";
import "./index.less";
import { Card } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: this.props.location.pathname || []
        };
    }
    componentWillMount = () => {
        console.log("212234", this.props)
    }
    componentWillReceiveProps = (nextProps) => {
        console.log("666666666666666666666666666666", this.props.location.pathname)
        //重新定位menu
        if (nextProps.location.pathname != this.props.location.pathname) {
            //定位到了不同菜单下才会重新被选择
            if (nextProps.location.pathname.indexOf(this.props.location.pathname) < 0) {
                this.setState({
                    selectedKeys: [nextProps.location.pathname]
                })
            }
            else if (this.props.location.pathname == "/" || this.props.location.pathname == "/e/admin") {
                this.setState({
                    selectedKeys: [nextProps.location.pathname]
                })
            }
            else {
                this.setState({
                    selectedKeys: [this.props.location.pathname]
                })
            }
        }
    }
    menuclick = ({ item, key, keyPath }) => {
        this.setState({
            keys: [key]
        })
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
                    width={260}
                >
                    <div className="Avatar">
                        <Link extact to="/e/admin"><Avatar size={164} style={{ display: "block", margin: " 0 auto" }} src="https://picsum.photos/200/300/?random" /></Link>
                    </div>
                    <Menu mode="inline" className="menu" selectedKeys={this.state.selectedKeys}>
                        <Menu.Item key="/e/admin/tools">
                            <Link className="nav-text" to="/e/admin/tools"> <Icon type="user" />开发常用小工具</Link>
                        </Menu.Item>
                        <Menu.Item key="/e/admin/demo">
                            <Link className="nav-text" extact to="/e/admin/demo"><Icon type="video-camera" />前端基础demo</Link>
                        </Menu.Item>
                        <Menu.Item key="/e/admin/reactQ^A">
                            <Link className="nav-text" to="/e/admin/reactQ^A"> <Icon type="upload" />react使用碰到的问题</Link>
                        </Menu.Item>
                        <Menu.Item key="/e/admin/python">
                            <Link className="nav-text" to="/e/admin/python"><Icon type="user" />python后台demo</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="mincontent" >
                    <Header style={{ background: '#fff', padding: 0 }} >
                        <div className="header-text"><span>技术栈：React、Antd、Dva</span></div>
                        <div className="header-text"><span>博客建于：{moment("20181119", "YYYYMMDD").fromNow()}</span></div>
                    </Header>
                    <Content style={{ margin: '24px' }}>
                        <Switch>
                            <Route exact path="/e/admin" render={() => {
                                return (
                                    <Card>
                                        <div className="home-link">React：<a href="https://react.docschina.org/" target="view_window">https://react.docschina.org/</a></div>
                                        <div className="home-link">Antd &nbsp;：<a href="https://ant.design" target="view_window">https://ant.design</a></div>
                                        <div className="home-link">Dva &nbsp;&nbsp; ：<a href="https://dvajs.com/guide/" target="view_window">https://dvajs.com/guide/</a></div>
                                        <img />
                                    </Card>
                                )
                            }} />
                            <Route exact path="/e/admin/tools" component={Tools} />
                            <Route exact path="/e/admin/demo" component={Htmldemo} />
                            <Route exact path="/e/admin/reactQ^A" component={ReactList} />
                            <Route exact path="/e/admin/python" component={Python} />
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