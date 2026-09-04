package com.elearn.servlet;

import java.io.IOException;
import java.util.List;

import com.elearn.model.Batch;
import com.elearn.service.BatchService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/batches")
public class GetBatchesServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private BatchService batchService =
            new BatchService();

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        List<Batch> batches =
                batchService.getActiveBatches();

        response.setContentType(
                "application/json"
        );

        response.setCharacterEncoding(
                "UTF-8"
        );

        StringBuilder json =
                new StringBuilder();

        json.append("[");

        for (int i = 0; i < batches.size(); i++) {

            Batch batch =
                    batches.get(i);

            json.append("{");

            json.append("\"id\":")
                    .append(batch.getId())
                    .append(",");

            json.append("\"name\":\"")
                    .append(batch.getName())
                    .append("\",");

            json.append("\"subject\":\"")
                    .append(batch.getSubject())
                    .append("\",");

            json.append("\"teacher\":\"")
                    .append(batch.getTeacher())
                    .append("\",");

            json.append("\"schedule\":\"")
                    .append(batch.getSchedule())
                    .append("\",");

            json.append("\"startDate\":\"")
                    .append(batch.getStartDate())
                    .append("\",");

            json.append("\"endDate\":\"")
                    .append(batch.getEndDate())
                    .append("\",");

            json.append("\"monthlyFee\":")
                    .append(batch.getMonthlyFee())
                    .append(",");

            json.append("\"active\":")
                    .append(batch.isActive());

            json.append("}");

            if (i < batches.size() - 1) {
                json.append(",");
            }
        }

        json.append("]");

        response.getWriter().print(
                json.toString()
        );
    }
}