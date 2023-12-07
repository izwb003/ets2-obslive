/*
 * <dashboard.js> - Euro Truck Simulator 2 online streaming liveroom design.
 * Written in 2023 by Steven Song izwb003@gmail.com
 * To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
 * You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
 */


var messages = [
    "游戏可以读档，生命不能重来。现实生活中驾驶请务必遵守当地交通法规，文明安全行车。",
    "Games can be reloaded, life cannot be restarted. In real life please be sure to comply with local traffic regulations and drive in a civilized and safe manner.",
    "直播间装修调试中，可能存在不稳定的情况，敬请谅解。欢迎提出改进意见。",
    "During the decoration and debugging of the live broadcast room, there may be unstable situations. I apologize for any inconvenience caused. Suggestions welcomed.",
    "当前互联网连接环境较差。若发生卡顿或缓冲还请稍候。",
    "The current internet connection environment is poor. Please wait if there is any lag or buffering."
];
var currentMessage = 0;


Funbit.Ets.Telemetry.Dashboard.prototype.initialize = function (skinConfig, utils) {
    //
    // skinConfig - a copy of the skin configuration from config.json
    // utils - an object containing several utility functions (see skin tutorial for more information)
    //

    // this function is called before everything else, 
    // so you may perform any DOM or resource initializations / image preloading here

    utils.preloadImages([
        'images/bg-off.jpg', 'images/bg-on.jpg'
    ]);

    // refresh by a click
    $(document).add('body').on('click', function () {
        window.location.reload();
    });
}

Funbit.Ets.Telemetry.Dashboard.prototype.filter = function (data, utils) {
    //
    // data - telemetry data JSON object
    // utils - an object containing several utility functions (see skin tutorial for more information)
    //

    // This filter is used to change telemetry data 
    // before it is displayed on the dashboard.
    // You may convert km/h to mph, kilograms to tons, etc.

    // round truck speed
    data.truck.speedRounded = Math.abs(data.truck.speed > 0
        ? Math.floor(data.truck.speed)
        : Math.round(data.truck.speed));

    // other examples:

    // convert kilometers per hour to miles per hour
    data.truck.speedMph = data.truck.speed * 0.621371;
    // convert kg to t
    data.trailer.mass = (data.trailer.mass / 1000.0) + 't';
    // format odometer data as: 00000.0
    data.truck.odometer = utils.formatFloat(data.truck.odometer, 1);
    // convert gear to readable format
    if(data.truck.displayedGear > 0) {
        if(data.truck.displayedGear <= 2) {
            data.truck.gearModified = 'C' + data.truck.displayedGear;
        }
        else {
            data.truck.gearModified = 'A' + (data.truck.displayedGear - 2);
        }
    }
    else if(data.truck.displayedGear < 0) {
        data.truck.gearModified = 'R' + Math.abs(data.truck.displayedGear);
    }
    // convert rpm to rpm * 100
    //data.truck.engineRpm = data.truck.engineRpm / 100;
    // convert fuel level to percent amount
    data.truck.fuelpercent = Math.trunc((data.truck.fuel / data.truck.fuelCapacity) * 100) + '%';
    // convert time display rule
    data.game.timeModified = timeModify(data.game.time);
    data.game.timeDate = new Date(data.game.time);
    data.game.timeHour = data.game.timeDate.getUTCHours();
    //convert job deadline time
    data.job.remainingTimeDate = new Date(data.job.remainingTime);
    data.job.remainingTimeDay = data.job.remainingTimeDate.getUTCDate() - 1;
    data.job.remainingTimeHour = data.job.remainingTimeDate.getUTCHours();
    data.job.remainingTimeMinute = data.job.remainingTimeDate.getUTCMinutes();
    // convert navigation estimatedDistance
    data.navigation.estimatedDistanceModified = Math.trunc(data.navigation.estimatedDistance / 1000);
    // convert navigation estimatedTime rule
    data.navigation.estimatedTimeDate = new Date(data.navigation.estimatedTime);
    data.navigation.estimatedTimeDay = data.navigation.estimatedTimeDate.getUTCDate() - 1;
    data.navigation.estimatedTimeHour = data.navigation.estimatedTimeDate.getUTCHours();
    data.navigation.estimatedTimeMinute = data.navigation.estimatedTimeDate.getUTCMinutes();
    // convert rest time rule
    data.game.nextRestStopTimeDate = new Date(data.game.nextRestStopTime);
    data.game.nextRestStopTimeDay = data.game.nextRestStopTimeDate.getUTCDate() - 1;
    data.game.nextRestStopTimeHour = data.game.nextRestStopTimeDate.getUTCHours();
    data.game.nextRestStopTimeMinute = data.game.nextRestStopTimeDate.getUTCMinutes();
    // add retarderBrake boolean
    if(data.truck.retarderBrake != 0) {
        data.truck.retarderBrakeOn = true;
    }
    else {
        data.truck.retarderBrakeOn = false;
    }
    // show Chinese truck direction
    data.truck.placement.headingName = "北";
    if(data.truck.placement.heading > 0.9375 || data.truck.placement.heading <= 0.0625) {
        data.truck.placement.headingName = "北";
    }
    else if(data.truck.placement.heading > 0.0625 && data.truck.placement.heading <= 0.1875) {
        data.truck.placement.headingName = "西北";
    }
    else if(data.truck.placement.heading > 0.1875 && data.truck.placement.heading <= 0.3125) {
        data.truck.placement.headingName = "西";
    }
    else if(data.truck.placement.heading > 0.3125 && data.truck.placement.heading <= 0.4375) {
        data.truck.placement.headingName = "西南";
    }
    else if(data.truck.placement.heading > 0.4375 && data.truck.placement.heading <= 0.5625) {
        data.truck.placement.headingName = "南";
    }
    else if(data.truck.placement.heading > 0.5625 && data.truck.placement.heading <= 0.6875) {
        data.truck.placement.headingName = "东南";
    }
    else if(data.truck.placement.heading > 0.6875 && data.truck.placement.heading <= 0.8125) {
        data.truck.placement.headingName = "东";
    }
    else if(data.truck.placement.heading > 0.8125 && data.truck.placement.heading <= 0.9375) {
        data.truck.placement.headingName = "东北";
    }
    // Modify wear value to percent
    data.truck.wearEngineModified = Math.round(data.truck.wearEngine * 100);
    data.truck.wearTransmissionModified = Math.round(data.truck.wearTransmission * 100);
    data.truck.wearCabinModified = Math.round(data.truck.wearCabin * 100);
    data.truck.wearChassisModified = Math.round(data.truck.wearChassis * 100);
    data.truck.wearWheelsModified = Math.round(data.truck.wearWheels * 100);
    data.trailer.wearModified = Math.round(data.trailer.wear * 100);
    // return changed data to the core for rendering
    return data;
};

