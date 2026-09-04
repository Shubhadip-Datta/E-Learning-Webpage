package com.elearn.servlet;

import java.io.IOException;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.elearn.model.BatchTopic;
import com.elearn.service.BatchTopicService;

@WebServlet("/batch-topics")
public class BatchTopicsServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private BatchTopicService batchTopicService =
            new BatchTopicService();

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType(
                "application/json"
        );

        response.setCharacterEncoding(
                "UTF-8"
        );

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

        List<BatchTopic> topics =
                batchTopicService
                        .getTopicsByBatchId(batchId);


        StringBuilder json =
                new StringBuilder();

        json.append("[");


        for (int i = 0;
             i < topics.size();
             i++) {

            BatchTopic topic =
                    topics.get(i);

            if (i > 0) {
                json.append(",");
            }

            json.append("{");

            json.append("\"id\":")
                    .append(topic.getId())
                    .append(",");

            json.append("\"batchId\":")
                    .append(topic.getBatchId())
                    .append(",");

            json.append("\"topicName\":\"")
                    .append(topic.getTopicName())
                    .append("\",");

            json.append("\"displayOrder\":")
                    .append(topic.getDisplayOrder())
                    .append(",");

            json.append("\"covered\":")
                    .append(topic.isCovered());

            json.append("}");
        }


        json.append("]");

        response.getWriter().print(
                json.toString()
        );
    }
}