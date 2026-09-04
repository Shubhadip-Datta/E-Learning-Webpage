package com.elearn.servlet;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;

import com.elearn.dao.BatchDAO;
import com.elearn.model.User;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/admin-add-batch")
public class AdminAddBatchServlet extends HttpServlet {

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


        try {

            String name =
                    request.getParameter("name");

            String subject =
                    request.getParameter("subject");

            String teacher =
                    request.getParameter("teacher");

            String schedule =
                    request.getParameter("schedule");

            String startDateValue =
                    request.getParameter("startDate");

            String endDateValue =
                    request.getParameter("endDate");

            String monthlyFeeValue =
                    request.getParameter("monthlyFee");


            if (name == null ||
                subject == null ||
                teacher == null ||
                schedule == null ||
                startDateValue == null ||
                endDateValue == null ||
                monthlyFeeValue == null) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                response.setContentType(
                        "application/json"
                );

                response.getWriter().print(
                        "{\"success\":false,\"message\":\"All fields are required\"}"
                );

                return;
            }


            LocalDate startDate =
                    LocalDate.parse(
                            startDateValue
                    );

            LocalDate endDate =
                    LocalDate.parse(
                            endDateValue
                    );

            BigDecimal monthlyFee =
                    new BigDecimal(
                            monthlyFeeValue
                    );


            if (endDate.isBefore(startDate)) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST
                );

                response.setContentType(
                        "application/json"
                );

                response.getWriter().print(
                        "{\"success\":false,\"message\":\"End date cannot be before start date\"}"
                );

                return;
            }


            boolean success =
                    batchDAO.addBatch(
                            name.trim(),
                            subject.trim(),
                            teacher.trim(),
                            schedule.trim(),
                            startDate,
                            endDate,
                            monthlyFee
                    );


            response.setContentType(
                    "application/json"
            );

            response.setCharacterEncoding(
                    "UTF-8"
            );


            if (success) {

                response.getWriter().print(
                        "{\"success\":true,\"message\":\"Batch added successfully\"}"
                );

            } else {

                response.setStatus(
                        HttpServletResponse.SC_INTERNAL_SERVER_ERROR
                );

                response.getWriter().print(
                        "{\"success\":false,\"message\":\"Failed to add batch\"}"
                );
            }


        } catch (NumberFormatException e) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            response.setContentType(
                    "application/json"
            );

            response.getWriter().print(
                    "{\"success\":false,\"message\":\"Invalid monthly fee\"}"
            );


        } catch (Exception e) {

            e.printStackTrace();

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            response.setContentType(
                    "application/json"
            );

            response.getWriter().print(
                    "{\"success\":false,\"message\":\"Invalid batch data\"}"
            );
        }
    }
}