package com.leverx.leverxspringdemo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.sap.cloud.sdk.cloudplatform.CloudPlatform;
import com.sap.cloud.sdk.cloudplatform.CloudPlatformAccessor;
import com.sap.cloud.sdk.cloudplatform.ScpCfCloudPlatform;

@Configuration
public class CloudConfig {
	
	@Bean
	public CloudPlatform platform() {
		return CloudPlatformAccessor.getCloudPlatform();
	}
	
	@Bean
	public ScpCfCloudPlatform namespace() {
		return ScpCfCloudPlatform.getInstanceOrThrow();
	}
	
}