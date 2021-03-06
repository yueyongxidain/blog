import { Modal, Form, Input, Select, Row, Col, Card } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';

// import './style.less';
const FormItem = Form.Item;
const Option = Select.Option;
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
        }
    }
    /**
     * modal取消事件
     */
    modalCancel = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "tool/save",
            payload: {
                addvisible: false
            }
        })
    }

    /**
     * 确认事件
     */
    onOk = () => {
        const { dispatch, form: { validateFields } } = this.props;
        validateFields((error, values) => {
            if (!!error) return;
            dispatch({
                type: "tool/change",
                payload: { ...values }
            })
        })
        const { form: { resetFields } } = this.props;
        resetFields();

    }

    componentWillReceiveProps = (nextProps) => {
        const { form: { resetFields } } = this.props;
        if (this.props.newVisible !== nextProps.newVisible) {
            resetFields();
        }
    }
    render() {
        const { addvisible, form } = this.props;
        let { getFieldDecorator, getFieldsValue } = form;
        return (
            <Modal
                visible={addvisible}
                title={"新增信息"}
                onCancel={this.modalCancel}
                onOk={this.onOk}
                style={{ top: 50 }}
                width="50%"
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
                                    {getFieldDecorator('content', {
                                        rules: [{ required: true, message: '请选择' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colLayout}>
                                <FormItem label={"百度云"}
                                    {...formLayout}
                                >
                                    {getFieldDecorator('baidu', {
                                        rules: [{ required: true, message: '请选择' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...colLayout}>
                                <FormItem label={"私有云"}
                                    {...formLayout}
                                >
                                    {getFieldDecorator('personal', {
                                        rules: [{ required: true, message: '请选择' }],
                                    })(
                                        <Input />
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
export default connect(({ tool }) => {
    let { addvisible } = tool;
    return {
        addvisible,
    }
}
)(Form.create()(Demo));