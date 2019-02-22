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

import com.leverx.leverxspringdemo.domain.Car;
import com.leverx.leverxspringdemo.service.CarService;

@RestController
public class CarController {
	
	@Autowired
	private CarService CarService;
	
	@GetMapping(value="/Car")
	public List<Car> getAllCar() {
		return CarService.getCarAll();
	}
	
	@GetMapping(value="/Car/{id}")
	public Car getCar(@PathVariable String id) {
		return CarService.getCar(id);
	}
	
	@PostMapping(value="/Car")
	public void createCar(@RequestBody Car Car) {
		CarService.createCar(Car);
	}
	
	@DeleteMapping(value="/Car/{id}")
	public void deleteCar(@PathVariable String id) {
		CarService.deleteCar(id);
	}
	
	@PutMapping(value="/Car")
	public void updateCar(@RequestBody Car Car) {
		CarService.updateCar(Car);
	}
	
}