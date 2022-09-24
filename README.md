# Exam #1: "Dashboard for reported events"

## Angular (Client) Application Routes

- Route `/`: This route can only be accessed by unauthenticated students. In its body, it shows the list of all courses in read-only mode.
- Route `/login`: Unauthenticated students can reach this page once they have clicked on the Login Button of the top navbar which can be reached at all routes. It provides a form, with two required fields: email and password. The email field is validated by a function of a popular library, while the password can be checked by the student.
- Route `/home`: Unauthenticated students are not able to access this route. It shows the study plan (create mode/edit mode and delete) and the list of all offered courses.


## API Server

- GET `/api/courses` __Get all offered courses__
  - response body:
  ```
  [
    {
        "code": "01UDFOV",
        "name": "Applicazioni Web I",
        "credits": 6,
        "max_students": null,
        "incompatibility": [
            "01TXYOV"
        ],
        "mandatory": null,
        "pickedBy": 1
    },
    {
        "code": "02GOLOV",
        "name": "Architetture dei sistemi di elaborazione",
        "credits": 12,
        "max_students": null,
        "incompatibility": [
            "02LSEOV"
        ],
        "mandatory": null,
        "pickedBy": 1
    },
  ...
  ]
  ```

## Main Angular Components

- `HomePageComp` (in `HomePageComp.js`): Only logged students can access it. According to their interactions and persistent data, it shows them, their study plan (read/edit) and all courses.
- `CreatePlanStepper` (in `CreatePlanStepper.js`): It is eventually rendered in `HomePageComp`, it guides the student to create its study plan.
- `EditPlanStepper` (in `EditPlanStepper.js`): It is eventually rendered in `HomePageComp`, it guides the student to edit/delete its study plan.
- `StudyPlanTableComp` (in `StudyPlanTableComp.js`): It represents the study plan of the students. Depending on the interactions of the student, it can show both persistent and local data.
- `CoursesTableReadOnlyComp` (in `CoursesTableReadOnlyComp.js`): It is rendered for unauthenticated students in `App.js`. It shows a table where there are all offered courses. 
- `IconBadgeErrorComp` (in `IconBadgeErrorComp.js`): It is rendered in `CoursesTableItemComp`. It shows an icon that reflects the state of the course (already in plan / cannot be added in the study plan since there is an incompatible course / cannot be added in the study plan since its preparative exam has not been added yet).


## Screenshot

![Screenshot](./img/screenshot.jpg)

