from datetime import datetime
from flask import Flask, request, send_from_directory
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json

app = Flask(__name__, static_folder='client/build', static_url_path='')
app.debug = True
CORS(app)

cred = credentials.Certificate('sdk/remind-6aa6f-854bbc7d7beb.json')
firebase_admin.initialize_app(cred)
db = firestore.client()


def add_reminder():
    title, uid, which_reminders = request.json['title'], request.json['uid'], request.json['which_reminders']
    if which_reminders == 'Todos':
        db.collection(u'users').document(uid).collection(u'reminders').add({
            u'isAssigned': False,
            u'isCompleted': False,
            u'timestamp': firestore.SERVER_TIMESTAMP,
            u'title': title,
        })
    elif which_reminders == 'Scheduled':
        db.collection(u'users').document(uid).collection(u'reminders').add({
            u'date': datetime.now().isoformat(),
            u'isAssigned': False,
            u'isCompleted': False,
            u'timestamp': firestore.SERVER_TIMESTAMP,
            u'title': title,
        })
    elif which_reminders == 'Completed':
        db.collection(u'users').document(uid).collection(u'reminders').add({
            u'isAssigned': False,
            u'isCompleted': True,
            u'timestamp': firestore.SERVER_TIMESTAMP,
            u'title': title,
        })
    return 'successfully added reminder to firestore'


def add_date(uid, id, date):
    db.collection(u'users').document(uid).collection(
        u'reminders').document(id).update({
            u'date': date,
            u'time': firestore.DELETE_FIELD,
        })


def add_date_and_time(uid, id, date, time):
    db.collection(u'users').document(uid).collection(
        u'reminders').document(id).update({
            u'date': date,
            u'time': time,
        })


def remove_date_and_time(uid, id):
    db.collection(u'users').document(uid).collection(
        u'reminders').document(id).update({
            u'date': firestore.DELETE_FIELD,
            u'time': firestore.DELETE_FIELD,
        })


def add_assignment_email(uid, id, email):
    db.collection(u'users').document(uid).collection(
        u'reminders').document(id).update({
            u'email': email,
            u'phoneNumber': firestore.DELETE_FIELD,
            u'isAssigned': True,
        })


def add_assignment_phone_number(uid, id, phone_number):
    db.collection(u'users').document(uid).collection(
        u'reminders').document(id).update({
            u'email': firestore.DELETE_FIELD,
            u'phoneNumber': phone_number,
            u'isAssigned': True,
        })


def remove_assignment(uid, id):
    db.collection(u'users').document(uid).collection(
        u'reminders').document(id).update({
            u'email': firestore.DELETE_FIELD,
            u'phoneNumber': firestore.DELETE_FIELD,
            u'isAssigned': False,
        })


def change_title(uid, id, title):
    db.collection(u'users').document(uid).collection(u'reminders').document(id).update({
        u'title': title, })


def change_reminder():
    # Items that exist
    title, id, uid = request.json['title'], request.json[
        'id'], request.json['uid']

    # Items that might not exist
    date, time, email, phone_number = request.json.get('date'), request.json.get(
        'time'), request.json.get('email'), request.json.get('phone_number')

    change_title(uid, id, title)

    if date and time:
        add_date_and_time(uid, id, date, time)
    elif date:
        add_date(uid, id, date)
    else:
        remove_date_and_time(uid, id)
    if email:
        add_assignment_email(uid, id, email)
    elif phone_number:
        add_assignment_phone_number(uid, id, phone_number)
    else:
        remove_assignment(uid, id)
    return 'successfully changed reminder in firestore'


def delete_reminder():
    id, uid = request.json['id'], request.json['uid']
    db.collection(u'users').document(uid).collection(
        u'reminders').document(id).delete()
    return 'successfully deleted reminder in firestore'


def load_reminders():
    uid, which_reminders = request.json['uid'], request.json['which_reminders']
    reminders = []
    if which_reminders == "Todos":
        docs = db.collection(u'users').document(uid).collection(u'reminders').where(
            u'isCompleted', u'==', False).order_by("timestamp").stream()
        for doc in docs:
            reminder = doc.to_dict()
            reminder['id'] = doc.id
            reminders.append(reminder)
    elif which_reminders == "Scheduled":
        docs = db.collection(u'users').document(uid).collection(u'reminders').where(
            u'date', u'!=', False).order_by("date").stream()
        for doc in docs:
            reminder = doc.to_dict()
            reminder['id'] = doc.id
            reminders.append(reminder)
    elif which_reminders == "Completed":
        docs = db.collection(u'users').document(uid).collection(u'reminders').where(
            u'isCompleted', u'==', True).order_by("timestamp").stream()
        for doc in docs:
            reminder = doc.to_dict()
            reminder['id'] = doc.id
            reminders.append(reminder)
    return reminders


def set_reminder_completed():
    id, isCompleted, uid = request.json['id'], request.json['isCompleted'], request.json['uid']
    db.collection(u'users').document(uid).collection(
        u'reminders').document(id).update({
            u'isCompleted': isCompleted
        })
    return 'successfully changed completion status of reminder in firestore'


firebase_actions = {
    "add_reminder": add_reminder,
    "change_reminder": change_reminder,
    "delete_reminder": delete_reminder,
    "load_reminders": load_reminders,
    "set_reminder_completed": set_reminder_completed,
}


@ app.route('/firebase', methods=['POST'])
def firebase():
    action = request.json['action']
    return {'result': firebase_actions[action]()}


@ app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0')
