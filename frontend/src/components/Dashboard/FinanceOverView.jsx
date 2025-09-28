import React from 'react';
import CustomPiChart from '../Cards/CustomPiChart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"]; 

function FinanceOverView({ totalIncome, totalBalance, totalExpense }) {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expense", amount: totalExpense },
    { name: "Total Income", amount: totalIncome }
  ];

  const hasData = totalBalance || totalIncome || totalExpense;

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Financial Overview</h5>
      </div>

      {hasData ? (
        <CustomPiChart
          data={balanceData}
          label="Total Balance"
          totalAmount={`${totalBalance}`} 
          colors={COLORS}
          showTextAnchor={true}
        />
      ) : (
        <p className="text-sm text-gray-500 mt-4">No financial data available</p>
      )}
    </div>
  );
}

export default FinanceOverView;
