import React from "react";

const AmountInput = () => {
  return (
    <div className="p-4 flex flex-row item-center w-150 gap-4 ">
      <div>
        <label className="">Amount:</label>
        <input
          type="number"
          name="amount"
          value=""
          className="bg-gray-100 rounded-lg shadow-lg border-radius-7px p-40px outline-none border-2 border-gray-300 focus:border-transparent focus:box-shadow-gray-400 foucs-bg-transparent  "
        />
      </div>
      <div>
        <label className="font-m ">From Currancy:</label>
        <select
          
          className="bg-gray-100 rounded-lg shadow-lg border-radius-7px p-40px outline-none border-2 border-gray-300 focus:border-transparent focus:box-shadow-gray-400 foucs-bg-transparent"
        >
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </div>
      <div>
        <label className="font-m">To Currancy:</label>
        <select
          
          className="bg-gray-100 rounded-lg shadow-lg border-radius-7px p-40px outline-none border-2 border-gray-300 focus:border-transparent focus:box-shadow-gray-400 foucs-bg-transparent"
        >
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </div>
    </div>
  );
};

export default AmountInput;
