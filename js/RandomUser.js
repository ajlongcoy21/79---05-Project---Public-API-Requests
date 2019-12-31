/*********************************************************************************************************
 * 
 *  Class RandomUser
 * 
 *  This class is developed to hold the information of a random user and
 *  has functions developed to help display information to the user.
 * 
 *  Properties:
 *  
 *      User Infomration
 * 
 *          userImage - String (URL to image of user)
 *      userFirstName - String (First name of the user)
 *       userLastName - String (Last name of the user)
 * 
 *      Contact Information
 * 
 *      userPhoneNumber - String (Phone number of the user)
 *            userEmail - String (email of user)
 * 
 *      Location Information
 * 
 *      userStreetNumber - Integer (Street number of home)
 *        userStreetName - String (Street name)
 *              userCity - String (City of user)
 *               userZip - Integer (zip code of user)
 * 
 *      Misc Information
 * 
 *      userBirthday - String (birthday of user)
 * 
 *  Methods:
 * 
 *      set prevRandomUser(randomUser) - used to set the previous user in the list for modal view
 *      get prevRandomUser()           - used to return the prev RandomUser for the modal view update
 *      set nextRandomUser(randomUser) - used to set the next user in the list for modal view
 *      get nextRandomUser()           - used to return the next RandomUser for the modal view update
 *      get fullName()                 - used to get the full name of the user for the filter function
 *      addCardToDisplay(index)        - used to add the card to the HTML window for the user to see
 *      addModalToDisplay()            - used to add the modal view to the HTML window for the user to see
*********************************************************************************************************/

class RandomUser
{
    
    constructor(userImage, userFirstName, userLastName, userPhoneNumber, userEmail, userStreetNumber, userStreetName, userCity, userState, userZip, userBirthday)
    {
        // set RandomUser information

        // Picture for random user (URL)
        this.image = userImage;

        // Name of random user
        this.firstName = userFirstName;
        this.lastName = userLastName;

        // Contact information for random user
        this.phoneNumber = userPhoneNumber;
        this.email = userEmail;

        // Address for random user
        this.streetNumber = userStreetNumber;
        this.streetName = userStreetName;
        this.city = userCity;
        this.state = userState;
        this.zip = userZip;

        // Birthday of random user
        this.birthday = userBirthday;
    }

    set prevRandomUser(randomUser)
    {
        // Set the previous random user 

        this._prevRandomUser = randomUser;
    }

    get prevRandomUser()
    {
        // Return the previous random user 

        return this._prevRandomUser;
    }

    set nextRandomUser(randomUser)
    {
        // Set the next random user 

        this._nextRandomUser = randomUser;
    }

    get nextRandomUser()
    {
        // return the next random user 

        return this._nextRandomUser;
    }

    get fullName()
    {
        // Generates the full name of the user and returns to caller

        return this.firstName + ' ' + this.lastName;
    }

    addCardToDisplay(index)
    {
        // Get div that is needed to add the new HTML to

        const galleryDiv = document.getElementById('gallery');

        // Create card div and set className and ID

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.id = index; // ID is used to help display the modal information and keep track of where the user is when switching modal view

        // set card div innerHTML

        cardDiv.innerHTML = `

        <div class="card-img-container">
            <img class="card-img" src=${this.image} alt="profile picture">
        </div>

        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${this.firstName} ${this.lastName}</h3>
            <p class="card-text">${this.email}</p>
            <p class="card-text cap">${this.city}, ${this.state}</p>
        </div>

        `;

        // Add card div to gallery div
        
        galleryDiv.innerHTML = galleryDiv.innerHTML + cardDiv.outerHTML;

    }

    addModalToDisplay()
    {

        // Created a state list dictionary to be able to convert full state names to their abbreviations

        const stateList = {
            'arizona': 'AZ',
            'alabama': 'AL',
            'alaska':'AK',
            'arkansas': 'AR',
            'california': 'CA',
            'colorado': 'CO',
            'connecticut': 'CT',
            'delaware': 'DE',
            'florida': 'FL',
            'georgia': 'GA',
            'hawaii': 'HI',
            'idaho': 'ID',
            'illinois': 'IL',
            'indiana': 'IN',
            'iowa': 'IA',
            'kansas': 'KS',
            'kentucky': 'KY',
            'louisiana': 'LA',
            'maine': 'ME',
            'maryland': 'MD',
            'massachusetts': 'MA',
            'michigan': 'MI',
            'minnesota': 'MN',
            'mississippi': 'MS',
            'missouri': 'MO',
            'montana': 'MT',
            'nebraska': 'NE',
            'nevada': 'NV',
            'new hampshire': 'NH',
            'new jersey': 'NJ',
            'new mexico': 'NM',
            'new york': 'NY',
            'north carolina': 'NC',
            'north dakota': 'ND',
            'ohio': 'OH',
            'oklahoma': 'OK',
            'oregon': 'OR',
            'pennsylvania': 'PA',
            'rhode island': 'RI',
            'south carolina': 'SC',
            'south dakota': 'SD',
            'tennessee': 'TN',
            'texas': 'TX',
            'utah': 'UT',
            'vermont': 'VT',
            'virginia': 'VA',
            'washington': 'WA',
            'west virginia': 'WV',
            'wisconsin': 'WI',
            'wyoming': 'WY'
        }

        // get state abbreviation from the random user state full name

        const abbrState = stateList[this.state.toLowerCase()];

        // format the birthday in the format needed for the modal display

        const formattedBirthday = this.birthday.substr(5,2) + "/" + this.birthday.substr(8,2) + "/" + this.birthday.substr(0,4);

        // Create the modal div and set the class name and inner HTML

        const modalDiv = document.createElement('div');
        modalDiv.className = 'modal-container';

        modalDiv.innerHTML = `
        
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${this.image} alt="profile picture">
                <h3 id="name" class="modal-name cap">${this.firstName} ${this.lastName}</h3>
                <p class="modal-text">${this.email}</p>
                <p class="modal-text cap">${this.city}</p>
                <hr>
                <p class="modal-text">${this.phoneNumber}</p>
                <p class="modal-text">${this.streetNumber} ${this.streetName}, ${this.city}, ${abbrState} ${this.zip}</p>
                <p class="modal-text">Birthday: ${formattedBirthday}</p>
            </div>

            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>

        </div>
        
        `;

        // Add modal div to the HTML page

        document.body.appendChild(modalDiv);

        // Store this Random user to pass to the event listener callback function

        var thisRandomUser = this;

        // Create event listener for the modal close button

        document.getElementById('modal-close-btn').addEventListener('click', function(){
        
            // Remove modal view from screen

            $('.modal-container').remove();
    
        });

        // Create event listener for the modal previous user button

        document.getElementById('modal-prev').addEventListener('click', function(){
        
            // Set the current random user to the scope of the callback function

            var localRandomUser = thisRandomUser;

            // If there is a previous user to display update modal view to display user

            if (localRandomUser.prevRandomUser !== null) 
            {
                $('.modal-container').remove();   
                localRandomUser.prevRandomUser.addModalToDisplay(); 
            }
            
        });
    
        // Create event listener for the modal next user button

        document.getElementById('modal-next').addEventListener('click', function(){
            
            // Set the current random user to the scope of the callback function

            var localRandomUser = thisRandomUser;

            // If there is a next user to display update modal view to display user

            if (localRandomUser.nextRandomUser !== null) 
            {
                $('.modal-container').remove();   
                localRandomUser.nextRandomUser.addModalToDisplay(); 
            }
            
        });
    }


}