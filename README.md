# Student-Enrollment-Form
The form will store data in STUDENT-TABLE relation of SCHOOL-DB database.<br>
Input Fields: {Roll-No, Full-Name, Class, Birth-Date, Address, Enrollment-Date}<br>
Primary key: Roll No.
<h1>Description</h1>
The consist of three control buttons [Save], [Change] and [Reset] at the bottom of the form. On page load or any control button click, an empty form will be displayed and the cursor will remain at the first input field in the form which will have the primary key in the relation. All other fields and buttons should be disabled at this time.

1. User will enter data in the field having primary key and If the primary key value does NOT exist in the database, enable [Save] and [Reset] buttons and move the cursor to the next field and allow the user to enter data in the form.

    1.1 Check that the data should be valid i.e. no empty fields.

    1.2 Complete the data entry form and click the [Save] button to store the data in the database.

2. If the primary key value is present in the database, display that data in the form. Enable [Change] and [Reset] buttons and move the cursor to the next' field in the form. Keep the primary key field disabled and allow users to change other form fields.

    2.1 Check that the data should be valid i.e. no empty fields.

    2.2 Click on [Update] button to update the data in the database.

3. Click [Reset] to reset the form as per the step-2.

