import { Form, Select, Input, Button } from "ant-design-vue";
import { DownOutlined } from "@ant-design/icons";
import { approveUser } from "../config";
import { IApproveUser } from "../type";
import "ant-design-vue/dist/antd.css";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const PropertyPanel = (props) => {
  const getApproveList = () => {
    const approveUserOption: JSX.Element[] = [];
    approveUser.forEach((item: IApproveUser) => {
      approveUserOption.push(
        <Select.Option value={item.value}>{item.label}</Select.Option>
      );
    });
    const approveSelect = (
      <Form.item class="form-property" label="审核节点类型" name="approveType">
        <Select>{approveUserOption}</Select>
      </Form.item>
    );
    return approveSelect;
  };
  const getApiUrl = () => {
    const Api = (
      <Form.item label="API" name="api">
        <Input />
      </Form.item>
    );
    return Api;
  };
  const onFormLayoutChange = (value: any, all: any) => {
    approveUser.forEach((item) => {
      if (item.value === value.approveType) {
        value["approveTypeLabel"] = item.label;
      }
    });
    props.updateProperty(props.nodeData.id, value);
  };
  return (
    <div>
      <h2>属性面板</h2>
      <Form
        key={props.nodeData.id}
        layout="inline"
        model={props.nodeData.properties}
        onValuesChange={onFormLayoutChange}
      >
        <span class="form-property">
          类型：<span>{props.nodeData.type}</span>
        </span>
        <span class="form-property">
          文案：<span>{props.nodeData.text?.value}</span>
        </span>
        {props.nodeData.type === "approver" ? getApproveList() : ""}
        {props.nodeData.type === "judgement" ? getApiUrl() : ""}
      </Form>
      <div>
        <h3>......</h3>
        <h3>业务属性可根据需要进行自定义拓展</h3>
      </div>
      <div class="property-panel-footer">
        <Button
          class="property-panel-footer-hide"
          type="primary"
          icon={<DownOutlined />}
          onClick={props.hidePropertyPanel}
        >
          收起
        </Button>
      </div>
    </div>
  );
};

PropertyPanel.props = ["nodeData", "updateProperty", "hidePropertyPanel"];

export default PropertyPanel;
