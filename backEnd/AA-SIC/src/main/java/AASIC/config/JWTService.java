package AASIC.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


/**
* Esta classe vai ser utilizada para manipular tokens JWT
* Para isso, é necessário incluir novas dependencias na nossa aplicação
* */

@Service // esta anocação indica que esta classe será um bean gerido pela framework
public class JWTService {

    /**
    * Temos de gerar uma chave secreta
    * Para isso vamos utilizar uma ferramente online
    * */
    private static final String SECRET_KEY = "f9793d397bf0380500db7c55c7fb032b99ed5f2219224e5092be3198370cb301";

    /**
     * Método que vai gerar um token sem extraClaims, utilizando apenas os userdetails
     * @param userDetails
     */
    public String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>() , userDetails);
    }

    /**
     * Método que vai gerar um token com extraClaims
     * Um token é uma String
     * @param extraClaims correspondem às claims que vão ser adicionadas ao jwt
     * @param userDetails corresponde aos detalhes do utilizador - neste caso a nossa classe user (model.User) implementa a classe UserDetails, para que os dados possam ser usados aqui
     * @return token
     */
    public String generateToken(Map<String,Object> extraClaims, UserDetails userDetails){
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis())) // informação sobre o momento em que foi criado o token
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24)) // TODO -> arranjar forma de tornar isto para sempre, ou escolher um valor apropriado
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();

    }


    /**
     * Método que extrai o username do token
     * @param token
     * @return
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject); // o subject de uma claim é o username
    }

    /**
     * Método para extrair a data em que o token expira
     * @param token
     * @return
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Agora vamos definir uma função genérica para extrair uma claim do nosso token que usa como função auxiliar a função extractAllClaims
     * @param token representa o token jwt
     * @param claimResolver funcção de Claim para T
     * */
    public <T> T extractClaim(String token, Function<Claims,T>  claimResolver){
        final Claims claims = extractAllClaims(token); // função definida mais abaixo para extrair todas as claims de um token
        return claimResolver.apply(claims);
    }



    /**
    * As claims fazem parte da estrutura do jwt, neste site tem exemplos https://jwt.io/
    * Com este método vamso extrair todas as claims do jwt
    * As claims são utilizadas para integrar informação nos jwt (mais ou menos isto)
    * */

    private Claims extractAllClaims(String token){
        /**
         * Uma signing Key é um segredo que é utilizado para "assinar" digitalmente um jwt
         * É utilizada para verificar que o emissor do jwt é realmente quem se pensa ser
         * Esta signing Key é gerada utilizando um algoritmo que é especificado no header do jwt
         * O tipo de algoritmo e o tamanho da key depende dos requisitos de segurança da aplicação
         * - Autalmente o mínimo razoável para o tamnaho é de 256
         */

        return Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes); // este é um dos algoritmos utilizados para criar as chaves do jwt
    }

    /**
     * Método utilizado para validar um token
     * @param token que estámos a tentar validar
     * @param userDetails informação sobre o utilizador para adicionar ao token
     */
    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    /**
     * Método apra verificar se o token já está expirado
     * @param token
     * @return
     */
    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }



}
