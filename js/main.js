//Initialize function to get location of the user on pageload.
getLocation();

//global animation variable
var anim = 0;


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showModal); 
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

//Function to show modal if geolocation is not supported.
function showModal() {
    $('#openModal').modal('show');
    $('#close_modal').hide();
}

//Funtion to show controls after modal dissappears
function show_controls() {
    $(".setting_gear").show();
    $('#close_modal').show();
    var check = document.getElementById('openModal');
    check.removeAttribute('data-keyboard');
    check.removeAttribute('data-backdrop');
}

//Function to generate random background, based on weather.
function randombackground(weatherType) {
    var num = Math.ceil(Math.random() * 5);
    if (weatherType === "sunny")
        weatherType = "Clear";
    document.getElementById('banner-background').style.background = "url('../images/background/" + weatherType + "/" + num + ".jpg')no-repeat center center, -webkit-linear-gradient(top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))";
}

//Function to convert smallcase to Titlecase
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

//Function to get coordinates of the location selected
function showPosition(position) {
    var lati = position.coords.latitude;
    var long = position.coords.longitude;
    displayResult(lati, long);
}

function get_weather_icon(main_weather, pod) {
    switch (main_weather) {
        case 'Clear':
            if (pod === 'd') {
                return "sunny";
            } else {
                return "clear";
            }
            break;
        case 'Rain':
            return "rain";
            break;
        case 'Clouds':
            return "cloudy";
            break;
    }
}

function get_pod(pod) {
    if (pod === 'n')
        return "night";
    else
        return "day";
}

//Function to obtain result from openweather API and display result on the page.
function displayResult(lati, long) {
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    $.ajax({
        type: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lati + '&lon=' + long + '&appid=3123784587e87adbde85cc9d67d3fb5f&units=metric',
        data: {
            get_param: 'value'
        },
        dataType: 'json',
        success: function(data) {
            var city = data.city.name;
            var datestamp = data.list[0].dt;
            datestamp = moment.unix(datestamp);
            var today = (datestamp.day());
            today = days[today];
            var datestamp = data.list[8].dt;
            datestamp = moment.unix(datestamp);
            var day2 = (datestamp.day());
            day2 = days[day2];
            var datestamp = data.list[16].dt;
            datestamp = moment.unix(datestamp);
            var day3 = (datestamp.day());
            day3 = days[day3];
            var datestamp = data.list[24].dt;
            datestamp = moment.unix(datestamp);
            var day4 = (datestamp.day());
            day4 = days[day4];
            var datestamp = data.list[32].dt;
            datestamp = moment.unix(datestamp);
            var day5 = (datestamp.day());
            day5 = days[day5];
            var country = data.city.country;
            var weather = data.list[0].weather[0].description;
            var temp = data.list[0].main.temp;
            weather = toTitleCase(weather);
            city = toTitleCase(city);
            country = country.toUpperCase();

            var weather_icon = data.list[0].weather[0].main;
            var pod = data.list[0].sys.pod;
            var weather_icon = get_weather_icon(weather_icon, pod);
            randombackground(weather_icon);
            var pod = get_pod(pod);
            if (city == "Kanija Bhavan") {
                city = "Bangalore";
            }
            document.getElementById('info-bar').innerHTML = '<p><i class="fa fa-map-marker"></i> ' + city + ', ' + country + '<span id="temp-right"><i class="fa fa-thermometer-full" aria-hidden="true"></i> ' + temp + '<span id="small-font">&#8451;</span></span></p><br>';
            document.getElementById('weather-description').innerHTML = '<i class="wi wi-' + pod + '-' + weather_icon + ' center-icon"></i>';
            document.getElementById('weather-description').innerHTML += '<p>' + weather + '</p>';
            var temp = data.list[8].main.temp;
            var weather_icon = data.list[8].weather[0].main;
            var pod = data.list[8].sys.pod;
            var weather_icon = get_weather_icon(weather_icon, pod);
            var pod = get_pod(pod);
            document.getElementById('timeline-1').innerHTML = '<p>' + temp + '<span id="small-font">&#8451;</span></p>';
            document.getElementById('timeline-1').innerHTML += '<i class="wi wi-' + pod + '-' + weather_icon + ' timeline-icon"></i>';
            document.getElementById('timeline-1').innerHTML += '<p>' + day2 + '</p>';
            var temp = data.list[16].main.temp;
            var weather_icon = data.list[16].weather[0].main;
            var pod = data.list[16].sys.pod;
            var weather_icon = get_weather_icon(weather_icon, pod);
            var pod = get_pod(pod);
            document.getElementById('timeline-2').innerHTML = '<p>' + temp + '<span id="small-font">&#8451;</span></p>';
            document.getElementById('timeline-2').innerHTML += '<i class="wi wi-' + pod + '-' + weather_icon + ' timeline-icon"></i>';
            document.getElementById('timeline-2').innerHTML += '<p>' + day3 + '</p>';
            var temp = data.list[24].main.temp;
            var weather_icon = data.list[24].weather[0].main;
            var pod = data.list[24].sys.pod;
            var weather_icon = get_weather_icon(weather_icon, pod);
            var pod = get_pod(pod);
            document.getElementById('timeline-3').innerHTML = '<p>' + temp + '<span id="small-font">&#8451;</span></p>';
            document.getElementById('timeline-3').innerHTML += '<i class="wi wi-' + pod + '-' + weather_icon + ' timeline-icon"></i>';
            document.getElementById('timeline-3').innerHTML += '<p>' + day4 + '</p>';
            var temp = data.list[32].main.temp;
            var weather_icon = data.list[32].weather[0].main;
            var pod = data.list[32].sys.pod;
            var weather_icon = get_weather_icon(weather_icon, pod);
            var pod = get_pod(pod);
            document.getElementById('timeline-4').innerHTML = '<p>' + temp + '<span id="small-font">&#8451;</span></p>';
            document.getElementById('timeline-4').innerHTML += '<i class="wi wi-' + pod + '-' + weather_icon + ' timeline-icon"></i>';
            document.getElementById('timeline-4').innerHTML += '<p>' + day5 + '</p>';
            //custom Location
            if (anim == 1) {
                var selector = $('#weather-description, #timeline-1, #timeline-2, #timeline-3, #timeline-4, .setting_gear, .location-temp-bar');
                selector.addClass('fadeIn');
                selector.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                    function(e) {
                        selector.removeClass('fadeIn');
                    });
            } else { //Auto Location
                $(".setting_gear").show();
                var selector = $('.location-temp-bar');
                selector.addClass('slideInDown');
                selector.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                    function(e) {
                        selector.removeClass('slideInDown');
                    });
                var selector = $('#weather-description, #timeline-1, #timeline-2, #timeline-3, #timeline-4, .setting_gear');
                selector.addClass('slideInUp');
                selector.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                    function(e) {
                        selector.removeClass('slideInUp');
                    });
            }
        }
    });

}

