package AASIC.config;

import AASIC.repositories.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Esta será uma classe que vai reunir todas as configurações da aplicação
 */
@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    // é necessário ir buscar os utilizadores à base de dados -> precisamos do repositório de utilizadores
    private final UserRepo userRepo;

    // Esta anotação serve para indicar ao spring que este método representa um Bean

    /**
     * Aqui vamos definir o UserDetailsService como um Bean utilizando uma lamdba expression
     */
    @Bean
    public UserDetailsService userDetailsService(){
        // aqui podemos utilizar uma expressão lamdba para implementar o método que precisamos deste service (loadByUsername)
        // o username será recebido como argumento
        return username -> userRepo.findUserByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException(" User not found ! "));
    }

    /**
     * Este objeto é responsável por ir buscar os UserDetails, codificar passwords etc ...
     */
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService()); // refere-se oa bean definido acima
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    /**
     * Aqui vamos criar um bean responsável por gerir as autenticações
     * Neste Bean vamos injetar um bean de configuração de autenticação
     * @param config este bean de configuração de autenticação já tem informação sobre o authentication manager
     * @return
     */

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}