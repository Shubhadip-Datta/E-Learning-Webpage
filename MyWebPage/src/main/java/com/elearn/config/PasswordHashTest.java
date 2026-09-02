package com.elearn.config;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordHashTest {

    public static void main(String[] args) {

        String password = "admin123";

        String hashedPassword =
                BCrypt.hashpw(password, BCrypt.gensalt());

        System.out.println("Password: " + password);
        System.out.println("Hash: " + hashedPassword);

        boolean matches =
                BCrypt.checkpw(password, hashedPassword);

        System.out.println("Password matches: " + matches);
    }
}