import NavBarUser from "../Components/NavBar/NavBarUser";
import easyRoute from "../Images/easyRoute.png"
import fair from "../Images/fair.png"


export default function InformationsUser(){
    return (
        <div>
          <NavBarUser selected="home"/>
          <div className="headersInfoUser">
            <h1 className="titleInfoUser">The safest way to buy and sell tickets!</h1>
            <h3 className="subtitleInfoUser">L8TICKET is the perfect place to enchange tickets to various events</h3>
          </div>
          <div className="backgroundGreyInfoUser">
            <h2 className="reasonsTitle">Why use L8TICKET?</h2>
            <div className="innerDiv">
                <img  src={easyRoute} alt="" className="widthImageInfoUser"/>
                <div className="textsDiv">
                    <h3>EASY!</h3>
                    <h4 className="descriptionH4">With our platform, it's easy to place a ticket on sale with a few clicks. You just have to upload necessary ticket info and wait for a buyer. The payment is done through our pplatform up to 3 days after the purchase is finalized. Buying tickets is as easy, with a quick search you can access and follow and event on the platform </h4>
                </div>
            </div>
            <div className="innerDiv">
                <img  src={fair} alt="" />
                <div className="textsDiv2">
                    <h3>FAIR!</h3>
                    <h4 className="descriptionH4">L8TICKET protects it's consumers from predatory prices tipically found in other resale situations by placing a price cap on the selling of tickets</h4>
                </div>
            </div>
          </div>


          <div className="backgroundDarkBlueInfoUser">
          <h2 className="reasonsTitle">Ticket Purchase</h2>

            <div className="rowTicketPurchase">
            <div className="innerDiv">
                <div className="textsDivPurchase">
                    <h3>Transparency!</h3>
                    <h4 className="descriptionH4"> The buyer can see the name of the person to whose ticket they are buying along with a description with the reason why they are selling. These details enhance the trust of the buyer in the process.</h4>
                </div>
            </div>
            <div className="innerDiv">
                <div className="textsDivPurchase">
                    <h3>Fair Prices!</h3>
                    <h4 className="descriptionH4">The prices made available are capped by a percentage above the price set by the promoter of the event. This allows for protection agains price-gouging found in other websites. This way, the buyer always knows the price being paid is fair.</h4>
                </div>
            </div>
            </div>
            
          </div>




        </div>
    )
}