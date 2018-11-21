import React, { Component } from 'react';
import { Link } from "dva/router";
import { List, Avatar, Card } from "antd";
import { connect } from 'dva';
const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];
class Demo extends Component {
    componentWillMount = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "react/findreact",
            payload: {}
        })
    }

    render() {
        const {reactdata} = this.props;
        return (
            <Card>
                <List
                    itemLayout="horizontal"
                    dataSource={reactdata}
                    renderItem={item => (
                        <List.Item
                        actions={[<span>{`创建时间：${item.createtime}`}</span>]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<Link to={`/reactQ^A/${item.id}`}>{item.title}</Link>}
                                // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
            </Card>

        )
    }

}
export default connect(({ react }) => {
    let { reactdata } = react;
    return {
        reactdata,
    }
})(Demo)