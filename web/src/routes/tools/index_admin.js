import React, { Component } from 'react';
import { Button } from "antd";
import { Card, Table, Divider } from 'antd';
import { connect } from 'dva';
import Modal from "./modal_admin";
import AddModal from "./modal_add_admin.js";
import "./index.less";
let page = null;
const columns = [{
    title: '数据编号',
    dataIndex: 'id',
    key: 'id'
}, {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
}, {
    title: '百度云',
    dataIndex: 'baidu',
    key: 'baidu',
    width:280
}, {
    title: '私有云',
    key: 'personal',
    dataIndex: 'personal',
    width:280
}, {
    title: '操作',
    key: 'action',
    render: (record) => (
        <span>
            <a href="javascript:;" onClick={() => page.change(record)}>修改</a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={() => page.delete(record.id)}>删除</a>
        </span>
    ),
}];
class Demo extends Component {
    componentWillMount = () => {
        page = this;
        const { dispatch } = this.props;
        dispatch({
            type: "tool/findtool",
            payload: {}
        })
    }
    //修改点击事件
    change = (record) => {
        const { dispatch } = this.props;
        dispatch({
            type: "tool/save",
            payload: {
                visible: true,
                changedata: record
            }
        })
    }
    //新增点击事件
    add = ()=>{
        const { dispatch } = this.props;
        dispatch({
            type: "tool/save",
            payload: {
                addvisible: true,
            }
        })
    }
    //删除
    delete = (id)=>{
        const { dispatch } = this.props;
        dispatch({
            type: "tool/deletetool",
            payload: {
                id: id,
            }
        })
    }
    render() {
        return (
            <Card style={{ "min-height": "70vh" }}>
                <Button type="primary" icon="plus" style={{"margin-bottom":"16px"}} onClick={this.add}>新增</Button>
                <Table
                    columns={columns}
                    bordered={true}
                    dataSource={this.props.tooldata}
                    pagination={{ pageSize: 5 }}
                />
                <Modal />
                <AddModal />
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
