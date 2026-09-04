package com.elearn.servlet;

import java.io.IOException;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import com.elearn.model.StudentFeeRecord;
import com.elearn.model.User;
import com.elearn.service.StudentFeeService;

@WebServlet("/admin-payments")
public class AdminPaymentsServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private StudentFeeService studentFeeService =
            new StudentFeeService();

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

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

        List<StudentFeeRecord> fees =
                studentFeeService.getAllFeeRecords();

        StringBuilder json =
                new StringBuilder();

        json.append("[");

        for (int i = 0;
             i < fees.size();
             i++) {

            StudentFeeRecord fee =
                    fees.get(i);

            if (i > 0) {
                json.append(",");
            }

            json.append("{");

            json.append("\"id\":")
                    .append(fee.getId())
                    .append(",");

            json.append("\"studentUserId\":\"")
                    .append(fee.getStudentUserId())
                    .append("\",");

            json.append("\"batchId\":")
                    .append(fee.getBatchId())
                    .append(",");

            json.append("\"feeMonth\":\"")
                    .append(fee.getFeeMonth())
                    .append("\",");

            json.append("\"amount\":")
                    .append(fee.getAmount())
                    .append(",");

            json.append("\"status\":\"")
                    .append(fee.getStatus())
                    .append("\"");

            json.append("}");
        }

        json.append("]");

        response.getWriter().print(
                json.toString()
        );
    }
}