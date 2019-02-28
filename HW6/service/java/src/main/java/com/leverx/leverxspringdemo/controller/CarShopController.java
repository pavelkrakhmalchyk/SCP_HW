package com.leverx.leverxspringdemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

import com.leverx.leverxspringdemo.domain.CarShop;
import com.leverx.leverxspringdemo.service.CarShopService;

@RestController
public class CarShopController {
	
	@Autowired
	private CarShopService CarShopService;
	
	@GetMapping(value="/CarShop")
	public List<CarShop> getAllCarShop() {
		return CarShopService.getCarShopAll();
	}
	
	@GetMapping(value="/CarShop/{id}")
	public CarShop getCarShop(@PathVariable String id) {
		return CarShopService.getCarShop(id);
	}
	
	@PostMapping(value="/CarShop")
	public void createCarShop(@RequestBody CarShop CarShop) {
		CarShopService.createCarShop(CarShop);
	}
	
	@DeleteMapping(value="/CarShop/{id}")
	public void deleteCarShop(@PathVariable String id) {
		CarShopService.deleteCarShop(id);
	}
	
	@PutMapping(value="/CarShop")
	public void updateCarShop(@RequestBody CarShop CarShop) {
		CarShopService.updateCarShop(CarShop);
	}
	
	@GetMapping(value="/CarShop/{id}/Cars")
	public CarShop getPersonCars(@PathVariable String id) throws SQLException {
		return CarShopService.getCarshopCars(id);
	}
	
}