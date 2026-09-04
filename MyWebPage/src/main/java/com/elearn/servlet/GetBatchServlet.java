package com.elearn.servlet;

import java.io.IOException;

import com.elearn.dao.BatchDAO;
import com.elearn.model.Batch;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/batch")
public class GetBatchServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private BatchDAO batchDAO =
            new BatchDAO();

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        String batchId =
                request.getParameter("id");

        if (batchId == null ||
                batchId.trim().isEmpty()) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            return;
        }

        int id;

        try {

            id = Integer.parseInt(
                    batchId.trim()
            );

        } catch (NumberFormatException e) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST
            );

            return;
        }

        Batch batch =
                batchDAO.findById(id);

        if (batch == null) {

            response.setStatus(
                    HttpServletResponse.SC_NOT_FOUND
            );

            return;
        }

        response.setContentType(
                "application/json"
        );

        response.setCharacterEncoding(
                "UTF-8"
        );

        response.getWriter().print(
                "{"
                + "\"id\":" + batch.getId() + ","
                + "\"name\":\"" + batch.getName() + "\","
                + "\"subject\":\"" + batch.getSubject() + "\","
                + "\"teacher\":\"" + batch.getTeacher() + "\","
                + "\"schedule\":\"" + batch.getSchedule() + "\","
                + "\"startDate\":\"" + batch.getStartDate() + "\","
                + "\"endDate\":\"" + batch.getEndDate() + "\","
                + "\"monthlyFee\":" + batch.getMonthlyFee() + ","
                + "\"active\":" + batch.isActive()
                + "}"
        );
    }
}