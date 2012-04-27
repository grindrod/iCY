# iCY 

## Purpose
The main purpose is to help pharmacists determine the vision capabilities of seniors. This app will show the pharmacists issues of concern, matters to discuss based on the result of the test and screening checkbox.

## Pages

### Index
This page is starting page. 

### Questionnaire1
The first part of the screening questionnaire addresses what the user needs to use for optimal vision under normal conditions. It ensures that the user has the visual aids they need with interactive pop-up reminders.

### Questionnaire2
The second part of the screening questionnaire addresses what the user has difficulty viewing. This portion has significant influence on the advice shown to the pharmacist

### Instructions
This page shows the instructions for the test on the next page. By showing this page, the user is mentally prepared that there is a quick exercise coming up on the next page. In addition, it forces the user to read the instructions for the test. 

### Test
This page is functionally testing the user's ability to read prescription labels. The user has two options. 
* If they cannot read the label at its current font size, they can click on the orange button to increase the font size of all the elements on the page. 
* If they can read the label at its current font size, they can drag the tablets into the appropriate mealtime boxes.

The font size increases in stages: 9pt, 12pt, 15pt, 18pt.

If the user fails it in the font levels under 18pt (9pt, 12pt, 15pt), a modal dialog is shown that indicates they need to repeat the test. The label is translated to the right via animation and a new label is translated from the left of the previous label with an increase in font level. 

However, if the font size is the same as the default font size indicated in the options settings on the last page (or 12pt font), the user has a second chance at redoing the test at the same font size level. 

If the user completes the test successfully or unable to complete the test at 18pt, they are automatically taken to the next page.

### Patient Finished
This page is merely a barrier. It is the end of user input needed and the start of the pharmacist's role in the application. 

### History
This page lists all sorts of common drugs and medical conditions associated with or may affect vision. The pharmacist is given the option of creating a new checkbox if there exists a condition that is not listed. 

### Advice
Based on the information collected from the rest of the app, the pharmacist is given a list of information on how to label the prescription bottle, what to discuss with the user.

At the bottom of the page, there is an options page. It gives the pharmacist the option of:
* setting the default font size of the prescription labels used in their pharmacy
* showing or hiding the history page

## Known issues
Listed in github issues for detailed list.