package com.elearn.filter;

import java.io.IOException;

import com.elearn.model.User;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebFilter(urlPatterns = {
        "/admin-dashboard.html",
        "/student-dashboard.html",
        "/faculty-dashboard.html"
})
public class AuthFilter implements Filter {

    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest =
                (HttpServletRequest) request;

        HttpServletResponse httpResponse =
                (HttpServletResponse) response;

        HttpSession session =
                httpRequest.getSession(false);

        if (session == null) {

            httpResponse.sendRedirect("index.html");
            return;
        }

        User user =
                (User) session.getAttribute("user");

        if (user == null) {

            httpResponse.sendRedirect("index.html");
            return;
        }

        String role = user.getRole();

        String requestURI =
                httpRequest.getRequestURI();

        String contextPath =
                httpRequest.getContextPath();

        String page =
                requestURI.substring(
                        contextPath.length()
                );


        if (page.equals("/admin-dashboard.html")
                && !"ADMIN".equals(role)) {

            httpResponse.sendRedirect("index.html");
            return;
        }


        if (page.equals("/student-dashboard.html")
                && !"STUDENT".equals(role)) {

            httpResponse.sendRedirect("index.html");
            return;
        }


        if (page.equals("/faculty-dashboard.html")
                && !"FACULTY".equals(role)) {

            httpResponse.sendRedirect("index.html");
            return;
        }


        chain.doFilter(
                request,
                response
        );
    }
}