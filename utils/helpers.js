module.exports = {
    format: (data) => {
        return `${data.getMonth() + 1}/${data.getDate()}/${data.getFullYear()}`;
    },
    format_plural: (word, amount) => {
        return amount === 1 ? word : `${word}s`;
    },
};
