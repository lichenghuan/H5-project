export default {
    newDate: (value) => {
        return value.replace(/-/g, "/");
    },
    money: (num) => {
        //金额按千位逗号分隔
        return parseFloat(num).toLocaleString();
    }
}
