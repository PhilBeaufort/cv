import React from 'react';

function DateRange({ startDate, endDate }) {
    const formatDate = (dateString) => {
        if (!dateString) return '';

        // Check if the string matches mm-yyyy format
        const mmYyyyRegex = /^(0[1-9]|1[0-2])-\d{4}$/;
        if (mmYyyyRegex.test(dateString)) {
            const [month, year] = dateString.split('-');
            const monthNames = [
                "janv.", "févr.", "mars", "avr.", "mai", "juin",
                "juil.", "août", "sept.", "oct.", "nov.", "déc."
            ];
            if (parseInt(month) >= 1 && parseInt(month) <= 12) {
                return `${monthNames[parseInt(month) - 1]} ${year}`;
            }
        }
        return dateString; // Return original string if it doesn't match mm-yyyy
    };

    return (
        <div>
            <p className="text-sm text-base-content bg-center flex items-center space-x-2">
                <img src="https://www.svgrepo.com/show/502605/date-range.svg" alt="Date Range" className="w-5 h-5 mr-1 fill-current"/>
                {startDate ? (<>  {formatDate(startDate)} - {formatDate(endDate)} </>) : (<>  {formatDate(endDate)} </>)}
            </p>
        </div>
    );
}
  
export default DateRange;