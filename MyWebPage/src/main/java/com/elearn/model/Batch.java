package com.elearn.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Batch {

    private int id;
    private String name;
    private String subject;
    private String teacher;
    private String schedule;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal monthlyFee;
    private boolean active;

    public Batch() {
    }

    public Batch(
            int id,
            String name,
            String subject,
            String teacher,
            String schedule,
            LocalDate startDate,
            LocalDate endDate,
            BigDecimal monthlyFee,
            boolean active) {

        this.id = id;
        this.name = name;
        this.subject = subject;
        this.teacher = teacher;
        this.schedule = schedule;
        this.startDate = startDate;
        this.endDate = endDate;
        this.monthlyFee = monthlyFee;
        this.active = active;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getTeacher() {
        return teacher;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }

    public String getSchedule() {
        return schedule;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public BigDecimal getMonthlyFee() {
        return monthlyFee;
    }

    public void setMonthlyFee(BigDecimal monthlyFee) {
        this.monthlyFee = monthlyFee;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}