package com.elearn.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import com.elearn.dao.BatchDAO;
import com.elearn.model.Batch;
import com.elearn.model.User;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/admin-batches")
public class AdminBatchesServlet extends HttpServlet {

    private final BatchDAO batchDAO =
            new BatchDAO();

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

        List<Batch> batches =
                batchDAO.getAllBatches();

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
             i < batches.size();
             i++) {

            Batch batch =
                    batches.get(i);

            out.print("{");

            out.print(
                "\"id\":" +
                batch.getId() +
                ","
            );

            out.print(
                "\"name\":\"" +
                escapeJson(batch.getName()) +
                "\","
            );

            out.print(
                "\"subject\":\"" +
                escapeJson(batch.getSubject()) +
                "\","
            );

            out.print(
                "\"teacher\":\"" +
                escapeJson(batch.getTeacher()) +
                "\","
            );

            out.print(
                "\"schedule\":\"" +
                escapeJson(batch.getSchedule()) +
                "\","
            );

            out.print(
                "\"startDate\":\"" +
                batch.getStartDate() +
                "\","
            );

            out.print(
                "\"endDate\":\"" +
                batch.getEndDate() +
                "\","
            );

            out.print(
                "\"monthlyFee\":" +
                batch.getMonthlyFee() +
                ","
            );

            out.print(
                "\"active\":" +
                batch.isActive()
            );

            out.print("}");

            if (i < batches.size() - 1) {
                out.print(",");
            }
        }

        out.print("]");

        out.flush();
    }


    private String escapeJson(
            String value) {

        if (value == null) {
            return "";
        }

        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"");
    }
}