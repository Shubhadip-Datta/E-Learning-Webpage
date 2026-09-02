package com.elearn.servlet;

import java.io.IOException;

import com.elearn.dao.StudentDAO;
import com.elearn.model.Student;
import com.elearn.model.User;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/student-profile")
public class StudentProfileServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private StudentDAO studentDAO =
            new StudentDAO();

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session =
                request.getSession(false);

        if (session == null) {

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            return;
        }

        User user =
                (User) session.getAttribute("user");

        if (user == null ||
                !"STUDENT".equals(user.getRole())) {

            response.setStatus(
                    HttpServletResponse.SC_FORBIDDEN
            );

            return;
        }

        Student student =
                studentDAO.findByUserId(
                        user.getUserId()
                );

        if (student == null) {

            response.setStatus(
                    HttpServletResponse.SC_NOT_FOUND
            );

            return;
        }

        response.setContentType(
                "application/json"
        );

        response.setCharacterEncoding(
                "UTF-8"
        );

        response.getWriter().print(
                "{"
                + "\"id\":\""
                + student.getUserId()
                + "\","
                + "\"name\":\""
                + student.getName()
                + "\","
                + "\"batch\":\""
                + student.getBatch()
                + "\","
                + "\"phone\":\""
                + (student.getPhone() == null ? "" : student.getPhone())
                + "\","
                + "\"email\":\""
                + (student.getEmail() == null ? "" : student.getEmail())
                + "\","
                + "\"address\":\""
                + (student.getAddress() == null ? "" : student.getAddress())
                + "\""
                + "}"
        );
    }
}