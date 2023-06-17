import { useNavigate } from 'react-router-dom';
import AddButton from "../../Images/plus.png"


export default function AddPrompt() {

    const navigate = useNavigate();


	function addEvent(){
		navigate('/AddEvent')
	}

	return (
		<div className="addPromptContainer">
			<img src={AddButton} alt="" className="addIcon" />
			<h3 className="h3AddPrompt" onClick={addEvent}> Adicionar Evento</h3>
		</div>
	);
}
