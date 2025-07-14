import React from "react";
import "./styles.css";
import { Card, Row } from "antd";
import Button from "../Button";
const Cards = () => {
  return (
    <div>
      <Row className="my-row">
        <Card className="my-card" title="Current Balance">
          <p>₹0</p>
          <Button text={"Reset Balance"} blue={true}></Button>
        </Card>
        <Card className="my-card" title="Current Balance">
          <p>₹0</p>
          <Button text={"Reset Balance"} blue={true}></Button>
        </Card>
        <Card className="my-card" title="Current Balance">
          <p>₹0</p>
          <Button text={"Reset Balance"} blue={true}></Button>
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
