package com.elearn.service;

import java.util.List;

import com.elearn.dao.BatchDAO;
import com.elearn.model.Batch;

public class BatchService {

    private BatchDAO batchDAO =
            new BatchDAO();

    public List<Batch> getActiveBatches() {

        return batchDAO.getActiveBatches();
    }
}