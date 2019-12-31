
// set the url for the API Request
const randomUsersURL = 'https://randomuser.me/api/?results=12&nat=us&format=json';

// Set the divs used to add elements to the HTML dynamically

const galleryDiv = document.getElementById('gallery');
var searchDiv = document.getElementsByClassName("search-container");

// Initialize the variables

var randomUsers = [];             // Master list of random users returned from API Call
var filteredRandomUsers = [];     // Filtered users updated from filter input

// Call the add form function to add the search field to the HTML page

addForm();

// Async function to get JSON data from API Call to the url

async function getJSON(url)
{
    try
    {
        const response = await fetch(url);
        return await response.json();
    }
    catch (error)
    {
        throw error;
    }

}

// Async function used to get the data from the url

async function getRandomUsers(url)
{

    const userJSON = await getJSON(url);

    return Promise.all(userJSON.results);
    
}

// Generate the master array for users

function generateMasterArray(data) 
{   

  data.map( randomUser => {

    // Create a new random user to add to the master array

    let tempRandomUser = new RandomUser(randomUser.picture.large, randomUser.name.first, randomUser.name.last, randomUser.cell, randomUser.email, randomUser.location.street.number, randomUser.location.street.name , randomUser.location.city, randomUser.location.state, randomUser.location.postcode , randomUser.dob.date);
    randomUsers.push(tempRandomUser);

  });

  // initially set the filteredRandomUsers to the master array

  filteredRandomUsers = randomUsers;

}

// Show the random users to the user on the screen

function showRandomUsers()
{

    // loop over the array and call the addCardToDisplay function of the user to show on the screen

    for (let index = 0; index < filteredRandomUsers.length; index++) 
    {
        filteredRandomUsers[index].addCardToDisplay(index);
    }

    // After displaying all users, get the card div and add an event listener to each one to display the modal information

    var cardClass = document.getElementsByClassName("card");

    for (let index = 0; index < cardClass.length; index++) 
    {
        cardClass[index].addEventListener('click', function(){showCardModal(event);});
    }
}

// Sets the previous and next user to display in the modal view

function generateModalPrevNext()
{
    // loop through each user in the array to add a path to the previous and next user in the list for the modal view

    for (let index = 0; index < filteredRandomUsers.length; index++) 
    {
        // if the index is 0 there is no previous but there is a next
        // else if the index is not the first or last then there is a previous and next user
        // else we are on the last index and there is only a previous user to show

        if (index === 0) 
        {
            filteredRandomUsers[index].prevRandomUser = null;
            filteredRandomUsers[index].nextRandomUser = filteredRandomUsers[index + 1];
        }
        else if (index > 0 && index < filteredRandomUsers.length-1) 
        {
            filteredRandomUsers[index].prevRandomUser = filteredRandomUsers[index - 1];
            filteredRandomUsers[index].nextRandomUser = filteredRandomUsers[index + 1];
        }
        else
        {
            filteredRandomUsers[index].prevRandomUser = filteredRandomUsers[index - 1];
            filteredRandomUsers[index].nextRandomUser = null;
        }
        
    }

}

// Show card modal function after click event

function showCardModal(event)
{
    // log the current modal being displayed

    currentModalDisplayed = event.currentTarget.getAttribute('id');

    // add modal to display of the user clicked on

    filteredRandomUsers[event.currentTarget.getAttribute('id')].addModalToDisplay();
}

// add form elements to the HTML 

function addForm()
{
    // create form element and set properties

    var searchForm = document.createElement('form');
    searchForm.action = '#';
    searchForm.method = 'get';

    // create input element and set properties

    var input1 = document.createElement('input');
    input1.type = 'search';
    input1.id = 'search-input';
    input1.className = 'search-input';
    input1.placeholder = 'Search...';

    // create input element button and set properties

    var input2 = document.createElement('input');
    input2.type = 'submit';
    input2.value = '\ud83d\udd0d';
    input2.id = 'search-submit';
    input2.className = 'search-submit';

    // add event listeners to the inputs for dynamic filter and button press filter

    input1.addEventListener('keyup', function(){
        
        filterRandomUsers(input1.value);

    });

    input2.addEventListener('click', function(){
        
        filterRandomUsers(input1.value);

    });

    // append elements to the search form element

    searchForm.appendChild(input1);
    searchForm.appendChild(input2);

    // append the filter elements to the HTML

    searchDiv[0].appendChild(searchForm);

}

// used as the callback function for the filter feature

function filterRandomUsers(textFilter)
{

    // reset the activeArray

    filteredRandomUsers = [];
    
    // loop through each user in the master array to see which user contains the filter entered by the user.

    randomUsers.forEach(user => {
        
        let modTextFilter = textFilter.toLowerCase();
        let userFullName = user.fullName.toLowerCase();

        // if the user has a match start to create the new filtered array

        if (userFullName.indexOf(modTextFilter) !== -1) 
        {
            filteredRandomUsers.push(user);
        }

    });

    // reset the galleryDiv 

    galleryDiv.innerHTML = '';

    // if there are no results let the user know
    // else if the text filter is empty, we need to display all the results to the user

    if (filteredRandomUsers.length === 0) 
    {
        galleryDiv.innerHTML = "There are no users found in that search. Please try another search sequence.";
    }
    else if (textFilter === '')
    {
        filteredRandomUsers = randomUsers;
    }

    // if the filtered array is not empty call the showRandomUsers() and generateModalPrevNext() methods to update the view for the user

    if (filteredRandomUsers.length !== 0) 
    {
        showRandomUsers();
        generateModalPrevNext();
    }
    
}

// initate the call to the API

getRandomUsers(randomUsersURL)
.then(generateMasterArray)
.then(generateModalPrevNext)
.then(showRandomUsers);
