package com.elearn.servlet;

import java.io.IOException;

import com.elearn.model.User;
import com.elearn.service.FacultyService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/admin-add-faculty")
public class AdminAddFacultyServlet extends HttpServlet {

    private final FacultyService facultyService =
            new FacultyService();

    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session =
                request.getSession(false);

        if (session == null ||
            session.getAttribute("user") == null) {

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            return;
        }

        User user =
                (User) session.getAttribute("user");

        if (!"ADMIN".equals(user.getRole())) {

            response.setStatus(
                    HttpServletResponse.SC_FORBIDDEN
            );

            return;
        }

        response.setContentType(
                "application/json"
        );

        response.setCharacterEncoding(
                "UTF-8"
        );

        try {

            String userId =
                    request.getParameter("userId");

            String password =
                    request.getParameter("password");

            String name =
                    request.getParameter("name");

            String subject =
                    request.getParameter("subject");


            if (userId == null ||
                password == null ||
                name == null ||
                subject == null ||
                userId.trim().isEmpty() ||
                password.trim().isEmpty() ||
                name.trim().isEmpty() ||
                subject.trim().isEmpty()) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                response.getWriter().print(
                        "{\"success\":false,\"message\":\"All fields are required\"}"
                );

                return;
            }


            boolean success =
                    facultyService.createFaculty(
                            userId.trim(),
                            password,
                            name.trim(),
                            subject.trim()
                    );


            if (success) {

                response.getWriter().print(
                        "{\"success\":true,\"message\":\"Faculty added successfully\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse.SC_INTERNAL_SERVER_ERROR
                );

                response.getWriter().print(
                        "{\"success\":false,\"message\":\"Unable to add faculty\"}"
                );
            }


        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR
            );

            response.getWriter().print(
                    "{\"success\":false,\"message\":\"Server error while adding faculty\"}"
            );
        }
    }
}