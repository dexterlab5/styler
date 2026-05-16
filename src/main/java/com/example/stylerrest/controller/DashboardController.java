package com.example.stylerrest.controller;

import com.example.stylerrest.entity.*;
import com.example.stylerrest.req.ArtistReq;
import com.example.stylerrest.req.DetailsReq;
import com.example.stylerrest.req.FreeAppointmentDto;
import com.example.stylerrest.req.ServiceUpload;
import com.example.stylerrest.service.DashboardService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.initDirectFieldAccess();
    }


    @GetMapping("/get-studio")
    public Studio getStudio(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return dashboardService.getStudio(user);
    }

    @GetMapping("/get-images")
    public List<StudioImg> getImages(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return dashboardService.getImages(user);
    }

    @PostMapping("/upload-images")
    public List<StudioImg> uploadImages(Authentication authentication, @ModelAttribute List<MultipartFile> images) throws IOException {
        User user = (User) authentication.getPrincipal();
        return dashboardService.uploadImages(user, images);
    }

    @GetMapping("/get-artists")
    public List<Artist> getArtists(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return dashboardService.getArtists(user);
    }

    @GetMapping("/get-services")
    public List<com.example.stylerrest.entity.Service> getServices(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return dashboardService.getServices(user);
    }

    @PostMapping("/send-details")
    public void sendDetails(Authentication authentication, @RequestBody DetailsReq detailsReq) {
        User user = (User) authentication.getPrincipal();
        dashboardService.saveDetails(user, detailsReq);
    }

    @PostMapping("/send-artist")
    public Artist sendArtist(Authentication authentication, @ModelAttribute ArtistReq artistReq) throws IOException {
        User user = (User) authentication.getPrincipal();
        return dashboardService.saveArtist(user, artistReq);
    }

    @DeleteMapping("/remove-artist/{id}")
    public void removeArtist(Authentication authentication, @PathVariable("id") Long id) {
        User user = (User) authentication.getPrincipal();
        dashboardService.removeArtist(user, id);
    }

    @PostMapping("/add-service")
    public Service sendService(Authentication authentication, @RequestBody Service service) {
        User user = (User) authentication.getPrincipal();
        return dashboardService.addService(user, service);
    }

    @DeleteMapping("/remove-service/{id}")
    public void removeService(Authentication authentication, @PathVariable Long id) {
        User user = (User) authentication.getPrincipal();
        dashboardService.removeService(id);
    }

    @PostMapping("/set-appointments")
    public ResponseEntity<?> setAppointemnts(Authentication authentication, @RequestBody List<FreeAppointmentDto> freeAppointmentDto) {
        System.out.println(freeAppointmentDto);
        User user = (User) authentication.getPrincipal();
        try {
            List<FreeAppointment> freeAppointments = dashboardService.addFreeAppointments(user, freeAppointmentDto);
            return ResponseEntity.ok(freeAppointments);
        } catch (DataIntegrityViolationException exc) {
            return ResponseEntity.badRequest().body("Repeated appointment"); // return here something you know for the error
        }
    }

    @GetMapping("/get-appointments")
    public List<FreeAppointment> getAppointments(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return dashboardService.getAppointments(user);
    }

    @DeleteMapping("/cancel-appointment/{id}")
    public void cancelAppointment(Authentication authentication, @PathVariable("id") Long appointment_id) {
        User user = (User) authentication.getPrincipal();
        dashboardService.cancelAppointment(user, appointment_id);
    }
}
