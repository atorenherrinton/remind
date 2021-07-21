from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time


class TestSignUp:
    driver = ''

    def setup_method(self):
        self.driver = webdriver.Chrome(
            executable_path="/Users/atorenherrinton/Development/remind/testing/chromedriver")
        self.driver.implicitly_wait(5)
        self.driver.get('http://localhost:3000/')

    def test_name_input_is_displayed(self):
        expected_id = 'name-input'
        result = self.driver.find_element(By.ID, expected_id)
        assert result.is_displayed(
        ), f'Error. Expected {expected_id}, but the {expected_id} was not found'

    def test_email_addresses_get_a_validation_error_if_empty(self):
        input = ''
        test_id = 'name-input'
        self.driver.find_element(By.ID, test_id)
        self.driver.find_element(
            By.ID, test_id).send_keys(input)
        self.driver.find_element(
            By.ID, test_id).send_keys(Keys.TAB)
        expected_text = 'Please enter a name'
        actual_text = self.driver.find_element(
            By.ID, 'name-input-helper-text').text
        assert expected_text in actual_text, f'Error. Expected the error message "{expected_text}": "{actual_text}" was found'

    def test_email_addresses_get_a_validation_error_if_not_a_proper_email_address(self):
        input = 'test'
        test_id = 'email-input'
        self.driver.find_element(By.ID, test_id)
        self.driver.find_element(
            By.ID, test_id).send_keys(input)
        self.driver.find_element(
            By.ID, test_id).send_keys(Keys.TAB)
        expected_text = 'Please enter a valid email address'
        actual_text = self.driver.find_element(
            By.ID, 'email-input-helper-text').text
        assert expected_text in actual_text, f'Error. Expected the error message "{expected_text}": "{actual_text}" was found'

    def teardown_method(self):
        self.driver.quit()
