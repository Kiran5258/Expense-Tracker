import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { API_PATHS } from '../../utils/apiPath';
import ExpenseOverView from '../../components/Expense/ExpenseOverView';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import Model from '../../components/Income/Model';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/layout/DeleteAlert';

function Expense() {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseDetails = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);
      if (res.data) setExpenseData(res.data);
    } catch (err) {
      console.log('Something went wrong. Please try again', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("Category is required");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number");
      return;
    }

    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, { category, amount, date, icon });
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error adding Expense:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense details deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error deleting Expense:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDownloadExpenseDetails = async () => {
    // TODO: implement download logic
    try{
      const res=await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,{
          responseType:"blob",
        }
      );
      const url=window.URL.createObjectURL(new Blob([res.data]))
      const link=document.createElement("a");
      link.href=url;
      link.setAttribute("download","Expense_details.xlsx")
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    }catch(error){
      console.error("Erorr downloading expense details:",error);
      toast.error("Failed to download expense details. Please try again")
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div>
            <ExpenseOverView
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Model
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpnse={handleAddExpense} />
        </Model>

        <Model
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense detail?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Model>
      </div>
    </DashboardLayout>
  );
}

export default Expense;
