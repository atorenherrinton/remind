/** @format */

export const addReminder = (title, uid) => {
	const data = {
		action: "add_reminder",
		title: title,
		uid: uid,
	};

	fetch("http://127.0.0.1:5000/firebase", {
		method: "POST", // or 'PUT'
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log("add_reminder:", data.result);
		})
		.catch((error) => {
			console.error("Error:", error);
		});
};

export const changeReminder = (reminder, uid) => {
	const data = {
		action: "change_reminder",
		title: reminder.title,
		date: reminder.date,
		time: reminder.time,
		id: reminder.id,
		uid: uid,
	};

	fetch("http://127.0.0.1:5000/firebase", {
		method: "POST", // or 'PUT'
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log("change_reminder:", data.result);
		})
		.catch((error) => {
			console.error("Error:", error);
		});
};

export const deleteReminder = (id, uid) => {
	const data = {
		action: "delete_reminder",
		id: id,
		uid: uid,
	};

	fetch("http://127.0.0.1:5000/firebase", {
		method: "POST", // or 'PUT'
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log("delete_reminder:", data.result);
		})
		.catch((error) => {
			console.error("Error:", error);
		});
};

export const setReminderCompleted = (id, isCompleted, uid) => {
	const data = {
		action: "set_reminder_completed",
		id: id,
		isCompleted: isCompleted,
		uid: uid,
	};

	fetch("http://127.0.0.1:5000/firebase", {
		method: "POST", // or 'PUT'
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log("set_reminder_completed:", data.result);
		})
		.catch((error) => {
			console.error("Error:", error);
		});
};
