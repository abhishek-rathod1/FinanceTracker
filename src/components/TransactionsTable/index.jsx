import { Radio, Select, Table } from "antd";
import React, { useState } from "react";
import searchIcon from "../../assets/searchIcon.svg";
import "./styles.css";
import Button from "../Button";
const TransactionTable = ({ transactions }) => {
  const { Option } = Select;
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];
  let filterTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );

  let sortedTransaction = filterTransactions.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });
  return (
    <div className="transaction-container">
      <div className="search-row-container">
        <div className="input-flex">
          <img src={searchIcon} width="16px" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Searcby Name"
          />
        </div>

        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>

      <div className="sort-row-container">
        <h2>Transactions</h2>
        <Radio.Group
          className="input-radio"
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
        >
          <Radio.Button value={""}>No Sort</Radio.Button>
          <Radio.Button value={"date"}>Sort by Date</Radio.Button>
          <Radio.Button value={"amount"}>Sort by Amount</Radio.Button>
        </Radio.Group>
        <div className="export-btns">
          <Button text="Export to CSV" />
          <Button text="Import from CSV" blue={true} />
        </div>
      </div>
      
      <Table dataSource={sortedTransaction} columns={columns}></Table>
    </div>
  );
};

export default TransactionTable;
