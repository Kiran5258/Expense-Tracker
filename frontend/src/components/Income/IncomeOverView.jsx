import React, { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../charts/CustomBarChart';
import { prepareIncomeBarCharData } from '../../utils/helper';

function IncomeOverView({ transactions, onAddIncome }) {
    const [charData, setCharData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeBarCharData(transactions);
        setCharData(result);
    }, [transactions]);

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <div>
                    <h5 className='text-lg'>Income Overview</h5>
                    <p className='text-xs text-gray-400 mt-0.5'>
                        Track your earning over time and analyze your income trendings
                    </p>
                </div>
                <button className='add-btn' onClick={onAddIncome}>
                    <LuPlus className='text-lg' />
                    Add Income
                </button>
            </div>
            <div className='mt-10'>
                <CustomBarChart data={charData} />
            </div>
        </div>
    );
}

export default IncomeOverView;
