/**
 * evaluate date for DST. Uses Javascript Date() method.
 * @version 1.0
 * @author John W. Cook <john@johncook.net>
 *
 * Purpose: Determine if datetimestamp value resides in daylight savings time period.
  */
  
// Create several date objects and returns local datetime values with current timezones or in UTC.
let currentDate = new Date();
let startDSTMonth = new Date("2022-03-01");
let endDSTMonth = new Date("2022-11-01");
console.log("currentDate = " + currentDate);
console.log("startDSTMonth = " + startDSTMonth);
console.log("endDSTMonth = " + endDSTMonth);
console.log("Notice how Javascript Date() indicates time relative to GMT.");

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

// Run test Weekdays to test key dates near start and end DST
//  Dates returned with 0 reside outside daylight savings time.
// testWeekDays();

function BIRTReport() {
    let cDate = new Date();
    let x = evalDateDsp(cDate);

    if (x = 1) {
        console.log(" Currendate is in DST  " + cDate);
    } else {
        console.log(" Currentdate is not in DST, adding one hour  " + cDate.addHours(1));
    }
}

BIRTReport();