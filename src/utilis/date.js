const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const getDate = (timestamp) => {
    let date = new Date(timestamp);

    return `${date.getDate()} ${months[date.getMonth()]}`
}