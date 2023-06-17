package AASIC.services;

import AASIC.config.JWTService;
import AASIC.controllers.AuthenticationRequest;
import AASIC.controllers.AuthenticationResponse;
import AASIC.controllers.RegisterRequest;
import AASIC.model.Promoter;
import AASIC.model.Role;
import AASIC.model.User;
import AASIC.repositories.UserRepo;
import AASIC.repositories.PromoterRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepo userRepo;
    private final PromoterRepo promoterRepo;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Com os dados recebidos no request vamos construir um novo utilizador
     * A este novo utilizador vamos atribuir a Role de User
     * @param request
     * @return
     */
    public AuthenticationResponse register_user(RegisterRequest request) {
        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepo.save(user);
        var jwt = jwtService.generateToken(user);

        /**
         * Aqui vamos devolver o token criado ao utilizador
         */
        return AuthenticationResponse.builder()
                .token(jwt)
                .build();
    }

    public AuthenticationResponse login_user(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
        var user = userRepo.findUserByEmail(request.getEmail())
                .orElseThrow();


        /**
         * Depois de se confirmar que o utilizador existe e a password está correta podemos criar um jwt e enviar na resposta
        */
        var jwt = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwt)
                .type("user")
                .profile_pic(user.getProfile_pic())
                .name(user.getName())
                .phone(user.getPhone())
                .language(user.getLanguage())
                .card_number(user.getCard_number())
                .card_cvc(user.getCard_cvc())
                .build();
    }

    public AuthenticationResponse register_promoter(RegisterRequest request) {
        var promoter = Promoter.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        promoterRepo.save(promoter);
        var jwt = jwtService.generateToken(promoter);

        /**
         * Aqui vamos devolver o token criado ao utilizador
         */
        return AuthenticationResponse.builder()
                .token(jwt)
                .build();
    }

    public AuthenticationResponse login_promoter(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
        var promoter = promoterRepo.findPromoterByEmail(request.getEmail())
                .orElseThrow();


        /**
         * Depois de se confirmar que o utilizador existe e a password está correta podemos criar um jwt e enviar na resposta
         */
        var jwt = jwtService.generateToken(promoter);
        return AuthenticationResponse.builder()
                .token(jwt)
                .type("promoter")
                .name(promoter.getName())
                .build();
    }
}
