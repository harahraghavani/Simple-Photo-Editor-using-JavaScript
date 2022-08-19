const fileInput = document.getElementById('ImageFileInput');
const canvas = document.getElementById('canvas');
const canvasCtx = canvas.getContext('2d');
const brightnessInput = document.getElementById('brightness');
const saturationInput = document.getElementById('saturation');
const blurInput = document.getElementById('blur');
const inversionInput = document.getElementById('inversion');

const settings = {}; // this object will save the values for each input 
let image = null;

function resetSettings (){

    // default settings when the page loads.
    settings.brightness = "100";
    settings.saturation = "100";
    settings.blur = "0";
    settings.inversion = "0";

    // setting the default values.
    brightnessInput.value = settings.brightness;
    saturationInput.value = settings.saturation;
    blurInput.value = settings.blur;
    inversionInput.value = settings.inversion;

}

function upadateSettings(key, value){
    if (!image) return; 
    settings[key] = value;
    renderImage();
}

function generateFilter(){
    const {brightness, saturation, blur, inversion} = settings;

    return`brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) invert(${inversion}%)`;

}

function renderImage(){
    canvas.width = image.width;
    canvas.height = image.height;
    canvasCtx.filter = generateFilter();  // filter is property.
    canvasCtx.drawImage(image, 0, 0);
};

brightnessInput.addEventListener("change", () => upadateSettings("brightness", brightnessInput.value));
saturationInput.addEventListener("change", () => upadateSettings("saturaation", saturationInput.value));
blurInput.addEventListener("change", () => upadateSettings("blur", blurInput.value));
inversionInput.addEventListener("change", () => upadateSettings("inversion", inversionInput.value));

fileInput.addEventListener("change", () => {
    image = new Image();

    image.addEventListener("load",() => {
        resetSettings();

        // rendering the image using the render function
        renderImage();
    });

    image.src = URL.createObjectURL(fileInput.files[0]); // this new url is just a reference to the image.


});

resetSettings();
