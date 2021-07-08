from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time


class TestReminderCard:
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
        self.driver.find_element(
            By.ID, 'reminder-item').click()

    def test_reminder_card_is_rendered(self):
        expected_id = 'reminder-card'
        reminder_card = self.driver.find_element(
            By.ID, expected_id)
        assert reminder_card.is_displayed(
        ), f'Error. Expected a reminder card to render: "{expected_id}" was not found'

    def test_reminder_card_has_an_assign_reminder_form(self):
        expected_id = 'assign-reminder-field'
        assign_reminder_form = self.driver.find_element(
            By.ID, expected_id)
        assert assign_reminder_form.is_enabled(
        ), f'Error. Expected an assign reminder form to render: "{expected_id}" was not found'

    def test_assign_reminder_form_contains_a_textfield(self):
        expected_id = 'assign-textfield'
        textfield = self.driver.find_element(
            By.ID, expected_id)
        assert textfield.is_displayed(
        ), f'Error. Expected a textfield to render: "{expected_id}" was not found'

    def test_assign_reminder_form_contains_a_button(self):
        expected_id = 'assign-button'
        button = self.driver.find_element(
            By.ID, expected_id)
        assert button.is_displayed(
        ), f'Error. Expected a textfield to render: "{expected_id}" was not found'

    def teardown_method(self):
        self.driver.find_element(By.ID, 'toggle-more-options').click()
        self.driver.find_element(By.ID, 'delete-reminder').click()
        self.driver.quit()
