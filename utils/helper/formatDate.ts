export const formatDate = (date: Date) => {
    return date ? new Date(date).toLocaleDateString() : '';
}