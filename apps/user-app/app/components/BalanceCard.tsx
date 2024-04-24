import { Card } from "flowbite-react";
import React from "react";

const BalanceCard = ({
  data,
}: {
  data?: { amount: number; locked: number };
}) => {
  if (!data) {
    return <div>nothing</div>;
  }

  return (
    <Card className="flex flex-col" title="Add Money">
      <h3 className="text-xl font-bold">Balance</h3>
      <div>
        <hr />
        <div className="flex my-2 justify-between">
          <p className="capitalize font-bold text-base">Unlocked Balance</p>
          <p> {data.amount / 100} Inr</p>
        </div>
        <hr />
        <div className="flex my-2 justify-between">
          <p className="capitalize font-bold text-base">total locked Balance</p>
          <p> {data.locked / 100} Inr</p>
        </div>
        <hr />
        <div className="flex my-2 justify-between">
          <p className="capitalize font-bold text-base">total Balance</p>
          <p> {(data.locked + data.amount) / 100} Inr</p>
        </div>
        <hr />
      </div>
    </Card>
  );
};

export default BalanceCard;
