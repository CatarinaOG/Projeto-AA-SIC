import AddButton from "../../Images/add.png";

export default function AddPrompt() {
  return (
    <a href="">
      <div className="addPromptContainer">
        <img src={AddButton} alt="" className="addIcon" />
        <h3 className="h3AddPrompt"> Adicionar Evento</h3>
      </div>
    </a>
  );
}
