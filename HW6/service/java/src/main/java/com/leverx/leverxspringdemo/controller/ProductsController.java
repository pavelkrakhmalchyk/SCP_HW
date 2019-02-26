package com.leverx.leverxspringdemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leverx.leverxspringdemo.domain.Products;
import com.leverx.leverxspringdemo.service.ProductsService;
import com.sap.cloud.sdk.odatav2.connectivity.ODataException;

@RestController 
public class ProductsController {    
 @Autowired 
 private ProductsService productService; 
    @GetMapping(value="/products") 
    public List<Products> getAllProducts() throws ODataException {   
     return productService.getProductsOdata("OData");  
     }
}