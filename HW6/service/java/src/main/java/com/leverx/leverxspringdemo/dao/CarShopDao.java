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

@Repository
public class CarShopDao implements ICarShopDao {

	private static final Logger logger = LoggerFactory.getLogger(CarShopDao.class);

	@Autowired
	private DataSource dataSource;

	@Override
	public Optional<CarShop> getById(String id) {
		Optional<CarShop> entity = null;
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"SELECT TOP 1 \"shopid\", \"name\" FROM \"HiMTA::CarShop\" WHERE \"shopid\" = ?")) {
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
						.prepareStatement("SELECT * FROM \"HiMTA::CarShop\"")) {
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
						"INSERT INTO \"HiMTA::CarShop\"(\"name\") VALUES (?)")) {
			stmnt.setString(1, entity.getName());
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to add entity: " + e.getMessage());
		}
	}

	@Override
	public void delete(String id) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement("DELETE FROM \"HiMTA::CarShop\" WHERE \"shopid\" = ?")) {
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
						"UPDATE \"HiMTA::CarShop\" SET \"name\" = ? WHERE \"shopid\" = ?")) {
			stmnt.setString(1, entity.getName());
			stmnt.setString(4, entity.getId());
			stmnt.executeUpdate();
		} catch (SQLException e) {
			logger.error("Error while trying to update entity: " + e.getMessage());
		}
	}

}