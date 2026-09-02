package com.elearn.model;

public class Student {

    private int id;
    private String userId;
    private String name;
    private String batch;
    private String phone;
    private String email;
    private String address;

    public Student() {
    }

    public Student(
            int id,
            String userId,
            String name,
            String batch,
            String phone,
            String email,
            String address) {

        this.id = id;
        this.userId = userId;
        this.name = name;
        this.batch = batch;
        this.phone = phone;
        this.email = email;
        this.address = address;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }
    
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}