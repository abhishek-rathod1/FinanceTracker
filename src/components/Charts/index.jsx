import { Line, Pie } from "@ant-design/charts";
import React from "react";
import "./styles.css";

const ChartComponent = ({ sortedTransactions }) => {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  const spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type == "expense") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });
  console.log("spendings data>>>", spendingData);
  const config = {
    data:data,
    width: 500,
    height: 400,
    xField: "date",
    yField: "amount",
  };

  const spendingsConfig = {
    data:spendingData,
    width: 500,
    angleField: "amount",
    colorFiled: "tag",
  };

  return (
    <div className="charts-wrapper">
      <div>
        <h2>Your Analytics</h2>
        <Line {...config} />
      </div>
      <div>
        <h2>Spending Analytics</h2>
        <Pie {...spendingsConfig}></Pie>
      </div>
    </div>
  );
};

export default ChartComponent;
