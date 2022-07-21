import { defineComponent, Fragment, onMounted, ref } from "vue";
import LogicFlow from "@logicflow/core";
import Panel from "./components/panel";
import "./index.css";

// type IProps = Record<string, unknown>;
// type IState = Record<string, unknown>;

export default defineComponent({
  name: "DndExample",
  setup() {
    let lf: LogicFlow;
    const graph = ref(null) as any as { value: HTMLElement };
    onMounted(() => {
      lf = new LogicFlow({
        container: graph.value,
        stopScrollGraph: true,
        stopZoomGraph: true,
      });
      lf.render();
    });
    const mouseDownHandle = (config: any) => {
      lf.dnd.startDrag(config);
    };

    return {
      graph,
      mouseDownHandle,
    };
  },

  render() {
    return (
      <Fragment>
        <div class="dnd-example-container">
          <Panel mouseDownHandle={this.mouseDownHandle}></Panel>
          <div id="graph" ref="graph" class="viewport"></div>
        </div>
      </Fragment>
    );
  },
});
