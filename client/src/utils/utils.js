/** @format */

export const addUserToDatabase = (name, uid) => {
  const data = {
    action: "add_user_to_database",
    name: name,
    uid: uid,
  };

  fetch("http://127.0.0.1:5000/actions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("add_user_to_database:", data.result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const addReminder = (title, uid, whichReminders) => {
  const data = {
    action: "add_reminder",
    title: title,
    uid: uid,
    which_reminders: whichReminders,
  };

  fetch("http://127.0.0.1:5000/actions", {
    method: "POST",
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
  console.log(reminder);
  const data = {
    action: "change_reminder",
    id: reminder.id,
    date: reminder.date,
    email: reminder.email,
    phone_number: reminder.phoneNumber,
    time: reminder.time,
    title: reminder.title,
    uid: uid,
  };

  fetch("http://127.0.0.1:5000/actions", {
    method: "POST",
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

  fetch("http://127.0.0.1:5000/actions", {
    method: "POST",
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

export const loadName = (uid) => {
  const data = {
    action: "load_name",
    uid: uid,
  };

  return fetch("http://127.0.0.1:5000/actions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.result;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const loadReminders = (whichReminders, uid) => {
  const data = {
    action: "load_reminders",
    which_reminders: whichReminders,
    uid: uid,
  };

  return fetch("http://127.0.0.1:5000/actions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.result;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const sendReminderEmail = (
  date,
  displayDate,
  id,
  email,
  name,
  title,
  uid
) => {
  const data = {
    action: "send_reminder_email",
    date: date,
    display_date: displayDate,
    id: id,
    email: email,
    name: name,
    title: title,
    uid: uid,
  };

  return fetch("http://127.0.0.1:5000/actions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.result;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const sendReminderTextMessage = (
  id,
  name,
  phoneNumber,
  title,
  uid
) => {
  const data = {
    action: "send_reminder_text_message",
    id: id,
    name: name,
    phone_number: phoneNumber,
    title: title,
    uid: uid,
  };

  return fetch("http://127.0.0.1:5000/actions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.result;
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

  fetch("http://127.0.0.1:5000/actions", {
    method: "POST",
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

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validateName = (name) => {
  return /^[A-Za-z\s-]+[a-z]$/.test(name);
};

export const validatePassword = (password) => {
  if (!password) {
    return false;
  }
  return true;
};
