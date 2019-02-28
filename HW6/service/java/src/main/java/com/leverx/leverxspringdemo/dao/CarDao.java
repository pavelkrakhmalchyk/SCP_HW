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

import com.leverx.leverxspringdemo.dao.intfce.ICarDao;
import com.leverx.leverxspringdemo.domain.Car;

@Repository
public class CarDao implements ICarDao {

	private static final Logger logger = LoggerFactory.getLogger(CarDao.class);
	private static final String CAR_TABLE = "\"HiMTA::ExtraInfo.Car\"";

	@Autowired
	private DataSource dataSource;

	@Override
	public Optional<Car> getById(String id) {
		Optional<Car> entity = null;
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"SELECT TOP 1 * FROM " + CAR_TABLE + " WHERE \"crid\" = ?")) {
			stmnt.setString(1, id);
			ResultSet result = stmnt.executeQuery();
			if (result.next()) {
				Car Car = new Car();
				Car.setCrid(result.getString("crid"));
				Car.setShopid(result.getString("shopid"));
				Car.setName(result.getString("name"));
				Car.setModel(result.getString("model"));
				Car.setColor(result.getString("color"));
				entity = Optional.of(Car);
			} else {
				entity = Optional.empty();
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get entity by Id: " + e.getMessage());
		}
		return entity;
	}

	@Override
	public List<Car> getAll() {
		List<Car> CarList = new ArrayList<Car>();
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn
						.prepareStatement("SELECT * FROM " + CAR_TABLE)) {
			ResultSet result = stmnt.executeQuery();
			while (result.next()) {
				Car Car = new Car();
				Car.setCrid(result.getString("crid"));
				Car.setShopid(result.getString("shopid"));
				Car.setName(result.getString("name"));
				Car.setModel(result.getString("model"));
				Car.setColor(result.getString("color"));
				CarList.add(Car);
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get list of entities: " + e.getMessage());
		}
		return CarList;
	}

	@Override
	public void save(Car entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"INSERT INTO " + CAR_TABLE + "(\"shopid\", \"name\", \"model\", \"color\") VALUES (?, ?, ?, ?)")) {
			stmnt.setString(1, entity.getShopid());
			stmnt.setString(2, entity.getName());
			stmnt.setString(3, entity.getModel());
			stmnt.setString(4, entity.getColor());
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to add entity: " + e.getMessage());
		}
	}

	@Override
	public void delete(String id) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement("DELETE FROM " + CAR_TABLE + " WHERE \"crid\" = ?")) {
			stmnt.setString(1, id);
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to delete entity: " + e.getMessage());
		}
	}

	@Override
	public void update(Car entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"UPDATE " + CAR_TABLE +" SET \"shopid\" = ?, \"name\" = ?, \"model\" = ?,  \"color\" = ?,  WHERE \"crid\" = ?")) {
			stmnt.setString(1, entity.getShopid());
			stmnt.setString(2, entity.getName());
			stmnt.setString(3, entity.getModel());
			stmnt.setString(4, entity.getColor());
			stmnt.setString(5, entity.getCrid());
			stmnt.executeUpdate();
		} catch (SQLException e) {
			logger.error("Error while trying to update entity: " + e.getMessage());
		}
	}

}