import { defineComponent, onMounted, ref } from "vue";
import LogicFlow from "@logicflow/core";

const config = {
  isSilentMode: true,
  stopScrollGraph: true,
  stopZoomGraph: true,
  style: {
    rect: {
      width: 100,
      height: 50,
    },
  },
};

const data = {
  nodes: [
    {
      id: 10,
      type: "rect",
      x: 159,
      y: 70,
      text: "矩形",
    },
  ],
};

export default defineComponent({
  name: "NodeExample",
  setup() {
    const graph = ref(null) as any as { value: HTMLElement };
    onMounted(() => {
      const lf = new LogicFlow({
        ...config,
        container: graph.value,
      });
      lf.render(data);
    });

    return {
      graph,
    };
  },
  render() {
    return <div id="graph" ref="graph" class="viewport"></div>;
  },
});
