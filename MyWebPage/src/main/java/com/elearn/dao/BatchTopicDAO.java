package com.elearn.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.elearn.config.DBConnection;
import com.elearn.model.BatchTopic;

public class BatchTopicDAO {

    public List<BatchTopic> getTopicsByBatchId(int batchId) {

        List<BatchTopic> topics =
                new ArrayList<>();

        String sql =
                "SELECT id, batch_id, topic_name, " +
                "display_order, covered " +
                "FROM batch_topics " +
                "WHERE batch_id = ? " +
                "ORDER BY display_order";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setInt(1, batchId);

            try (ResultSet result =
                    statement.executeQuery()) {

                while (result.next()) {

                    BatchTopic topic =
                            new BatchTopic(
                                result.getInt("id"),
                                result.getInt("batch_id"),
                                result.getString("topic_name"),
                                result.getInt("display_order"),
                                result.getBoolean("covered")
                            );

                    topics.add(topic);
                }
            }

        } catch (Exception e) {

            e.printStackTrace();
        }

        return topics;
    }
}