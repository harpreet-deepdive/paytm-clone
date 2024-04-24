import { Card } from "flowbite-react";
import React from "react";

enum OnRampStatusEnum {
  Success,
  Failure,
  Processing,
}

const RecentTransactions = ({
  transactions,
}: {
  transactions?: {
    time: Date;
    amount: number;
    status: keyof typeof OnRampStatusEnum;
    provider: string;
  }[];
}) => {
  if (!transactions) {
    return <div>nothing</div>;
  }
  return (
    <Card className="flex flex-col mt-4" title="Add Money">
      <h3 className="text-xl font-bold">Recent Transactions</h3>
      <div>
        {transactions.map((transaction) => (
          <>
            <hr />
            <div className="flex my-2 items-center justify-between">
              <p className="capitalize font-bold text-base inline-flex flex-col">
                Recieved INR{" "}
                <span className="font-normal">
                  {transaction.time.toDateString()}
                </span>{" "}
              </p>
              <p> + Rs {transaction.amount / 100} Inr</p>
            </div>
            <hr />
          </>
        ))}
      </div>
    </Card>
  );
};

export default RecentTransactions;
