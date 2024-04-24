import React from "react";
import { SidebarLayout } from "../dashboard/page";
import CardDetailsCard from "../../components/cardDetailsCard";
import { AddMoney } from "../../components/AddMoneyCard";
import BalanceCard from "../../components/BalanceCard";
import RecentTransactions from "../../components/RecentTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db";

async function getBalance() {
  const session = await getServerSession(authOptions);

  if (session === null) return;

  const balance = await prisma.balance.findFirst({
    where: {
      userId: +session.user.id,
    },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);

  if (session === null) return;

  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

const Transfer = async () => {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  console.log(balance);
  console.log(transactions);

  return (
    <>
      <SidebarLayout>
        <section>
          <h1 className="text-4xl text-purple-600 font-bold ">Transfer</h1>
        </section>
        <div className="my-6">
          <button
            type="button"
            className=" border text-black hover:bg-black hover:text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          >
            Default
          </button>
          <button
            type="button"
            className=" border text-black hover:bg-black hover:text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          >
            Withdraw
          </button>
          <button
            type="button"
            className=" border text-black hover:bg-black hover:text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          >
            Transfer
          </button>
        </div>
        <div>
          <h3 className="my-1 text-xl text-purple-600 font-bold">On Ramp</h3>
          <div className="flex gap-4">
            <div className="flex-1">
              {/* <CardDetailsCard /> */}
              <AddMoney />
            </div>
            <div className="flex-1 ">
              <BalanceCard data={balance} />
              <RecentTransactions transactions={transactions} />
            </div>
          </div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default Transfer;
