import React from 'react';
import ReactDOM from 'react-dom';
import LzEditor from 'react-lz-editor'
class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            htmlContent: `<h1>Yankees, Peeking at the Red Sox, Will Soon Get an Eyeful</h1>
                <p>Whenever Girardi stole a glance, there was rarely any good news for the Yankees. While Girardi’s charges were clawing their way to a split of their four-game series against the formidable Indians, the Boston Red Sox were plowing past the rebuilding Chicago White Sox, sweeping four games at Fenway Park.</p>`,
            markdownContent: "## HEAD 2 \n markdown examples \n ``` welcome ```",
            responseList: []
        }
        this.receiveHtml = this.receiveHtml.bind(this);
    }
    receiveHtml(content) {
        console.log("recieved HTML content", content);
        this.setState({ responseList: [] });
    }
    render() {
        let policy = "";
        const uploadProps = {
            action: "http://127.0.0.1",
            onChange: this.onChange,
            listType: 'picture',
            fileList: this.state.responseList,
            data: (file) => {

            },
            multiple: true,
            beforeUpload: this.beforeUpload,
            showUploadList: true
        }
        return (
            <div>
                <div>富文本编辑器:
                </div>
                <LzEditor active={true} removeStyle={false} importContent={this.state.htmlContent} cbReceiver={this.receiveHtml} uploadProps={uploadProps}
                    lang="Zh" />
                <br />
            </div>
        );
    }
}
export default Test
