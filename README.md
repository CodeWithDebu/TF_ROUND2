# TF_ROUND2
SIGN IN: User can sign in using Firebase Google Authentication Setup which utilizes a Firebase.js file in the frontend react folder with all the api keys, protected ids and domains along with Authcontext.js which allows us to display the username and profile picture of the gmail used to sign in and make use of the sign out function. 

USER SESSION MANAGEMENT AND PROFILING: session management and user data storage through firebase would require storing user data in some sort of database like Firestore(offered by firebase), MongoDb or django SQL inbuilt database, and unique identification token generator through JWT(JSON Web Tokens), so when the user logs in we can generate an encrypted JWT Token using some unique ID/email pertaining to the user and then these tokens can be sent to the react frontend when the user tries to login/signup and store them using cookies or local storage. 
The django backend will verify the encrypted JWT keys from the user thorugh API call(API only copies the Token and sends it to the backend it does not store any information itself).
When we have successfully verified the token then the respective user data can be retrieved from the backend and displayed on the frontend as user profile which the user can get then edit through CRUD operations after logging into his session.
The token can have an expiry time set up which would allow us to setup a session time and refresh and generate new tokens when user logs in after a long time. Log Out function works through removing the JWT token from the frontend storage effectively ending the user's session.


TASK MANAGEMENT: The user can see his incomplete and completed tasks and toggle the menu to either mark an incomplete task as done or delete a completed task completely all of which are connected to the admin django side and changes done by the user will be reflected on the backend. This works through a call from the frontend to the API endpoint in the django backend which removes the item from the database.

ADMIN SIDE MANAGEMENT: username: divyanshu password: 123
the admin after logging in through localhost:8000/admin can assign tasks with description, edit these tasks or delete them himself which will be reflected on the frontend through API calls, also in the actions dropdown menu the admin can choose to export the data of all the tasks as csv file and download which is implemented using the csv module in the admins.py file to add this functionality to actions menu and write a csv from the data available.



