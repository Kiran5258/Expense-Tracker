import moment from "moment";
export const validateEmail=(email)=>{
    const regex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const getInitials=(name)=>{
    if(!name)return "";
    const words=name.split(" ");
    let initial="";
    for(let i=0;i<Math.min(words.length,2);i++){
        initial+=words[i][0];
    }
    return initial.toUpperCase();
}
export const addThousandsSeparator=(num)=>{
    if(num==null || isNaN(num))return "";
    const[integerpart,fractionpart]=num.toString().split(".");
    const formatInt = integerpart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionpart?
    `${formatInt}.${fractionpart}`
    :formatInt;
}

export const prepareExpenseBarChartData=(data=[])=>{
    const charData=data.map((items)=>({
        category:items?.category,
        amount:items?.amount,
    }))
    return charData
}
export const prepareIncomeBarCharData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const charData = sortedData.map((item) => ({
        month: moment(item?.date).format("Do MMM"),
        amount: item?.amount,
        source: item?.source,
    }));

    return charData;
};

export const prepareExpenseLineChartData=(data=[])=>{
    const sortedData=[...data].sort((a,b)=>new Date(a.date)-new Date(b.date))
    const charData=sortedData.map((item)=>({
        month:moment(item?.date).format("Do MMM"),
        amount:item?.amount,
        category:item?.category,
    }))
    return charData;
};