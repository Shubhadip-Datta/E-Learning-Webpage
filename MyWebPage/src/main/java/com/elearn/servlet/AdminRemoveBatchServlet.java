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

@WebServlet("/admin-remove-batch")
public class AdminRemoveBatchServlet
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


            if (idValue == null ||
                idValue.trim().isEmpty()) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                response.getWriter().print(
                        "{\"success\":false,\"message\":\"Batch ID is required\"}"
                );

                return;
            }


            int id =
                    Integer.parseInt(
                            idValue
                    );


            boolean success =
                    batchDAO.removeBatch(id);


            if (success) {

                response.getWriter().print(
                        "{\"success\":true,\"message\":\"Batch removed successfully\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse.SC_INTERNAL_SERVER_ERROR
                );

                response.getWriter().print(
                        "{\"success\":false,\"message\":\"Failed to remove batch\"}"
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
                    "{\"success\":false,\"message\":\"Unable to remove batch. It may have students or fee records linked to it.\"}"
            );
        }
    }
}