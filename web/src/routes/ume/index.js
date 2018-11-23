import React from 'react';
import LzEditor from 'react-lz-editor'
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
        this.setState({ responseList: []});
        this.props.valuechange(content);
    }
    onChange(info) {
        let currFileList = info.fileList;
        if (info.file.status === "done") {

            currFileList = currFileList.filter((f) => (!f.length));
            let url = `C:\\Users\\yueyong\\Desktop\\blog\\blog后台`;
            currFileList = currFileList.map((file) => {
                if (file.response) {
                    file.url = url + file.response.url;
                    alert(file.url)
                }

                return file;
            });
            this.forceUpdate();
        }
        let _this = this;
        //按照服务器返回信息筛选成功上传的文件
        currFileList = currFileList.filter((file) => {
            if (!!_this.props.isMultiple == true) {
                _this.state.responseList.push(file);
            } else {
                _this.state.responseList = [file];
            }
            return !!file.response || (!!file.url && file.status == "done") || file.status == "uploading";
        });
        _this.forceUpdate();
    }
    componentWillReceiveProps(nextProps) {

        if (!!nextProps.value && nextProps.value != this.props.value) {
            console.log("1234567")
            this.setState({htmlContent:nextProps.value})
        }
    }
    render() {
        const uploadProps = {
            action: "http://localhost:3001/img",
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