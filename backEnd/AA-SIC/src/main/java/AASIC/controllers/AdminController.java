package AASIC.controllers;

//import javax.annotation.Resource;
import AASIC.services.AuthenticationService;
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

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/admin")
public class AdminController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authenticationService.login_user(request));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> admin(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authenticationService.register_admin(request));
    }

    @PostMapping("/create_promoter")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authenticationService.register_promoter(request));
    }


}