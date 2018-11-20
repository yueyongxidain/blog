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
                        <Menu.Item key="/tools">
                            <Link className="nav-text" to="/tools"> <Icon type="user" />开发常用小工具</Link>
                        </Menu.Item>
                        <Menu.Item key="/demo">
                            <Link className="nav-text" extact to="/demo"><Icon type="video-camera" />前端基础demo</Link>
                        </Menu.Item>
                        <Menu.Item key="/reactQ^A">
                            <Link className="nav-text" to="/reactQ^A"> <Icon type="upload" />react使用碰到的问题</Link>
                        </Menu.Item>
                        <Menu.Item key="/python">
                            <Link className="nav-text" to="/python"><Icon type="user" />python后台demo</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="mincontent" >
                    <Header style={{ background: '#fff', padding: 0 }} >
                        <span>博客建于：{moment("20181119", "YYYYMMDD").fromNow()}</span>
                    </Header>
                    <Content style={{ margin: '24px' }}>
                        <Switch>
                            <Route exact path="/tools" component={PPP} />
                            <Route exact path="/demo" component={III} />
                            <Route exact path="/demo/:id" component={Info} />
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