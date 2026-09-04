package com.elearn.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.elearn.config.DBConnection;
import com.elearn.model.StudentFeeRecord;

public class StudentFeeDAO {

    public List<StudentFeeRecord> getFeesByStudentAndBatch(
            String studentUserId,
            int batchId) {

        List<StudentFeeRecord> fees =
                new ArrayList<>();

        String sql =
                "SELECT id, student_user_id, batch_id, " +
                "fee_month, amount, status " +
                "FROM student_fee_records " +
                "WHERE student_user_id = ? " +
                "AND batch_id = ? " +
                "ORDER BY fee_month";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setString(1, studentUserId);
            statement.setInt(2, batchId);

            try (ResultSet result =
                    statement.executeQuery()) {

                while (result.next()) {

                    StudentFeeRecord fee =
                            new StudentFeeRecord(
                                result.getInt("id"),
                                result.getString(
                                    "student_user_id"
                                ),
                                result.getInt("batch_id"),
                                result.getDate(
                                    "fee_month"
                                ).toLocalDate(),
                                result.getBigDecimal(
                                    "amount"
                                ),
                                result.getString(
                                    "status"
                                )
                            );

                    fees.add(fee);
                }
            }

        } catch (Exception e) {

            e.printStackTrace();
        }

        return fees;
    }
    
    public boolean generateFeeRecords(
            String studentUserId,
            int batchId,
            java.time.LocalDate startDate,
            java.time.LocalDate endDate,
            java.math.BigDecimal monthlyFee) {

        String sql =
                "INSERT INTO student_fee_records " +
                "(student_user_id, batch_id, fee_month, amount, status) " +
                "VALUES (?, ?, ?, ?, 'PENDING')";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            java.time.LocalDate currentMonth =
                    startDate.withDayOfMonth(1);

            java.time.LocalDate lastMonth =
                    endDate.withDayOfMonth(1);

            while (!currentMonth.isAfter(lastMonth)) {

                statement.setString(
                        1,
                        studentUserId
                );

                statement.setInt(
                        2,
                        batchId
                );

                statement.setDate(
                        3,
                        java.sql.Date.valueOf(
                                currentMonth
                        )
                );

                statement.setBigDecimal(
                        4,
                        monthlyFee
                );

                statement.addBatch();

                currentMonth =
                        currentMonth.plusMonths(1);
            }

            statement.executeBatch();

            return true;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }
    public List<StudentFeeRecord> getAllFeeRecords() {

        List<StudentFeeRecord> fees =
                new ArrayList<>();

        String sql =
                "SELECT id, student_user_id, batch_id, " +
                "fee_month, amount, status " +
                "FROM student_fee_records " +
                "ORDER BY fee_month, id";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql);

                ResultSet result =
                        statement.executeQuery()
        ) {

            while (result.next()) {

                StudentFeeRecord fee =
                        new StudentFeeRecord(
                            result.getInt("id"),
                            result.getString("student_user_id"),
                            result.getInt("batch_id"),
                            result.getDate("fee_month")
                                .toLocalDate(),
                            result.getBigDecimal("amount"),
                            result.getString("status")
                        );

                fees.add(fee);
            }

        } catch (Exception e) {

            e.printStackTrace();
        }

        return fees;
    }
    public boolean markAsPaid(int feeRecordId) {

        String sql =
                "UPDATE student_fee_records " +
                "SET status = 'PAID' " +
                "WHERE id = ?";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setInt(
                    1,
                    feeRecordId
            );

            return statement.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }
 // =================================
    // UPDATE PENDING FEES FOR BATCH
    // =================================

    public boolean updatePendingFeesForBatch(
            int batchId,
            java.math.BigDecimal newAmount) {

        String sql =
                "UPDATE student_fee_records " +
                "SET amount = ? " +
                "WHERE batch_id = ? " +
                "AND status = 'PENDING'";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setBigDecimal(
                    1,
                    newAmount
            );

            statement.setInt(
                    2,
                    batchId
            );

            statement.executeUpdate();

            return true;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }
}