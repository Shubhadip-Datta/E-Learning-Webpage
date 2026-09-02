package com.elearn.servlet;

import java.io.IOException;
import java.util.List;

import com.elearn.dao.StudentDAO;
import com.elearn.model.Student;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/students")
public class GetStudentsServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private StudentDAO studentDAO =
            new StudentDAO();

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        List<Student> students =
                studentDAO.getAllStudents();

        response.setContentType(
                "application/json"
        );

        response.setCharacterEncoding("UTF-8");

        StringBuilder json =
                new StringBuilder();

        json.append("[");

        for (int i = 0; i < students.size(); i++) {

            Student student =
                    students.get(i);

            json.append("{");

            json.append("\"id\":\"")
                    .append(student.getUserId())
                    .append("\",");

            json.append("\"name\":\"")
                    .append(student.getName())
                    .append("\",");

            json.append("\"batch\":\"")
                    .append(student.getBatch())
                    .append("\"");

            json.append("}");

            if (i < students.size() - 1) {
                json.append(",");
            }
        }

        json.append("]");

        response.getWriter().print(
                json.toString()
        );
    }
}