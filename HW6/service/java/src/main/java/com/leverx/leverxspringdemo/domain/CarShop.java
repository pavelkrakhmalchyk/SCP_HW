package com.leverx.leverxspringdemo.domain;

import java.util.List;

public class CarShop {
	
	private String id;
	
	private String name;
	
	private List<Car> carList;
	
	public List<Car> getCarList() {
		return carList;
	}
	public void setCarList(List<Car> carList) {
		this.carList = carList;
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}