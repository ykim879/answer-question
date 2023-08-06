# answer-question
Social media platform that fosters genuine connections by encouraging users to post thought-provoking questions, answer others' inquiries, and promote self-discovery and meaningful interactions.
## Objective
The objective of this social media platform is to facilitate genuine connections between individuals by encouraging the posting of thought-provoking questions and fostering meaningful interactions through answering and engaging with others users' questions, ultimately promoting self-discovery and building stronger relationships

## MVP
The Minimum Viable Product (MVP) for this social media platform consists of four main components:

1. LogIn Page: Users can sign in to the platform by using their Google accounts

2. User Profile Page: Users can view the feed that displays all the questions they have been answered and posted, allowing them to track their interactions and contributions.

3. Discovery Page: Users can explore a feed showcasing questions and answers from other users in the group they have been followed. They can chose which group to follow and navigate to Answer Question Feed to answer the question and showcase themselves. 

4. Posting Question Page: Users have an ability to create and post new questions to the group on the platform, initiating conversations and inviting responses from the community.

5. Answering Question Feed: Users can browse the answers that other users in the group has posted and respond to the question, enabling them to provide insights, advice, and opinions, fostering meaningful interactions and connections.

## System Design
Frontend Framework: 

1. Language: React

2. UI/UX Tool: Ionic 

Backend Framework:

1. Database Type: NoSQL

2. Datastore: Firebase Firestore
## User Scenarios

### Scenario 1) Users can view User Profile Page
When the user click on user's it goes to user's profile (or click on their profile). The user's profile page consists of 
1. user's basic information from users collection on top of the page
2. user's answers and questions which are ordered by created date. For the performance of the api, it will be done by pagination each 5 contents at a time. 

### Scenario 2) Users can view their discovery page
When the user opens the app, it will go to the discovery page by default. They also can navigate to the page if they click on the discovery icon on the tab. The users will view both questions and answers that the group that they joined on the page. 

### Scenario 3) Users can post the question to the group
Users create the post it will be stored in the question collection with their user-id (also documentId), questionId (unique), empty answers array, content, and timestamp. Users chose the group that they want to post the question to. The collection will store the members of the group in the firebase so that each user can retrieve content faster.

### Scenario 4) Users can search any user on the paltform on Search Page
When User goees to search page and type on email of the user that they want to search for, they can navigate to that user's page on the dropdown. 
If they want to navigate to previous page, they can do so by using the back button on top of the page.

### Scenario 5) User creates the questionForm post
User create the the post it will be stored in questionForm collection with their userid (also documentId), questionLink (reference the question), their answerId, original question(at that time) content, content, and timestamp.
It will update its question post by appending their questionForm in answer field.
For each followers, it will update to Following questionForm field by appending given questionFirn post by using reference.

### Scenario 6) User deletes the questionForm post
User create the the post it will delete from question collection with their userid (also documentId)and questionId (uniquely putted).
For original question, it will update answers field by deleting their reference.
For each followers, it will update to Following questions field by deleting their referece.

### Scenario 7) User views Question thread from Question card
From the Question card, if user sees the question that is interesting, they can view answers from the thread by clicking on view question buttton.
If user clicked from the question card that has answered in, then they can view that answer from the front.

### Scenario 8) User can answer Question thread from Question question thread screen
Right below the Question card, there is inputable input card that user can put there answer in and post it. Then it will save the content with type answer on backends and save reference on answers as well.



## Class Diagram
![Class Diagram (1)](https://github.com/ykim879/answer-question/assets/59812671/5811b042-24ec-4077-b932-2451d76ce396)
