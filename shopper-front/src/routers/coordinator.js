export const goToHomePage = (history) => {
    history.push("/")
}

export const goToOrdersPage = (history) => {
    history.push("/orders")
}
export const goToCreateOrderPage = (history) => {
    history.push("/orders/create")
}
export const goToOrderDetailPage = (history,orderId) => {
    history.push(`/orders/detail/${orderId}`)
}