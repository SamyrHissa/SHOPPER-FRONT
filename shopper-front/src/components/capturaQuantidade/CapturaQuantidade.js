import { useContext, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react/cjs/react.development";
import GlobalContext from "../../global/GlobalContext"
import { formatCurrency } from "../../utils/function";

export const CapturaQuantidade = () => {
    const history = useHistory()
    const {states, setters, requests} = useContext(GlobalContext)
    const [quantidade, setQuantidade] = useState(1)
    useEffect(()=>{
        atualizaQuantidadeAlteracao()
    },[])
    const atualizaQuantidadeAlteracao = () => {
        if(states.acaoDetailPage === "Alterar"){
            setQuantidade(states.productSelected.qty_requested)
        }
        
    }
    const steepQty = (operacao = "+") => {
        
        switch(operacao){
            case '+':
                setQuantidade(quantidade + 1)
                break
            case '-':
                if(quantidade > 1){
                    setQuantidade(quantidade - 1)
                }
                break
        }
    }
    const getProduct = (id) => {
        const result = states.products.filter((product)=>{
          return id === product.id          
        })
        return result
    }
    const onChangeQuantidade = (e) => {
        setQuantidade(e.target.value)
    }
    const onClickIncluir = () => {
        if(states.acaoDetailPage === "Incluir"){
            const newItem = {
                "order_id": states.orderSelected.Order_id,
                "product_id": states.productSelected.id,
                "qty_requested": quantidade
            }
            requests.addItemOrder(history, newItem)
        } else {
            const newItem = {
                "item_id": states.productSelected.item_id,
                "qty_alter": quantidade
            }
            
            requests.alterItemOrder(history, newItem)
            setters.setAcaoDetailPage('')
        }
    }
    return(
        <div>
            <div className="input-group">
                <input type="text" className="form-control" 
                    placeholder={states.productSelected ? getProduct(states.productSelected.id)[0].name : "Selecione um produto"} 
                    aria-label="Recipient's username with two button addons" aria-describedby="button-addon4" />
                <input className="text-right" style={{width: "80px", fontSize: "0.7em"}} placeholder="Quantidade"
                    value={quantidade}
                    onChange={onChangeQuantidade}
                />
                <div className="input-group-append ml-2">
                    <span className="input-group-text">R$ UNIT.</span>
                    <span className="input-group-text">
                        {states.productSelected ? formatCurrency(getProduct(states.productSelected.id)[0].price, 2) : "0,00"}
                    </span>
                </div>
                <div className="input-group-append ml-2 mr-2">
                    <span className="input-group-text">R$ TOTAL</span>
                    <span className="input-group-text">
                        {states.productSelected ? formatCurrency(quantidade * getProduct(states.productSelected.id)[0].price, 2) : "0,00"}
                    </span>
                </div>
                <div className="input-group-append" id="button-addon4">
                    <button className="btn btn-outline-secondary" type="button" onClick={()=>steepQty('+')}>+</button>
                    <button className="btn btn-outline-secondary" type="button" onClick={()=>steepQty('-')}>-</button>
                    <button className="btn btn-outline-primary ml-3 mr-2" type="button" onClick={()=>onClickIncluir()}>{states.acaoDetailPage}</button>
                    <button className="btn btn-outline-danger" onClick={()=>setters.setAcaoDetailPage('')} type="button">Cancelar</button>
                </div>
            </div>
            {states.productSelected ? 
                getProduct(states.productSelected.id)[0].qty_stock < quantidade ? <div className="alert alert-danger" role="alert">
                        Quantidade maior que o estoque ( {getProduct(states.productSelected.id)[0].qty_stock} )
                    </div> : <></> : <></>}
        </div>
    )
}