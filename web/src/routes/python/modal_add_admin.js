import { Modal, Form, Input, Row, Col, Card } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import Ume from "../ume/index.js";
const FormItem = Form.Item;
const colLayout = {
    md: 24,
    lg: 12,
}
const formLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
        md: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
        md: { span: 16 },
    },
}
class Demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Umevalue: "123",
            inti: "请输入"
        }
    }
    /**
     * modal取消事件
     */
    modalCancel = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "python/save",
            payload: {
                addvisible: false
            }
        })
    }

    /**
     * 确认事件
     */
    onOk = () => {
        const { dispatch, form: { validateFields, setFieldsValue } } = this.props;
        setFieldsValue({ content: this.state.Umevalue })
        validateFields((error, values) => {
            if (!!error) return;
            dispatch({
                type: "python/changepython",
                payload: { ...values }
            })
        })
        const { form: { resetFields } } = this.props;
        resetFields();
    }
    valuechange = (content) => {
        this.setState({ Umevalue: content })
    }
    render() {
        const { addvisible, form } = this.props;
        let { getFieldDecorator } = form;
        return (
            <Modal
                visible={addvisible}
                title={"新增信息"}
                onCancel={this.modalCancel}
                onOk={this.onOk}
                style={{ top: 50 }}
                width="60%"
                maskClosable={false}
            >
                <Card className="contract hover-shadow" style={{ width: '100%' }} headStyle={{ height: 20 }}>
                    <Form className="userModal-content">

                        <Row gutter={16}>
                            <Col {...colLayout}>
                                <FormItem label={"标题"}
                                    {...formLayout}
                                >
                                    {getFieldDecorator('title', {
                                        rules: [{ required: true, message: '请选择' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colLayout}>
                                <FormItem label={"介绍"}
                                    {...formLayout}
                                >
                                    {getFieldDecorator('descript', {
                                        rules: [{ required: true, message: '请选择' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col  {...colLayout} {...{ md: 24, lg: 24 }} >
                                <FormItem label={"文章内容"}
                                    {...{
                                        labelCol: {
                                            xs: { span: 24 },
                                            sm: { span: 5 },
                                            md: { span: 4 },
                                        },
                                        wrapperCol: {
                                            xs: { span: 20 },
                                            sm: { span: 20 },
                                            md: { span: 20 },
                                        }
                                    }}
                                >
                                    {getFieldDecorator('content', {
                                        rules: [{ required: true, message: '请选择' }],
                                    })(
                                        <Ume valuechange={this.valuechange} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Modal>
        );
    }
}
export default connect(({ python }) => {
    let { addvisible } = python;
    return {
        addvisible,
    }
}
)(Form.create()(Demo));