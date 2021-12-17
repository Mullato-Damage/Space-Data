var theTime = new Date();
var tempTime = new Date();
var time_interval = 5000;
var last_iteration = 0;
var running = true;
var index = 0;
var timer;
// This is my start button, which will start my timer, clock, and display the data table that chages every 5 seconds.
function Start() {
    // when the button is pressed, the table will be updated and say that it's reading, while it loads in the data from the dataloader
    document.getElementById("data").rows["seconds"].innerHTML = "Reading data...";
    // This is the index variable that was described earlier, which tells the data table timer to start at 0 and count up.
    index = 0;
    // These are varables that are displayed above. 
    // Timer makes sure that the table is updated on specific time frame.
    // Time interval tells the timer that it needs to update every 5 seconds or 5000 miliseconds.
    // updateDisplay is connected to our timer for the table, which maks sure to start the time once it's pressed and is updated every 5 seconds (because it's with the time interval)
    timer = setInterval(updateDisplay, time_interval);
    // This id connects to the button and tells the program to disable the start button after it is pressed.
    document.getElementById("Starter").disabled = true;
    // This id is also connected to the button and tells the program to enable the stop button once the start button is pressed.
    document.getElementById("Stopper").disabled = false;
}
// This is my stop buttons function, which will stop my data table, after it's been started.
function Stop() {
    // This tells the program to stop the data from the timer variable and stops the timer.
    clearInterval( timer );
    // This tells the program to enable my start button, after the stop button has been pressed.
    document.getElementById("Starter").disabled = false;
    // This tells the program to disable the stop button after it's been pressed.
    document.getElementById("Stopper").disabled = true;
}

class InputData {
// These are my categories that will be displayed on my table.
// This creates the appropiate id's that I need to put into the table in my html.
    constructor(
        time_seconds,
        latitude,
        longitude,
        gps_altitude,
        bmpSensor_altitude,
        bmpSensor_pressure,
        bmpSensor_temp,
        digSensor_temp,
        cssSensor_temp,
        cssSensor_eCO2,
        cssSensor_TVOC,
        UV,
        AccelX,
        AccelY,
        AccelZ,
        MagneticX,
        MagneticY,
        MagneticZ,
        GyroX,
        GyroY,
        GyroZ,
    ) {
        // This makes sure that the id's, that were created for each category, has the correct data that it needs to display on the table.
        this.time_seconds = time_seconds;
        this.latitude = latitude;
        this.longitude = longitude;
        this.gps_altitude = gps_altitude;
        this.bmpSensor_altitude = bmpSensor_altitude;
        this.bmpSensor_pressure = bmpSensor_pressure;
        this.bmpSensor_temp = bmpSensor_temp;
        this.digSensor_temp = digSensor_temp;
        this.cssSensor_temp = cssSensor_temp;
        this.cssSensor_eCO2 = cssSensor_eCO2;
        this.cssSensor_TVOC = cssSensor_TVOC;
        this.UV = UV;
        this.AccelX = AccelX;
        this.AccelY = AccelY;
        this.AccelZ = AccelZ;
        this.MagneticX = MagneticX;
        this.MagneticY = MagneticY;
        this.MagneticZ = MagneticZ;
        this.GyroX = GyroX;
        this.GyroY = GyroY;
        this.GyroZ = GyroZ;
    }
}
// This function is connect to the variable "Data" which is placed with the categories in the table, so that the program knows that they correspond with the data in the dataloader.
function getData(){
    // loadedData is now linked with the function "loadData".
    // loadData is the function that holds all of the data, in their own javascript file.
    var loadedData = loadData();
    // return tells the program to go back to the top of loadedData, whenever the program reaches the bottom of the function.
    // when it returns to the top, it will have the ability to update it's information in the table, instead of showing the same piece of data.
    return loadedData;
}
// This function is connected to the id's and tells the program what to display with each category. 
function dataRow(legend, value, units) {
    // The "td" tells the program that in needs to create a column for the legend or category, like Latitude, for example. 
    msg = "<td>";
    // The legend is what our categories are called, when in the dataRow.
    msg += legend;
    // "/td" is the end to our "td" from above, which ends that column.
    // The "td" after, is the start to the next column, that will be right nex to the legend, but not connected.
    msg += ": </td><td>";
    // The value is the "Data[Index]" that is displayed with each category below. 
    // "Data[Index]" is connected to the data in the dataloader file, which tells the program which part of the data to include in that row/category, giving us the number that needs to be displayed.
    // As I stated earlier, the value and uits is in their own column, seperate from the legend, so that the data isn't bunched together and so it's put into the corresponding, labeled column in the table.
    msg += value;
    // The space, at the start, tells the program to place a space between the units and whatever word is placed before it(it also puts a space between the value and the units), so it doesn't become one jumbled word.
    // The units are any words that are placed after the value in that row, like seconds, for example
    msg += " " + units;
    // As stated before, the "/td" ends the column.
    msg += "</td>";
    // The return tells the program to back to the top, once it reaches the end, allowing the data to update in the dataRow.
    return msg;
}




var data = getData();

