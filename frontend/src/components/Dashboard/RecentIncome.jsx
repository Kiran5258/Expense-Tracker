import React from 'react'
import TransactionInfocard from '../Cards/TransactionInfocard'
import moment from "moment"
import { LuArrowRight } from 'react-icons/lu'

function RecentIncome({transactions,onSeeMore}) {
  return (
    <div className='card'>
        <div className='flex item-center justify-between'>
            <h5 className='text-lg'>Income</h5>
            <button className='card-btn' onClick={onSeeMore}>See All <LuArrowRight className="text-base"/></button>
        </div>
        <div className='mt-6'>
            {transactions?.slice(0,5)?.map((item)=>(
                <TransactionInfocard
                key={item._id}
                title={item.source}
                icon={item.icon}
                date={moment(item.date).format("Do MMM YYYY")}
                amount={item.amount}
                type="income"
                hideDeleteBtn
                />
            ))}
        </div>
    </div>
  )
}

export default RecentIncome