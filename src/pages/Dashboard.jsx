import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { Modal } from "antd";
import AddExpenseModal from "../components/Modals/addExpense";
import AddIncomeModal from "../components/Modals/addIncome";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionTable from "../components/TransactionsTable";
import { useNavigate } from "react-router-dom";
import ChartComponent from "../components/Charts";
import NoTransactions from "../components/NoTransactions";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  if (!user) {
    navigate("/");
  }
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);

  const [loading, setLoading] = useState(false);

  const [transactions, setTransactions] = useState([]);
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

  const onFinish = (values, type) => {
    console.log("on finish", values, type);

    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseInt(values.amount),
      tag: values.tag,
      name: values.name,
    };

    setTransactions([...transactions, newTransaction]);
    setIsExpenseModalVisible(false);
    setIsIncomeModalVisible(false);
    addTransaction(newTransaction);
    calculateBalance();
  };

  async function addTransaction(transaction, many) {
    // Add the doc
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      if (!many) toast.success("Transaction Added!");
    } catch (e) {
      if (!many) toast.error(e.message);
    }
  }

  //update balance
  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expenseTotal += transaction.amount;
      }
    });
    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setCurrentBalance(incomeTotal - expenseTotal);
  };

  useEffect(() => {
    //get all docs from collection
    fetchTransaction();
  }, [user]);

  async function fetchTransaction() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      console.log("Transactions: ", transactionsArray);
      console.log("current bal", currentBalance);
      toast.success("Transactions Fetched");
    }
    setLoading(false);
  }

  let sortedTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div>
      <Header />
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            currentBalance={currentBalance}
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
          {/* If there are no transaction show no transaction component, else show charts */}
          {transactions.length === 0 ? <NoTransactions /> : <ChartComponent sortedTransactions={sortedTransactions}/>}
          <TransactionTable
            transactions={transactions}
            addTransaction={addTransaction}
            fetchTransaction={fetchTransaction}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