var displayPageJobNow = 1;
var displayPageNavigatorNow = 1;
var displayPageInfoAreaNow = 1;
var displayPageSwitchCount = 0;

Funbit.Ets.Telemetry.Dashboard.prototype.render = function (data, utils) {
    //
    // data - same data object as in the filter function
    // utils - an object containing several utility functions (see skin tutorial for more information)
    //

    // we don't have anything custom to render in this skin,
    // but you may use jQuery here to update DOM or CSS


    //Update displaySwitchCount
    if(displayPageSwitchCount >= 500) {
        displayPageSwitchCount = 0;
    }
    else {
        displayPageSwitchCount++;
    }

    //Update real world time
    var nowTime = new Date();

    var hour = addZero(nowTime.getHours());
    var minute = addZero(nowTime.getMinutes());

    var timeString = hour + ':' + minute;
    
    document.getElementById("real-time").innerHTML = timeString;


    // Change background color
    if(data.truck.lightsParkingOn) {
        document.getElementById("dashboard-main").style.backgroundColor = "black";
    }
    else {
        document.getElementById("dashboard-main").style.backgroundColor = "DarkBlue";
    }

    // Update job status
    if(data.job.sourceCity == "") {
        document.getElementById("info-area-right-no-job").style.display = "block";
        document.getElementById("info-area-right-page-1").style.display = "none";
        document.getElementById("info-area-right-page-2").style.display = "none";
    }
    else {
        document.getElementById("info-area-right-no-job").style.display = "none";
        if(displayPageSwitchCount >= 500) {
            if(displayPageJobNow == 1) {
                displayPageJobNow = 2;
                document.getElementById("info-area-right-page-1").style.display = "none";
                document.getElementById("info-area-right-page-2").style.display = "block";
            }
            else if(displayPageJobNow == 2) {
                displayPageJobNow = 1;
                document.getElementById("info-area-right-page-1").style.display = "block";
                document.getElementById("info-area-right-page-2").style.display = "none";
            }
        }
    }

    // Speed limit warning
    if(data.navigation.speedLimit != 0 && data.truck.speed > data.navigation.speedLimit) {
        document.getElementById("right-side-current-speed").style.color = "red";
    }
    else {
        document.getElementById("right-side-current-speed").style.color = "white";
    }

    // Speed limit show on/off
    if(data.navigation.speedLimit == 0) {
        document.getElementById("navigator-speedLimit").style.display = "none";
    }
    else {
        document.getElementById("navigator-speedLimit").style.display = "block";
    }

    // Fuel warning
    if(data.truck.fuelWarningOn) {
        document.getElementById("right-side-current-fuel").style.color = "yellow";
    }
    else {
        document.getElementById("right-side-current-fuel").style.color = "white";
    }

    // Display waterTemp bar
    document.getElementById("waterTempBar").innerText = showBar(data.truck.waterTemperature, data.truck.waterTemperatureWarningValue);

    // Display voltage bar
    document.getElementById("voltageBar").innerText = showBar(data.truck.batteryVoltage, 30);

    // Display oilTemp bar
    document.getElementById("oilTempBar").innerText = showBar(data.truck.oilTemperature, 110);

    // Display oilPressure bar
    document.getElementById("oilPressureBar").innerText = showBar(data.truck.oilPressure, 80);

    // Water Temperature warning
    if(data.truck.waterTemperatureWarningOn) {
        document.getElementById("waterTemp").style.color = "red";
    }
    else {
        document.getElementById("waterTemp").style.color = "white";
    }

    // Battery voltage warning
    if(data.truck.batteryVoltageWarningOn) {
        document.getElementById("voltage").style.color = "red";
    }
    else {
        document.getElementById("voltage").style.color = "white";
    }

    // Oil pressure warning
    if(data.truck.oilPressureWarningOn) {
        document.getElementById("oilPressure").style.color = "red";
    }
    else {
        document.getElementById("oilPressure").style.color = "white";
    }

    // Navigator info on/off
    if(data.navigation.estimatedDistance == 0) {
        if(displayPageSwitchCount >= 500) {
            if(displayPageNavigatorNow == 1) {
                displayPageNavigatorNow = 2;
                document.getElementById("navigator-info-page").style.display = "none";
                document.getElementById("navigator-info-status").style.display = "none";
                document.getElementById("navigator-info-no-destination").style.display = "block";
            }
            else if(displayPageNavigatorNow == 2) {
                displayPageNavigatorNow = 1;
                document.getElementById("navigator-info-page").style.display = "none";
                document.getElementById("navigator-info-status").style.display = "block";
                document.getElementById("navigator-info-no-destination").style.display = "none";
            }
        }
    }
    else {
        if(displayPageSwitchCount >= 500) {
            if(displayPageNavigatorNow == 1) {
                displayPageNavigatorNow = 2;
                document.getElementById("navigator-info-page").style.display = "block";
                document.getElementById("navigator-info-status").style.display = "none";
                document.getElementById("navigator-info-no-destination").style.display = "none";
            }
            else if(displayPageNavigatorNow == 2) {
                displayPageNavigatorNow = 1;
                document.getElementById("navigator-info-page").style.display = "none";
                document.getElementById("navigator-info-status").style.display = "block";
                document.getElementById("navigator-info-no-destination").style.display = "none";
            }
        }
    }

    // Show or not show trailer damage
    if(data.trailer.attached) {
        document.getElementById("trailerWearFlag").style.visibility = "visible";
    }
    else {
        document.getElementById("trailerWearFlag").style.visibility = "hidden";
    }

    // Change message at bottom
    if(displayPageSwitchCount >= 500) {
        document.getElementById("messages").innerHTML = messages[currentMessage];
        currentMessage ++;
        if(currentMessage > messages.length - 1) {
            currentMessage = 0;
        }
    }

    // Switch infoArea messages
    if(displayPageSwitchCount >= 500) {
        if(displayPageInfoAreaNow == 1) {
            displayPageInfoAreaNow = 2;
            document.getElementById("info-area-messages-page1").style.display = "none";
            document.getElementById("info-area-messages-page2").style.display = "block";
        }
        else if(displayPageInfoAreaNow == 2) {
            displayPageInfoAreaNow = 1;
            document.getElementById("info-area-messages-page1").style.display = "block";
            document.getElementById("info-area-messages-page2").style.display = "none";
        }
    }
}

// Custom changes

// Time process

function addZero(num) {
    return num<10 ? ('0'+num) : num;
}

// Modify ISO8601 time

function timeModify(timeToModify) {
    var timeBeModified = new Date(timeToModify);

    var hour = addZero(timeBeModified.getUTCHours());
    var minute = addZero(timeBeModified.getUTCMinutes());

    return hour + ':' + minute;
}

// Render Bars
function showBar(inputData, maxData) {
    var displayCharValue = Math.round(((inputData / maxData) * 100) / 5);
    if(displayCharValue > 20) {
        displayCharValue = 20;
    }
    var displayChar = '';
    var displayCharVar;
    displayCharVar = 0;
    while(displayCharVar < displayCharValue) {
        displayChar += '=';
        displayCharVar ++;
    }
    displayCharVar = 20 - displayCharValue;
    while(displayCharVar > 0) {
        displayChar += "\xa0";
        displayCharVar --;
    }
    return displayChar;
}