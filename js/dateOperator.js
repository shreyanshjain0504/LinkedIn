const parseDateToDays = (date) => {
    const [dd, mm, yyyy] = date.split('/').map(Number);
    const parsedDate = new Date(yyyy, mm - 1, dd); 
    return Math.floor(parsedDate.getTime() / (1000 * 60 * 60 * 24)); 
};

const formatDate = (date) => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return `${dd}/${mm}/${yyyy}`;
};

const parseDateToDaysForFilter = (date) => {
    const [yyyy, mm, dd] = date.split('-').map(Number);
    const parsedDate = new Date(yyyy, mm - 1, dd);  
    return Math.floor(parsedDate.getTime() / (1000 * 60 * 60 * 24)); 
};
