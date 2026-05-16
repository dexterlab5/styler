package com.example.stylerrest.service;

import com.example.stylerrest.entity.*;
import com.example.stylerrest.repo.*;
import com.example.stylerrest.req.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@org.springframework.stereotype.Service
public class DashboardService {

    @Autowired
    private StudioRepo studioRepo;

    @Autowired
    private StudioImgRepo studioImgRepo;

    private final String urlBase = "http://localhost:8080";
    @Autowired
    private ServiceRepo serviceRepo;
    @Autowired
    private ArtistRepo artistRepo;
    @Autowired
    private FreeAppointmentRepo freeAppointmentRepo;

    public List<StudioImg> getImages(User user) {
        Studio studio = studioRepo.findBy_user_id(user.id);
        return studioImgRepo.findAllByStudio_id(studio.id);
    }

    public void updateStudio(ServiceUpload serviceUpload, User user) throws IOException {
        Studio studio = studioRepo.findBy_user_id(user.id);
        if (studio == null) {
            throw new RuntimeException("Studio is null");
        }

        studio.name = serviceUpload.studio_name;
        studioRepo.save(studio);

        // implement description later

        for (MultipartFile file : serviceUpload.studio_images) {
            if (!file.isEmpty()) {
                StudioImg studioImg = new StudioImg();
                studioImg.img = uploadImg(file);
                studioImg.studio_id = studio.id;
                studioImgRepo.save(studioImg);
            }
        }

        for (StylistDto stylistDto: serviceUpload.stylists) {
            Artist artist = new Artist();
            artist.name = stylistDto.name;
            artist.studio_id = studio.id;
            artist.role = stylistDto.role;
            artist.img = uploadImg(stylistDto.img);
            artistRepo.save(artist);
        }

        for (ServiceDto serviceDto: serviceUpload.services) {
            com.example.stylerrest.entity.Service service = new com.example.stylerrest.entity.Service();
            service.name = serviceDto.name;
            service.time = serviceDto.time;
            service.price = serviceDto.price;
            service.extra = serviceDto.extra;
            service.studio_id = studio.id;
            serviceRepo.save(service);
        }
        System.out.println(serviceUpload.freeAppointments);
        for (FreeAppointmentDto freeAppointmentDto: serviceUpload.freeAppointments) {
            FreeAppointment freeAppointment = new FreeAppointment();
            freeAppointment.artist_id = freeAppointmentDto.artist_id;
            freeAppointment.studio_id = studio.id;
            freeAppointment.date = freeAppointmentDto.date;
            freeAppointment.hour = freeAppointmentDto.hour;
            freeAppointment.minute = freeAppointmentDto.minute;
        }
    }

    private String uploadImg(MultipartFile img) throws IOException {
        // This works on Windows (uploads\images) and Linux (../uploads/images)
        Path uploadPath = Paths.get("..", "uploads").toAbsolutePath().normalize();

        // 3. Create a unique filename to prevent overwriting
        String originalName = img.getOriginalFilename();
        String extension = originalName.substring(originalName.lastIndexOf("."));
        // Generate the "crypto" string
        String cryptoName = UUID.randomUUID().toString() + extension;

        Path filePath = uploadPath.resolve(cryptoName);

        // 4. Copy the file to the target folder
        Files.copy(img.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // 5. Here you would save 'fileName' or 'filePath' to your MySQL table C:\data\\uploads\some_crupto_str.jpg
        return urlBase + "/uploads/" + cryptoName;
    }

    public Studio getStudio(User user) {
        return studioRepo.findBy_user_id(user.id);
    }

    public List<Artist> getArtists(User user) {
        com.example.stylerrest.entity.Studio studio = studioRepo.findBy_user_id(user.id);
        long studio_id = studio.id;
        return artistRepo.findBy_studio_id(studio_id);
    }

    public List<Service> getServices(User user) {
        com.example.stylerrest.entity.Studio studio = studioRepo.findBy_user_id(user.id);
        long studio_id = studio.id;
        return serviceRepo.findBy_studio_id(studio_id);
    }

    public void saveDetails(User user, DetailsReq detailsReq) {
        Studio studio = studioRepo.findBy_user_id(user.id);
        studio.name = detailsReq.name;
        studio.description = detailsReq.description;
        studioRepo.save(studio);
    }

    public Artist saveArtist(User user, ArtistReq artistReq) throws IOException {
        Studio studio = studioRepo.findBy_user_id(user.id);
        Artist artist = new Artist();
        artist.studio_id = studio.id;
        artist.name = artistReq.name;
        artist.role = artistReq.role;
        artist.img = uploadImg(artistReq.img);
        return artistRepo.save(artist);
    }

    public void removeArtist(User user, Long id) {
        artistRepo.deleteById(id);
    }

    public Service addService(User user, Service service) {
        Studio studio = studioRepo.findBy_user_id(user.id);
        service.studio_id = studio.id;
        return serviceRepo.save(service);
    }

    public void removeService(Long id) {
        serviceRepo.deleteById(id);
    }

    public List<StudioImg> uploadImages(User user, List<MultipartFile> images) throws IOException {
        Studio studio = studioRepo.findBy_user_id(user.id);
        studioImgRepo.deleteAllByStudio_id(studio.id);
        List<StudioImg> newImg = new ArrayList<>();
        for (var file: images) {
            StudioImg studioImg = new StudioImg();
            studioImg.studio_id = studio.id;
            String url = uploadImg(file);
            studioImg.img = url;
            newImg.add(studioImg);
        }
        return (List<StudioImg>) studioImgRepo.saveAll(newImg);
    }

    public List<FreeAppointment> addFreeAppointments(User user, List<FreeAppointmentDto> freeAppointmentDtos) {
        Studio studio = studioRepo.findBy_user_id(user.id);
        List<FreeAppointment> newFreeAppointments = new ArrayList<>();
        for (var freeAppointmentDto: freeAppointmentDtos) {
            FreeAppointment freeAppointment = new FreeAppointment();
            freeAppointment.studio_id = studio.id;
            freeAppointment.artist_id = freeAppointmentDto.artist_id;
            freeAppointment.date = freeAppointmentDto.date;
            freeAppointment.hour = freeAppointmentDto.hour;
            freeAppointment.minute = freeAppointmentDto.minute;
            newFreeAppointments.add(freeAppointment);
        }

        return (List<FreeAppointment>) freeAppointmentRepo.saveAll(newFreeAppointments);
    }

    public List<FreeAppointment> getAppointments(User user) {
        Studio studio = studioRepo.findBy_user_id(user.id);
        return freeAppointmentRepo.findBy_studio_id(studio.id);
    }

    public void cancelAppointment(User user, Long appointment_id) {
        freeAppointmentRepo.deleteById(appointment_id);
    }
}
