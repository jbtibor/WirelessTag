var tag = <#Temperature sensor_[12|13|21|26|32|52|62|72]_1#>;

tag.updated = function () {
    function pad(number) {
        if (number < 10) {
            return "0" + number;
        }
        return number;
    }

    var now = new Date();
    var wuDateString = now.getUTCFullYear() + "-" + pad(now.getUTCMonth() + 1) + "-" + pad(now.getUTCDate()) + "+" + pad(now.getUTCHours()) + "%3A" + pad(now.getUTCMinutes()) + "%3A" + pad(now.getUTCSeconds());

    var humidity = Number(tag.moisture);
    var sensorName = tag.name;
    var temperatureC = Number(tag.temperature);

    var temperatureF = Number(temperatureC) * 1.8 + 32;

    var dewPointF = 243.04 * (Math.log(humidity / 100) + (Number(17.625 * temperatureF) / Number(243.04 + temperatureF))) / Number(17.625 - Math.log(humidity / 100) - (Number(17.625 * temperatureF) / Number(243.04 + temperatureF)));

    var solarradiation = Number(tag.lux) * 0.0079;

    var url = "http://weatherstation.wunderground.com/weatherstation/updateweatherstation.php?action=updateraw&ID=" + <%The ID of your weather station on wunderground.com%> + "&PASSWORD=" + <%The password you use to log in to wunderground.com%> + "&dateutc=" + wuDateString + "&tempf=" + temperatureF.toFixed(2) + "&dewptf=" + dewPointF.toFixed(2) + "&humidity=" + humidity.toFixed(2)+ "&solarradiation=" + solarradiation.toFixed(0) + "&softwaretype=jbtkumoapp14_" + sensorName;

    KumoApp.Log(url, 0);

    KumoApp.httpCallExternal(url, "GET");
};
