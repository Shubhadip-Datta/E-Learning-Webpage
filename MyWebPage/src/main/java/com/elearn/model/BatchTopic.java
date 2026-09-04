package com.elearn.model;

public class BatchTopic {

    private int id;
    private int batchId;
    private String topicName;
    private int displayOrder;
    private boolean covered;


    public BatchTopic(
            int id,
            int batchId,
            String topicName,
            int displayOrder,
            boolean covered) {

        this.id = id;
        this.batchId = batchId;
        this.topicName = topicName;
        this.displayOrder = displayOrder;
        this.covered = covered;
    }


    public int getId() {
        return id;
    }


    public void setId(int id) {
        this.id = id;
    }


    public int getBatchId() {
        return batchId;
    }


    public void setBatchId(int batchId) {
        this.batchId = batchId;
    }


    public String getTopicName() {
        return topicName;
    }


    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }


    public int getDisplayOrder() {
        return displayOrder;
    }


    public void setDisplayOrder(int displayOrder) {
        this.displayOrder = displayOrder;
    }


    public boolean isCovered() {
        return covered;
    }


    public void setCovered(boolean covered) {
        this.covered = covered;
    }
}