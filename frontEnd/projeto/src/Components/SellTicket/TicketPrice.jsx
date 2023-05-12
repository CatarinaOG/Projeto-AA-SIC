import { useState, useRef, useEffect } from "react";

export default function TicketPrice(props){

    const {ticket,setTicket,setFase} = props;

    const [error,setError] = useState(0)

    const price = ticket.type.price
    const maxPrice = price + price * 0.1

    function handleEnter(event){
        if (event.key === "Enter") {
            if(event.target.value < maxPrice){
                setFase("description");
            }
            else
                setError(1); // price to high
        }
    };

    function handleChange(event){
        setTicket( oldTicket => ({...oldTicket,price:event.target.value}))
    }

    const toTitleRef = useRef(null)

    useEffect(() => {
        if (toTitleRef.current) {
            toTitleRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, []);

    return(
        <div>
            <div ref={toTitleRef} className="priceContainer">

                <div className="priceInputContainer">
                    <p className="dollarSign">$</p>
                    <input className="inputPrice" onKeyDown={handleEnter} onChange={handleChange} value={ticket.price} type="number"/>
                </div>

                <p className="maxPrice">Max: {maxPrice}$</p>
            </div>

            { error === 1 && 
                <div className="center">
                    <p className="errorPrice">Price submitted to high!</p>
                </div>
            }

        </div>
    )

    // alterar a variavel de max para ser o valor devolvido pelo pedido ou fazer eu

}