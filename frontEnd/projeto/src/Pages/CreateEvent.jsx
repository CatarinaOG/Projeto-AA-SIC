import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import { TypeList } from "../Components/CreateEvent/TypeList"; // Import TypeList component correctly

import UserContext from "../Contexts/UserContext"
import NavBarPromoter from "../Components/NavBar/NavBarPromoter";
import AddButton from "../Images/add.png";
import PopUpAddType from "../Components/CreateEvent/PopUpAddType";
import PopUpAddArtist from "../Components/CreateEvent/PopUpAddArtist";
import ArtistElem from "../Components/CreateEvent/ArtistElem";
import PopUpAddCategory from "../Components/CreateEvent/PopUpAddCategory";
import PopUpCreateArtist from "../Components/CreateEvent/PopUpCreateArtist";
import PopUpCreateEvent from "../Components/CreateEvent/PopUpCreateEvent";

export default function CreateEvent(props) {
	const navigate = useNavigate()

	const {suggestedEvent,addEventInfo,setAddEventInfo} = props
    const {user} = useContext(UserContext);


	const [eventName, setEventName] = useState("");
	const [eventVenue, setEventVenue] = useState("");
	const [eventCategory, setEventCategory] = useState("");
	const [eventDateStart, setEventDateStart] = useState("");
	const [eventDateEnd, setEventDateEnd] = useState("");
	const [eventTimeStart,setEventTimeStart] = useState("");
	const [eventTimeEnd,setEventTimeEnd] = useState("");
	const [types, setTypes] = useState([]);
	const [artists, setArtists] = useState([]);

	const [popUpTrigger1, setPopUpTrigger1] = useState(false);
	const [popUpTrigger2, setPopUpTrigger2] = useState(false);
	const [popUpTrigger3, setPopUpTrigger3] = useState(false);
	const [popUpTrigger4, setPopUpTrigger4] = useState(false);
	const [popUpConfirm, setPopUpConfirm] = useState(false);



	const [message, setMessage] = useState("");

	const [options, setOptions] = useState([]);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		getCategories()
		getVenues();
		if (suggestedEvent.event_name !== undefined) {
		console.log(suggestedEvent.event_name)
		setEventName(suggestedEvent.event_name);
		setEventDateStart(suggestedEvent.start_date);
		setEventDateEnd(suggestedEvent.end_date);
		setEventTimeStart(suggestedEvent.start_time);
		setEventTimeEnd(suggestedEvent.end_time);
		}
		else if (addEventInfo.eventName !== undefined || addEventInfo.eventDateStart !== undefined || addEventInfo.eventDateEnd !== undefined || addEventInfo.eventTimeStart !== undefined || addEventInfo.eventTimeEnd !== undefined || addEventInfo.eventCategory !== undefined){	
			console.log("ENTREI ACOLÁ")
			setEventName(addEventInfo.eventName);
			setEventDateStart(addEventInfo.eventDateStart);
			setEventDateEnd(addEventInfo.eventDateEnd);
			setEventTimeStart(addEventInfo.eventTimeStart);
			setEventTimeEnd(addEventInfo.eventTimeEnd);
			setEventCategory(addEventInfo.eventCategory);
			setAddEventInfo("");
		}
	}, []);

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
			event_date_end : formattedEnd
		}

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
            console.log(responseJSON)
			setPopUpConfirm(true)
        })
        .catch(error => {
			setMessage("There was an error")
            console.log(error)
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
			console.log(selectedVenue.venue_name);
			console.log(selectedVenue.venue_code);
			setEventVenue(selectedVenue);
		  }
		}
	  };

	const handleEventCategoryChange = (selectedOption) => {
		console.log(selectedOption)
		if (selectedOption) {
		  const selectedCategory = categories.find(
			(category) => category.category_name === selectedOption.category_name
		  );
		  if (selectedCategory) {
			console.log(selectedCategory.category_name);
			console.log(selectedCategory.category_code);
			setEventCategory(selectedCategory);
		  }
		}
	  };

	function handleEventDateStartChange(event) {
		const dateTemp = new Date(event.target.value);

		if (eventDateEnd !== ""){
			const dateCompare = new Date(eventDateEnd);
			if (dateTemp > dateCompare) {
				setMessage("Date is not possible");
				setEventDateStart("");
			  } else {
				setMessage("");
				setEventDateStart(event.target.value);
			  }
		}
		else{
			console.log(event.target.value);
			setEventDateStart(event.target.value);
		}

	}

	function handleEventDateEndChange(event) {
		const dateTemp = new Date(event.target.value);
		if (eventDateStart !== ""){
			const dateCompare = new Date(eventDateStart);
			if (dateTemp < dateCompare) {
				setMessage("Date is not possible");
				setEventDateEnd("");
			  } else {
				setMessage("");
				setEventDateEnd(event.target.value);
			  }
		}
		else{
			console.log(event.target.value);
			setEventDateEnd(event.target.value);
		}
	}

	function handleEventTimeStartChange(event) {
		setEventTimeStart(event.target.value);
	}

	function handleEventTimeEndChange(event) {
		console.log(event.target.value);
		setEventTimeEnd(event.target.value);
	}


	function openPopType() {
		if (eventDateStart !== "" && eventDateEnd !== "") {
		setPopUpTrigger1(true);

		if (message === "Add dates first") {
			setMessage("");
		}
		} else setMessage("Add dates first");
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
		setMessage("There are one or more fields empty");
		setAddEventInfo("");
		}else{
			const artistCodes = artists.map((artist) => ({ artist_code: artist.artist_code }));
			const event_date_start_unform = eventDateStart;
			const [year, month, day] = event_date_start_unform.split('-');
			const formattedStart = `${day}/${month}/${year} ${eventTimeStart}`;
			const event_date_end_unform = eventDateEnd;
			const [year2, month2, day2] = event_date_end_unform.split('-');
			const formattedEnd = `${day2}/${month2}/${year2} ${eventTimeEnd}`;
		
			const input = {
				event_name : eventName,
				event_venue_id : eventVenue.venue_code,
				event_category : eventCategory.category_code,
				event_types : types,
				event_artists : artistCodes,
				event_date_start : formattedStart,
				event_date_end : formattedEnd
			}
			console.log(JSON.stringify(input))
			postEvent();
		}
	};


	function changeToAddVenue(){
		console.log(eventName)
		const eventSoFar = {
			eventName : eventName,
			eventCategory : eventCategory,
			eventDateStart : eventDateStart,
			eventDateEnd : eventDateEnd,
			eventTimeStart : eventTimeStart,
			eventTimeEnd : eventTimeEnd
		}
		console.log(eventSoFar);
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
				triggerCreate={popUpTrigger4}

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

      		<PopUpCreateEvent trigger={popUpConfirm} setPopUpTrigger={setPopUpConfirm} />

			<PopUpAddCategory
				trigger={popUpTrigger3}
				setPopUpTrigger={setPopUpTrigger3}
			/>
			<div className="center">
				<div className="defaultContainer">
					<h1 className="h1CreateEvent">Event Information</h1>
					<form className="formContainer" onSubmit={handleSubmit}>
						<div className="divFormCreateEvent">
							<h2 className="h2FormCreateEvent">Event Name</h2>
							<input className="inputFormCreateEvent" type="text" value={eventName} onChange={handleEventNameChange}/>
						</div>
						<div className="divFormCreatePromoter">
							<h2 className="h2FormCreatePromoter">Category</h2>
							<div className="dateFormContainer">
								<Select
									className="inputVenueCreateEvent"
									value={eventCategory}
									onChange={handleEventCategoryChange}
									options={categories}
									getOptionLabel={(option) => option.category_name}
									getOptionValue={(option) => option.category_name}
									placeholder=""
									isSearchable={true}
									/>

								<h4 className="underlined" onClick={setPopUpTrigger3}>Add New</h4>
							</div>
						</div>
						<div className="divFormCreatePromoter">
							<h2 className="h2FormCreatePromoter">Venue</h2>
							<div className="dateFormContainer">
							
								<Select
									className="inputVenue"
									value={eventVenue}
									onChange={handleEventVenueChange}
									options={options}
									getOptionLabel={(option) => option.venue_name}
									getOptionValue={(option) => option}
									placeholder=""
									isSearchable={true}
									/>
								<h4 className="underlined" onClick={changeToAddVenue}>Add New</h4>
							</div>
						</div>
						<div className="divFormCreatePromoter">
							<h2 className="h2FormCreatePromoter">Date(Start/End)</h2>
							<div className="dateFormContainer">
								<input className="inputFormCreateEvent" type="date" value={eventDateStart} onChange={handleEventDateStartChange}/>
								<input className="dateFormCreateEvent2" type="date" value={eventDateEnd} onChange={handleEventDateEndChange} />
							</div>
						</div>
						<div className="divFormCreatePromoter">
							<h2 className="h2FormCreatePromoter">Time(Start/End)</h2>
							<div className="dateFormContainer">
								<input className="inputFormCreateEvent" type="time" value={eventTimeStart} onChange={handleEventTimeStartChange} />
								<input className="dateFormCreateEvent2" type="time" value={eventTimeEnd} onChange={handleEventTimeEndChange} />
							</div>
						</div>
						<div className="divFormCreateEvent">
							<div className="div1CreateEvent">
								<div className="divCreateEventTitle">
									<h2>Create Ticket Types</h2>
									<img src={AddButton} alt="" className="addIcon" onClick={openPopType}/>
								</div>
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
							<div className="div2CreateEvent">
								<div className="divCreateEventTitle">
									<h2>Artist</h2>
									<img src={AddButton} alt="" className="addIcon" onClick={() => setPopUpTrigger2(true)}/>
								</div>
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
						<div className="divButtonCreatePromoter">
							<h3 className="redH3">{message}</h3>
						</div>
						<div className="divButtonCreatePromoter">
							<input className="button" type="submit" value="Submit" />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