function updateDisplay() {
    theTime = new Date();
    // Debugging
    console.log(
        "Display : " +
        (theTime.getHours() < 10 ? "0" + theTime.getHours() : theTime.getHours()) +
        ":" + (theTime.getMinutes() < 10 ? "0" + theTime.getMinutes() : theTime.getMinutes()) +
        ":" + (theTime.getSeconds() < 10 ? "0" + theTime.getSeconds() : theTime.getSeconds())
    );

    // This variable tells the program that timeRead is the same thing as data[index].
    var timeRead = data[index].time_seconds;
    if (timeRead >= 10) {
        document.getElementById("data").rows["seconds"].innerHTML = dataRow("Time elapsed", data[index]
            .time_seconds, "seconds");
        document.getElementById("data").rows["latitude"].innerHTML = dataRow("Latitude", data[index].latitude, " ");
        document.getElementById("data").rows["longitude"].innerHTML = dataRow("Longltude", data[index].longitude,
            " ");
        document.getElementById("data").rows["gps_altitude"].innerHTML = dataRow("GPS Altitude", data[index]
            .gps_altitude, " ");
        document.getElementById("data").rows["bmpSensor_altitude"].innerHTML = dataRow("BMP Sensor Altitude", data[
            index].bmpSensor_altitude, "");
        document.getElementById("data").rows["bmpSensor_pressure"].innerHTML = dataRow("BMP Sensor Pressure", data[
            index].bmpSensor_pressure, "");
        document.getElementById("data").rows["bmpSensor_temp"].innerHTML = dataRow("BMP Sensor Temperature", data[
            index].bmpSensor_temp, "");
        document.getElementById("data").rows["digSensor_temp"].innerHTML = dataRow("Digital Sensor Temperature",
            data[index].digSensor_temp, "");
        document.getElementById("data").rows["cssSensor_temp"].innerHTML = dataRow("CSS Sensor Temperature", data[
            index].cssSensor_temp, "");
        document.getElementById("data").rows["cssSensor_eCO2"].innerHTML = dataRow("CSS Sensor eCO2", data[index]
            .cssSensor_eCO2, "");
        document.getElementById("data").rows["cssSensor_TVOC"].innerHTML = dataRow("CSS Sensor TVOC", data[index]
            .cssSensor_TVOC, "");
        document.getElementById("data").rows["UV"].innerHTML = dataRow("UV", data[index].UV, " ");
        document.getElementById("data").rows["AccelX"].innerHTML = dataRow("Accel X", data[index].AccelX, " ");
        document.getElementById("data").rows["AccelY"].innerHTML = dataRow("Accel Y", data[index].AccelY, " ");
        document.getElementById("data").rows["AccelZ"].innerHTML = dataRow("Accel Z", data[index].AccelZ, " ");
        document.getElementById("data").rows["MagneticX"].innerHTML = dataRow("Magnetic X", data[index].MagneticX,
            " ");
        document.getElementById("data").rows["MagneticY"].innerHTML = dataRow("Magnetic Y", data[index].MagneticY,
            " ");
        document.getElementById("data").rows["MagneticZ"].innerHTML = dataRow("Magnetic Z", data[index].MagneticZ,
            " ");
        document.getElementById("data").rows["GyroX"].innerHTML = dataRow("Gyro X", data[index].GyroX, " ");
        document.getElementById("data").rows["GyroY"].innerHTML = dataRow("Gyro Y", data[index].GyroY, " ");
        document.getElementById("data").rows["GyroZ"].innerHTML = dataRow("Gyro Z", data[index].GyroZ, " ");

        if (index < 499) {
            index++;
        } else {
            index = 0;
        }
    }

    document.getElementById("time").innerHTML =
        (theTime.getHours() < 10 ? "0" + theTime.getHours() : theTime.getHours()) +
        ":" + (theTime.getMinutes() < 10 ? "0" + theTime.getMinutes() : theTime.getMinutes()) +
        ":" + (theTime.getSeconds() < 10 ? "0" + theTime.getSeconds() : theTime.getSeconds());


}
//This audio came from Melodyloops: https://www.melodyloops.com/tracks/human-innovation/?on=sugg
//This is one of my audio functions that is linked to it's corresponding button in the html. 
//When it is pressed, the html will go to javascript and searches for this function
function PlayHumanInnovation() {
    // This will now add any song, that hasn't been added yet, from my program folder.
    // Now when the button is pressed and links to this function, it'll have the exact audio that it needs to play.
    mySound = new sound("human-innovation.mp3")
    // This code links this audio function to the function, below, that allows for audio to be played in the program.
    mySound.play();
}
// This audio came from Mixkit: https://mixkit.co/free-sound-effects/rocket/
function PlayRocketEngine() {
    mySound = new sound("rocket-engine-ignition-rumble.wav")
    mySound.play();
}
// This audio came from Mixkit: https://mixkit.co/free-sound-effects/rocket/
function PlayRocketIgnition() {
    mySound = new sound("space-shuttle-rocket-ignition.wav")
    mySound.play();
}
// This audio came from Melodyloops: https://www.melodyloops.com/my-music/longoloops/space-epic/
function PlaySpaceEpic() {
    mySound = new sound("space-epic.mp3")
    mySound.play();
}
// This function allows for audio to be played. Without it, my audio functions/buttons wouldn't work.
function sound(src) {
    this.sound = document.createElement("audio");
    // This tells the program to search for whatever audio is specified in each function above.
    this.sound.src = src;
    // This code makes sure that any audio function, that starts with "play", is connected and starts when their function is activated.
    this.play = function() {
        //This tells the function that any function, starting with "play", plays the audio.
        this.sound.play();
    }
}





