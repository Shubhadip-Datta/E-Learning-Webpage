package com.elearn.servlet;

import java.io.IOException;

import com.elearn.dao.FacultyDAO;
import com.elearn.model.User;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/admin-remove-faculty")
public class AdminRemoveFacultyServlet
        extends HttpServlet {

    private final FacultyDAO facultyDAO =
            new FacultyDAO();

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

            if (userId == null ||
                userId.trim().isEmpty()) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                response.getWriter().print(
                        "{\"success\":false,\"message\":\"Faculty ID is required\"}"
                );

                return;
            }

            boolean success =
                    facultyDAO.removeFaculty(
                            userId.trim()
                    );

            if (success) {

                response.getWriter().print(
                        "{\"success\":true,\"message\":\"Faculty removed successfully\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse.SC_INTERNAL_SERVER_ERROR
                );

                response.getWriter().print(
                        "{\"success\":false,\"message\":\"Failed to remove faculty\"}"
                );
            }

        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR
            );

            response.getWriter().print(
                    "{\"success\":false,\"message\":\"Server error while removing faculty\"}"
            );
        }
    }
}