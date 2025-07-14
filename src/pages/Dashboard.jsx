import React, { useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { Modal } from "antd";
import AddExpenseModal from "../components/Modals/addExpense";
import AddIncomeModal from "../components/Modals/addIncome";

const Dashboard = () => {
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const handleExpenseModalCancel = () => {
    setIsExpenseModalVisible(false);
  };
  const handleIncomeModalCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) =>{
    console.log('on finish',values, type)
  }

  return (
    <div>
      <Header />
      <Cards
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
      />
      <AddExpenseModal
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseModalCancel={handleExpenseModalCancel}
        onFinish={onFinish}
      />
      <AddIncomeModal
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeModalCancel={handleIncomeModalCancel}
        onFinish={onFinish}
      />
    </div>
  );
};

export default Dashboard;
