package com.elearn.servlet;

import java.io.IOException;

import com.elearn.model.User;
import com.elearn.service.AuthService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private AuthService authService = new AuthService();

    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        String userId =
                request.getParameter("userId");

        String password =
                request.getParameter("password");

        User user =
                authService.login(userId, password);

        if (user != null) {

            HttpSession session =
                    request.getSession();

            session.setAttribute(
                    "user",
                    user
            );

            response.getWriter().println(
                    "Login successful! Role: "
                    + user.getRole()
            );

        } else {

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            response.getWriter().println(
                    "Invalid user ID or password"
            );
        }
    }
}