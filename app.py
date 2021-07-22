from datetime import datetime
import dateutil.parser as dp
from flask import Flask, request, send_from_directory
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import os


app = Flask(__name__, static_folder='client/build', static_url_path='')
app.debug = True
CORS(app)

cred = credentials.Certificate('sdk/remind-6aa6f-854bbc7d7beb.json')
firebase_admin.initialize_app(cred)
db = firestore.client()


def add_user_to_database():
    name, uid = request.json['name'], request.json['uid']
    db.collection(u'users').document(uid).set({
        u'name': name,
    })
    return 'successfully added user to firestore'


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
            u'visibility': u'public'
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
            u'visibility': u'private'
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


def load_name():
    uid = request.json['uid']
    doc_ref = db.collection(u'users').document(uid)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    else:
        return 'No such document!'


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


def send_reminder_email():
    email, id, name, title, uid = request.json[
        'email'], request.json['id'], request.json['name'], request.json['title'], request.json['uid']
    date = request.json.get('date')
    display_date = request.json.get('display_date')

    message = Mail(
        from_email='remindtest123@gmail.com',
        to_emails=email,
    )
    message.dynamic_template_data = {'name': name, 'reminder': {
        'title': title,
        'date': display_date,
        'id': id,
    }, 'uid': uid
    }
    if date:
        message.send_at = round(dp.parse(date).timestamp())
    message.template_id = 'd-a084c8491acd4131be614bf54a6c90c1'

    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e.message)


utils = {
    "add_user_to_database": add_user_to_database,
    "add_reminder": add_reminder,
    "change_reminder": change_reminder,
    "delete_reminder": delete_reminder,
    "load_name": load_name,
    "load_reminders": load_reminders,
    "send_reminder_email": send_reminder_email,
    "set_reminder_completed": set_reminder_completed,
}


@ app.route('/actions', methods=['POST'])
def firebase():
    action = request.json['action']
    return {'result': utils[action]()}


@ app.route('/sendgrid', methods=['GET'])
def send_reminder_email():
    id = request.args.get('id')
    uid = request.args.get('uid')
    print(id, uid)
    db.collection(u'users').document(uid).collection(
        u'reminders').document(id).update({
            u'isCompleted': True
        })
    return 'Congratulations, you have completed the reminder!'


@ app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0')
