package com.ptpm.car4m.service;

import com.ptpm.car4m.dto.request.user.UserCreationRequest;
import com.ptpm.car4m.dto.response.user.UserCreationResponse;

public interface UserService {
	UserCreationResponse createUser(UserCreationRequest request);
}
