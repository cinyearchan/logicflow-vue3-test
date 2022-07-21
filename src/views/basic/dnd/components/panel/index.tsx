import { defineComponent, PropType, ref } from "vue";
import "./index.css";

type ShapeType = {
  type: string;
  text: string;
};

type IProps = {
  mouseDownHandle: ({ type, text }: ShapeType) => void;
};

// type IState = {
//   shapeList: ShapeType[];
// };

const ComponentName = "Panel";
export default defineComponent({
  name: ComponentName,
  props: {
    mouseDownHandle: Function as PropType<IProps["mouseDownHandle"]>,
  },
  setup(props) {
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
    const mouseDown = ({ type, text }: ShapeType) => {
      const { mouseDownHandle } = props;
      if (mouseDownHandle) {
        mouseDownHandle({
          type,
          text,
        });
      }
    };

    return {
      state,
      mouseDown,
    };
  },

  render() {
    return (
      <div class="panel">
        {this.state.shapeList.map((shape) => {
          const { type, text } = shape;
          return (
            <div class="panel-item" key={type}>
              <div
                class={`panel-${type}`}
                onMousedown={() => {
                  this.mouseDown(shape);
                }}
              ></div>
              <span>{text}</span>
            </div>
          );
        })}
      </div>
    );
  },
});
