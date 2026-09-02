package com.elearn.model;

public class User {

    private long id;
    private String userId;
    private String passwordHash;
    private String role;
    private String status;

    public User() {
    }

    public User(long id, String userId, String passwordHash,
                String role, String status) {

        this.id = id;
        this.userId = userId;
        this.passwordHash = passwordHash;
        this.role = role;
        this.status = status;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}