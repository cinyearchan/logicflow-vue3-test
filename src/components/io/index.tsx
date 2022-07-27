/* eslint-disable @typescript-eslint/no-var-requires */
import LogicFlow from "@logicflow/core";
import { download } from "@/utils";
import "./index.css";

const downloadImg = require("./img/download.png");
const photo = require("./img/img.png");
const uploadImg = require("./img/upload.png");

// type IProps = {
//   lf: LogicFlow;
// };

type FileEventTarget = EventTarget & { files: FileList };

const IoTools = (props: {
  lf: LogicFlow;
  downloadName: string;
  uploadCallback: (event: ProgressEvent<FileReader>) => void;
}) => {
  const downloadData = () => {
    const data = props.lf.getGraphData() as string;
    console.log("lf", props.lf);
    console.log("data", data);
    download(props.downloadName, data);
  };
  const uploadData = (ev: Event) => {
    const file = (ev.target as FileEventTarget).files[0];
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      props.uploadCallback(event);
    };
    reader.readAsText(file);
  };
  const getSnapshot = () => {
    if (props.lf) {
      props.lf.getSnapshot();
    }
  };

  return (
    <div class="graph-io">
      <span title="下载" onMousedown={() => downloadData()}>
        <img src={downloadImg} alt="下载" />
      </span>
      <span id="download-img" title="截图" onMousedown={() => getSnapshot()}>
        <img src={photo} alt="截图" />
      </span>
      <span id="upload-btn" title="上传">
        <input type="file" class="upload" onChange={(ev) => uploadData(ev)} />
        <img src={uploadImg} alt="上传" />
      </span>
    </div>
  );
};

IoTools.props = ["lf", "downloadName", "uploadCallback"];

export default IoTools;
