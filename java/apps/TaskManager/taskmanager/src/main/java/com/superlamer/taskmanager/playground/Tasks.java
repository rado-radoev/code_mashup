package com.superlamer.taskmanager.playground;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Tasks {
	
	private String task;
	private long duration;
	private long date;
	private Boolean completed;
	
	public Tasks(String task, long duration, long date, Boolean completed) {
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

	public long getDuration() {
		return duration;
	}

	public void setTime(long duration) {
		this.duration = duration;
	}

	public long getDate() {
		return date;
	}
	
	public void setDate(long date) {
		this.date = date;
	}

	public Boolean getCompleted() {
		return completed;
	}

	public void setCompleted(Boolean completed) {
		this.completed = completed;
	}
	
	@Override
	public String toString() {
		DateFormat duration = new SimpleDateFormat("HH:mm");
		DateFormat date = new SimpleDateFormat("dd/MM/yyyy");
		
		return String.format("Task: %s%n" +
				"Time: %s%n" + 
				"Date: %s%n" + 
				"Completed: %s", this.getTask(),
								 duration.format(new Date(this.getDuration())),
								 date.format(new Date(this.getDate())),
								 this.getCompleted());
	}

}
