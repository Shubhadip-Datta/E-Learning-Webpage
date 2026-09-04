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

@WebServlet("/student-fees")
public class StudentFeesServlet extends HttpServlet {

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
            !"STUDENT".equals(user.getRole())) {

            response.setStatus(
                    HttpServletResponse.SC_FORBIDDEN
            );
            return;
        }

        String batchIdParameter =
                request.getParameter("batchId");

        if (batchIdParameter == null ||
            batchIdParameter.trim().isEmpty()) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            response.getWriter().print(
                    "{\"error\":\"batchId is required\"}"
            );

            return;
        }

        int batchId;

        try {

            batchId =
                    Integer.parseInt(
                            batchIdParameter
                    );

        } catch (NumberFormatException e) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            response.getWriter().print(
                    "{\"error\":\"Invalid batchId\"}"
            );

            return;
        }

        List<StudentFeeRecord> fees =
                studentFeeService
                        .getFeesByStudentAndBatch(
                                user.getUserId(),
                                batchId
                        );

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