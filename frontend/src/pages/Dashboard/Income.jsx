import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import IncomeOverView from '../../components/Income/IncomeOverView';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import Model from '../../components/Income/Model';
import { AddIncomeForm } from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/layout/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';

function Income() {
  useUserAuth();
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetails = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
      if (res.data) setIncomeData(res.data);
    } catch (err) {
      console.log('Something went wrong. Please try again', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source.trim()) {
      toast.error("Source is required");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, { source, amount, date, icon });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails(); // Refresh chart after adding income
    } catch (error) {
      console.error("Error adding income:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income details deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error deleting income:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try{
      const res=await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,{
          responseType:"blob",
        }
      );
      const url=window.URL.createObjectURL(new Blob([res.data]))
      const link=document.createElement("a");
      link.href=url;
      link.setAttribute("download","Income_details.xlsx")
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    }catch(error){
      console.error("Erorr downloading expense details:",error);
      toast.error("Failed to download expense details. Please try again")
    }
  }
  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <IncomeOverView
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeDetails}
          />

        </div>
        <Model
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Model>
        <Model
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, date: null })}
          title="Delete Amount">
          <DeleteAlert
            content="Are you sure you want to delete this income details"
            onDelete={() => deleteIncome(openDeleteAlert.data)} />
        </Model>
      </div>
    </DashboardLayout>
  );
}

export default Income;
