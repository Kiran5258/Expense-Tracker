import React, { useState } from 'react';
import Input from '../input/Input';
import EmojiPickerpopup from '../layout/EmojiPickerpopup';

function AddExpenseForm({ onAddExpnse }) {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

  return (
    <div>
      <EmojiPickerpopup
        icon={expense.icon}
        onSelect={(selectIcon) => handleChange("icon", selectIcon)}
      />
      <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Expense Category"
        place="Food, Travel, Rent, etc"
        type="text"
      />
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />
      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />
      <div className='flex justify-end mt-6'>
        <button
          type="button"
          className='add-btn add-btn-fill'
          onClick={() => onAddExpnse(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}

export default AddExpenseForm;
