import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import { TypeList } from "../Components/CreateEvent/TypeList"; // Import TypeList component correctly
import { useTranslation } from "react-i18next";

import UserContext from "../Contexts/UserContext"
import NavBarPromoter from "../Components/NavBar/NavBarPromoter";
import PopUpAddType from "../Components/CreateEvent/PopUpAddType";
import PopUpAddArtist from "../Components/CreateEvent/PopUpAddArtist";
import ArtistElem from "../Components/CreateEvent/ArtistElem";
import PopUpAddCategory from "../Components/CreateEvent/PopUpAddCategory";
import PopUpCreateArtist from "../Components/CreateEvent/PopUpCreateArtist";
import PopUpCreateEvent from "../Components/CreateEvent/PopUpCreateEvent";
import add from "../Images/plus.png"
import AddPictureEvent from "../Components/CreateEvent/AddPictureEvent";

export default function CreateEvent(props) {
	const navigate = useNavigate()

	const {suggestedEvent,setSuggestedEvent,addEventInfo,setAddEventInfo} = props
    const {user} = useContext(UserContext);

	const [eventName, setEventName] = useState("");
	const [eventVenue, setEventVenue] = useState("");
	const [eventCategory, setEventCategory] = useState("");
	const [eventDateStart, setEventDateStart] =  useState(createStartInputs());
	const [eventDateEnd, setEventDateEnd] = useState("");
	const [eventTimeStart,setEventTimeStart] = useState("");
	const [eventTimeEnd,setEventTimeEnd] = useState("");
	const [types, setTypes] = useState([]);
	const [artists, setArtists] = useState([]);
	const [image, setImage] = useState("");

	const [popUpTrigger1, setPopUpTrigger1] = useState(false);
	const [popUpTrigger2, setPopUpTrigger2] = useState(false);
	const [popUpTrigger3, setPopUpTrigger3] = useState(false);
	const [popUpTrigger4, setPopUpTrigger4] = useState(false);
	const [popUpConfirm, setPopUpConfirm] = useState(false);
	const [popUpAddPhoto,setPopUpAddPhoto] = useState(false);

	const {t} = useTranslation();


	const [message, setMessage] = useState("");

	const [options, setOptions] = useState([]);
	const [categories, setCategories] = useState([]);


	function createStartInputs(){
		if(suggestedEvent.start_date !== undefined){
			const start = suggestedEvent.start_date.split(" ");
			const dateStartVal = start[0].replace(/\//g, "-");

			return dateStartVal
		}
		return "";
	}


	useEffect(() => {
		getCategories()
		getVenues();
		if (suggestedEvent.name !== undefined) {
			setEventName(suggestedEvent.name);
			setSuggestedEvent({})
		}
		else if (addEventInfo.eventName !== undefined || addEventInfo.eventDateStart !== undefined || addEventInfo.eventDateEnd !== undefined || addEventInfo.eventTimeStart !== undefined || addEventInfo.eventTimeEnd !== undefined || addEventInfo.eventCategory !== undefined){	
			setEventName(addEventInfo.eventName);
			setEventDateStart(addEventInfo.eventDateStart);
			setEventDateEnd(addEventInfo.eventDateEnd);
			setEventTimeStart(addEventInfo.eventTimeStart);
			setEventTimeEnd(addEventInfo.eventTimeEnd);
			setEventCategory(addEventInfo.eventCategory);
			setAddEventInfo("");
		}

	}, [suggestedEvent]);

	useEffect(() => {
		getCategories()
	}, [popUpTrigger3]);



	function getCategories(){
		fetch("http://localhost:8080/api/promoter/get_categories", {
			method: 'GET',
			headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${user.token}`
		}
		})
		.then(response => {
			if (response.ok)
			  return response.json(); // Parse the response JSON
			throw new Error('Network response was not ok.');
		  })
		  .then(data => {
			setCategories(data); // Set the parsed JSON data
		  })
		  .catch(error => {
			console.log(error);
		  });
	}



	function getVenues(){
		fetch("http://localhost:8080/api/promoter/get_venues", {
			method: 'GET',
			headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${user.token}`
		}
		})
		.then(response => {
			if (response.ok)
			  return response.json(); // Parse the response JSON
			throw new Error('Network response was not ok.');
		  })
		  .then(data => {
			setOptions(data); // Set the parsed JSON data
		  })
		  .catch(error => {
			console.log(error);
		  });
	}

	function postEvent(){
		const artistCodes = artists.map((artist) => ({ artist_code: artist.artist_code }));
		const event_date_start_unform = eventDateStart;
		const [year, month, day] = event_date_start_unform.split('-');
		const formattedStart = `${day}/${month}/${year} ${eventTimeStart}:00`;
		const event_date_end_unform = eventDateEnd;
		const [year2, month2, day2] = event_date_end_unform.split('-');
		const formattedEnd = `${day2}/${month2}/${year2} ${eventTimeEnd}:00`;
	
		const input = {
			event_name : eventName,
			event_venue_id : eventVenue.venue_code,
			event_category : eventCategory.category_code,
			event_types : types,
			event_artists : artistCodes,
			event_date_start : formattedStart,
			event_date_end : formattedEnd,		
			image : image
		}

		console.log(input)
		fetch("http://localhost:8080/api/promoter/add_event", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
			body: JSON.stringify(input)

        })
        .then(response => response.json())
        .then(responseJSON => {
			setPopUpConfirm(true)
        })
        .catch(error => {
			setMessage(t('thereWasAnError'))
        });
	}


	function handleAddType(newType) {
		setTypes((prevTypes) => [...prevTypes, newType]);
	}

	function handleRemoveType(type) {
		setTypes((prevTypes) => prevTypes.filter((item) => item !== type));
	}

	function handleAddArtist(newArtist) {
		setArtists((prevArtists) => [...prevArtists, newArtist]);
	}

	function handleRemoveArtist(name) {
		setArtists((prevArtists) =>
		prevArtists.filter((item) => item.artist_name !== name)
		);
	}

	function handleEventNameChange(event) {
		setEventName(event.target.value);
	}


	const handleEventVenueChange = (selectedOption) => {
		if (selectedOption) {
		  const selectedVenue = options.find(
			(venue) => venue.venue_name === selectedOption.venue_name
		  );
		  if (selectedVenue) {
			setEventVenue(selectedVenue);
		  }
		}
	  };

	const handleEventCategoryChange = (selectedOption) => {
		if (selectedOption) {
		  const selectedCategory = categories.find(
			(category) => category.category_name === selectedOption.category_name
		  );
		  if (selectedCategory) {
			setEventCategory(selectedCategory);
		  }
		}
	  };

	function handleEventDateStartChange(event) {
		const dateTemp = new Date(event.target.value);

		if (eventDateEnd !== ""){
			const dateCompare = new Date(eventDateEnd);
			if (dateTemp > dateCompare) {
				setMessage(t('messageDateNotPossible'));
				setEventDateStart("");
			  } else {
				setMessage("");
				setEventDateStart(event.target.value);
			  }
		}
		else{
			setEventDateStart(event.target.value);
		}

	}

	function handleEventDateEndChange(event) {
		const dateTemp = new Date(event.target.value);
		if (eventDateStart !== ""){
			const dateCompare = new Date(eventDateStart);
			if (dateTemp < dateCompare) {
				setMessage(t('messageDateNotPossible'));
				setEventDateEnd("");
			  } else {
				setMessage("");
				setEventDateEnd(event.target.value);
			  }
		}
		else{
			setEventDateEnd(event.target.value);
		}
	}

	function handleEventTimeStartChange(event) {
		setEventTimeStart(event.target.value);
	}

	function handleEventTimeEndChange(event) {
		setEventTimeEnd(event.target.value);
	}


	function openPopType() {
		if (eventDateStart !== "" && eventDateEnd !== "") {
			setPopUpTrigger1(true);
			setMessage("");
		}
		else setMessage(t('messageDateNotPossible'));
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		if (
		eventName === "" ||
		eventVenue === "" ||
		eventDateStart === "" ||
		eventDateEnd === "" ||
		types.length === 0 ||
		artists === 0
		) {
		setMessage(t('messageOneOrMoreIncomplete'));
		setAddEventInfo("");
		}else{
			postEvent();
		}
	};


	function changeToAddVenue(){
		const eventSoFar = {
			eventName : eventName,
			eventCategory : eventCategory,
			eventDateStart : eventDateStart,
			eventDateEnd : eventDateEnd,
			eventTimeStart : eventTimeStart,
			eventTimeEnd : eventTimeEnd
		}
		setAddEventInfo(eventSoFar);
		navigate("/AddVenue")
	}

	return (
		<div>
			<NavBarPromoter selected="events"/>
			<PopUpAddType
				trigger={popUpTrigger1}
				setPopUpTrigger={setPopUpTrigger1}
				onAddType={handleAddType}
				dateStart={eventDateStart}
				dateEnd={eventDateEnd}
			/>
			{popUpTrigger2 && (
				<PopUpAddArtist
				trigger={popUpTrigger2}
				setPopUpTrigger={setPopUpTrigger2}
				setPopUpTriggerCreate={setPopUpTrigger4}
				onAddArtist={handleAddArtist}
				artists={artists}
				/>
			)}

			{popUpTrigger4 && (
				<PopUpCreateArtist
				trigger={popUpTrigger4}
				setPopUpTrigger={setPopUpTrigger4}
				setPopUpTriggerAdd={setPopUpTrigger2}
				onAddArtist={handleAddArtist}
				/>
			)}

			{popUpAddPhoto &&
				<AddPictureEvent 
					setPopUpAddPhoto={setPopUpAddPhoto}
					setImage={setImage}/>}

      		<PopUpCreateEvent trigger={popUpConfirm} setPopUpTrigger={setPopUpConfirm} />

			<PopUpAddCategory
				trigger={popUpTrigger3}
				setPopUpTrigger={setPopUpTrigger3}
			/>
			
			
			<div className="center">
				<div className="defaultContainerCreateEvent">
					<h1>Event Information</h1>
                    <div className="smallContainer">
						<form >

							<div className="smallContainerCreateEventInputs">
								<div className="smallContainerCreateEventLeftSide">
                                	<div>
										<h3 className="createEventLabel">{t('eventName')}</h3>
										<h3 className="createEventLabelSelect">{t('eventCategory')}</h3>
										<h3 className="createEventLabelSelect">{t('eventVenue')}</h3>
										<h3 className="createEventLabel">{t('eventDate')}</h3>
										<h3 className="createEventLabel">{t('eventTime')}</h3>
									
										
									</div>
								</div>
								<div className="smallContainerCreateEventRightSide">
									<div>
										<input className="inputNameEvent" type="text" value={eventName} onChange={handleEventNameChange} />
										<div className="selectContainer">
											<Select
												value={eventCategory}
												onChange={handleEventCategoryChange}
												options={categories}
												getOptionLabel={(option) => option.category_name}
												getOptionValue={(option) => option.category_name}
												placeholder=""
												isSearchable={true}
												styles={{
													control: (provided) => ({
														...provided,
														borderRadius: '10px',
														fontSize: '15px',
														margin: "10px",
													}),
												}}
											/>
											<img src={add} className="addIcon" alt="" onClick={setPopUpTrigger3}/>
										</div>
										<div className="selectContainer">
											<Select
												value={eventVenue}
												onChange={handleEventVenueChange}
												options={options}
												getOptionLabel={(option) => option.venue_name}
												getOptionValue={(option) => option}
												placeholder=""
												isSearchable={true}
												styles={{
													control: (provided) => ({
													...provided,
													borderRadius: '10px',
													fontSize: '15px',
													margin: "10px",
													}),
												}}
											/>
											<img src={add} className="addIcon" alt="" onClick={changeToAddVenue}/>
										</div>
										<div className="createEventDateInput">
											<input className="inputFormCreateEvent" type="date" value={eventDateStart} onChange={handleEventDateStartChange}/>
											<input className="dateFormCreateEvent2" type="date" value={eventDateEnd} onChange={handleEventDateEndChange} />
										</div>
										<div className="createEventDateInput">
											<input className="inputFormCreateEvent" type="time" value={eventTimeStart} onChange={handleEventTimeStartChange} />
											<input className="dateFormCreateEvent2" type="time" value={eventTimeEnd} onChange={handleEventTimeEndChange} />
										</div>

										
									</div>
								</div>
							</div>

							<div className="inputsFlexible">
								<div className="flexibleLeftSide">
									<div className="div2CreateEvent">
										<div className="divCreateEventTitle">
											<h3>{t('tickeTypesHeader')}</h3>
											<img src={add} alt="" className="addIconToTitle" onClick={openPopType}/>
										</div>
									</div>
								</div>
								<div className="flexibleRightSide">
									
									<div className="div2CreateEvent">
										<div className="divCreateEventTitle">
											<h3>{t('artists')}</h3>
											<img src={add} alt="" className="addIconToTitle" onClick={() => setPopUpTrigger2(true)}/>
										</div>
									</div>
								</div>
							</div>


							<div className="inputsFlexible">
								<div className="flexibleLeftSide">
									<div className="div1CreateEvent">
										<div>
											{types.map((value, index) => (
												<TypeList
													key={index}
													type={value}
													onRemoveType={handleRemoveType}
												/>
											))}
										</div>
									</div>
								</div>
								<div className="flexibleRightSide">
									
									<div className="div2CreateEvent">
										<div>
											{artists.map((value, index) => (
												<ArtistElem
													key={index}
													artist={value.artist_name}
													onRemoveArtist={handleRemoveArtist}
												/>
											))}
										</div>
									</div>
								</div>
							</div>


							<div className="divButtonCreatePromoter">
								<h3 className="redH3">{message}</h3>
							</div>
						</form>
						<div className="center">
								<div className="divButtonsCreatePromoter">
									<button className="button" onClick={handleSubmit} >{t('submit')}</button>
									<button className="button"  value="Add Photo" onClick={() => setPopUpAddPhoto(true)}>{t('addEventPhoto')}</button>
								</div>
							</div>
					</div>
				</div>
			</div>
		</div>
	);
}