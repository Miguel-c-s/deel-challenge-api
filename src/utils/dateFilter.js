

module.exports = {
    dateFilter: (start, end) => {
        let startDate = new Date(0);
        let endDate = new Date();
        if (start) {
            startDate = new Date(start);
            if (isNaN(startDate)) {
                throw new Error('Invalid start date');
            }
        }
        if (end) {
            endDate = new Date(end);
            if (isNaN(endDate)) {
                throw new Error('Invalid end date');
            }
        }
        
        return {startDate, endDate}
    }
}