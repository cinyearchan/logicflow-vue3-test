import LogicFlow, {
  BaseNodeModel,
  ConnectRule,
  CircleNodeModel,
  CircleNode,
  h,
  RectNode,
  RectNodeModel,
  PolygonNode,
  PolygonNodeModel,
} from "@logicflow/core";
import GraphModel from "@logicflow/core/types/model/GraphModel";
import { ref, toRefs } from "vue";
import { nodeProperty } from "../type";

export default function RegisterNode(lf: LogicFlow) {
  class ApplyNodeModel extends CircleNodeModel {
    getConnectedTargetRules(): ConnectRule[] {
      const rules = super.getConnectedTargetRules();
      const gateWayOnlyAsTarget = {
        message: "开始节点只能连出，不能连入！",
        validate: (source: BaseNodeModel, target: BaseNodeModel) => {
          let isValid = true;
          if (target) {
            isValid = false;
          }
          return isValid;
        },
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      rules.push(gateWayOnlyAsTarget);
      return rules;
    }
  }
  lf.register({
    type: "apply",
    view: CircleNode,
    model: ApplyNodeModel,
  });

  class ApproverNode extends RectNode {
    static extendKey = "UserTaskNode";
    getLabelShape() {
      const { x, y, properties } = toRefs(this.props.model);
      const width = ref(this.props.model.width);
      const height = ref(this.props.model.height);
      // const { labelColor, approveTypeLabel } = toRefs(
      //   properties as unknown as nodeProperty
      // );
      const labelColor = ref(
        (properties as unknown as nodeProperty).labelColor
      );
      const approveTypeLabel = ref(
        (properties as unknown as nodeProperty).approveTypeLabel
      );
      return h(
        "text",
        {
          fill: labelColor.value,
          fontSize: 12,
          x: x.value - width.value / 2 + 5,
          y: y.value - height.value / 2 + 15,
          width: 50,
          height: 25,
        },
        approveTypeLabel.value
      );
    }
    getShape() {
      const { x, y, radius } = toRefs(this.props.model);
      const width = ref(this.props.model.width);
      const height = ref(this.props.model.height);
      const style = this.props.model.getNodeStyle();
      return h("g", {}, [
        h("rect", {
          ...style,
          x: x.value - width.value / 2,
          y: y.value - height.value / 2,
          rx: radius.value,
          ry: radius.value,
          width: width.value,
          height: height.value,
        }),
        this.getLabelShape(),
      ]);
    }
  }

  class ApproverModel extends RectNodeModel {
    constructor(data: any, graphModel: GraphModel) {
      super(data, graphModel);
      this.properties = {
        labelColor: "#000000",
        approveTypeLabel: "",
        approveType: "",
      };
    }
  }

  lf.register({
    type: "approver",
    view: ApproverNode,
    model: ApproverModel,
  });

  class judgementModel extends PolygonNodeModel {
    constructor(data: any, graphModel: GraphModel) {
      super(data, graphModel);
      this.points = [
        [35, 0],
        [70, 35],
        [35, 70],
        [0, 35],
      ];
      this.properties = {
        api: "",
      };
    }
  }
  lf.register({
    type: "judgement",
    view: PolygonNode,
    model: judgementModel,
  });

  class FinishNodeModel extends CircleNodeModel {
    getConnectedSourceRules(): ConnectRule[] {
      const rules = super.getConnectedSourceRules();
      const gateWayOnlyAsTarget = {
        message: "结束节点只能连入，不能连出！",
        validate: (source: BaseNodeModel) => {
          let isValid = true;
          if (source) {
            isValid = false;
          }
          return isValid;
        },
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      rules.push(gateWayOnlyAsTarget);
      return rules;
    }
  }
  lf.register({
    type: "finish",
    view: CircleNode,
    model: FinishNodeModel,
  });
}
