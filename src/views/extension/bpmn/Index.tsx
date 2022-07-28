import { defineComponent, Fragment, onMounted, ref } from "vue";
import LogicFlow from "@logicflow/core";
import {
  BpmnElement,
  BpmnXmlAdapter,
  Snapshot,
  Control,
  Menu,
  DndPanel,
  SelectionSelect,
} from "@logicflow/extension";
// import BpmnPattern from "./pattern";
import IoTools from "@/components/io";
import "ant-design-vue/lib/button/style/index.css";
import "@logicflow/extension/lib/style/index.css";
import "./index.css";
import { useState } from "@/hooks/state";

const config = {
  stopScrollGraph: true,
  stopZoomGraph: true,
  metaKeyMultipleSelected: true,
  grid: {
    size: 10,
    type: "dot",
  },
  keyboard: {
    enabled: true,
  },
  snapline: true,
};

const data = {
  nodes: [
    {
      id: 10,
      type: "bpmn:startEvent",
      x: 76,
      y: 178,
      properties: {},
      baseType: "node",
      text: { x: 76, y: 213, value: "StartEvent" },
    },
    {
      id: 11,
      type: "bpmn:endEvent",
      x: 567,
      y: 176,
      properties: {},
      baseType: "node",
      text: { x: 567, y: 211, value: "EndEvent" },
    },
    {
      id: 12,
      type: "bpmn:userTask",
      x: 386,
      y: 59,
      properties: {},
      baseType: "node",
      text: { x: 386, y: 59, value: "UserTask" },
    },
    {
      id: 13,
      type: "bpmn:serviceTask",
      x: 385,
      y: 286,
      properties: {},
      baseType: "node",
      text: { x: 385, y: 286, value: "ServiceTask" },
    },
    {
      id: 14,
      type: "bpmn:exclusiveGateway",
      x: 206,
      y: 178,
      properties: {},
      baseType: "node",
    },
  ],
  edges: [
    {
      id: "Flow_2fs3ivm",
      type: "bpmn:sequenceFlow",
      sourceNodeId: 10,
      targetNodeId: 14,
      startPoint: { x: 94, y: 178 },
      endPoint: { x: 181, y: 178 },
      properties: {},
      pointsList: [
        { x: 94, y: 178 },
        { x: 181, y: 178 },
      ],
    },
    {
      id: "Flow_2mtbh4v",
      type: "bpmn:sequenceFlow",
      sourceNodeId: 14,
      targetNodeId: 12,
      startPoint: { x: 231, y: 178 },
      endPoint: { x: 336, y: 59 },
      properties: {},
      pointsList: [
        { x: 231, y: 178 },
        { x: 306, y: 178 },
        { x: 306, y: 59 },
        { x: 336, y: 59 },
      ],
    },
    {
      id: "Flow_1hm4ecl",
      type: "bpmn:sequenceFlow",
      sourceNodeId: 14,
      targetNodeId: 13,
      startPoint: { x: 231, y: 178 },
      endPoint: { x: 335, y: 286 },
      properties: {},
      pointsList: [
        { x: 231, y: 178 },
        { x: 305, y: 178 },
        { x: 305, y: 286 },
        { x: 335, y: 286 },
      ],
    },
    {
      id: "Flow_1vo95qa",
      type: "bpmn:sequenceFlow",
      sourceNodeId: 12,
      targetNodeId: 11,
      startPoint: { x: 436, y: 59 },
      endPoint: { x: 549, y: 176 },
      properties: {},
      pointsList: [
        { x: 436, y: 59 },
        { x: 519, y: 59 },
        { x: 519, y: 176 },
        { x: 549, y: 176 },
      ],
    },
    {
      id: "Flow_3o5b4v0",
      type: "bpmn:sequenceFlow",
      sourceNodeId: 13,
      targetNodeId: 11,
      startPoint: { x: 435, y: 286 },
      endPoint: { x: 549, y: 176 },
      properties: {},
      pointsList: [
        { x: 435, y: 286 },
        { x: 519, y: 286 },
        { x: 519, y: 176 },
        { x: 549, y: 176 },
      ],
    },
  ],
};

const ComponentName = "BpmnExample";

