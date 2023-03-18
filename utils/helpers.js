module.exports = {
    format: data => {
        return ` ${data.getMonth() + 1}/${data.getDate()}/${data.getFullYear()}`
    },
    format_plural: (word, amount) => {
        if (amount === 1) {
            return `${word}s`;
        }

        return word;
    }
};