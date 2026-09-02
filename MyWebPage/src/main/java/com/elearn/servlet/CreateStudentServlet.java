package com.elearn.servlet;

import java.io.IOException;

import com.elearn.service.StudentService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/create-student")
public class CreateStudentServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private StudentService studentService =
            new StudentService();

    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        String userId =
                request.getParameter("userId");

        String password =
                request.getParameter("password");

        String name =
                request.getParameter("name");

        String batch =
                request.getParameter("batch");

        if (userId == null ||
                password == null ||
                name == null ||
                batch == null ||
                userId.trim().isEmpty() ||
                password.isEmpty() ||
                name.trim().isEmpty() ||
                batch.trim().isEmpty()) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            response.getWriter().println(
                    "Please fill all fields."
            );

            return;
        }

        boolean created =
                studentService.createStudent(
                        userId.trim().toUpperCase(),
                        password,
                        name.trim(),
                        batch.trim()
                );

        if (created) {

            response.setStatus(
                    HttpServletResponse.SC_OK
            );

            response.getWriter().println(
                    "Student created successfully."
            );

        } else {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            response.getWriter().println(
                    "Could not create student."
            );
        }
    }
}