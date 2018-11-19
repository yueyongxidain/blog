import React, { Component } from 'react';
import { Link } from "dva/router";
import { List, Avatar, Icon } from "antd";
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

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);
class Demo extends Component {

    render() {
        return (
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={listData}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                        extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<Link to={item.href}>{item.title}</Link>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        )
    }

}
export default Demo
