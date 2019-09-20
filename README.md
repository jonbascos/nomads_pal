# nomads_pal

Project name:      Nomad’s Pal

I have been thinking about building this project a while ago.  One of my goals/ambitions is to travel more.  I believe a career in Software Development/Web Development not only gives me the tools to reach those goals, but it combines the two things I really enjoy and really want to do.  

Project overview:

With that in mind, I thought it would be a great idea to have a central place where other like minded people would be able to get some vital information that is needed for the typical Digital Nomad instead of having to search multiple websites.  With this idea, the person would be able to 

	•	Look up a destination that they are interested in visiting (or are already in) and find coffee shops and co-working   places with a picture of their business (if available), their addresses, phone numbers, and website address if available.
	•	It would also show what that locations WiFi speeds are and if there are power outlets that are easily accessible.  
	•	To keep the information as updated as possible, the app would allow users to enter their experiences with the WiFi speeds.  The app would then show the last 5 entries that were submitted.  
	•	The app would allow users to submit their own reviews of the posted locations.
	•	Users would be able to enter unlisted locations to the list.

This project will be utilizing the Django Framework for the ease of development and since it comes with a back-end already.  It will also be utilizing the Zomato API to get the location's pictures, address, phone numbers and website address.  

User Stories:

As a Nomad’s Pal user, I want to be able to find a place where I can work out of while I’m at a destination.

Task:

	* User inputs a city and state into a search bar
  * The user input is passed through the Zomato API and searches/filters through the list
  * The results are stored into an array with a URL of a picture, location address, location phone number, location URL.
  * Create text fields where users can enter the upload/download speeds they experience
  * Store the upload/download speeds in an array
  * Display the last 5 speeds determined by date and time entered
  * Create a text area for where users can leave comments about the location
  * Display a thumbs up/thumbs down as a way for users to rate the location
  * Create another array that will store the number of thumbs up/ thumbs down and display it on the card
  * The results will then be displayed on the screen as 'cards' showing a picture, address, phone number, website, speeds,    comments and area to add new comments
  
As a Nomad’s Pal contributor, I want to be able to add new locations and all of their information.

Task:
	* Create a form with the following fields: picture upload, Address, Phone number, website URL, upload speed, download speed, comments
  * Submit button will create a new location and add it into a database

Data Model:

User:
  firstName
  lastName

Location:
  pictureOfLocation
  address
  phoneNumber
  websiteUrl
  uploadSpeed
  downloadSpeed
  * Many to Many relationship to the different users and ratings
  
Rating:
  thumbsUp 
  thumbsDown
  comments
  * One to Many relationship to the different users
  * One to Many relationship to the different places those users have been to
 
Schedule:

  Milestone 1:
    - Create Homepage to include:
        * Navbar with digital nomad related links and a logo
        * Create a box with a description of what a Nomad is
        * Create the search field with the search button

  Milestone 2:
    - Have the search feature work and return results
        * Create the database for the different coffee shops and co-working spaces in the Portland Metro Area
        * When the user enters their location (city, state) and clicks on the search button, it should render a new page (results) with the different location 'cards'
        
  Milestone 3:
    - User ability to add new locations
       * Create a new page if it isn't already in the database
       
  Milestone 4:
    - Implement a ranking/comment system 
       * Add a thumbs up/thumbs down icon where the user can rate the location
       * Add a text area for the user to add a comment on the location
       * Add the information to the database
       
  
    
  Essentials to have:
    Ability to search by city and state and then return at least a list of coffee shops/co-working spaces
       
    
  





