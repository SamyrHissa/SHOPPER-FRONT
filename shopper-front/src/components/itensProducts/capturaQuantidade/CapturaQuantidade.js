import { useContext, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import GlobalContext from "../../../global/GlobalContext"

export const CapturaQuantidade = (props) => {
    const history = useHistory()
    const {states, setters, requests} = useContext(GlobalContext)
    const [quantidade, setQuantidade] = useState(1)
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
    const onChangeQuantidade = (e) => {
        setQuantidade(e.target.value)
    }
    const onClickIncluir = () => {
        const newItem = {
            "order_id": states.orderSelected.Order_id,
            "product_id": props.productSelected.id,
            "qty_requested": quantidade
        }
        requests.addItemOrder(history, newItem)
    }
    return(
        <div class="input-group">
            <input type="text" class="form-control" placeholder={props.productSelected.name} aria-label="Recipient's username with two button addons" aria-describedby="button-addon4" />
            <input className="text-right" style={{width: "100px", fontSize: "0.7em"}} placeholder="Quantidade"
                value={quantidade}
                onChange={onChangeQuantidade}
            />

            <div class="input-group-append" id="button-addon4">
                <button class="btn btn-outline-secondary" type="button" onClick={()=>steepQty('+')}>+</button>
                <button class="btn btn-outline-secondary" type="button" onClick={()=>steepQty('-')}>-</button>
                <button class="btn btn-outline-primary ml-3 mr-2" type="button" onClick={()=>onClickIncluir()}>Incluir</button>
                <button class="btn btn-outline-danger" onClick={()=>setters.setAcaoDetailPage('')} type="button">Cancelar</button>
            </div>
        </div>
    )
}