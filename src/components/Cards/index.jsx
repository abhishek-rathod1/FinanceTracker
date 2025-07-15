import React from "react";
import "./styles.css";
import { Card, Row } from "antd";
import Button from "../Button";
const Cards = ({
  showExpenseModal,
  showIncomeModal,
  income,
  expense,
  currentBalance,
}) => {
  return (
    <div>
      <Row className="my-row">
        <Card className="my-card" title="Current Balance">
          <p>₹{currentBalance}</p>
          <Button text={"Reset Balance"} blue={true}></Button>
        </Card>
        <Card className="my-card" title="Total Income">
          <p>₹{income}</p>
          <Button
            text={"Add Income"}
            blue={true}
            onClick={showIncomeModal}
          ></Button>
        </Card>
        <Card className="my-card" title="Total Expense">
          <p>₹{expense}</p>
          <Button
            text={"Add Expense"}
            blue={true}
            onClick={showExpenseModal}
          ></Button>
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
