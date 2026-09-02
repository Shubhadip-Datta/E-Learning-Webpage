package com.elearn.service;

import org.mindrot.jbcrypt.BCrypt;

import com.elearn.dao.UserDAO;
import com.elearn.model.User;

public class AuthService {

    private UserDAO userDAO = new UserDAO();

    public User login(String userId, String password) {

        User user = userDAO.findByUserId(userId);

        if (user == null) {
            return null;
        }

        if (!"ACTIVE".equals(user.getStatus())) {
            return null;
        }

        if (!BCrypt.checkpw(
                password,
                user.getPasswordHash())) {

            return null;
        }

        return user;
    }
}