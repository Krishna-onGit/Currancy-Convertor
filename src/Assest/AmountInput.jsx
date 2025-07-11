import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";
import { useState, useEffect } from "react";
import axios from "axios";

function AmountInput() {
  const [exchangeRates, setExchangeRates] = useState({});
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const apiUrl = `https://v6.exchangerate-api.com/v6/aeaacd322075b1343feee1f6/latest/${fromCurrency}`;
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data && response.data.conversion_rates) {
          setExchangeRates(response.data.conversion_rates);
          console.log(
            "Rates object keys:",
            Object.keys(response.data.conversion_rates)
          );
        } else {
          setExchangeRates({});
          console.error("API response missing conversion_rates:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching exchange rates:", error);
      });
  }, [fromCurrency]);

  useEffect(() => {
    if (
      exchangeRates &&
      typeof exchangeRates == "object" &&
      exchangeRates[toCurrency]
    ) {
      const conversionRate = exchangeRates[toCurrency];
      if (conversionRate) {
        const converted = Number(amount) * conversionRate;
        setConvertedAmount(converted.toFixed(2));
      }
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const handlechange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "amount":
        setAmount(value);
        break;
      case "fromCurrency":
        setFromCurrency(value);
        break;
      case "toCurrency":
        setToCurrency(value);
        break;
    }
  };

  // Fallback static list of major currencies (if API returns too few)
  const staticCurrencyList = [
    "USD",
    "EUR",
    "INR",
    "GBP",
    "JPY",
    "CAD",
    "AUD",
    "CHF",
    "CNY",
    "SGD",
    "NZD",
    "ZAR",
  ];

  // Prepare currency list including base currency, fallback to static list if needed
  const currencyList =
    exchangeRates && typeof exchangeRates === "object"
      ? Array.from(new Set([fromCurrency, ...Object.keys(exchangeRates)]))
      : [fromCurrency];

  const finalCurrencyList =
    currencyList.length > 5 ? currencyList : staticCurrencyList;

  return (
    <div className="p-4 flex flex-row items-center w-150 gap-4 ">
      <div>
        <label className="">Amount:</label>
        <Input
          type="number"
          name="amount"
          value={amount}
          placeholder="Enter amount"
          onChange={handlechange}
          className="bg-gray-100 rounded-lg shadow-lg border-radius-7px p-40px h-10p outline-none border-2 border-gray-300 focus:border-transparent focus:box-shadow-gray-400 foucs:bg-transparent  "
        />
      </div>
      <div>
        <label className="font-m">From Currency:</label>
        <Select value={fromCurrency} onValueChange={setFromCurrency}>
          <SelectTrigger className="bg-gray-100 rounded-lg shadow-lg border-radius-7px outline-none border-2 border-gray-300 focus:border-transparent focus:box-shadow-gray-400 foucs-bg-transparent">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            {finalCurrencyList.map((currency) => (
              <SelectItem key={currency} value={currency}>
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="font-m">To Currency:</label>
        <Select value={toCurrency} onValueChange={setToCurrency}>
          <SelectTrigger className="bg-gray-100 rounded-lg shadow-lg border-radius-7px outline-none border-2 border-gray-300 focus:border-transparent focus:box-shadow-gray-400 foucs-bg-transparent">
            <SelectValue placeholder="Select a currency" />
          </SelectTrigger>
          <SelectContent>
            {finalCurrencyList.map((currency) => (
              <SelectItem key={currency} value={currency}>
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className=" ">
        <h2 className="bg-white p-4 rounded-lg shadow-lg mr-4 ml-4 mt-20%">
          Converted Amount: {convertedAmount !== null ? convertedAmount : "--"}
        </h2>
      </div>
    </div>
  );
}
export default AmountInput;
