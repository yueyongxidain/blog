// import { Modal, Form, Input, Select, Row, Col, Card } from 'antd';
// import React, { Component } from 'react';
// import { connect } from 'dva';
// import Ume from "../ume/index.js";
// // import './style.less';
// const FormItem = Form.Item;
// const Option = Select.Option;
// const colLayout = {
//     md: 24,
//     lg: 12,
// }
// const formLayout = {
//     labelCol: {
//         xs: { span: 24 },
//         sm: { span: 10 },
//         md: { span: 8 },
//     },
//     wrapperCol: {
//         xs: { span: 24 },
//         sm: { span: 14 },
//         md: { span: 16 },
//     },
// }
// class Demo extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//         }
//     }
//     /**
//      * modal取消事件
//      */
//     modalCancel = () => {
//         const { dispatch } = this.props;
//         dispatch({
//             type: "demo/save",
//             payload: {
//                 visible: false
//             }
//         })
//     }

//     /**
//      * 确认事件
//      */
//     onOk = () => {
//         const { dispatch, form: { validateFields } } = this.props;
//         validateFields((error, values) => {
//             if (!!error) return;
//             dispatch({
//                 type: "demo/change",
//                 payload: { ...values }
//             })
//         })
//         const { form: { resetFields } } = this.props;
//         resetFields();
//     }



//     componentWillReceiveProps = (nextProps) => {
//         const { form: { resetFields } } = this.props;
//         if (this.props.newVisible !== nextProps.newVisible) {
//             resetFields();
//         }
//     }

//     render() {
//         const { visible, form, changedata } = this.props;
//         let { getFieldDecorator } = form;
//         console.log("changedata.id", changedata)
//         return (
//             <Modal
//                 visible={visible}
//                 title={"信息修改"}
//                 onCancel={this.modalCancel}
//                 onOk={this.onOk}
//                 style={{ top: 50 }}
//                 width="60%"
//                 maskClosable={false}
//             >
//                 <Card className="contract hover-shadow" style={{ width: '100%' }} headStyle={{ height: 20 }}>
//                     {/* <Form className="userModal-content">

//                         <Row gutter={16}>
//                             <Col {...colLayout}>
//                                 <FormItem label={"id"}
//                                     {...formLayout}
//                                 >
//                                     {getFieldDecorator('id', {
//                                         rules: [{ required: true, message: '请选择' }],
//                                         initialValue: changedata.id
//                                     })(
//                                         <Input disabled />
//                                     )}
//                                 </FormItem>
//                             </Col>
//                             <Col {...colLayout}>
//                                 <FormItem label={"标题"}
//                                     {...formLayout}
//                                 >
//                                     {getFieldDecorator('title', {
//                                         rules: [{ required: true, message: '请选择' }],
//                                         initialValue: changedata.title
//                                     })(
//                                         <Input  />
//                                     )}
//                                 </FormItem>
//                             </Col>
//                             <Col {...colLayout}>
//                                 <FormItem label={"介绍"}
//                                     {...formLayout}
//                                 >
//                                     {getFieldDecorator('content', {
//                                         rules: [{ required: true, message: '请选择' }],
//                                         initialValue: changedata.content
//                                     })(
//                                         <Input  />
//                                     )}
//                                 </FormItem>
//                             </Col>
//                             <Col {...colLayout}>
//                                 <FormItem label={"百度云"}
//                                     {...formLayout}
//                                 >
//                                     {getFieldDecorator('baidu', {
//                                         rules: [{ required: true, message: '请选择' }],
//                                         initialValue: changedata.baidu
//                                     })(
//                                         <Input  />
//                                     )}
//                                 </FormItem>
//                             </Col>
//                             <Col {...colLayout}>
//                                 <FormItem label={"私有云"}
//                                     {...formLayout}
//                                 >
//                                     {getFieldDecorator('personal', {
//                                         rules: [{ required: true, message: '请选择' }],
//                                         initialValue: changedata.personal
//                                     })(
//                                         <Input />
//                                     )}
//                                 </FormItem>
//                             </Col>
//                         </Row>
//                     </Form> */}
//                     <Form className="userModal-content">

//                         <Row gutter={16}>
//                             <Col {...colLayout}>
//                                 <FormItem label={"标题"}
//                                     {...formLayout}
//                                 >
//                                     {getFieldDecorator('title', {
//                                         rules: [{ required: true, message: '请选择' }],
//                                     })(
//                                         <Input />
//                                     )}
//                                 </FormItem>
//                             </Col>
//                             <Col {...colLayout}>
//                                 <FormItem label={"介绍"}
//                                     {...formLayout}
//                                 >
//                                     {getFieldDecorator('content', {
//                                         rules: [{ required: true, message: '请选择' }],
//                                     })(
//                                         <Input />
//                                     )}
//                                 </FormItem>
//                             </Col>
//                             <Col>
//                                 <FormItem label={"文章内容"}
//                                     {...{
//                                         labelCol: {
//                                             xs: { span: 24 },
//                                             sm: { span: 5 },
//                                             md: { span: 4 },
//                                         },
//                                         wrapperCol: {
//                                             xs: { span: 24 },
//                                             sm: { span: 24 },
//                                             md: { span: 24 },
//                                         }
//                                     }}
//                                 >
//                                     {getFieldDecorator('baidu', {
//                                         rules: [{ required: true, message: '请选择' }],
//                                     })(
//                                         <Ume />
//                                     )}
//                                 </FormItem>
//                             </Col>
//                         </Row>
//                     </Form>
//                 </Card>
//             </Modal>
//         );
//     }
// }
// export default connect(({ demo }) => {
//     let { visible, changedata } = demo;
//     return {
//         visible,
//         changedata,
//     }
// }
// )(Form.create()(Demo));
import { Modal, Form, Input, Select, Row, Col, Card } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import Ume from "../ume/index.js";
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
            Umevalue: ""
        }
    }
    /**
     * modal取消事件
     */
    modalCancel = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "demo/save",
            payload: {
                visible: false
            }
        })
    }

    /**
     * 确认事件
     */
    onOk = () => {
        const { dispatch, form: { validateFields, setFieldsValue }, changedata } = this.props;
        setFieldsValue({ content: this.state.Umevalue })
        validateFields((error, values) => {
            if (!!error) return;
            dispatch({
                type: "demo/changedemo",
                payload: { ...changedata, ...values }
            })
        })
        const { form: { resetFields } } = this.props;
        resetFields();

    }
    valuechange = (content) => {
        this.setState({ Umevalue: content })
    }
    render() {
        const { visible, form, changedata } = this.props;
        let { getFieldDecorator, getFieldsValue } = form;
        return (
            <Modal
                visible={visible}
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
                                        initialValue: changedata.title
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
                                        initialValue: changedata.descript
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
                                        initialValue: changedata.content
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
export default connect(({ demo }) => {
    let { visible, changedata } = demo;
    return {
        visible,
        changedata,
    }
}
)(Form.create()(Demo));