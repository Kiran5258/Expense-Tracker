import React, { useEffect, useState } from 'react'
import CustomPiChart from '../../components/Cards/CustomPiChart'

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4F39F6"]

function RecentIncomeWithChart({ data, totalIncome }) {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount,
        })) || []
        setChartData(dataArr)
    }, [data])

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 60 Days Income</h5>
            </div>
            <CustomPiChart
                data={chartData}
                label="Total Income"
                totalAmount={`Rs.${totalIncome}`}
                showTextAnchor={true}
                colors={COLORS}
            />
        </div>
    )
}

export default RecentIncomeWithChart
