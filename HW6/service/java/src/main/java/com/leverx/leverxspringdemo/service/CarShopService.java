package com.leverx.leverxspringdemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leverx.leverxspringdemo.dao.CarShopDao;
import com.leverx.leverxspringdemo.domain.CarShop;

@Service
public class CarShopService {
	
	@Autowired
	private CarShopDao carShopDao;
	
	public List<CarShop> getCarShopAll() {
		return carShopDao.getAll();
	}
	
	public CarShop getCarShop(String id) {
		Optional<CarShop> CarShopOptional = this.carShopDao.getById(id);
		CarShop CarShop = null;
		if (CarShopOptional.isPresent()) {
			CarShop = CarShopOptional.get();
		}
		return CarShop;
	}
	
	public void createCarShop(CarShop CarShop) {
		this.carShopDao.save(CarShop);
	}
	
	public void updateCarShop(CarShop CarShop) {
		this.carShopDao.update(CarShop);
	}
	
	public void deleteCarShop(String id) {
		this.carShopDao.delete(id);
	}
	
}