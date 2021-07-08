from selenium import webdriver
from selenium.webdriver.common.by import By
import time


class TestAuthentication:
    driver = ''

    def setup_method(self):
        self.driver = webdriver.Chrome(
            executable_path="/Users/atorenherrinton/Development/remind/testing/chromedriver")
        self.driver.implicitly_wait(5)
        self.driver.get('http://localhost:3000/')

    def test_sign_in(self):
        self.driver.find_element(By.ID, 'sign-in-instead').click()
        self.driver.find_element(
            By.ID, 'email-input').send_keys("test@test.com")
        self.driver.find_element(
            By.ID, 'password-input').send_keys("sadfklaf9239j4kasdfljSKDJF")
        self.driver.find_element(By.ID, 'sign-in').click()
        expected_id = 'main'
        main_application = self.driver.find_element(By.ID, expected_id)
        assert main_application.is_displayed(
        ), f'Error. Expected the main application to load: "{expected_id}" was not found'

    def test_continue_with_google(self):
        self.driver.find_element(By.ID, 'continue-with-google').click()
        for handle in self.driver.window_handles:
            self.driver.switch_to_window(handle)
        time.sleep(1)
        expected_id = 'identifierId'
        google_auth = self.driver.find_element(
            By.ID, expected_id)
        assert google_auth.is_displayed(
        ), f'Error. Expected the google authentication popup to load: "{expected_id}" was not found'

    def test_stays_signed_in_after_refresh(self):
        self.driver.find_element(By.ID, 'sign-in-instead').click()
        self.driver.find_element(
            By.ID, 'email-input').send_keys("test@test.com")
        self.driver.find_element(
            By.ID, 'password-input').send_keys("sadfklaf9239j4kasdfljSKDJF")
        self.driver.find_element(By.ID, 'sign-in').click()
        time.sleep(1)
        self.driver.refresh()
        expected_id = 'main'
        main_application = self.driver.find_element(By.ID, expected_id)
        assert main_application.is_displayed(
        ), f'Error. Expected the main application to load: "{expected_id}" was not found'

    def test_sign_out(self):
        self.driver.find_element(By.ID, 'sign-in-instead').click()
        self.driver.find_element(
            By.ID, 'email-input').send_keys("test@test.com")
        self.driver.find_element(
            By.ID, 'password-input').send_keys("sadfklaf9239j4kasdfljSKDJF")
        self.driver.find_element(By.ID, 'sign-in').click()
        time.sleep(1)
        self.driver.find_element(By.ID, 'sign-out').click()
        expected_id = 'authenticate'
        authentication_page = self.driver.find_element(By.ID, expected_id)
        assert authentication_page.is_displayed(
        ), f'Error. Expected the main application to load: "{expected_id}" was not found'

    def teardown_method(self):
        self.driver.quit()
