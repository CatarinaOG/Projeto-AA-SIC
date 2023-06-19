package AASIC.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Nesta classe vamos indicar ao spring que deve usar o filtro jwt para autenticação implementado e outras configurações de segurança
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {


    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    /**
     * No arranque o spring procura um bean "SecurityFilterChain"
     * Este bean é responsável por configurar toda a segurança http da nossa aplicação
     * Aqui vamos configurar a segurança da aplicação
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf()
                .disable()
                .authorizeHttpRequests()
                .requestMatchers(
                        "/api/*/register",
                        "/api/*/login",
                        "/api/event/get_full_event",
                        "/api/event/get_filters_events",
                        "/api/event/get_events",
                        "/api/event/get_filtered_events",
                        "/api/event/get_ticket_types_event",
                        "/api/user/get_tickets_by_type_and_event"
                ) // aqui vamos definir uma whitelist de requests onde não é preciso autenticação
                .permitAll() // aqui vamos permitir todos os requests
                .anyRequest() // todos os outros necessitam de autenticação
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();

    }
}
