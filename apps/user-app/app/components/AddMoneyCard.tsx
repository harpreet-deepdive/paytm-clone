"use client";
import { Button } from "@repo/ui/button";
import { Card, Label } from "flowbite-react";
import { Select } from "flowbite-react";
import { useState } from "react";
import { TextInput } from "flowbite-react";
import { createOnRampTransaction } from "../lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const SelectOptions = ({
  options,
  onSelect,
}: {
  onSelect: (value: string) => void;
  options: {
    key: string;
    value: string;
  }[];
}) => {
  return (
    <select
      onChange={(e) => {
        onSelect(e.target.value);
      }}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
      {options.map((option) => (
        <option value={option.key}>{option.value}</option>
      ))}
    </select>
  );
};

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [value, setValue] = useState(0);
  return (
    <Card className="flex flex-col" title="Add Money">
      <h3 className="text-xl font-bold">Add Money</h3>
      <div className="w-full">
        <Label htmlFor="small" value="Amount" />
        <TextInput
          placeholder={"Amount"}
          onChange={(e) => {
            setValue(Number(e.target.value));
          }}
        />
        <div className="py-4 text-left">Bank</div>
        <SelectOptions
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );

            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className=" pt-4">
          <button
            onClick={async () => {
              await createOnRampTransaction(provider, value);
              // window.location.href = redirectUrl || "";
            }}
            type="button"
            className=" border text-black hover:bg-black hover:text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          >
            Add Money
          </button>
        </div>
      </div>
    </Card>
  );
};
