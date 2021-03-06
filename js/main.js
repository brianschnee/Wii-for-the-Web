let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

// When the window is resized, windowWidth and windowHeight will get reassigned when the mousemove event happens. This allows the website to be responsive to browser width changes.
window.onresize = function() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
}

// action for "A button" keypress when on the warning screen
document.onkeypress = function (e) {
    e = e || window.event;

    if (e.key.toLowerCase() === 'a') {
        // keypress sound
        const buttonPress = new Audio('./assets/sounds/a-press.wav');
        buttonPress.play();
        
        // hide warning screen, display menu screen, play menu music, reset screen padding
        document.querySelector('.menu-music').play();
        document.querySelector('.warning').style.display = 'none';
        document.querySelector('.menu').style.display = 'block';
        document.querySelector('.screen').style.padding = '0';
    }
};

// Hover Sound
const apps = document.querySelectorAll('.app-link');
apps.forEach(app => {
    app.addEventListener('mouseover', hover)
});

function hover() {
    const hover = new Audio('./assets/sounds/hover.mp3');
    hover.play();
}

// Tracks cursor coordinates, calls movement functions which are used to manipulate the controller element
document.addEventListener('mousemove', (e) => {
    let x = e.pageX;
    let y = e.pageY;
    console.log(`x: ${x}`,`y: ${y}`);

    moveImage(x, y);
    tiltImage(y);
    rotateImage(x);
});

/**
 * name: moveImage
 * description: moves the image element with a class of controller on the DOM based on the position of your mouse cursor
 * @param x: x-axis value of the cursor in reference to the window width
 * @param y: y-axis value of the cursor in reference to the window height
 */
function moveImage(x, y) {
    if (x >= windowWidth * 0.3 && x <= windowWidth * 0.7) {
        document.querySelector('.controller').style.left = `${x}px`;
    } else if (x < windowWidth * 0.3){
        document.querySelector('.controller').style.left = `${windowWidth * 0.3}px`;
    } else {
        document.querySelector('.controller').style.left = `${windowWidth * 0.7}px`;
    }

    document.querySelector('.controller').style.top = `${y}px`;
}

/**
 * name: tiltImage
 * description: changes the height of the controller element to simulate tilting of a controller
 * @param y: y-axis value of the cursor in reference to the window height
 */
function tiltImage(y) {
    // For dynamic height
    let adjustment = 35 + (y / windowHeight * 40);
    document.querySelector('.controller').style.height = `${adjustment}rem`;
}

/**
 * name: rotateImage
 * description: rotates the image element with a class of controller based on the value of the cursors horizontal positioning. To simmulate pointing a controller left and right.
 * @param x: x-axis value of the cursor in reference to the window width
 * 
 */
function rotateImage(x) {
    let halfWidth = windowWidth / 2;

    let rotation = (x - halfWidth) / 69; // used to determine the amount of rotation to be applied to the image element with a class of controller
    let multiplier = 2.5; // Multiplier for the rotation variable. Allows for more rotation given certain bounds, the rotation amount increases as the cursor moves toward the side edges of the browser window
    
    let offset; // determines the reference point between the cursor and the center of the image element

    if (x >= windowWidth * 0.3 && x <= windowWidth * 0.7) {
        offset = ((halfWidth - x) / windowWidth) * 100 - 50; // the value will equate to some value in relation to the x position on the page within the range of 0-100. This value will later be used as a percentage for transform: translate();
    } else if (x <= windowWidth * 0.3) {
        offset = -30;
        multiplier += Math.abs((halfWidth - x) / halfWidth * 3); // the value will equate to some value in relation to the x positions toward the side edges of the screen. As the cursor moves toward the edges, this multiplier will increase and eventually be multiplied with the rotation variable to increase image rotation
    } else {
        offset = -70;
        multiplier += Math.abs((halfWidth - x) / halfWidth * 3);
    }

    document.querySelector('.controller').style.transform = `translate(${offset}%) rotate(${rotation * multiplier}deg)`;
}