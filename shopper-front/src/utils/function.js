

export const formatCurrency = (number, digits) => {
    const result = number.toLocaleString('pt-BR', {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits
      })
    return result
}

export const formatDate = (data) =>{
  const date = new Date(data)
  const dia  = date.getDate().toString()
  const diaF = (dia.length === 1) ? '0' + dia : dia
  const mes  = (date.getMonth()+1).toString() //+1 pois no getMonth Janeiro começa com zero.
  const mesF = (mes.length === 1) ? '0' + mes : mes
  const anoF = date.getFullYear();

  return diaF + "/" + mesF + "/" + anoF;
  
}