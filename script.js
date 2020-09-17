const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = []
let initialLoad = true


// Unsplash API
let count = 5;
const apiKey = 'SUMPTq8ck3PSnywePHVRGUQl6HKlazzqCC-cgF9SvPE';
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded

const imageLoaded = () => {
    imagesLoaded += 1;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        initialLoad = false;
        count = 30;
        apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

    }
}

// Helper function to set attributes on DOM Elements

setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}


// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    //  run function for each object in photosArray
    photosArray.forEach((photo) => {

        //  Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event Listener, check when each is finished laoding
        img.addEventListener('load', imageLoaded);

        // Put the image inside <a> , then put both inside image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash APi
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        console.log(photosArray)
        displayPhotos();
    }
    catch (error) {
        console.log('Encountered an error : ', error)
    }
}

// Check to see if scrolling near bottom of the page, Load More Photos

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos();
    }
})

//  on Load 
getPhotos();