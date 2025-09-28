import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import InfoCard from '../../components/Cards/InfoCard';

import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverView from '../../components/Dashboard/FinanceOverView';
import ExpenseTransactions from '../../components/charts/ExpenseTransactions';
import Last30DaysExpense from './last30DaysExpense';
import RecentIncomeWithChart from './RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';


function Home() {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboard, setdashboarddata] = useState(null);
  const [loading, setloading] = useState(false);
  const fetchdashboard = async () => {
    if (loading) return;
    setloading(true);
    try {
      const res = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      if (res.data) {
        setdashboarddata(res.data);
      }
    }
    catch (err) {
      console.log("something went wrong,please try again", err);
    }
    finally {
      setloading(false);
    }
  }
  useEffect(() => {
    fetchdashboard();
    return () => { };
  }, [])
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
          icon={<IoMdCard/>}
          label="total Balance"
          value={addThousandsSeparator(dashboard?.totalBalance||0)}
          color="bg-primary"
          />
           <InfoCard
          icon={<LuWalletMinimal/>}
          label="total Income"
          value={addThousandsSeparator(dashboard?.totalIncome||0)}
          color="bg-orange-500"
          />
           <InfoCard
          icon={<LuHandCoins/>}
          label="total Expense"
          value={addThousandsSeparator(dashboard?.totalExpense||0)}
          color="bg-red-500"
          />
          
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
            transactions={dashboard?.recentTransactions}
            onSeeMore={() => navigate("/expense")} />
          <FinanceOverView
            totalBalance={dashboard?.totalBalance || 0}
            totalIncome={dashboard?.totalIncome || 0}
            totalExpense={dashboard?.totalExpense || 0}
          />
          <ExpenseTransactions
          transactions={dashboard?.last30DaysExpense?.transactions ||[]}
          onSeeMore={()=>navigate("/expense")}/>
          <Last30DaysExpense
          data={dashboard?.last30DaysExpense?.transactions||[]}
          />
          <RecentIncomeWithChart
          data={dashboard?.last60DaysIncome?.transactions?.slice(0,4)||[]}
          totalIncome={dashboard?.totalIncome||0}/>
          <RecentIncome
          transactions={dashboard?.last60DaysIncome?.transactions||[]}
          onSeeMore={()=>navigate("/income")}
          />
        </div>

      </div>
    </DashboardLayout>
  )
}

export default Home