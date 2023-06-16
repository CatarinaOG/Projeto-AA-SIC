package AASIC.services;

import AASIC.config.JWTService;
import AASIC.controllers.AuthenticationRequest;
import AASIC.controllers.AuthenticationResponse;
import AASIC.controllers.RegisterRequest;
import AASIC.model.Role;
import AASIC.model.User;
import AASIC.repositories.UserRepo;
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
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Com os dados recebidos no request vamos construir um novo utilizador
     * A este novo utilizador vamos atribuir a Role de User
     * @param request
     * @return
     */
    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
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

    public AuthenticationResponse login(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
        var user = userRepo.findUserByEmail(request.getEmail())
                .orElseThrow();

        /**
         * Depois de se confirmar que o utilizador existe e a password está correta podemos criar um jwt e enviar na resposta
        */
        var jwt = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwt)
                .build();
    }
}
