import LogicFlow from "@logicflow/core";
import { HtmlNodeConfig } from "../type";

// 组件列表
const componentList = require.context(
  // 组件目录的相对路径
  "./nodes",
  true,
  /[A-Z]\w+\.(tsx)$/
);

componentList.keys().forEach(fileName => {
  // 获取组件配置
  const component = componentList(fileName);
  console.log("component", component);
});

const NodeList = (props: { lf: LogicFlow }) => {
  const dragNode = (item: HtmlNodeConfig) => {
    props.lf.dnd.startDrag({
      type: item.type,
      text: item.label,
    });
  };

  // const getNodeList = (): JSX.Element[] => {
  //   const nodeList: JSX.Element[] = [];

  // };
};

NodeList.props = ["lf"];

export default NodeList;
