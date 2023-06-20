import { useNavigate } from 'react-router-dom';
import AddButton from "../../Images/plus.png"

import { useTranslation } from "react-i18next";



export default function AddPrompt() {
	const {t} = useTranslation();

    const navigate = useNavigate();


	function addEvent(){
		navigate('/AddEvent')
	}

	return (
		<div className="addPromptContainer">
			<img src={AddButton} alt="" className="addIcon" />
			<h3 className="h3AddPrompt" onClick={addEvent}> {t('addEvent')}</h3>
		</div>
	);
}
