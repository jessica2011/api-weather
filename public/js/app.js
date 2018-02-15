const init = function() {
  const getTemperature = function() {
    const data = JSON.parse(this.responseText);
    console.log(data);

    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    let currently = data.currently;
    let weatherReportDaysOfTheWeek = data.daily.data;
    let icon = currently.icon;
    let dataTemperature = currently.temperature;
    let dataSummary = currently.summary;
    let dataWind = currently.windsSpeed;
    let dataHumidity = currently.humidity;
    let dataUvIndex = currently.uvIndex;
    let dataPressure = currently.pressure;

    let boxDaysOfTheWeek = document.querySelector('#box-days-of-the-week');
    let iconWeather = document.querySelector('#icon-weather');
    let temperature = document.querySelector('#temperature');
    let summary = document.querySelector('#summary');
    let humidity = document.querySelector('#humidity');
    let uvIndex = document.querySelector('#uvIndex');
    let pressure = document.querySelector('#pressure');


    iconWeather.setAttribute('src', `../assets/images/${icon}.png`);
    temperature.innerHTML = `${dataTemperature} °`;
    summary.innerHTML = dataSummary;
    humidity.innerHTML = `${dataHumidity} %`;
    uvIndex.innerHTML = dataUvIndex;
    pressure.innerHTML = `${dataPressure} hPa`;

    let contenido = weatherReportDaysOfTheWeek.slice(0, 7);

    contenido.forEach((element, i) => {
      let template = `
          <tr>
            <th scope="row"><img class="w100 align-middle img-2" src="../assets/images/${element.icon}.png"></th>
            <td class="align-middle">${days[i]}</td>
            <td class="align-middle">${element.temperatureMin}°</td>
            <td class="align-middle">${element.temperatureMax}°</td>
          </tr>
        </tbody>
      </table>`;
      boxDaysOfTheWeek.innerHTML += template;
    });
  };

  const handleError = () => {
    console.error('Se ha presentado un error!!');
  };

  const getLocation = () =>{
    navigator.geolocation.getCurrentPosition(function(pos) {
      let lat = pos.coords.latitude;
      let lon = pos.coords.longitude;
      console.log(lat + ' ' + lon);

      const weatherReport = () => { 
        let apiKey = '032c5a70a625c5ca43ffe56e18773429',
          proxy = 'https://cors-anywhere.herokuapp.com/',
          apiLinkDS = `https://api.darksky.net/forecast/${apiKey}/${lat},${lon}?units=si`,
          url = proxy + apiLinkDS;
      
    
        const XHR = new XMLHttpRequest();
        
        XHR.open('GET', url);
        XHR.onload = getTemperature;
        XHR.onerror = handleError;
        console.log(url);
        XHR.send();
      };
      weatherReport();
    });
  };

  getLocation();
};
window.addEventListener('load', init);


