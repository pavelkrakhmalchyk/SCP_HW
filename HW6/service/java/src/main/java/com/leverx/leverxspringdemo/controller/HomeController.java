package com.leverx.leverxspringdemo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.leverx.leverxspringdemo.service.CloudService;

@Controller
public class HomeController {
	
	@Autowired
	private CloudService cloudService;
	
	@RequestMapping(value="/", method=RequestMethod.GET)
	public String getHome(Model model) {
		String appName = cloudService.getApplicationName();
		model.addAttribute("appName", appName);
		return "index";
	}
}