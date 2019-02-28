package com.leverx.leverxspringdemo.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.leverx.leverxspringdemo.dao.intfce.ICarShopDao;
import com.leverx.leverxspringdemo.domain.CarShop;
import com.leverx.leverxspringdemo.domain.Car;

@Repository
public class CarShopDao implements ICarShopDao {

	private static final Logger logger = LoggerFactory.getLogger(CarShopDao.class);
	private static final String CARSHOP_TABLE = "\"HiMTA::CarShop\"";
	private static final String CAR_TABLE = "\"HiMTA::ExtraInfo.Car\"";
	private static final String SHOP_ID = "\"shopid\"";

	@Autowired
	private DataSource dataSource;

	@Override
	public Optional<CarShop> getById(String id) {
		Optional<CarShop> entity = null;
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"SELECT TOP 1 \"shopid\", \"name\" FROM " + CARSHOP_TABLE +" WHERE " + SHOP_ID + " = ?")) {
			stmnt.setString(1, id);
			ResultSet result = stmnt.executeQuery();
			if (result.next()) {
				CarShop CarShop = new CarShop();
				CarShop.setId(id);
				CarShop.setName(result.getString("name"));
				entity = Optional.of(CarShop);
			} else {
				entity = Optional.empty();
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get entity by Id: " + e.getMessage());
		}
		return entity;
	}

	@Override
	public List<CarShop> getAll() {
		List<CarShop> CarShopList = new ArrayList<CarShop>();
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn
						.prepareStatement("SELECT * FROM " + CARSHOP_TABLE)) {
			ResultSet result = stmnt.executeQuery();
			while (result.next()) {
				CarShop CarShop = new CarShop();
				CarShop.setId(result.getString("shopid"));
				CarShop.setName(result.getString("name"));
				CarShopList.add(CarShop);
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get list of entities: " + e.getMessage());
		}
		return CarShopList;
	}

	@Override
	public void save(CarShop entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"INSERT INTO " + CARSHOP_TABLE +"(\"name\") VALUES (?)")) {
			stmnt.setString(1, entity.getName());
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to add entity: " + e.getMessage());
		}
	}

	@Override
	public void delete(String id) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement("DELETE FROM " + CARSHOP_TABLE + " WHERE " + SHOP_ID + " = ?")) {
			stmnt.setString(1, id);
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to delete entity: " + e.getMessage());
		}
	}

	@Override
	public void update(CarShop entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"UPDATE " + CARSHOP_TABLE + " SET \"name\" = ? WHERE " + SHOP_ID + " = ?")) {
			stmnt.setString(1, entity.getName());
			stmnt.setString(2, entity.getId());
			stmnt.executeUpdate();
		} catch (SQLException e) {
			logger.error("Error while trying to update entity: " + e.getMessage());
		}
	}
	
//	public List<String> getCars(String id) {
//	    List<String> list = new ArrayList<String>();
//	    try (Connection conn = dataSource.getConnection();
//	        PreparedStatement stmnt = conn.prepareStatement("SELECT * FROM " + CARSHOP_TABLE +" INNER JOIN " + CAR_TABLE + " ON " + CARSHOP_TABLE + ".\"shopid\" = " + CAR_TABLE + ".\"shopid\" WHERE " + CARSHOP_TABLE + ".\"shopid\" = ?")) {
//	      stmnt.setString(1, id);
//	      ResultSet result = stmnt.executeQuery();        
//	      while (result.next()) {
//	        list.add(result.getString(CARSHOP_TABLE+ ".name"));
//	        list.add(result.getString("model"));
//	        list.add(result.getString("color"));
//	      }          
//	    } catch (SQLException e) {
//	      logger.error("Error while trying to get entity by Id: " + e.getMessage());
//	    }
//	    
//	    return list;
//	  }
	
	public CarShop getCars(String id) throws SQLException {

		Connection conn = dataSource.getConnection();
		PreparedStatement stmnt = conn.prepareStatement("SELECT * FROM "+ CARSHOP_TABLE +" WHERE "+ SHOP_ID +" = ?");
			stmnt.setString(1, id);
			ResultSet result = stmnt.executeQuery();
			CarShop carshop = new CarShop();
			if (result.next()) {
				carshop.setId(id);
				carshop.setName(result.getString("name"));
			}

		List<Car> carList = new ArrayList<Car>();

			stmnt = conn.prepareStatement("SELECT \"crid\", \"shopid\", \"name\", \"model\", \"color\"  FROM "+ CAR_TABLE +" WHERE "+ SHOP_ID +" = ? ");
			stmnt.setString(1, id);
			result = stmnt.executeQuery();
			while (result.next()) {
				Car car = new Car();
				car.setCrid(result.getString("crid"));
				car.setShopid(result.getString("shopid"));
				car.setName(result.getString("name"));
				car.setModel(result.getString("model"));
				car.setColor(result.getString("color"));
				carList.add(car);
			}
			carshop.setCarList(carList);
			conn.close();
		return carshop;
	}

}