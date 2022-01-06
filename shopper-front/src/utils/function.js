

export const formatCurrency = (number, digits) => {
    const result = number.toLocaleString('pt-BR', {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits
      })
    return result
}

export const formatDate = (data) =>{
  const date = new Date(data)
  return date.toLocaleDateString("pt-BR", { timeZone: "UTC" })
  
}