package AASIC.controllers;

//import javax.annotation.Resource;
import AASIC.responses.GetFullEventRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import org.json.*;
import AASIC.model.*;
import AASIC.repositories.*;

@RestController
@RequestMapping(path = "/api/event")
public class EventController {

    @GetMapping(value = "testing")
    public ResponseEntity<String> test(){
        return ResponseEntity.ok("THIS IS A TEST ");
    }


    //@PostMapping(value = "/get_full_event")
    //public ResponseEntity<GetFullEventRequest> get


}