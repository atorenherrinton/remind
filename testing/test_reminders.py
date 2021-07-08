from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time


class TestReminders:
    driver = ''

    def setup_method(self):
        self.driver = webdriver.Chrome(
            executable_path="/Users/atorenherrinton/Development/remind/testing/chromedriver")
        self.driver.implicitly_wait(5)
        self.driver.get('http://localhost:3000/')
        self.driver.find_element(By.ID, 'sign-in-instead').click()
        self.driver.find_element(
            By.ID, 'email-input').send_keys("test@test.com")
        self.driver.find_element(
            By.ID, 'password-input').send_keys("sadfklaf9239j4kasdfljSKDJF")
        self.driver.find_element(By.ID, 'sign-in').click()
        self.driver.find_element(By.ID, 'add-reminder-button').click()
        self.driver.find_element(
            By.ID, 'add-reminder-input').send_keys(f'testing123{Keys.RETURN}')

    def test_add_reminder(self):
        expected_text = 'testing123'
        actual_text = self.driver.find_element(By.ID, 'reminder-item').text
        assert expected_text == actual_text, f'Error. Expected {expected_text}, but the actual reminder item text is {actual_text}'

    def test_reminder_is_not_completed(self):
        checked_checkbox = self.driver.find_elements(
            By.CLASS_NAME, 'Mui-checked')
        assert len(
            checked_checkbox) == 0, f'Error. Expected the checkbox to be unchecked, but it was checked'

    def test_reminder_is_completed_when_clicked(self):
        self.driver.find_element(By.ID, 'checkbox').click()
        checked_checkbox = self.driver.find_elements(
            By.CLASS_NAME, 'Mui-checked')
        assert len(
            checked_checkbox) == 1, f'Error. Expected the checkbox to be checked, but it was unchecked'

    def test_completed_reminder_is_loaded_when_clicking_completed_reminders_link(self):
        self.driver.find_element(By.ID, 'checkbox').click()
        time.sleep(0.5)
        self.driver.find_element(By.ID, 'completed-link').click()
        time.sleep(0.5)
        checked_checkbox = self.driver.find_elements(
            By.CLASS_NAME, 'Mui-checked')
        assert len(
            checked_checkbox) == 1, f'Error. Expected the checkbox to be checked, but it was unchecked'

    def test_completed_reminder_is_returned_to_todos_when_clicking_todos_link(self):
        self.driver.find_element(By.ID, 'checkbox').click()
        time.sleep(0.5)
        self.driver.find_element(By.ID, 'completed-link').click()
        time.sleep(0.5)
        self.driver.find_element(By.ID, 'checkbox').click()
        time.sleep(0.5)
        self.driver.find_element(By.ID, 'todos-link').click()
        time.sleep(0.5)
        checked_checkbox = self.driver.find_elements(
            By.CLASS_NAME, 'Mui-checked')
        assert len(
            checked_checkbox) == 0, f'Error. Expected the checkbox to be checked, but it was unchecked'

    def teardown_method(self):
        self.driver.find_element(By.ID, 'reminder-item').click()
        self.driver.find_element(By.ID, 'toggle-more-options').click()
        self.driver.find_element(By.ID, 'delete-reminder').click()
        self.driver.quit()
