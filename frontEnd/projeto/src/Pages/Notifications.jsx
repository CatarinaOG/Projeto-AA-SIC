import NavBarUser from "../Components/NavBar/NavBarUser";
import PopUpRemoveListing from "../Components/SellingListing/PopUpRemoveListing";
import { useTranslation } from "react-i18next";

import { useState ,useContext , useEffect} from "react";
import UserContext from "../Contexts/UserContext";
import NotificationElem from "../Components/Notifications/NotificationElem";



export default function Notifications() {
  const {user} = useContext(UserContext);
	const {t} = useTranslation();
  const [notifications, setNotifications] = useState([
    {
      title: "New on Ticket Sale!",
      content: "Get in there m8!",
      date : "19/19/2023"
    },
  ]);
  const [popUpTrigger, setPopUpTrigger] = useState(false);


  const notificationList = notifications.map((notification) => {
    return <NotificationElem notification={notification} removeNotif={removeNotif}/>;
  });

  function getNotifications(){
		fetch("http://localhost:8080/api/user/get_notifications", {
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
      console.log(data)
    setNotifications(data);
      
      })
		.catch(error => {
			console.log(error)
		});
	}


  useEffect(() => {
    getNotifications();
  }, []);



	function removeNotif(notification_id){

		const input = {
			notification_id : notification_id
		}

		console.log("Input was" + JSON.stringify(input))
		console.log(user.token)

		fetch("http://localhost:8080/api/user/remove_notification", {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			  'Authorization': `Bearer ${user.token}`
			},
			body: JSON.stringify(input)
		})
		.then(response => {
			if (response.ok) {
			  return response.json();
			} else {
			  throw new Error('Error: ' + response.status);
			}
		  })
		  .then(responseJSON => {
			if (responseJSON.confirmed === "true"){
				getNotifications();
			}
			else{
				console.log("Correu Mal")
			}
		  })
		  .catch(error => {
			console.log('Error:', error);
		  });
	}


  


  return (
    <div>
      <NavBarUser selected="home"/>

      <PopUpRemoveListing
        trigger={popUpTrigger}
        setPopUpTrigger={setPopUpTrigger}
        type={"saved"}
      />
      
      <div className="center">
        <div className="defaultContainer">
          <h1>{t('notificationsH1')}</h1>
          <div className="eventsContainer">{notificationList}</div>
        </div>
      </div>
    </div>
  );
}
