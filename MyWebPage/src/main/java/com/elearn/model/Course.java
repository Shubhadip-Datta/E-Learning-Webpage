package com.elearn.model;

public class Course {

    private int id;
    private String courseId;
    private String name;
    private String description;
    private boolean active;


    public Course(
            int id,
            String courseId,
            String name,
            String description,
            boolean active) {

        this.id = id;
        this.courseId = courseId;
        this.name = name;
        this.description = description;
        this.active = active;
    }


    public int getId() {

        return id;
    }


    public String getCourseId() {

        return courseId;
    }


    public String getName() {

        return name;
    }


    public String getDescription() {

        return description;
    }


    public boolean isActive() {

        return active;
    }
}