package com.elearn.service;

import com.elearn.model.User;

public class AuthServiceTest {

    public static void main(String[] args) {

        AuthService authService = new AuthService();

        User user =
                authService.login("ADM001", "admin123");

        if (user != null) {

            System.out.println("Login successful!");
            System.out.println("User ID: " + user.getUserId());
            System.out.println("Role: " + user.getRole());
            System.out.println("Status: " + user.getStatus());

        } else {

            System.out.println("Login failed!");
        }
    }
}