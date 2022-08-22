/**
 * Simple use of Javascript Date() method.
 * @version 1.0
 * @author John W. Cook <john@johncook.net>
 *
 * Purpose: Demonstrate use of javascript Date(). The method returns platform
 *  independent format of a single moment in time. 
 */
  
// Create several date objects and returns local datetime values with current timezones or in UTC.
let currentDate = new Date();
let startDSTMonth = new Date("2022-03-01");
let endDSTMonth = new Date("2022-11-01");
console.log("currentDate = " + currentDate);
console.log("startDSTMonth = " + startDSTMonth);
console.log("endDSTMonth = " + endDSTMonth);
console.log("Notice how Javascript Date() indicates Standard and Daylight savings time.");

// Create another date object. Access date & time components using constructor methods for day, 
// month, year, hours, minutes and seconds. Support leading 0 for single digit day and month.
let date_ob = new Date();
let day = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();

// Output date in YYYY-MM-DD and HH:MM:SS formats
console.log("Current Date in YYYY-MM-DD format is " + year + "-" + month + "-" + day);
console.log("Current Time in HH:MM:SS format is " + hours + ":" + minutes + ":" + seconds);

// getUTCDay() returns time in Coordinated Universal Time standard
let weekday = startDSTMonth.getUTCDay();
console.log("The javascript getUTCDay() function returns day " + weekday + " of 0-6 weekdays, where Sun=0 and Sat=6.");

// Javascript switch allows variable or expression to change the control flow 
// This example evaluates the day of the week number and outputs cooresponding name of day
let itc = "In this case #";
let rep = " represents ";
switch (weekday) {
	case 0: console.log(itc + weekday + rep + "Sunday.");
		break;
	case 1: console.log(itc + weekday + rep + "Monday.");
		break;
	case 2: console.log(itc + weekday + rep + "Tuesday.");
		break;
        case 3: console.log(itc + weekday + rep + "Wednesday.");
                break;
        case 4: console.log(itc + weekday + rep + "Thursday.");
                break;
        case 5: console.log(itc + weekday + rep + "Friday.");
                break;
        case 6: console.log(itc + weekday + rep + "Saturday.");
                break;
        }

// This example contains outputs using strings and add operations
let tsij = "The switch() in javascript is same as a traditional Case statement, where day "+ weekday + " has a matching case statement and returns the day value increased by ";
switch (weekday) {
	case 0: console.log(tsij + "300 = " + (weekday + 300) + ".");
                break;
        case 1: console.log(tsij + "290 = " + (weekday + 290) + ".");
                break;
        case 2: console.log(tsij + "280 = " + (weekday + 280) + ".");
                break;
        case 3: console.log(tsij + "270 = " + (weekday + 270) + ".");
                break;
        case 4: console.log(tsij + "260 = " + (weekday + 260) + ".");
                break;
        case 5: console.log(tsij + "250 = " + (weekday + 250) + ".");
                break;
        case 6: console.log(tsij + "240 = " + (weekday + 240) + ".");
                break;
        }

// Example subtraction operation on two date objects, endDSTMonth - startDSTMonth 
var diff = Math.abs(endDSTMonth - startDSTMonth);
console.log("The variables endDSTMonth minus startDSTMonth is equal to " + diff + " milliseconds.");

// Javascript stores datetime values in milliseconds, similar to the Unix Epoch number.
// Example function uses algebra to convert a number into separate time units. 
function millisToDaysHoursMinutesSeconds(millis) {
	let days = Math.floor(millis / (3600*24));
	let hours = Math.floor(millis % (3600*24 / 3600));
	let minutes = Math.floor(millis % 3600 / 60);
	let seconds = (millis % 60).toFixed(0);
	return days + "d:" + hours + "h:" + minutes + "m:" + (seconds < 10 ? '0' : '') + seconds+"s";
}

// The function is called inside the console.log output string.
console.log("The function milsToDhms() returns the formatted string " + millisToDaysHoursMinutesSeconds(diff/1000)); 

// This function formats output using variables and evaluation criteria
function secondsToDhms(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600*24));
	var h = Math.floor(seconds % (3600*24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);

	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";

	return (dDisplay + hDisplay + mDisplay + sDisplay).replace(/,\s*$/, "");
}

// Another example how function is called inside console.log statement. This allows us to create dynamic content.
console.log("The function secsToDhms() returns the string " + secondsToDhms(diff/1000) + ". Same math, different coding style.");

