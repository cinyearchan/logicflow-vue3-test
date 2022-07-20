import { defineComponent, PropType, ref } from "vue";
import { Options, Vue } from "vue-class-component";
import "./index.css";

type ShapeType = {
  type: string;
  text: string;
};

type IProps = {
  mouseDownHandle: ({ type, text }: ShapeType) => void;
};

type IState = {
  shapeList: ShapeType[];
};

const ComponentName = "Panel";
export default defineComponent({
  name: ComponentName,
  props: {
    mouseDownHandle: Function as PropType<IProps["mouseDownHandle"]>
  },
  setup() {
    const state = ref({
      shapeList: [
        {
          type: "rect",
          text: "矩形",
        },
        {
          type: "circle",
          text: "圆形",
        },
      ],
    });
  },
});
