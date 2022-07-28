import { Form, FormItem, Select, Input, Button } from "ant-design-vue";
import { DownOutlined } from "@ant-design/icons-vue";
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
      <FormItem class="form-property" label="审核节点类型" name="approveType">
        <Select
          v-model:value={props.nodeData.properties.approveType}
          onChange={handleSelectChange}
        >
          {approveUserOption}
        </Select>
      </FormItem>
    );
    return approveSelect;
  };
  const getApiUrl = () => {
    const Api = (
      <FormItem label="API" name="api">
        <Input
          v-model:value={props.nodeData.properties.api}
          onPressEnter={handlePressEnter}
        />
      </FormItem>
    );
    return Api;
  };
  const handleSelectChange = (value: any, option: any) => {
    // console.log("selectChange", value);
    // console.log("option", option);
    const result = {
      approveType: value,
      approveTypeLabel: "",
    };
    approveUser.forEach((item) => {
      if (item.value === result.approveType) {
        result["approveTypeLabel"] = item.label;
      }
    });
    props.updateProperty(props.nodeData.id, result);
  };
  const handlePressEnter = (e: KeyboardEvent) => {
    props.updateProperty(props.nodeData.id, {
      api:
        (e.target as HTMLInputElement)?.value === null
          ? ""
          : (e.target as HTMLInputElement)?.value,
    });
  };

  return (
    <div>
      <h2>属性面板</h2>
      <Form
        key={props.nodeData.id}
        layout="inline"
        model={props.nodeData.properties}
      >
        <div class="form-property">
          类型：<span>{props.nodeData.type}</span>
        </div>
        <div class="form-property">
          文案：<span>{props.nodeData.text?.value}</span>
        </div>
        {/* 这里就是根据组件类型渲染相应的属性表单 */}
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
