import { Radio, Select, Table } from "antd";
import React, { useState } from "react";
import searchIcon from "../../assets/searchIcon.svg";
import "./styles.css";
import Button from "../Button";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";

const TransactionTable = ({
  transactions,
  addTransaction,
  fetchTransaction,
}) => {
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

  function exportCSV() {
    var csv = unparse(transactions, {
      fields: ["Name", "Type", "Tag", "Date", "Amount"],
    });
    var data = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    var csvURL = window.URL.createObjectURL(data);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "transactions.csv");
    tempLink.click();
  }

  function importCSV(e) {
    e.preventDefault();
    try {
      parse(e.target.files[0], {
        header: true,
        complete: async function (results) {
          console.log("Results>>>", results);
          for (const transaction of results.data) {
            //write each transaction of firebase, you can use the addTransaction function here
            console.log("Transaction", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All transactions Added");
      fetchTransaction();
      e.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  }

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
          <Button text="Export to CSV" onClick={exportCSV} />

          <label htmlFor="file-csv" className="btn btn-blue">
            Import from CSV
          </label>
          <input
            id="file-csv"
            type="file"
            accept=".csv"
            required
            onChange={importCSV}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <Table dataSource={sortedTransaction} columns={columns}></Table>
    </div>
  );
};

export default TransactionTable;
