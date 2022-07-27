/* eslint-disable @typescript-eslint/no-var-requires */
import { defineComponent, PropType } from "vue";
import LogicFlow from "@logicflow/core";
import { download } from "@/utils";

const downloadImg = require("./img/download.png");
const photo = require("./img/img.png");
const uploadImg = require("./img/upload.png");

type IProps = {
  lf: LogicFlow;
};

type FileEventTarget = EventTarget & { files: FileList };

export default defineComponent({
  name: "BpmnIo",
  props: {
    lf: {
      type: Object as any as PropType<IProps["lf"]>,
    },
  },
  methods: {
    downloadXml() {
      const data = (this.lf as LogicFlow).getGraphData() as string;
      console.log("data", data);
      download("logic-flow.xml", data);
    },
    uploadXml(ev: Event) {
      const file = (ev.target as FileEventTarget).files[0];
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target) {
          const xml = event.target.result as string;
          if (this.lf) {
            this.lf.render(xml);
          }
        }
      };
      reader.readAsText(file);
    },
    downloadImage() {
      if (this.lf) {
        this.lf.getSnapshot();
      }
    },
  },

  render() {
    console.log("lf", this.lf);
    return (
      <div class="graph-io">
        <span title="下载 XML" onMousedown={() => this.downloadXml()}>
          <img src={downloadImg} alt="下载XML" />
        </span>
        <span
          id="download-img"
          title="下载图片"
          onMousedown={() => this.downloadImage()}
        >
          <img src={photo} alt="下载图片" />
        </span>
        <span id="upload-xml" title="上传 XML">
          <input
            type="file"
            class="upload"
            onChange={(ev) => this.uploadXml(ev)}
          />
          <img src={uploadImg} alt="上传 XML" />
        </span>
      </div>
    );
  },
});
