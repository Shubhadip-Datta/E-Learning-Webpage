package com.elearn.service;

import java.util.List;

import com.elearn.dao.BatchTopicDAO;
import com.elearn.model.BatchTopic;

public class BatchTopicService {

    private BatchTopicDAO batchTopicDAO =
            new BatchTopicDAO();

    public List<BatchTopic> getTopicsByBatchId(
            int batchId) {

        return batchTopicDAO
                .getTopicsByBatchId(batchId);
    }
}
