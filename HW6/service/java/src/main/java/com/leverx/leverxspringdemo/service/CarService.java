package com.leverx.leverxspringdemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leverx.leverxspringdemo.dao.CarDao;
import com.leverx.leverxspringdemo.domain.Car;

@Service
public class CarService {
	
	@Autowired
	private CarDao carDao;
	
	public List<Car> getCarAll() {
		return carDao.getAll();
	}
	
	public Car getCar(String id) {
		Optional<Car> CarOptional = this.carDao.getById(id);
		Car Car = null;
		if (CarOptional.isPresent()) {
			Car = CarOptional.get();
		}
		return Car;
	}
	
	public void createCar(Car Car) {
		this.carDao.save(Car);
	}
	
	public void updateCar(Car Car) {
		this.carDao.update(Car);
	}
	
	public void deleteCar(String id) {
		this.carDao.delete(id);
	}
	
}