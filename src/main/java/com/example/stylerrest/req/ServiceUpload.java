package com.example.stylerrest.req;

import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ServiceUpload {
    public String studio_name;
    public List<MultipartFile> studio_images = new ArrayList<>();
    public List<StylistDto> stylists = new ArrayList<>();
    public List<ServiceDto> services = new ArrayList<>();
    public List<FreeAppointmentDto> freeAppointments = new ArrayList<>();

    @Override
    public String toString() {
        return "ServiceUpload{" +
                "studio_name='" + studio_name + '\'' +
                ", studio_images=" + studio_images +
                ", stylists=" + stylists +
                ", services=" + services +
                ", freeAppointments=" + freeAppointments +
                '}';
    }
}
