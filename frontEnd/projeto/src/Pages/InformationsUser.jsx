import NavBarUser from "../Components/NavBar/NavBarUser";
import NavBarPromoter from "../Components/NavBar/NavBarPromoter";
import NavBar from "../Components/NavBar/NavBar";

import easyRoute from "../Images/easyRoute.png"
import fair from "../Images/fair.png"
import { useTranslation } from "react-i18next";


export default function InformationsUser(props){
    const {t} = useTranslation();
    const {type} = props
    return (
        <div>
            {type === 'user' && <NavBarUser selected="home"/>}
            {type === 'promoter' && <NavBarPromoter selected="home"/>}
            {(type !== 'user' && type !== 'promoter') && <NavBar selected="home"/>}
          
          <div className="headersInfoUser">
            <h1 className="titleInfoUser">{t('informationH1')}</h1>
            <h3 className="subtitleInfoUser">{t('informationHeader2')}</h3>
          </div>
          <div className="backgroundGreyInfoUser">
            <h2 className="reasonsTitle">{t('whyUseL8Ticket')}</h2>
            <div className="innerDiv">
                <img  src={easyRoute} alt="" className="widthImageInfoUser"/>
                <div className="textsDiv">
                    <h3>{t('easy')}</h3>
                    <h4 className="descriptionH4">{t('easyDescription')} </h4>
                </div>
            </div>
            <div className="innerDiv">
                <img  src={fair} alt="" />
                <div className="textsDiv2">
                    <h3>{t('fair')}FAIR!</h3>
                    <h4 className="descriptionH4">{t('fairDescription')}</h4>
                </div>
            </div>
          </div>


          <div className="backgroundDarkBlueInfoUser">
          <h2 className="reasonsTitle">{t('ticketPurchaseH3')}</h2>

            <div className="rowTicketPurchase">
                <div className="innerDiv">
                    <div className="textsDivPurchase">
                        <h3>{t('transparencyTitle')}</h3>
                        <h4 className="descriptionH4">{t('transparencyDesc')}</h4>
                    </div>
                </div>
                <div className="innerDiv">
                    <div className="textsDivPurchase">
                        <h3>{t('fairPricesTitle')}</h3>
                        <h4 className="descriptionH4">{t('fairPricesDescription')}</h4>
                    </div>
                </div>
            </div>


            <h2 className="purchaseTitle">{t('howToPurchase')}</h2>
            <div className="innerDiv">

                <div className="textsDivTutorialPurchase">
                    <h3 className="tutorialPurchase">{t('howToPurchaseStep1')}</h3>
                    <h3 className="tutorialPurchase">{t('howToPurchaseStep2')}</h3>
                    <h3 className="tutorialPurchase">{t('howToPurchaseStep3')}</h3>
                    <h3 className="tutorialPurchase">{t('howToPurchaseStep4')}</h3>
                    <h3 className="tutorialPurchase">{t('howToPurchaseStep5')}</h3>
                </div>
            </div>

            </div>

            <div className="backgroundGreyInfoUser">
                <h2 className="reasonsTitle">{t('ticketSelling')}</h2>
                
                <div className="rowTicketPurchase">
                    <div className="innerDiv">
                        <div className="textsDivPurchase">
                            <h3>{t('safe')}</h3>
                            <h4 className="descriptionH4">{t('safeDescription')} </h4>
                        </div>
                    </div>
                    <div className="innerDiv">
                        <div className="textsDivPurchase">
                        <h3>{t('totalControl')}</h3>
                        <h4 className="descriptionH4">{t('totalControlDescription')}</h4>
                        </div>
                    </div>
                </div>
                <h2 className="purchaseTitle">{t('howToListTitle')}</h2>
                <div className="innerDiv">

                    <div className="textsDivTutorialPurchase">
                        <h3 className="tutorialPurchase">{t('howToListStep1')}</h3>
                        <h3 className="tutorialPurchase">{t('howToListStep2')}</h3>
                        <h3 className="tutorialPurchase">{t('howToListStep3')}</h3>
                        <h3 className="tutorialPurchase">{t('howToListStep4')}</h3>
                        <h3 className="tutorialPurchase">{t('howToListStep5')}</h3>
                        <h3 className="tutorialPurchase">{t('howToListStep6')}</h3>
                    </div>
                </div>
            </div>

         <div className="backgroundDarkBlueInfoUser">
          <h2 className="reasonsTitle">{t('promoterTitle')}</h2>
          <div className="innerDiv">

            <div className="textsDivPurchase">
                    <h3>{t('promoterJoinUs')}</h3>
                    <h4 className="descriptionH4">{t('promoterJoinDesc')}</h4>
            </div>
            <div className="textsDivPurchase">
                    <h3>{t('beAPartTitle')}</h3>
                    <h4 className="descriptionH4"> {t('beAPartDesc')}</h4>
            </div>
             
            </div>

            <h2 className="purchaseTitle">{t('howToCreate')}</h2>
            <div className="innerDiv">

                <div className="textsDivTutorialPurchase">
                    <h3 className="tutorialPurchase">{t('howToCreateStep1')}</h3>
                    <h3 className="tutorialPurchase">{t('howToCreateStep2')}</h3>
                    <h3 className="tutorialPurchase">{t('howToCreateStep3')}</h3>
                    <h3 className="tutorialPurchase">{t('howToCreateStep4')}</h3>
                    <h3 className="tutorialPurchase">{t('howToCreateStep5')}</h3>
                </div>
            </div>

            </div>

        </div>
    )
}