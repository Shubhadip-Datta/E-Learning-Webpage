package com.elearn.servlet;

import java.io.IOException;

import com.elearn.dao.BatchDAO;
import com.elearn.model.User;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/admin-update-batch-status")
public class AdminUpdateBatchStatusServlet
        extends HttpServlet {

    private final BatchDAO batchDAO =
            new BatchDAO();

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

            String idValue =
                    request.getParameter("id");

            String activeValue =
                    request.getParameter("active");


            if (idValue == null ||
                activeValue == null) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                response.getWriter().print(
                        "{\"success\":false,\"message\":\"Batch ID and status are required\"}"
                );

                return;
            }


            int id =
                    Integer.parseInt(
                            idValue
                    );

            boolean active =
                    Boolean.parseBoolean(
                            activeValue
                    );


            boolean success =
                    batchDAO.updateBatchStatus(
                            id,
                            active
                    );


            if (success) {

                response.getWriter().print(
                        "{\"success\":true,\"message\":\"Batch status updated successfully\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse.SC_INTERNAL_SERVER_ERROR
                );

                response.getWriter().print(
                        "{\"success\":false,\"message\":\"Failed to update batch status\"}"
                );
            }


        } catch (NumberFormatException e) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            response.getWriter().print(
                    "{\"success\":false,\"message\":\"Invalid batch ID\"}"
            );


        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR
            );

            response.getWriter().print(
                    "{\"success\":false,\"message\":\"Server error\"}"
            );
        }
    }
}