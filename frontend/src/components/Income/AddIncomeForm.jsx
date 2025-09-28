import React, { useState } from 'react'
import Input from '../input/Input';
import EmojiPickerpopup from '../layout/EmojiPickerpopup';

export const AddIncomeForm = ({onAddIncome}) => {
    const [income,setIncome]=useState({
        source:"",
        amount:"",
        date:"",
        icon:"",
    });
    const handlechange=(key,value)=>setIncome({...income,[key]:value})
  return (
    <div className=''>

        <EmojiPickerpopup
        icon={income.icon}
        onSelect={(selectIcon)=>handlechange("icon",selectIcon)}/>
        <Input 
         value={income.source}
         onChange={({target})=>handlechange("source",target.value)}
         label="Income Source"
         place="FreeLance,Salary,etc"
         type="text"
         />
         <Input
         value={income.amount}
         onChange={({target})=>handlechange("amount",target.value)}
         label="Amount"
         placeholder=""
         type="number"/>
         <Input 
         value={income.date}
         onChange={({target})=>handlechange("date",target.value)}
         label="Date"
         placeholder=""
         type="date"/>
         <div className='flex justify-end mt-6'>
            <button 
            type="button"
            className='add-btn add-btn-fill'
            onClick={()=>onAddIncome(income)}>
                Add Income
            </button>
         </div>
         </div>
  )
}
