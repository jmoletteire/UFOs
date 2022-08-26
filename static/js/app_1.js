/***** Const variable for the data in data.js *****/
const tableData = data;

/***** Reference the HTML table using D3 *****/
var tbody = d3.select("tbody");


function buildTable(data) {
    /***** Clear table *****/
    tbody.html("");


    /************************************************* 
     * forEach loop through 'data.' 
     * 
     * 'dataRow' represents each element in array 
     * 'data,' or in this case, each JS object. 
     * 
     * Each object will form a row in our table.
     ***********************************************/ 
    data.forEach(dataRow => {
        /********************************************
         * Find the <tbody> tag in our HTML file and
         * add a row ("tr").
         * 
         * Variable 'row' will reference the new 
         * row we just created.
         *******************************************/
        let row = tbody.append("tr");


        /*********************************************** 
         * 'Object' tells JS to reference the current
         * JS object in the array as we iterate through
         * it.
         * 
         * The 'values' method allows us to access a JS
         * object's attributes, while 'dataRow' tells
         * JS that we want these values to go into
         * 'dataRow'.
         * 
         * forEach() allows us to add one JS object per
         * row to our table, while 'val' represents each 
         * item in the object, in this case attributes 
         * like city, state, shape, and duration.
         **********************************************/
        Object.values(dataRow).forEach((val) => {
            /**** Create a new cell to store 'val' ****/
            let cell = row.append("td");

            /******************************************
             * Add this value, 'val', to the newly
             * created cell in the current row.
            ******************************************/
            cell.text(val);
            
        
        });


    });
}

/***** Function to handle user input *****/
function handleClick() {
    /*************************************** 
     * With 'd3.select("#datetime")', D3 will 
     * look for the #datetime id in the HTML
     * tags.
     * 
     * '.property("value")' tells D3 to not
     * only look for where our date values
     * are stored, but to also return that info
     * and store it in 'date'.
    ***************************************/
    let date = d3.select("#datetime").property("value");


    /*************************************** 
     * Base Case
     *  - If no date has been entered as a
     *    filter, return all data/results.
    ***************************************/
    let filteredData = tableData;

    /***************************************
     * If date filter:
     *  - Filter the data, showing only the 
     *    rows where the date is equal to
     *    the 'date' filter we created above.
     **************************************/
    if(date) {
        filteredData = filteredData.filter(row => row.datetime === date);
    }


    /***** Build table with the filtered data *****/
    buildTable(filteredData);
}


/************************************************** 
 * Select all HTML tags with id=filter-btn, 
 * when any of them are clicked, call handleClick().
 *************************************************/
d3.selectAll("#filter-btn").on("click", handleClick);


/***** Build original table when page first loads *****/
buildTable(tableData);
