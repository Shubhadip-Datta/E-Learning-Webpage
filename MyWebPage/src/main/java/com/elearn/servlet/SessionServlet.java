package com.elearn.servlet;

import java.io.IOException;

import com.elearn.model.User;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/session")
public class SessionServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

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

            response.getWriter().println(
                    "Not logged in"
            );

            return;
        }

        User user =
                (User) session.getAttribute("user");

        if (user == null) {

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            response.getWriter().println(
                    "Not logged in"
            );

            return;
        }

        response.setContentType("text/plain");

        response.getWriter().println(
                "User ID: " + user.getUserId()
        );

        response.getWriter().println(
                "Role: " + user.getRole()
        );

        response.getWriter().println(
                "Status: " + user.getStatus()
        );
    }
}