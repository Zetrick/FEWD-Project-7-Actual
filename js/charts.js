let traffic_canvas = document.getElementById( "traffic-chart" );
let daily_traffic_canvas = document.getElementById( "daily-traffic-chart" );
let mobile_users_canvas = document.getElementById( "mobile-users-chart" );

// ---------------------------- Traffic Chart Data ------------------------------------------ //

//Initial Data
//This data gets, somehow, overwritten completely during the update_chart func and I don't know why...
const initial_line_data = {

    labels: [ "5am-6am", "6am-7am", "7am-8am", "8am-9am",
        "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm",
        "1pm-2pm", "2pm-3pm", "3pm-4pm", "4pm-5pm", "5pm-6pm", "6pm-7pm"
    ],
    datasets: [
    {
        label: "Number of Cars",
        data: [ 400, 1200, 2100, 1100,
            600, 300, 900, 1100,
            1100, 700, 800, 1400, 1900, 1000
        ],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
    } ]
};

//Hourly
const hourly_line_data = {

    labels: [ "5am-6am", "6am-7am", "7am-8am", "8am-9am",
        "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm",
        "1pm-2pm", "2pm-3pm", "3pm-4pm", "4pm-5pm", "5pm-6pm", "6pm-7pm"
    ],
    datasets: [
    {
        data: [ 400, 1200, 2100, 1100,
            600, 300, 900, 1100,
            1100, 700, 800, 1400, 1900, 1000
        ],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
    } ]
};

//Daily
const daily_line_data = {
    labels: [ "S", "M", "T", "W", "T", "F", "S" ],
    datasets: [
    {
        data: [ 4000, 8000, 7000, 8000, 7400, 6500, 10150 ],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
    } ]
};

//Weekly
const weekly_line_data = {

    labels: [ "Week 1", "Week 2", "Week 3", "Week 4" ],
    datasets: [
    {
        data: [ 41000, 46000, 39000, 51000 ],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
    } ]
};

//Monthly
const monthly_line_data = {

    labels: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov",
        "Dec" ],
    datasets: [
    {
        data: [ 102654, 104587, 109658, 124650, 108324, 125657, 138954, 135214, 101454,
            98204, 97549, 98154
        ],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
    } ]
};

let traffic_options = {
    backgroundColor: 'rgba(112, 104, 201, .5)',
    fill: true,
    aspectRatio: 2.5,
    scales:
    {
        y:
        {
            beginAtZero: true
        }
    },
    plugins:
    {
        legend:
        {
            display: true
        }
    },
    animation: {
        duration: 0
    }
};

// ---------------------------- Daily Traffic Chart Data ------------------------------------------ //
const daily_data = {
    labels: [ "S", "M", "T", "W", "T", "F", "S" ],
    datasets: [
    {
        label: '# of Hits',
        data: [ 75, 115, 175, 125, 225, 200, 100 ],
        backgroundColor: '#7477BF',
        borderWidth: 1
    } ]
};
const daily_options = {
    scales:
    {
        y:
        {
            beginAtZero: true
        }
    },
    plugins:
    {
        legend:
        {
            display: true
        }
    }
};

// ---------------------------- Mobile Users Chart Data ---------------------------------------------------- //
const mobile_data = {
    labels: [ "Desktop", "Tablet", "Phones" ],
    datasets: [
    {
        label: '# of Users',
        data: [ 2000, 550, 500 ],
        borderWidth: 0,
        backgroundColor: [
            '#7477BF',
            '#78CF82',
            '#51B6C8'
        ]
    } ]
};

const mobile_options = {
    aspectRatio: 1.9,
    plugins:
    {
        legend:
        {
            position: 'right',
            labels:
            {
                boxWidth: 20,
                fontStyle: 'bold'
            }
        }
    }
};

// ---------------------------- Create All Charts From Chart Data ------------------------------------------ //
const traffic_chart = new Chart( traffic_canvas,
{
    type: 'line',
    data: initial_line_data,
    options: traffic_options
} );

let daily_chart = new Chart( daily_traffic_canvas,
{
    type: 'bar',
    data: daily_data,
    options: daily_options
} );

let mobile_chart = new Chart( mobile_users_canvas,
{
    type: 'doughnut',
    data: mobile_data,
    options: mobile_options
} );