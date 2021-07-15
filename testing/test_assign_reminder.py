from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time


class TestAssignReminder:
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

    def test_reminder_card_has_an_assign_reminder_list_item(self):
        expected_id = 'assign-reminder-list-item'
        assign_reminder_list_item = self.driver.find_element(
            By.ID, expected_id)
        assert assign_reminder_list_item.is_enabled(
        ), f'Error. Expected an assign reminder form to render: "{expected_id}" was not found'

    def test_reminder_card_has_an_assign_reminder_form_when_pressed(self):
        self.driver.find_element(
            By.ID, 'assign-reminder-list-item').click()
        expected_id = 'assign-reminder-form'
        assign_reminder_form = self.driver.find_element(
            By.ID, expected_id)
        assert assign_reminder_form.is_enabled(
        ), f'Error. Expected an assign reminder form to render: "{expected_id}" was not found'

    def test_the_assign_reminder_form_has_a_remove_icon_if_textfield_is_empty(self):
        self.driver.find_element(
            By.ID, 'assign-reminder-list-item').click()
        expected_id = 'remove-icon'
        remove_icon = self.driver.find_element(
            By.ID, expected_id)
        assert remove_icon.is_displayed(
        ), f'Error. Expected a remove icon to render: "{expected_id}" was not found'

    def test_the_assign_reminder_form_has_an_add_icon_if_the_textfield_is_not_empty(self):
        self.driver.find_element(
            By.ID, 'assign-reminder-list-item').click()
        self.driver.find_element(
            By.ID, 'assign-textfield').send_keys('a')
        expected_id = 'add-icon'
        add_icon = self.driver.find_element(
            By.ID, expected_id)
        assert add_icon.is_displayed(
        ), f'Error. Expected an add icon to render: "{expected_id}" was not found'

    def test_reminder_card_has_an_assign_reminder_list_item_when_enter_key_is_pressed_in_form(self):
        self.driver.find_element(
            By.ID, 'assign-reminder-list-item').click()
        self.driver.find_element(
            By.ID, 'assign-textfield').send_keys('test@test.com')
        self.driver.find_element(
            By.ID, 'assign-button').click()
        expected_id = 'assign-reminder-list-item'
        assign_reminder_list_item = self.driver.find_element(
            By.ID, expected_id)
        assert assign_reminder_list_item.is_enabled(
        ), f'Error. Expected an assign reminder list item to render: "{expected_id}" was not found'

    def test_the_assign_reminder_list_item_matches_text_from_form(self):
        self.driver.find_element(
            By.ID, 'assign-reminder-list-item').click()
        expected_text = 'test@test.com'
        self.driver.find_element(
            By.ID, 'assign-textfield').send_keys(expected_text)
        self.driver.find_element(
            By.ID, 'assign-textfield').send_keys(Keys.RETURN)
        actual_text = assign_reminder_list_item = self.driver.find_element(
            By.ID, 'assign-reminder-list-item').text
        assert expected_text in actual_text, f'Error. Expected the text {expected_text}: "{actual_text}" was not found'

    def test_phone_numbers_get_reformatted(self):
        self.driver.find_element(
            By.ID, 'assign-reminder-list-item').click()
        input = '5555555555'
        expected_text = '(555) 555-5555'
        self.driver.find_element(
            By.ID, 'select-option').click()
        self.driver.find_element(
            By.ID, 'select-phone-number').click()
        self.driver.find_element(
            By.ID, 'assign-textfield').send_keys(input)
        self.driver.find_element(
            By.ID, 'assign-textfield').send_keys(Keys.RETURN)
        actual_text = self.driver.find_element(
            By.ID, 'assign-reminder-list-item').text
        assert expected_text == actual_text, f'Error. Expected the text {expected_text}: "{actual_text}" was found'

    def test_phone_numbers_get_a_validation_error_if_submitted_with_less_than_10_digits(self):
        self.driver.find_element(
            By.ID, 'assign-reminder-list-item').click()
        input = '555'
        expected_text = 'Please enter a valid phone number'
        self.driver.find_element(
            By.ID, 'select-option').click()
        self.driver.find_element(
            By.ID, 'select-phone-number').click()
        self.driver.find_element(
            By.ID, 'assign-textfield').send_keys(input)
        self.driver.find_element(
            By.ID, 'assign-textfield').send_keys(Keys.RETURN)
        actual_text = self.driver.find_element(
            By.ID, 'phone-error').text
        assert expected_text == actual_text, f'Error. Expected the error message {expected_text}: "{actual_text}" was found'

    def test_email_addresses_get_a_validation_error_if_not_a_proper_email_address(self):
        self.driver.find_element(
            By.ID, 'assign-reminder-list-item').click()
        input = 'test@test'
        expected_text = 'Please enter a valid email address'
        self.driver.find_element(
            By.ID, 'assign-textfield').send_keys(input)
        self.driver.find_element(
            By.ID, 'assign-textfield').send_keys(Keys.RETURN)
        actual_text = self.driver.find_element(
            By.ID, 'assign-textfield-helper-text').text
        assert expected_text in actual_text, f'Error. Expected the error message {expected_text}: "{actual_text}" was found'

    def test_reminder_assignment_is_cancelled_when_cancel_button_is_clicked(self):
        self.driver.find_element(
            By.ID, 'assign-reminder-list-item').click()
        self.driver.find_element(
            By.ID, 'assign-textfield').send_keys('test@test.com')
        self.driver.find_element(
            By.ID, 'assign-textfield').send_keys(Keys.RETURN)
        self.driver.find_element(By.ID, 'cancel-assignment').click()
        expected_text = 'Assign Reminder'
        actual_text = self.driver.find_element(
            By.ID, 'assign-reminder-list-item').text
        assert expected_text == actual_text, f'Error. Expected the text {expected_text} for no assignment: "{actual_text}" was not found'

    def test_reminder_card_done_button_is_disabled_when_assignment_is_in_unassigned_state(self):
        self.driver.find_element(
            By.ID, 'assign-reminder-list-item').click()
        self.driver.find_element(
            By.ID, 'assign-textfield').send_keys('test')
        expected_state = self.driver.find_element_by_class_name('Mui-disabled')
        assert expected_state.is_displayed(
        ), f'Error. Expected the state of the button to be disabled: the button was enabled.'

    def test_reminder_assignment_is_saved_to_database_when_saved(self):
        self.driver.find_element(
            By.ID, 'assign-reminder-list-item').click()
        input_text = 'test@test.com'
        self.driver.find_element(
            By.ID, 'assign-textfield').send_keys(input_text)
        self.driver.find_element(
            By.ID, 'assign-textfield').send_keys(Keys.RETURN)
        self.driver.find_element(
            By.ID, 'done').click()
        time.sleep(1)
        self.driver.find_element(
            By.ID, 'reminder-item').click()
        actual_text = self.driver.find_element(
            By.ID, 'assign-reminder-list-item').text
        assert actual_text == input_text, f'Error. Expected the reminder to be assigned: "{actual_text}" was found'

    def test_reminder_has_a_person_icon_if_reminder_is_assigned(self):
        self.driver.find_element(
            By.ID, 'assign-reminder-list-item').click()
        input_text = 'test@test.com'
        self.driver.find_element(
            By.ID, 'assign-textfield').send_keys(input_text)
        self.driver.find_element(
            By.ID, 'assign-textfield').send_keys(Keys.RETURN)
        self.driver.find_element(
            By.ID, 'done').click()
        time.sleep(1)
        expected_id = 'person-icon'
        person_icon = self.driver.find_element(
            By.ID, expected_id)
        assert person_icon.is_displayed(
        ), f'Error. Expected a person icon to render: "{expected_id}" was not found'
        self.driver.find_element(
            By.ID, 'reminder-item').click()

    def teardown_method(self):
        self.driver.find_element(By.ID, 'toggle-more-options').click()
        self.driver.find_element(By.ID, 'delete-reminder').click()
        self.driver.quit()
