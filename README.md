# TF_ROUND2
SIGN IN: User can sign in using Firebase Google Authentication Setup which utilizes a Firebase.js file in the frontend react folder with all the api keys, protected ids and domains along with Authcontext.js which allows us to display the username and profile picture of the gmail used to sign in and make use of the sign out function. 

USER SESSION MANAGEMENT AND PROFILING:

TASK MANAGEMENT: The user can see his incomplete and completed tasks and toggle the menu to either mark an incomplete task as done or delete a completed task completely all of which are connected to the admin django side and changes done by the user will be reflected on the backend. This works through a call from the frontend to the API endpoint in the django backend which removes the item from the database.

ADMIN SIDE MANAGEMENT: username: divyanshu password: 123
the admin after logging in through localhost:8000/admin can assign tasks with description, edit these tasks or delete them himself
