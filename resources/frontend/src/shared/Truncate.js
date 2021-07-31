export default ({text, textLength = 20}) => {
    const truncate = () => {
        if (text && text.length > textLength) {
            return text.slice(0, textLength) + '...';
        }
        return text;
    };
    return truncate(text);
};
