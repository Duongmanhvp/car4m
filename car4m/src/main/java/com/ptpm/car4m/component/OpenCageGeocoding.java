package com.ptpm.car4m.component;


import com.opencagedata.jopencage.JOpenCageGeocoder;
import com.opencagedata.jopencage.model.JOpenCageForwardRequest;
import com.opencagedata.jopencage.model.JOpenCageLatLng;
import com.opencagedata.jopencage.model.JOpenCageResponse;
import com.opencagedata.jopencage.model.JOpenCageReverseRequest;
import com.ptpm.car4m.dto.response.location.GeoLocationResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class OpenCageGeocoding {
	
	@Value("${open_cage.api-key}")
	private String OPEN_CAGE_API_KEY;
	
	
	public GeoLocationResponse getGeoLocation(String address) {
		JOpenCageGeocoder jOpenCageGeocoder = new JOpenCageGeocoder(OPEN_CAGE_API_KEY);
		
		JOpenCageForwardRequest request = new JOpenCageForwardRequest(address);
		
		JOpenCageResponse response = jOpenCageGeocoder.forward(request);
		
//		request.setRestrictToCountryCode("za"); // restrict results to a specific country
//		request.setBounds(18.367, -34.109, 18.770, -33.704); // restrict results to a geographic bounding box (southWestLng, southWestLat, northEastLng, northEastLat)
		
		JOpenCageLatLng firstResultLatLng = response.getFirstPosition(); // get the coordinate pair of the first result
		System.out.println(firstResultLatLng.getLat().toString() + "," + firstResultLatLng.getLng().toString());
		
		return GeoLocationResponse.builder()
				.latitude(firstResultLatLng.getLat())
				.longitude(firstResultLatLng.getLng())
				.build();
	}
	
	public String getAddress(Double latitude, Double longitude) {
		JOpenCageGeocoder jOpenCageGeocoder = new JOpenCageGeocoder(OPEN_CAGE_API_KEY);
		
		JOpenCageReverseRequest request = new JOpenCageReverseRequest(latitude, longitude);
		request.setLanguage("vn"); // show results in a specific language using an IETF format language code
		request.setLimit(5); // only return the first 5 results (default is 10)
		request.setNoAnnotations(true); // exclude additional info such as calling code, timezone, and currency
		request.setMinConfidence(3); // restrict to results with a confidence rating of at least 3 (out of 10)
		
		JOpenCageResponse response = jOpenCageGeocoder.reverse(request);
		
		// get the formatted address of the first result:
		String formattedAddress = response.getResults().getFirst().getFormatted();
		System.out.println(formattedAddress);
		
		return formattedAddress;
	}
	
	
}
