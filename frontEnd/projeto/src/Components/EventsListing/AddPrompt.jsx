import AddButton from "../../Images/plus.png"


export default function AddPrompt() {
	return (
		<div className="addPromptContainer">
			<img src={AddButton} alt="" className="addIcon" />
			<h3 className="h3AddPrompt"> Adicionar Evento</h3>
		</div>
	);
}
