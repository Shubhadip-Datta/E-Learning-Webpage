package com.elearn.servlet;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import com.elearn.model.User;
import com.elearn.service.StudentFeeService;

@WebServlet("/verify-payment")
public class VerifyPaymentServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private StudentFeeService studentFeeService =
            new StudentFeeService();

    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");


        // =================================
        // CHECK ADMIN SESSION
        // =================================

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
            !"ADMIN".equals(user.getRole())) {

            response.setStatus(
                    HttpServletResponse.SC_FORBIDDEN
            );

            return;
        }


        // =================================
        // GET FEE RECORD ID
        // =================================

        String idParameter =
                request.getParameter("feeRecordId");

        if (idParameter == null ||
            idParameter.trim().isEmpty()) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            response.getWriter().print(
                    "{\"error\":\"feeRecordId is required\"}"
            );

            return;
        }


        int feeRecordId;

        try {

            feeRecordId =
                    Integer.parseInt(
                            idParameter
                    );

        } catch (NumberFormatException e) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            response.getWriter().print(
                    "{\"error\":\"Invalid feeRecordId\"}"
            );

            return;
        }


        // =================================
        // MARK PAYMENT AS PAID
        // =================================

        boolean updated =
                studentFeeService.markAsPaid(
                        feeRecordId
                );


        if (!updated) {

            response.setStatus(
                    HttpServletResponse.SC_NOT_FOUND
            );

            response.getWriter().print(
                    "{\"error\":\"Payment record not found\"}"
            );

            return;
        }


        // =================================
        // SUCCESS
        // =================================

        response.getWriter().print(
                "{\"message\":\"Payment verified successfully\"}"
        );
    }
}