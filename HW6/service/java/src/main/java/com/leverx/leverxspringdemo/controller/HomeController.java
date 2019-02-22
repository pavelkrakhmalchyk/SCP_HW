package com.leverx.leverxspringdemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.leverx.leverxspringdemo.domain.Destination;
import com.leverx.leverxspringdemo.service.CloudService;

import com.sap.cloud.sdk.cloudplatform.CloudPlatform;


@Controller
public class HomeController {
	
	@Autowired
	private CloudPlatform platform;
	
	@Autowired
	private CloudService cloudService;
	
	@RequestMapping(value="/", method=RequestMethod.GET)
	public String getHome(Model model) {
		String appName = platform.getApplicationName();
		model.addAttribute("appName", appName);
		List<Destination> destinations = cloudService.getDestinations();
		model.addAttribute("destinations", destinations);
		return "index";
	}
}