import { RectNode, h, GraphModel, RectNodeModel } from "@logicflow/core";

// 组件的标签定义，用于渲染左侧组件列表
export const metaData = {
  type: "dndV3",
  label: "dndV3 传输",
  style: {
    width: "50px",
    height: "30px",
    border: "2px solid #6495ED",
    transform: "rotate(45deg)",
  },
};

// dnd 组件的外观定义
export class DndNode extends RectNode {
  static extendKey = "DndNode";
  getShape() {
    const { x, y, radius, width, height } = this.props.model;
    const style = this.props.model.getNodeStyle();
    return h("g", {}, [
      h(
        "rect",
        {
          ...style,
          x: x - width / 2,
          y: y - height / 2,
          rx: radius,
          ry: radius,
          width,
          height,
        },
        ""
      ),
    ]);
  }
}

// dnd 组件的模型定义
export class DndModel extends RectNodeModel {
  constructor(data: any, graphModel: GraphModel) {
    super(data, graphModel);
    this.properties = {
      username: "",
      labelColor: "#000000",
    };
  }
}
