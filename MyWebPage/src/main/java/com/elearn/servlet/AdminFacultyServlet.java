package com.elearn.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import com.elearn.dao.FacultyDAO;
import com.elearn.model.Faculty;
import com.elearn.model.User;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/admin-faculty")
public class AdminFacultyServlet extends HttpServlet {

    private final FacultyDAO facultyDAO =
            new FacultyDAO();

    @Override
    protected void doGet(
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

        List<Faculty> facultyList =
                facultyDAO.getAllFaculty();

        response.setContentType(
                "application/json"
        );

        response.setCharacterEncoding(
                "UTF-8"
        );

        PrintWriter out =
                response.getWriter();

        out.print("[");

        for (int i = 0;
             i < facultyList.size();
             i++) {

            Faculty faculty =
                    facultyList.get(i);

            out.print("{");

            out.print(
                    "\"userId\":\"" +
                    escapeJson(
                            faculty.getUserId()
                    ) +
                    "\","
            );

            out.print(
                    "\"name\":\"" +
                    escapeJson(
                            faculty.getName()
                    ) +
                    "\","
            );

            out.print(
                    "\"subject\":\"" +
                    escapeJson(
                            faculty.getSubject()
                    ) +
                    "\","
            );

            out.print(
                    "\"active\":" +
                    faculty.isActive()
            );

            out.print("}");

            if (i < facultyList.size() - 1) {

                out.print(",");
            }
        }

        out.print("]");

        out.flush();
    }

    private String escapeJson(String value) {

        if (value == null) {

            return "";
        }

        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"");
    }
}