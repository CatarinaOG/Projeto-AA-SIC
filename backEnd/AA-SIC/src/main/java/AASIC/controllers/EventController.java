package AASIC.controllers;

//import javax.annotation.Resource;
import AASIC.requests.GetFilteredEventsRequest;
import AASIC.requests.GetFullEventRequest;
import AASIC.requests.GetTicketTypesEventRequest;
import AASIC.responses.*;
import AASIC.services.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import org.json.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/event")
public class EventController {

    private final EventService eventService;

    @PostMapping  ( "/get_full_event")
    public ResponseEntity<GetFullEventResponse> get_full_event(@RequestBody GetFullEventRequest request){
        return ResponseEntity.ok(eventService.get_full_event(request));
    }

    @GetMapping("/get_ticket_types_event")
    public ResponseEntity<List<GetTicketTypesEventReponse>> get_ticket_types_event(@RequestBody GetTicketTypesEventRequest request){
        return ResponseEntity.ok(eventService.get_ticket_types_event(request));

    }

    @GetMapping("/get_filters_events")
    public ResponseEntity<GetFiltersResponse> get_filters_events(){
        return ResponseEntity.ok(eventService.get_filters_events());
    }

    @GetMapping("/get_events")
    public ResponseEntity<List<GetEventsResponse>> get_events(){
        return ResponseEntity.ok(eventService.get_events());
    }

    @PostMapping("/get_filtered_events")
    public ResponseEntity<List<GetFilteredEventsResponse>> get_filtered_events(@RequestBody GetFilteredEventsRequest request){
        return ResponseEntity.ok(eventService.get_filtered_events(request));
    }

}