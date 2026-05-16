package com.example.stylerrest.auth;

import com.example.stylerrest.entity.Studio;
import com.example.stylerrest.entity.User;
import com.example.stylerrest.repo.StudioRepo;
import com.example.stylerrest.repo.UserRepo;
import com.example.stylerrest.req.LoginRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
//@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private StudioRepo studioRepo;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        // Authenticate the user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email, request.password)
        );

        // Set the authentication in the security context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Load user details and generate a JWT
        User user = userRepo.findByEmail(request.email)
                .orElseThrow(() -> new RuntimeException("Error: invalid email"));
        String token = jwtUtil.generateToken(user);

        // 2. Build the secure cookie
        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)      // 🛡️ Prevents JavaScript from reading the token (XSS protection)
                .secure(true)        // 🔒 Only sends over HTTPS (set to false for localhost testing)
                .path("/")           // Available for all API routes
                .maxAge(86400)       // 24 hours in seconds
                .sameSite("Strict")  // 🚪 Prevents CSRF attacks
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Login successful");
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        // Check if the username already exists
        if (userRepo.findByEmail(user.email).isPresent()) {
            System.out.println("Error: Username is taken!");
            return ResponseEntity.status(400).body("Username already exists");
        }
        // Encode the password and save the new user
        user.password = passwordEncoder.encode(user.password);
        user = userRepo.save(user);
        if (user.studio) {
            Studio studio = new Studio();
            studio.name = user.name;
            studio.user_id = user.id;
            studioRepo.save(studio);
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0) // 👈 Deletes the cookie immediately
                .sameSite("Strict")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok().body("Logged out");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        // 1. Grab the authentication from the context
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        // 2. Check if the user is actually authenticated
        // (If the JWT was invalid/expired, Spring Security would have already blocked this
        // or 'auth' would be an AnonymousAuthenticationToken)
        if (auth == null || !auth.isAuthenticated() || auth instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // 3. Cast the Principal to your Entity
        // This is safe because your Filter put the UserDetails/Entity here
        User user = (User) auth.getPrincipal();

        // 4. Return the data React needs
        return ResponseEntity.ok(Map.of(
                "email", user.email,
                "isStudio", user.studio
        ));
    }


}
