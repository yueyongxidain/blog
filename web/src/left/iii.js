import React, { Component } from 'react';
import { Link } from "dva/router";
import { List, Avatar, Icon,Card } from "antd";
import { connect } from 'dva';
let listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: '/iii/a',
        title: `ant design part ${i}`,
        avatar: 'https://picsum.photos/300/300/?random',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'iiidesign resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

class Demo extends Component {
    componentWillMount = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "demo/findhtmlDemo",
            payload: {}
        })
    }

    render() {
        return (
            <Card>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={this.props.demodata}
                    renderItem={item => (
                        <List.Item
                            key={item.id}
                            actions={[<span>{`创建时间：${item.createtime}`}</span>]}
                            extra={<img width={272} alt="logo" src={item.img}/>}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src='https://picsum.photos/300/300/?random' />}
                                title={<Link to={`/demo/${item.id}`}>{item.title}</Link>}
                            />
                            {item.descript}
                        </List.Item>
                    )}
                />
            </Card>

        )
    }

}
export default connect(({ demo }) => {
    let { demodata } = demo;
    return {
        demodata,
    }
})(Demo)