# answer-question
Social media platform that fosters genuine connections by encouraging users to post thought-provoking questions, answer others' inquiries, and promote self-discovery and meaningful interactions.
## Objective
The objective of this social media platform is to facilitate genuine connections between individuals by encouraging the posting of thought-provoking questions and fostering meaningful interactions through answering and engaging with others users' questions, ultimately promooting self-discovery and building stronger relationships

## MVP
The Minimum Viable Product (MVP) for this social media platform consists of four main components:

User Profile Page: Users can view a feed displaying all the questions they have answered and posted, allowing them to track their interactions and contributions.
Discovery Page: Users can explore a feed showcasing questions and answers from other users they have chosen to follow, promoting discovery and engagement with diverse content.
Posting Question Page: Users have the ability to create and post new questions to the platform's feed, initiating conversations and inviting responses from the community.
Answering Question Feed: Users can browse and respond to questions posted by other users, enabling them to provide insights, advice, and opinions, fostering meaningful interactions and connections.

## System Design
Frontend Framework: React, Ionic (UI/UX)
Backend Framework: NoSQL, Firebase
## User Scenarios
### Scenario 1) Any users wants to view certain user's profile page
When the user click on user's it goes to user's profile (or click on their profile). The user's profile page consists of 
1. user's basic information from users collection on top of the page
2. user's answersform and questions which are ordered by created date. It will be displayed switching from question to 2 answerforms until one run out. The diplaying will be done by pagination to consider when the data gets big. 

### Scenario 2) Any users wants to view their discovery page
When the user open the app it will go to discovery page by default or else if they click on discovery tab on the tab it will direct to discovery page. The users will view both questions and answers form that the followers has posted. it will switching from questions -> 2 answersform -> questions -> ... until one of them are depleted. The operation will include pagination

### Scenario 3) User creates the question post
User create the the post it will be stored in question collection with their userid (also documentId), questionId (uniquely putted), empty answers array, content, and timestamp.
For each followers, it will update to Following questions field by appending given question.

### Scenario 4) User deletes the question post
User create the the post it will delete from question collection with their userid (also documentId)and questionId (uniquely putted). Traverse Answes and delete the reference but the answer still exists. However the users cannot view the question it will pop the question is no longer existed because user has deleted the question.
For each followers, it will update to Following questions field by deleting their referece.


### Scenario 5) User creates the questionForm post
User create the the post it will be stored in questionForm collection with their userid (also documentId), questionLink (reference the question), their answerId, original question(at that time) content, content, and timestamp.
It will update its question post by appending their questionForm in answer field.
For each followers, it will update to Following questionForm field by appending given questionFirn post by using reference.

### Scenario 6) User deletes the questionForm post
User create the the post it will delete from question collection with their userid (also documentId)and questionId (uniquely putted).
For original question, it will update answers field by deleting their reference.
For each followers, it will update to Following questions field by deleting their referece.

## Class Diagram
![Class Diagram (1)](https://github.com/ykim879/answer-question/assets/59812671/5811b042-24ec-4077-b932-2451d76ce396)
