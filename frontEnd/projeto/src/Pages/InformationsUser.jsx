import NavBarUser from "../Components/NavBar/NavBarUser";
import NavBarPromoter from "../Components/NavBar/NavBarPromoter";
import NavBar from "../Components/NavBar/NavBar";

import easyRoute from "../Images/easyRoute.png"
import fair from "../Images/fair.png"


export default function InformationsUser(props){
    const {type} = props
    return (
        <div>
            {type === 'user' && <NavBarUser selected="home"/>}
            {type === 'promoter' && <NavBarPromoter selected="home"/>}
            {(type !== 'user' && type !== 'promoter') && <NavBar selected="home"/>}
          
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
                    <h4 className="descriptionH4">L8TICKET protects it's consumers from predatory prices tipically found in other resale situations by placing a price cap on the selling of tickets. This also allows for the promoters to be involved in our company in a way that benefits them.</h4>
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


            <h2 className="purchaseTitle">How to Purchase?</h2>
            <div className="innerDiv">

                <div className="textsDivTutorialPurchase">
                    <h3 className="tutorialPurchase">1. Browse for an event!</h3>
                    <h3 className="tutorialPurchase">2. Check for ticket availabiliy!</h3>
                    <h3 className="tutorialPurchase">3. Choose a ticket!</h3>
                    <h3 className="tutorialPurchase">4. Complete payment with the method of your choice! </h3>
                    <h3 className="tutorialPurchase">5. CONGRATS! You just bought a ticket for your sought-after event! You can access the tickets through the Navigation Bar! </h3>
                </div>
            </div>

            </div>

            <div className="backgroundGreyInfoUser">
                <h2 className="reasonsTitle">Tickets Selling</h2>
                
                <div className="rowTicketPurchase">
                    <div className="innerDiv">
                        <div className="textsDivPurchase">
                            <h3>SAFE!</h3>
                            <h4 className="descriptionH4"> Our platform allows for the selling of tickets with the knowledge that payment is always guaranteed. After listing the ticket, the buyer just has to wait, and when the ticket is sold, the value is transfered to the account!</h4>
                        </div>
                    </div>
                    <div className="innerDiv">
                        <div className="textsDivPurchase">
                        <h3>Total Control!</h3>
                        <h4 className="descriptionH4">L8TICKET allows for the seller to list and delist the ticket types at will. This allows for the seller to remove the ticket if the reason for selling the ticket no longer applies or they have changed their mind. </h4>
                        </div>
                    </div>
                </div>
                <h2 className="purchaseTitle">How to List a ticket?</h2>
                <div className="innerDiv">

                    <div className="textsDivTutorialPurchase">
                        <h3 className="tutorialPurchase">1. Select the option in the Navigation Bar!</h3>
                        <h3 className="tutorialPurchase">2. Select the event for which you plan to list a ticket!</h3>
                        <h3 className="tutorialPurchase">3. Choose the Ticket Type!</h3>
                        <h3 className="tutorialPurchase">4. Put a price on your Ticket! You can add a description if you want!</h3>
                        <h3 className="tutorialPurchase">5. Add the ticket from your system's files! </h3>
                        <h3 className="tutorialPurchase">6. CONGRATS! You just listed your ticket to the whole user base! After this, you can check the listing status on the apropriate option in the navigation bar! </h3>
                    </div>
                </div>
            </div>

         <div className="backgroundDarkBlueInfoUser">
          <h2 className="reasonsTitle">Are you a Promoter? L8Ticket is also for you!</h2>
          <div className="innerDiv">

            <div className="textsDivPurchase">
                    <h3>Join us!</h3>
                    <h4 className="descriptionH4"> Our wonderful plataform is made possible by people like you! Our amazing team of administrators will create an account for you upon request.  After that, there's various possibilities for you to interact with L8TICKET in a way that positively impacts the industry, your promoter and the  concert goers</h4>
            </div>
            <div className="textsDivPurchase">
                    <h3>By part of L8Ticket us!</h3>
                    <h4 className="descriptionH4">  You can create events for users to list and buy tickets. You can add events from your company that were not previously there, based on users suggestions. You can add new Artists, Venues and Event categories that can be reused by you or your fellow colleagues! </h4>
            </div>
             
            </div>

            <h2 className="purchaseTitle">How to create events?</h2>
            <div className="innerDiv">

                <div className="textsDivTutorialPurchase">
                    <h3 className="tutorialPurchase">1. Select the Events listing in the Navigation Bar!</h3>
                    <h3 className="tutorialPurchase">2. Fill out the necessary information. If need be, you can add a new Venue or Artist(s)</h3>
                    <h3 className="tutorialPurchase">3. Add a picture to be associated with your event!</h3>
                    <h3 className="tutorialPurchase">4. Finally, submit your event and allow our users to interact with it! </h3>
                    <h3 className="tutorialPurchase">5. You can check your events at any time in the listing, also being able to delete them in case of cancellation. </h3>
                </div>
            </div>

            </div>

        </div>
    )
}