// Creates prototype functions to extend the Date object. Helps promote 
//  good coding and allow us to create custom methods for reuse. 
Date.prototype.add20minutes = function(){
 return this.setMinutes(this.getMinutes() + 20);
}

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

// Routines below demonstrate psuedocode considerations: getDSTStart(), getDSTEnd(), evalDateDsp()

function getDstStart(tdate) {

	// getDSTStart() returns the first day of DST for the target year.
	//	
	// Locate year from timestamp. Locate timestamp for March 1. Get js dayoftheweek 
	// number for March 1 of DST year. Organize the number of hours between Mar1 to 2nd
	// Sunday using day of week. There should be seven constant values between each day
	// of week between March 1 and 2nd Sunday in a given year. Evaluate case for 
	// dayofweek to locate and add cooresponding hours to determine 2nd Sunday. 
	// Hours are adjusted 2 hours to support DST startime at 2am, instead of 12am.
	// Add to March 1 timestamp and return timestamp for 2nd Sunday.

        let hours1 = tdate.getUTCHours();
        let d = new Date();

        // test flags
        // console.log("getUTCDay is "+tdate.getUTCDay());
        // console.log("getDate is "+tdate.getDate());

	// Date() returns platform independent format of a single moment in time. 
	// getFullYear() is method that returns year of datetimestamp.

	let jandate = new Date(tdate.getFullYear(), 0, 1);
	let mardate = new Date(jandate.getFullYear(), 2, 1);
	//console.log("jan1 = " + jandate);
	//console.log("mar1 = " + mardate);

	switch (mardate.getUTCDay()) {
        	case 0: return (mardate.addHours(170));
                	break;
        	case 1: return (mardate.addHours(314)); 
                	break;
        	case 2:	return (mardate.addHours(290));
			        break;
        	case 3: return (mardate.addHours(266)); 
                	break;
        	case 4: return (mardate.addHours(242));
                	break;
        	case 5: return (mardate.addHours(218));
                	break;
        	case 6: return (mardate.addHours(194));
                	break;
        }

        // this area below is skipped if return is called beforehand
        // console.log("getUTCDay is "+tdate.getUTCDay());
        // console.log("getDate is "+tdate.getDate());

}

function getDstEnd(edate) {

        let jandate = new Date(edate.getFullYear(), 0, 1);
        let novdate = new Date(jandate.getFullYear(), 10, 1);
        //console.log("jan1 = " + jandate);
        //console.log("nov1 = " + novdate);

	switch (novdate.getUTCDay()) {
        	case 0: return (novdate.addHours(2));
                	break;
	        case 1: return (novdate.addHours(146));
        	        break;
	        case 2: return (novdate.addHours(122));
        	        break;
	        case 3: return (novdate.addHours(98));
        	        break;
	        case 4: return (novdate.addHours(74));
        	        break;
	        case 5: return (novdate.addHours(50));
        	        break;
	        case 6: return (novdate.addHours(26));
        	        break;
        }
}

