package com.superlamer.taskmanager.playground;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Tasks {
	
	private String task;
	private int duration;
	private Date date;
	private Boolean completed;
	
	public Tasks(String task, int duration, Date date, Boolean completed) {
		this.task = task;
		this.duration = duration;
		this.date = date;
		this.completed = completed;
	}

	public String getTask() {
		return task;
	}

	public void setTask(String task) {
		this.task = task;
	}

	public int getDuration() {
		return duration;
	}

	public void setTime(int duration) {
		this.duration = duration;
	}

	public String getDate() {
		SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
		return format.format(date);
	}
	
	public void setDate(Date date) {
		this.date = date;
	}

	public Boolean getCompleted() {
		return completed;
	}

	public void setCompleted(Boolean completed) {
		this.completed = completed;
	}
	
	

}
