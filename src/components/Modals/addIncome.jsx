import { Form, Modal, Input, DatePicker, Select, Button } from "antd";
import React from "react";
const AddIncomeModal = ({
  isIncomeModalVisible,
  handleIncomeModalCancel,
  onFinish,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title={"Add Income"}
      open={isIncomeModalVisible}
      onCancel={handleIncomeModalCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "income");
          form.resetFields();
        }}
      >
        <Form.Item
          label="Name"
          name={"name"}
          rules={[
            {
              required: true,
              message: "Please input the name of the transactions!",
            },
          ]}
        >
          <Input type="text" className="custom-input"></Input>
        </Form.Item>
        <Form.Item
          label="Amount"
          name={"amount"}
          rules={[
            {
              required: true,
              message: "Please input Income amount!",
            },
          ]}
        >
          <Input type="number" className="custom-input"></Input>
        </Form.Item>
        <Form.Item
          label="Date"
          name={"date"}
          rules={[
            {
              required: true,
              message: "Please select Income date!",
            },
          ]}
        >
          <DatePicker
            className="custom-input"
            format={"YYYY-MM-DD"}
          ></DatePicker>
        </Form.Item>
        <Form.Item
          label="Tag"
          name={"tag"}
          rules={[
            {
              required: true,
              message: "Please select tag!",
            },
          ]}
        >
          <Select className="select-input-2">
            <Select.Option value="Salary">Salary</Select.Option>
            <Select.Option value="Free Lance">Free Lance</Select.Option>
            <Select.Option value="Business">Business</Select.Option>
            <Select.Option value="Others">Others</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">
            Add Income
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddIncomeModal;