function testWeekDays() {

	// 'Invoke' the javascript function to call getDstStart() and getDstEnd()
	//
	console.log("   ********  Start Test Cases  ******");
    console.log("   ----------  Test Group 0  --------")
    console.log("Test 0 startDSTMonth is " + startDSTMonth + evalDateDsp(startDSTMonth));
    console.log("Test 0, currentDate is " + currentDate + evalDateDsp(currentDate));
    console.log("Test 0 April 1, 2022 is " + evalDateDsp(new Date('2022-04-01')));
    console.log("Test 0 April 1, 2023 is " + evalDateDsp(new Date('2023-04-01')));
    console.log("Test 0 April 1, 2024 is " + evalDateDsp(new Date('2024-04-01')));
    console.log("Test 0 April 1, 2025 is " + evalDateDsp(new Date('2025-04-01')));
    console.log("Test 0 April 1, 2026 is " + evalDateDsp(new Date('2026-04-01')));
    console.log("Test 0 April 1, 2027 is " + evalDateDsp(new Date('2027-04-01')));
    console.log("Test 0 April 1, 2028 is " + evalDateDsp(new Date('2028-04-01')));
    console.log("Test 0 April 1, 2029 is " + evalDateDsp(new Date('2029-04-01')));
    console.log("Test 0 April 1, 2030 is " + evalDateDsp(new Date('2030-04-01')));
    console.log("Test 0 April 1, 2031 is " + evalDateDsp(new Date('2031-04-01')));
    console.log("Test 0 April 1, 2032 is " + evalDateDsp(new Date('2032-04-01')));
	console.log();
    console.log("   ----------  Test Group 1  --------")
    console.log("Testing getDstStart() and getDstEnd:");
	console.log(getDstStart(new Date('2022-03-01')) +" -> "+ getDstEnd(startDSTMonth));
    console.log("Test 1 March 12, 2022 is " + evalDateDsp(new Date('2022-03-12')));
    console.log("Test 1 March 13, 2022 is " + evalDateDsp(new Date('2022-03-13')));
    console.log("Test 1 March 14, 2022 is " + evalDateDsp(new Date('2022-03-14')));
    console.log("Test 1 March 15, 2022 is " + evalDateDsp(new Date('2022-03-15')));
    console.log("Test 1 November 5, 2022 is " + evalDateDsp(new Date('2022-11-05')));
    console.log("Test 1 November 6, 2022 is " + evalDateDsp(new Date('2022-11-06')));
    console.log("Test 1 November 7, 2022 is " + evalDateDsp(new Date('2022-11-07')));
    console.log("Test 1 November 8, 2022 is " + evalDateDsp(new Date('2022-11-08')));
	
    console.log("   ----------  Test Group 2  --------")
    console.log(getDstStart(new Date('2023-03-01')) +" -> "+ getDstEnd(new Date('2023-03-01')));
    console.log("Test 2 March 11, 2023 is " + evalDateDsp(new Date('2023-03-11')));
    console.log("Test 2 March 12, 2023 is " + evalDateDsp(new Date('2023-03-12')));
    console.log("Test 2 March 13, 2023 is " + evalDateDsp(new Date('2023-03-13')));
    console.log("Test 2 March 14, 2023 is " + evalDateDsp(new Date('2023-03-14')));
    console.log("Test 2 November 4, 2023 is " + evalDateDsp(new Date('2023-11-04')));
    console.log("Test 2 November 5, 2023 is " + evalDateDsp(new Date('2023-11-05')));
    console.log("Test 2 November 6, 2023 is " + evalDateDsp(new Date('2023-11-06')));
    console.log("Test 2 November 7, 2023 is " + evalDateDsp(new Date('2023-11-07')));

    console.log("   ----------  Test Group 3  --------")
    console.log(getDstStart(new Date('2024-03-01')) +" -> "+ getDstEnd(new Date('2024-03-01')));
    console.log("Test 3 March 09, 2024 is " + evalDateDsp(new Date('2024-03-09')));
    console.log("Test 3 March 10, 2024 is " + evalDateDsp(new Date('2024-03-10')));
    console.log("Test 3 March 11, 2024 is " + evalDateDsp(new Date('2024-03-11')));
    console.log("Test 3 March 12, 2024 is " + evalDateDsp(new Date('2024-03-12')));
    console.log("Test 3 November 2, 2024 is " + evalDateDsp(new Date('2024-11-02')));
    console.log("Test 3 November 3, 2024 is " + evalDateDsp(new Date('2024-11-03')));
    console.log("Test 3 November 4, 2024 is " + evalDateDsp(new Date('2024-11-04')));
	console.log("Test 3 November 5, 2024 is " + evalDateDsp(new Date('2024-11-05')));

    console.log("   ----------  Test Group 4  --------")
    console.log(getDstStart(new Date('2025-03-01')) +" -> "+ getDstEnd(new Date('2025-03-01')));
    console.log("Test 4 March 08, 2025 is " + evalDateDsp(new Date('2025-03-08')));
    console.log("Test 4 March 09, 2025 is " + evalDateDsp(new Date('2025-03-09')));
    console.log("Test 4 March 10, 2025 is " + evalDateDsp(new Date('2025-03-10')));
    console.log("Test 4 March 11, 2025 is " + evalDateDsp(new Date('2025-03-11')));
    console.log("Test 4 November 1, 2025 is " + evalDateDsp(new Date('2025-11-01')));
    console.log("Test 4 November 2, 2025 is " + evalDateDsp(new Date('2025-11-02')));
    console.log("Test 4 November 3, 2025 is " + evalDateDsp(new Date('2025-11-03')));
    console.log("Test 4 November 4, 2025 is " + evalDateDsp(new Date('2025-11-04')));
	
    console.log("   ----------  Test Group 5  --------")
    console.log(getDstStart(new Date('2026-03-01')) +" -> "+ getDstEnd(new Date('2026-03-01')));
    console.log("Test 5 March 07, 2026 is " + evalDateDsp(new Date('2026-03-07')));
    console.log("Test 5 March 08, 2026 is " + evalDateDsp(new Date('2026-03-08')));
    console.log("Test 5 March 09, 2026 is " + evalDateDsp(new Date('2026-03-09')));
    console.log("Test 5 March 10, 2026 is " + evalDateDsp(new Date('2026-03-10')));
    console.log("Test 5 October 31, 2026 is " + evalDateDsp(new Date('2026-10-31')));
    console.log("Test 5 November 1, 2026 is " + evalDateDsp(new Date('2026-11-01')));
    console.log("Test 5 November 2, 2026 is " + evalDateDsp(new Date('2026-11-02')));
    console.log("Test 5 November 3, 2026 is " + evalDateDsp(new Date('2026-11-03')));

    console.log("   ----------  Test Group 6  --------")
    console.log(getDstStart(new Date('2027-03-01')) +" -> "+ getDstEnd(new Date('2027-03-01')));
    console.log("Test 6 March 13, 2027 is " + evalDateDsp(new Date('2027-03-13')));
    console.log("Test 6 March 14, 2027 is " + evalDateDsp(new Date('2027-03-14')));
    console.log("Test 6 March 15, 2027 is " + evalDateDsp(new Date('2027-03-15')));
    console.log("Test 6 March 16, 2027 is " + evalDateDsp(new Date('2027-03-16')));
    console.log("Test 6 November 6, 2027 is " + evalDateDsp(new Date('2027-11-06')));
    console.log("Test 6 November 7, 2027 is " + evalDateDsp(new Date('2027-11-07')));
    console.log("Test 6 November 8, 2027 is " + evalDateDsp(new Date('2027-11-08')));
    console.log("Test 6 November 9, 2027 is " + evalDateDsp(new Date('2027-11-09')));
	
    console.log("   ----------  Test Group 7  --------")
    console.log(getDstStart(new Date('2028-03-01')) +" -> "+ getDstEnd(new Date('2028-03-01')));
    console.log("Test 7 March 11, 2028 is " + evalDateDsp(new Date('2028-03-11')));
    console.log("Test 7 March 12, 2028 is " + evalDateDsp(new Date('2028-03-12')));
    console.log("Test 7 March 13, 2028 is " + evalDateDsp(new Date('2028-03-13')));
    console.log("Test 7 March 14, 2028 is " + evalDateDsp(new Date('2028-03-14')));
    console.log("Test 7 November 4, 2028 is " + evalDateDsp(new Date('2028-11-04')));
    console.log("Test 7 November 5, 2028 is " + evalDateDsp(new Date('2028-11-05')));
    console.log("Test 7 November 6, 2028 is " + evalDateDsp(new Date('2028-11-06')));
	console.log("Test 7 November 7, 2028 is " + evalDateDsp(new Date('2028-11-07')));

    console.log("   ----------  Test Group 8  --------")
    console.log(getDstStart(new Date('2029-03-01')) +" -> "+ getDstEnd(new Date('2029-03-01')));
    console.log("Test 8 March 10, 2029 is " + evalDateDsp(new Date('2029-03-10')));
    console.log("Test 8 March 11, 2029 is " + evalDateDsp(new Date('2029-03-11')));
    console.log("Test 8 March 12, 2029 is " + evalDateDsp(new Date('2029-03-12')));
    console.log("Test 8 March 13, 2029 is " + evalDateDsp(new Date('2029-03-13')));
    console.log("Test 8 November 3, 2029 is " + evalDateDsp(new Date('2029-11-03')));
    console.log("Test 8 November 4, 2029 is " + evalDateDsp(new Date('2029-11-04')));
    console.log("Test 8 November 5, 2029 is " + evalDateDsp(new Date('2029-11-05')));
    console.log("Test 8 November 6, 2029 is " + evalDateDsp(new Date('2029-11-06')));
}

// This function is used to determine if reference date is actively in Daylight Standards Time or not.
// Returns 1 if inside active DST period, or 0 if not.
function evalDateDsp(thisDate) {

	let isDST = 0;

	if ((thisDate >= getDstStart(thisDate)) && (thisDate <= getDstEnd(thisDate))) { 
		// console.log("thisDate is Daylight time"); 
		isDST=1
	} else {
		// console.log("thisDate is Standard time");
	}
	return isDST;
}

testWeekDays();
