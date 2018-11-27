import React from 'react';
import LzEditor from 'react-lz-editor';
import findIndex from "lodash/findIndex";
import uniqBy from "lodash/uniqBy";
class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            htmlContent: !!this.props.value ? this.props.value : `<h1> Head level 1</h1>`,
            responseList: [],
        }
        this.receiveHtml = this.receiveHtml.bind(this);
        this.onChange = this.onChange.bind(this);

    }
    receiveHtml(content) {
        this.setState({ responseList: [] });
        this.props.valuechange(content);
    }
    onChange(info) {
        let currFileList = info.fileList;
        currFileList = currFileList.filter((f) => (!f.length));
        let url = "/img/";

        //Read remote address and display.
        //读取远程路径并显示链接
        currFileList = currFileList.map((file) => {
            if (file.response) {
                // concat url
                // 组件会将 file.url 作为链接进行展示
                file.url = url + file.response.url;
            }
            if (!file.length) {
                return file;
            }
        });
        let _this = this;

        // filtering successed files
        //按照服务器返回信息筛选成功上传的文件
        currFileList = currFileList.filter((file) => {
            //multiple uploading?
            //根据多选选项更新添加内容
            let hasNoExistCurrFileInUploadedList = !~findIndex(_this.state.responseList, item => item.name === file.name)
            if (hasNoExistCurrFileInUploadedList) {
                if (!!_this.props.isMultiple == true) {
                    _this.state.responseList.push(file);
                } else {
                    _this.state.responseList = [file];
                }
            }
            return !!file.response || (!!file.url && file.status == "done") || file.status == "uploading";
        });
        currFileList = uniqBy(currFileList, "name");
        if (!!currFileList && currFileList.length != 0) {
            this.setState({ responseList: currFileList });
        }
        _this.forceUpdate();
    }
    componentWillReceiveProps(nextProps) {

        if (!!nextProps.value && nextProps.value != this.props.value) {
            console.log("1234567")
            this.setState({ htmlContent: nextProps.value })
        }
    }
    render() {
        const uploadProps = {
            action: "/img",
            onChange: this.onChange,
            listType: 'picture',
            fileList: this.state.responseList,
            data: (file) => {
            },
            multiple: false,
            showUploadList: true
        }
        return (
            <LzEditor
                active={true}
                alignment={true}
                video={false}
                audio={false}
                autoSave={false}
                removeStyle={false}
                importContent={this.state.htmlContent}
                cbReceiver={this.receiveHtml}
                uploadProps={uploadProps}
                lang="Zh"
            />
        );
    }
}
export default Test