import { Form, Modal, Input, DatePicker, Select, Button } from "antd";
import React from "react";

const AddExpenseModal = ({
  isExpenseModalVisible,
  handleExpenseModalCancel,
  onFinish,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title={"Add Expense"}
      open={isExpenseModalVisible}
      onCancel={handleExpenseModalCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "expense");
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
              message: "Please input expense amount!",
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
              message: "Please select expense date!",
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
            <Select.Option value="Food">Food</Select.Option>
            <Select.Option value="Rent">Rent</Select.Option>
            <Select.Option value="Traveel">Traveel</Select.Option>
            <Select.Option value="Others">Others</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">Add Expense</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddExpenseModal;
