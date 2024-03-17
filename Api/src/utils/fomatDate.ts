const dateOptions : Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
};

const formatDate = (date:string) => {
    const fecha = new Date(date)
    return fecha.toLocaleString("es-ES", dateOptions)
}

export {
    formatDate
}