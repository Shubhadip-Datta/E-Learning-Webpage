package com.elearn.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.elearn.config.DBConnection;
import com.elearn.model.Batch;

public class BatchDAO {

    public List<Batch> getActiveBatches() {

        List<Batch> batches =
                new ArrayList<>();

        String sql =
                "SELECT id, name, subject, teacher, schedule, " +
                "start_date, end_date, monthly_fee, active " +
                "FROM batches " +
                "WHERE active = TRUE " +
                "ORDER BY id";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql);

                ResultSet result =
                        statement.executeQuery()
        ) {

            while (result.next()) {

                Batch batch =
                        new Batch(
                                result.getInt("id"),
                                result.getString("name"),
                                result.getString("subject"),
                                result.getString("teacher"),
                                result.getString("schedule"),
                                result.getDate("start_date")
                                        .toLocalDate(),
                                result.getDate("end_date")
                                        .toLocalDate(),
                                result.getBigDecimal("monthly_fee"),
                                result.getBoolean("active")
                        );

                batches.add(batch);
            }

        } catch (Exception e) {

            e.printStackTrace();
        }

        return batches;
    }
    
    public List<Batch> getAllBatches() {

        List<Batch> batches =
                new ArrayList<>();

        String sql =
                "SELECT id, name, subject, teacher, schedule, " +
                "start_date, end_date, monthly_fee, active " +
                "FROM batches " +
                "ORDER BY id";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql);

                ResultSet result =
                        statement.executeQuery()
        ) {

            while (result.next()) {

                Batch batch =
                        new Batch(
                                result.getInt("id"),
                                result.getString("name"),
                                result.getString("subject"),
                                result.getString("teacher"),
                                result.getString("schedule"),
                                result.getDate("start_date")
                                        .toLocalDate(),
                                result.getDate("end_date")
                                        .toLocalDate(),
                                result.getBigDecimal("monthly_fee"),
                                result.getBoolean("active")
                        );

                batches.add(batch);
            }

        } catch (Exception e) {

            e.printStackTrace();
        }

        return batches;
    }
    public boolean addBatch(
            String name,
            String subject,
            String teacher,
            String schedule,
            java.time.LocalDate startDate,
            java.time.LocalDate endDate,
            java.math.BigDecimal monthlyFee) {

        String sql =
                "INSERT INTO batches " +
                "(name, subject, teacher, schedule, " +
                "start_date, end_date, monthly_fee, active) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, TRUE)";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setString(1, name);
            statement.setString(2, subject);
            statement.setString(3, teacher);
            statement.setString(4, schedule);

            statement.setDate(
                    5,
                    java.sql.Date.valueOf(startDate)
            );

            statement.setDate(
                    6,
                    java.sql.Date.valueOf(endDate)
            );

            statement.setBigDecimal(
                    7,
                    monthlyFee
            );

            return statement.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();

            return false;
        }
    }
 // =================================
 // UPDATE BATCH
 // =================================

 public boolean updateBatch(
         int id,
         String name,
         String subject,
         String teacher,
         String schedule,
         java.time.LocalDate startDate,
         java.time.LocalDate endDate,
         java.math.BigDecimal monthlyFee) {

     String sql =
             "UPDATE batches SET " +
             "name = ?, " +
             "subject = ?, " +
             "teacher = ?, " +
             "schedule = ?, " +
             "start_date = ?, " +
             "end_date = ?, " +
             "monthly_fee = ? " +
             "WHERE id = ?";

     try (
             Connection connection =
                     DBConnection.getConnection();

             PreparedStatement statement =
                     connection.prepareStatement(sql)
     ) {

         statement.setString(1, name);
         statement.setString(2, subject);
         statement.setString(3, teacher);
         statement.setString(4, schedule);

         statement.setDate(
                 5,
                 java.sql.Date.valueOf(startDate)
         );

         statement.setDate(
                 6,
                 java.sql.Date.valueOf(endDate)
         );

         statement.setBigDecimal(
                 7,
                 monthlyFee
         );

         statement.setInt(8, id);

         return statement.executeUpdate() > 0;

     } catch (Exception e) {

         e.printStackTrace();

         return false;
     }
 }


 // =================================
 // UPDATE BATCH STATUS
 // =================================

 public boolean updateBatchStatus(
         int id,
         boolean active) {

     String sql =
             "UPDATE batches " +
             "SET active = ? " +
             "WHERE id = ?";

     try (
             Connection connection =
                     DBConnection.getConnection();

             PreparedStatement statement =
                     connection.prepareStatement(sql)
     ) {

         statement.setBoolean(1, active);

         statement.setInt(2, id);

         return statement.executeUpdate() > 0;

     } catch (Exception e) {

         e.printStackTrace();

         return false;
     }
 }


 // =================================
 // REMOVE BATCH
 // =================================

 public boolean removeBatch(int id) {

     String sql =
             "DELETE FROM batches " +
             "WHERE id = ?";

     try (
             Connection connection =
                     DBConnection.getConnection();

             PreparedStatement statement =
                     connection.prepareStatement(sql)
     ) {

         statement.setInt(1, id);

         return statement.executeUpdate() > 0;

     } catch (Exception e) {

         e.printStackTrace();

         return false;
     }
 }
    public Batch findById(int id) {

        String sql =
                "SELECT id, name, subject, teacher, schedule, " +
                "start_date, end_date, monthly_fee, active " +
                "FROM batches " +
                "WHERE id = ?";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setInt(1, id);

            try (
                    ResultSet result =
                            statement.executeQuery()
            ) {

                if (result.next()) {

                    return new Batch(
                            result.getInt("id"),
                            result.getString("name"),
                            result.getString("subject"),
                            result.getString("teacher"),
                            result.getString("schedule"),
                            result.getDate("start_date")
                                    .toLocalDate(),
                            result.getDate("end_date")
                                    .toLocalDate(),
                            result.getBigDecimal("monthly_fee"),
                            result.getBoolean("active")
                    );
                }
            }

        } catch (Exception e) {

            e.printStackTrace();
        }

        return null;
    }
    public Batch findByName(String name) {

        String sql =
                "SELECT id, name, subject, teacher, schedule, " +
                "start_date, end_date, monthly_fee, active " +
                "FROM batches " +
                "WHERE name = ?";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setString(1, name);

            try (ResultSet result =
                    statement.executeQuery()) {

                if (result.next()) {

                    return new Batch(
                            result.getInt("id"),
                            result.getString("name"),
                            result.getString("subject"),
                            result.getString("teacher"),
                            result.getString("schedule"),
                            result.getDate("start_date")
                                    .toLocalDate(),
                            result.getDate("end_date")
                                    .toLocalDate(),
                            result.getBigDecimal("monthly_fee"),
                            result.getBoolean("active")
                    );
                }
            }

        } catch (Exception e) {

            e.printStackTrace();
        }

        return null;
    }
}