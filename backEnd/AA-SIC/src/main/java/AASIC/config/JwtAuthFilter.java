package AASIC.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Esta classe tem de implementar um OncePerRequestFilter para ser executada para todos os pedidos
 * Vai funcionar como um filtro para todos os pedidos que chegam à backend
 * */


// Esta anotação diz ao spring que isto será um Bean gerido pela framework
@Component
@RequiredArgsConstructor // esta anoação cria um construtor com todos os atributos "final" que sejam definidos na classe
public class JwtAuthFilter extends OncePerRequestFilter {


    // Classe usada para manipular JWTs
    private final JWTService jwtService;


    /**
     * Este método vai atuar como filtro
     * @param request vai intercetar o request permitindo que se adicione mais informação ao pedido
     * @param response vai intersetar a resposta permitindo que se adicione mais info à resposta
     * */
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull  HttpServletResponse response,
            @NonNull  FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization"); // vamos começar por obter o header que contem o token jwt
        final String jwt;
        final String email;

        /**
        * Aqui vamos fazer alguma verificações ao token JWT
        * - temos de verificar se o header existe
        * - Temos de verificar se o header começa com a String "Bearer ", porque todos os tokens começam com isto (aparentemente)
        * */
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            // se o token não existir, ou não tiver o formato correto vamos simplesmente passar o pedido e a resposta para o proximo filtro
            filterChain.doFilter(request,response);
            return; // terminamos aqui a execução deste filtro -> não existe um token válido
        }
        /**
        * Agora vamos tentar extrair o token
        * Vamos extrair uma substring a começar na posição 7 , porquê? Porque o tamanho da string "Bearer " é 7
        * */
        jwt = authHeader.substring(7);
        /**
        * Agora temos de extrair do token JWT o nosso username para verificar se este já existe autenticado
        * para extrair o username do jwt temos de ter uma classe que consiga manipular um jwt
        * */
        email = jwtService.extractUsername(jwt);
    }


}
