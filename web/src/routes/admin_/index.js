import React, { Component } from 'react';
import { Route, Switch, Link } from "dva/router";
import { Layout, Menu, Icon, Avatar, } from "antd";
import moment from "moment";
import Tools from "../tools/index_admin.js";
import Htmldemo from "../htmldemo/index.js";
import Htmlinfo from "../htmldemo/demoinfo.js";
import ReactList from "../react/index.js";
import Ume from "../ume/index.js";
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
        console.log("212234", this.props)
    }
    componentWillReceiveProps = (nextProps) => {
        //重新定位menu
        if (nextProps.location.pathname != this.props.location.pathname) {
            //定位到了不同菜单下才会重新被选择
            if (nextProps.location.pathname.indexOf(this.props.location.pathname) < 0) {
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
                        <Avatar size={164} style={{ display: "block", margin: " 0 auto" }} src="https://picsum.photos/200/300/?random" />
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
                        <span>博客建于：{moment("20181119", "YYYYMMDD").fromNow()}</span>
                    </Header>
                    <Content style={{ margin: '24px' }}>
                    <Ume />
                        <Switch>
                            <Route exact path="/e/admin/tools" component={Tools} />
                            <Route exact path="/demo" component={Htmldemo} />
                            <Route exact path="/demo/:id" component={Htmlinfo} />
                            <Route exact path="/reactQ^A" component={ReactList} />
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