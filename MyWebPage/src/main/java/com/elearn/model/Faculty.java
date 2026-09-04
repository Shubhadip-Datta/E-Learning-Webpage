package com.elearn.model;

public class Faculty {

    private String userId;
    private String name;
    private String subject;
    private boolean active;


    public Faculty(
            String userId,
            String name,
            String subject,
            boolean active) {

        this.userId = userId;
        this.name = name;
        this.subject = subject;
        this.active = active;
    }


    public String getUserId() {

        return userId;
    }


    public String getName() {

        return name;
    }


    public String getSubject() {

        return subject;
    }


    public boolean isActive() {

        return active;
    }
}