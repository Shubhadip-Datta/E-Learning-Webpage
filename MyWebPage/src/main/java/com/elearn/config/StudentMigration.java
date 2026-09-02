package com.elearn.config;

import com.elearn.service.StudentService;

public class StudentMigration {

    public static void main(String[] args) {

        StudentService studentService =
                new StudentService();

        String password = "student123";

        studentService.createStudent(
                "STU002",
                password,
                "Amit Roy",
                "Java Morning Batch"
        );

        studentService.createStudent(
                "STU003",
                password,
                "Sneha Paul",
                "Java Morning Batch"
        );

        studentService.createStudent(
                "STU004",
                password,
                "Riya Sen",
                "Java Morning Batch"
        );

        studentService.createStudent(
                "STU005",
                password,
                "Arjun Dutta",
                "Java Morning Batch"
        );

        studentService.createStudent(
                "STU006",
                password,
                "Ananya Roy",
                "Java Evening Batch"
        );

        studentService.createStudent(
                "STU007",
                password,
                "Sourav Das",
                "Java Evening Batch"
        );

        studentService.createStudent(
                "STU008",
                password,
                "Priya Ghosh",
                "Java Evening Batch"
        );

        studentService.createStudent(
                "STU009",
                password,
                "Kunal Sen",
                "Java Evening Batch"
        );

        System.out.println(
                "Student migration completed."
        );
    }
}