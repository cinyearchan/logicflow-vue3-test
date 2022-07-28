import { message } from "ant-design-vue";
import LogicFlow from "@logicflow/core";
import PropertyPanel from "./components/property";
import NodePanel from "./components/nodePanel";
import RegisterNode from "./components/registerNode";
import IoTools from "@/components/io";
import { themeApprove, data } from "./config";
import "./index.css";
import "@logicflow/extension/lib/style/index.css";
import { defineComponent, Fragment, onMounted, ref } from "vue";
import { useState } from "@/hooks/state";
import {
  Control,
  DndPanel,
  Menu,
  SelectionSelect,
  Snapshot,
} from "@logicflow/extension";

const config = {
  stopScrollGraph: true,
  stopZoomGraph: true,
  grid: {
    size: 10,
    visible: true,
    type: "mesh",
    config: {
      color: "#dcdcdc", // 设置网格颜色
    },
  },
  keyboard: {
    enabled: true,
  },
  style: themeApprove,
};

export default defineComponent({
  name: "ApproveExample",
  setup() {
    const graph = ref(null) as any as { value: HTMLElement };
    // const lf = ref(null) as any as LogicFlow;
    const [lf, setLf] = useState({} as LogicFlow);
    const [nodeData, setNodeData] = useState();

    LogicFlow.use(DndPanel);
    LogicFlow.use(SelectionSelect);
    LogicFlow.use(Control);
    LogicFlow.use(Menu);
    LogicFlow.use(Snapshot);

    const initEvent = (lf: LogicFlow) => {
      lf.on("element:click", ({ data }) => {
        setNodeData(data);
        // console.log(JSON.stringify(lf.getGraphData()));
        console.log(data);
      });
      lf.on("connection:not-allowed", (data: any) => {
        message.error(data.msg);
      });
    };

    const initGraph = () => {
      lf.value = new LogicFlow({
        ...config,
        container: graph.value,
      });

      // 将 选区 放置在 控制面板
      lf.value.extension.control.addItem({
        key: "select",
        iconClass: "lf-control-select",
        title: "选区",
        text: "选择",
        onClick: () => {
          lf.value.openSelectionSelect();
          lf.value.once("selection:selected", () => {
            lf.value.closeSelectionSelect();
          });
        },
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.lf = lf.value;
      setLf(lf.value);
      RegisterNode(lf.value);
      lf.value.render(data);
      initEvent(lf.value);
    };

    onMounted(() => {
      initGraph();
    });

    const uploadCallback = (event: ProgressEvent<FileReader>) => {
      // console.log("cb");
      // console.log("target", event.target);
      if (event.target) {
        const json = JSON.parse(event.target.result as string);
        if (lf.value) {
          lf.value.render(json);
        }
      }
    };

    return {
      graph,
      lf,
      nodeData,
      setNodeData,
      uploadCallback,
    };
  },

  render() {
    const updateProperty = (id: string, data: any) => {
      const node = this.lf.graphModel.nodesMap[id];
      const edge = this.lf.graphModel.edgesMap[id];
      if (node) {
        node.model.setProperties(Object.assign(node.model.properties, data));
        console.log("node");
      } else {
        edge.model.setProperties(Object.assign(edge.model.properties, data));
        console.log("edge");
      }
    };

    // 隐藏属性面板
    const hidePropertyPanel = () => {
      this.setNodeData(undefined);
    };

    return (
      <Fragment>
        <div class="approve-example-container">
          <div class="node-panel">{NodePanel({ lf: this.lf })}</div>
          <div id="id" ref="graph" class="viewport"></div>
          {this.nodeData ? (
            <div class="property-panel">
              {PropertyPanel({
                nodeData: this.nodeData,
                updateProperty,
                hidePropertyPanel,
              })}
            </div>
          ) : (
            ""
          )}
        </div>
        <IoTools
          lf={this.lf}
          downloadName={`0000-logic-flow-${Date.now()}.json`}
          uploadCallback={(ev) => this.uploadCallback(ev)}
        ></IoTools>
      </Fragment>
    );
  },
});
