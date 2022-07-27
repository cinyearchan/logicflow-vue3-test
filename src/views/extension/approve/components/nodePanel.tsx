import LogicFlow from "@logicflow/core";
import { approveNodes } from "../config";
import { HtmlNodeConfig } from "../type";

const NodePanel = (props: { lf: LogicFlow }) => {
  // 拖拽创建
  const dragNode = (item: HtmlNodeConfig) => {
    props.lf.dnd.startDrag({
      type: item.type,
      text: item.label,
    });
  };
  // 节点菜单
  const getNodePanel = (): JSX.Element[] => {
    const nodeList: JSX.Element[] = [];
    approveNodes.forEach((item, key) => {
      nodeList.push(
        <div class={`approve-node node-${item.type}`} key={key}>
          <div
            class="node-shape"
            style={{ ...item.style }}
            onMousedown={() => dragNode(item)}
          ></div>
          <div class="node-label">{item.label}</div>
        </div>
      );
    });
    return nodeList;
  };
  return getNodePanel();
};

NodePanel.props = ["lf"];

export default NodePanel;
