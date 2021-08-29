export const getDate = (time: any) => {
    const year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    const newDate = new Date().getDate();
    var seconds = new Date().getSeconds();
    var formattedDate = "";
    formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${newDate} ${time.split(":")[0]}:${time.split(":")[1]}:${seconds < 10 ? `0${seconds}` : seconds}`;

    return formattedDate;
};