import { defineComponent, PropType } from "vue";
import LogicFlow from "@logicflow/core";

type IProps = {
  lf: LogicFlow;
};

export default defineComponent({
  name: "BpmnPattern",
  props: {
    lf: {
      type: Object as any as PropType<IProps["lf"]>,
    },
  },
  setup(props) {
    const addStartNode = () => {
      props.lf &&
        props.lf.dnd.startDrag({
          type: "bpmn:startEvent",
          text: "开始",
        });
    };

    const addUserTask = () => {
      props.lf &&
        props.lf.dnd.startDrag({
          type: "bpmn:userTask",
        });
    };

    const addServiceTask = () => {
      props.lf &&
        props.lf.dnd.startDrag({
          type: "bpmn:serviceTask",
        });
    };

    const addGateway = () => {
      props.lf &&
        props.lf.dnd.startDrag({
          type: "bpmn:exclusiveGateway",
        });
    };

    const addEndNode = () => {
      props.lf &&
        props.lf.dnd.startDrag({
          type: "bpmn:endEvent",
          text: "结束",
        });
    };

    const openSelection = () => {
      props.lf &&
        props.lf.updateEditConfig({
          stopMoveGraph: true,
        });
    };

    props.lf &&
      props.lf.on("selection:selected", () => {
        props.lf &&
          props.lf.updateEditConfig({
            stopMoveGraph: false,
          });
      });

    return {
      addStartNode,
      addUserTask,
      addServiceTask,
      addGateway,
      addEndNode,
      openSelection,
    };
  },

  render() {
    return (
      <div class="pattern">
        <div
          class="pattern-selection"
          onMousedown={() => this.openSelection()}
        ></div>
        <div>选区</div>
        <div
          class="pattern-start"
          onMousedown={() => this.addStartNode()}
        ></div>
        <div>开始</div>
        <div class="pattern-user" onMousedown={() => this.addUserTask()}></div>
        <div>用户任务</div>
        <div
          class="pattern-user"
          onMousedown={() => this.addServiceTask()}
        ></div>
        <div>系统任务</div>
        <div
          class="pattern-condition"
          onMousedown={() => this.addGateway()}
        ></div>
        <div>条件判断</div>
        <div class="pattern-end" onMousedown={() => this.addEndNode()}></div>
        <div>结束</div>
      </div>
    );
  },
});
