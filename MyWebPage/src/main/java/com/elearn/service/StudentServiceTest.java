package com.elearn.service;

public class StudentServiceTest {

    public static void main(String[] args) {

        StudentService studentService =
                new StudentService();

        boolean result =
                studentService.createStudent(
                        "STU001",
                        "student123",
                        "Student One",
                        "Java Morning Batch"
                );

        if (result) {

            System.out.println(
                    "Student created successfully!"
            );

        } else {

            System.out.println(
                    "Student creation failed!"
            );
        }
    }
}