export default defineComponent({
  name: ComponentName,
  setup() {
    const graph = ref(null) as any as { value: HTMLElement };
    const lf = ref(null) as any as LogicFlow;
    const rendered = ref(true);
    const [nodeData, setNodeData] = useState();

    LogicFlow.use(BpmnElement); // 启用 bpmn 元素
    LogicFlow.use(DndPanel); // 启用左侧拖拽元素面板
    LogicFlow.use(SelectionSelect); // 启用选择
    LogicFlow.use(Control); // 启用控制面板
    LogicFlow.use(Menu); // 启用右键菜单
    LogicFlow.use(Snapshot); // 启用截图
    LogicFlow.use(BpmnXmlAdapter); // 启用 bpmn xml json 转换插件

    const initGraph = () => {
      lf.value = new LogicFlow({
        ...config,
        container: graph.value,
        grid: {
          size: 10,
          type: "dot",
        },
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
      // lf.extension.selectionSelect.openSelectionSelect();
      lf.value.extension.dndPanel.setPatternItems([
        // {
        //   label: "选区",
        //   icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAOVJREFUOBGtVMENwzAIjKP++2026ETdpv10iy7WFbqFyyW6GBywLCv5gI+Dw2Bluj1znuSjhb99Gkn6QILDY2imo60p8nsnc9bEo3+QJ+AKHfMdZHnl78wyTnyHZD53Zzx73MRSgYvnqgCUHj6gwdck7Zsp1VOrz0Uz8NbKunzAW+Gu4fYW28bUYutYlzSa7B84Fh7d1kjLwhcSdYAYrdkMQVpsBr5XgDGuXwQfQr0y9zwLda+DUYXLaGKdd2ZTtvbolaO87pdo24hP7ov16N0zArH1ur3iwJpXxm+v7oAJNR4JEP8DoAuSFEkYH7cAAAAASUVORK5CYII=",
        //   callback: () => {
        //     lf.value.openSelectionSelect();
        //     lf.value.once("selection:selected", () => {
        //       lf.value.closeSelectionSelect();
        //     });
        //   },
        // },
        {
          type: "bpmn:startEvent",
          text: "开始",
          label: "开始节点",
          icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAnBJREFUOBGdVL1rU1EcPfdGBddmaZLiEhdx1MHZQXApraCzQ7GKLgoRBxMfcRELuihWKcXFRcEWF8HBf0DdDCKYRZpnl7p0svLe9Zzbd29eQhTbC8nv+9zf130AT63jvooOGS8Vf9Nt5zxba7sXQwODfkWpkbjTQfCGUd9gIp3uuPP8bZ946g56dYQvnBg+b1HB8VIQmMFrazKcKSvFW2dQTxJnJdQ77urmXWOMBCmXM2Rke4S7UAW+/8ywwFoewmBps2tu7mbTdp8VMOkIRAkKfrVawalJTtIliclFbaOBqa0M2xImHeVIfd/nKAfVq/LGnPss5Kh00VEdSzfwnBXPUpmykNss4lUI9C1ga+8PNrBD5YeqRY2Zz8PhjooIbfJXjowvQJBqkmEkVnktWhwu2SM7SMx7Cj0N9IC0oQXRo8xwAGzQms+xrB/nNSUWVveI48ayrFGyC2+E2C+aWrZHXvOuz+CiV6iycWe1Rd1Q6+QUG07nb5SbPrL4426d+9E1axKjY3AoRrlEeSQo2Eu0T6BWAAr6COhTcWjRaYfKG5csnvytvUr/WY4rrPMB53Uo7jZRjXaG6/CFfNMaXEu75nG47X+oepU7PKJvvzGDY1YLSKHJrK7vFUwXKkaxwhCW3u+sDFMVrIju54RYYbFKpALZAo7sB6wcKyyrd+aBMryMT2gPyD6GsQoRFkGHr14TthZni9ck0z+Pnmee460mHXbRAypKNy3nuMdrWgVKj8YVV8E7PSzp1BZ9SJnJAsXdryw/h5ctboUVi4AFiCd+lQaYMw5z3LGTBKjLQOeUF35k89f58Vv/tGh+l+PE/wG0rgfIUbZK5AAAAABJRU5ErkJggg==",
        },
        {
          type: "bpmn:userTask",
          label: "用户任务",
          icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==",
          className: "important-node",
        },
        {
          type: "bpmn:serviceTask",
          label: "系统任务",
          icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==",
          cls: "import_icon",
        },
        {
          type: "bpmn:exclusiveGateway",
          label: "条件判断",
          icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=",
        },
        {
          type: "bpmn:endEvent",
          text: "结束",
          label: "结束节点",
          icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAA1BJREFUOBFtVE1IVUEYPXOf+tq40Y3vPcmFIdSjIorWoRG0ERWUgnb5FwVhYQSl72oUoZAboxKNFtWiwKRN0M+jpfSzqJAQclHo001tKkjl3emc8V69igP3znzfnO/M9zcDcKT67azmjYWTwl9Vn7Vumeqzj1DVb6cleQY4oAVnIOPb+mKAGxQmKI5CWNJ2aLPatxWa3aB9K7/fB+/Z0jUF6TmMlFLQqrkECWQzOZxYGjTlOl8eeKaIY5yHnFn486xBustDjWT6dG7pmjHOJd+33t0iitTPkK6tEvjxq4h2MozQ6WFSX/LkDUGfFwfhEZj1Auz/U4pyAi5Sznd7uKzznXeVHlI/Aywmk6j7fsUsEuCGADrWARXXwjxWQsUbIupDHJI7kF5dRktg0eN81IbiZXiTESic50iwS+t1oJgL83jAiBupLDCQqwziaWSoAFSeIR3P5Xv5az00wyIn35QRYTwdSYbz8pH8fxUUAtxnFvYmEmgI0wYXUXcCCSpeEVpXlsRhBnCEATxWylL9+EKCAYhe1NGstUa6356kS9NVvt3DU2fd+Wtbm/+lSbylJqsqkSm9CRhvoJVlvKPvF1RKY/FcPn5j4UfIMLn8D4UYb54BNsilTDXKnF4CfTobA0FpoW/LSp306wkXM+XaOJhZaFkcNM82ASNAWMrhrUbRfmyeI1FvRBTpN06WKxa9BK0o2E4Pd3zfBBEwPsv9sQBnmLVbLEIZ/Xe9LYwJu/Er17W6HYVBc7vmuk0xUQ+pqxdom5Fnp55SiytXLPYoMXNM4u4SNSCFWnrVIzKG3EGyMXo6n/BQOe+bX3FClY4PwydVhthOZ9NnS+ntiLh0fxtlUJHAuGaFoVmttpVMeum0p3WEXbcll94l1wM/gZ0Ccczop77VvN2I7TlsZCsuXf1WHvWEhjO8DPtyOVg2/mvK9QqboEth+7pD6NUQC1HN/TwvydGBARi9MZSzLE4b8Ru3XhX2PBxf8E1er2A6516o0w4sIA+lwURhAON82Kwe2iDAC1Watq4XHaGQ7skLcFOtI5lDxuM2gZe6WFIotPAhbaeYlU4to5cuarF1QrcZ/lwrLaCJl66JBocYZnrNlvm2+MBCTmUymPrYZVbjdlr/BxlMjmNmNI3SAAAAAElFTkSuQmCC",
        },
      ]);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.lf = lf.value;
      const initialXmlData = BpmnXmlAdapter.adapterXmlOut(data);
      // console.log("xmlData", initialXmlData);
      lf.value.render(initialXmlData);
      rendered.value = true;
    };

    onMounted(() => {
      initGraph();
    });

    const uploadCallback = (event: ProgressEvent<FileReader>) => {
      // console.log("cb");
      // console.log("target", event.target);
      if (event.target) {
        const xml = event.target.result as string;
        if (lf.value) {
          lf.value.render(xml);
        }
      }
    };

    return {
      graph,
      lf,
      rendered,
      nodeData,
      setNodeData,
      uploadCallback,
    };
  },

  render() {
    let tools;
    if (this.rendered) {
      tools = (
        <div>
          {/* <BpmnIo lf={this.lf}></BpmnIo> */}
          <IoTools
            lf={this.lf}
            downloadName={`01-logic-flow-${Date.now()}.xml`}
            uploadCallback={(event) => this.uploadCallback(event)}
          ></IoTools>
        </div>
      );
    }
    return (
      <Fragment>
        <div id="graph" ref="graph" class="viewport"></div>
        {/* <BpmnPattern lf={this.lf}></BpmnPattern> */}
        {tools}
      </Fragment>
    );
  },
});
