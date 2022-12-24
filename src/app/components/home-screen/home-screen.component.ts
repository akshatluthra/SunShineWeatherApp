import { Component, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/models/weather.model';
import { WeatherService } from 'src/app/services/weather.service';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {
  showDetailsBtn: boolean = false;
  latitude!: number;
  longitude!: number;
  map = faMapMarkerAlt
  
  constructor(private weatherService: WeatherService) { }
  cityName: string = "New Delhi";
  weatherData: any = [];
  temp!:number
  min_temp!:number
  max_temp!:number
  humidity!: number;
  speed!: any;


  ngOnInit(): void {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  onSubmit(){

    this.getWeatherData(this.cityName);
    this.cityName = '';
    
  }

  private getWeatherData(cityName: string){
    this.weatherService.getWeatherData(cityName).subscribe(
      {
        next: (response)=>{
          this.weatherData = response;
          this.temp = Math.round(this.weatherData.main.temp - 273.15);
          this.min_temp = Math.round(this.weatherData.main.temp_min - 273.15);
          this.max_temp = Math.round(this.weatherData.main.temp_max - 273.15);
          this.humidity = this.weatherData.main.humidity;
          this.speed = this.weatherData.wind.speed;
          console.log(response);
        }
      }
    );
  }

  getLocationByNavigation(){
    if(window.navigator.geolocation){
      this.showDetailsBtn = true;
      window.navigator.geolocation.getCurrentPosition((position)=>{
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude;
        this.fetchInfo(this.latitude, this.longitude);
      });
    }
    else {
      alert("Something went wrong. Please try again");
    }
  }

  fetchInfo(latitude: number, longitude: number){
    this.weatherService.getWeatherByLocation(latitude, longitude).subscribe(
      {
        next: (res)=>{
          this.weatherData = res;
          this.temp = Math.round(this.weatherData.main.temp);
          this.min_temp = Math.round(this.weatherData.main.temp_min);
          this.max_temp = Math.round(this.weatherData.main.temp_max);
          this.humidity = this.weatherData.main.humidity;
          this.speed = this.weatherData.wind.speed;
        }
      }
    )
  }

}