//Function to get coordinates from google based on custom search.
var pac_input = document.getElementById('mapSearch');
(function pacSelectFirst(input) {
    var _addEventListener = (input.addEventListener) ? input.addEventListener : input.attachEvent;

    //Event Listener for enter button to sleect the first result be default.
    function addEventListenerWrapper(type, listener) {
        if (type == 'keydown') {
            var orig_listener = listener;
            listener = function(event) {
                var suggestion_selected = $('.pac-item-selected').length > 0;
                if (event.which == 13 && !suggestion_selected) {
                    var simulated_downarrow = $.Event('keydown', {
                        keyCode: 40,
                        which: 40
                    });
                    orig_listener.apply(input, [simulated_downarrow]);
                }

                orig_listener.apply(input, [event]);
            };
        }

        _addEventListener.apply(input, [type, listener]);
    }

    input.addEventListener = addEventListenerWrapper;
    input.attachEvent = addEventListenerWrapper;


    //Get coordinates from Google API based on search and display results.
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        try {
            var lat = place.geometry.location.lat();
            var lng = place.geometry.location.lng();
            //if anim = 1 custom location selected
            anim = 1;
            displayResult(lat, lng);
            document.getElementById('close_modal').click();
            document.getElementById('mapSearch').value = "";
            document.getElementById('mapSearch').placeholder = "Enter a location";

        } catch (err) {
            var selector = $('#mapSearch');
            selector.addClass('shake');
            selector.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                function(e) {
                    selector.removeClass('shake');
                });
            document.getElementById('mapSearch').value = "";
            document.getElementById('mapSearch').placeholder = "Enter a location";
        }
        show_controls();
    });

})(pac_input);

//Focuses on the input box in the modal
$('#openModal').on('shown.bs.modal', function() {
    $('#mapSearch').focus();
})