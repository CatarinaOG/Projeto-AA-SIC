package AASIC.controllers;

//import javax.annotation.Resource;
import AASIC.requests.GetTicketTypesEventRequest;
import AASIC.requests.RemoveSavedEventRequest;
import AASIC.responses.GetFullEventRequest;
import AASIC.responses.GetTicketTypesEventReponse;
import AASIC.services.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import org.json.*;
import AASIC.model.*;
import AASIC.repositories.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/event")
public class EventController {

    private final EventService eventService;

    @GetMapping(value = "testing")
    public ResponseEntity<String> test(){
        return ResponseEntity.ok("THIS IS A TEST ");
    }


    //@PostMapping(value = "/get_full_event")
    //public ResponseEntity<GetFullEventRequest> get

    @GetMapping(value = "/get_ticket_types_event")
    public ResponseEntity<List<GetTicketTypesEventReponse>> get_ticket_types_event(@RequestBody GetTicketTypesEventRequest request){

        return ResponseEntity.ok(eventService.get_ticket_types_event(request));

    }

}