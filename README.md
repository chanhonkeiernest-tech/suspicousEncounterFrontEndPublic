# About
React powered frontend for the backend suspicious encounter. 

# Features
## Hooks
Contains all the fetch functions for get, post and delete
useFetech: Get function and take a route to process
useFetechDelete: Delete function and take a route
useFetchPost: Post function and take a route
The url to the backend is hard coded and cannot be change
## Context
Allows all other components to keep track of state
LoginContext: Keep tracks of current login status and also run login functions
MergeContext: Keep tracks of current merge choice
searchContext: Keep tracks of the search query the user has entered
Routes
Maps out all the url path for this frontend 
## Views
**What user expect to see** 
- Encounter: Main page where user view all current encounter posted to the server. Also default page. It uses: MergeBar, SearchContext, AllEncounter
- EncounterDetails: Displays a single encounter object alongside some recommended closely related one. It uses: EncounterCard, MergeBar, useFetch
- Login: Support login function and take input from user. It uses: LoginContext
- MergeReuqest: Displays all current pending requests awaiting the user for approval. It uses PendingRequest
- MyEncounter: Displays all encounters posted by the user. It uses: MergeBar, MyEncounters
- Register: Support new users on boarding. Takes in a username that must be unique, password and confirmed password is also needed. It uses: LoginContext
## Components
- AllEncounter: It uses useFetch to fetch all the encounters in the database with optional parameters for name, tag, type and issue. It then iterate the return json data and display each encounter as an EncounterCard
- EncounterCard: Display the information of the encounter data. It also future uses RelatedCard to display additional encounter information for the related category. This card also allows submission for merge requests for this specific encounter.
- Logout: A component that runs a logout operation it usually return to main page
- MergeBar: A display that indicates what post the user has chosen to merge for.
- MyEncounter: Fetch the encounters created by the currently signed in user. It then iterate and use a special UnmergeEncounterCard to display
- PendingRequest:  Fetch the current request awaiting to be approved. Then use RequestCard to display. It is separated into a pending pile and a reject pile. The rejected pile shows all the encounters that are rejected once.
- RelatedCard: Displays the related encounters that are merged to the parent encounter.
- RequestCard: Displays the merge request and allows users to either accept or reject it.
- UmergeEncounterCard: This is a special card component that is only accessible via MyEncounter as the function it grants requires authentication. It grants additional functions of unmerge and delete of encounters for the encounter created by the signed in user.


