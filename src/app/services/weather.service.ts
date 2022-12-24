import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherData(cityName: string):Observable<WeatherData> {
    return this.http.get<WeatherData>("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=045bf5770088af17604f345f8cfbfbc4")
  }
  getWeatherByLocation(latitude:number, longitude:number){
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=045bf5770088af17604f345f8cfbfbc4`)
  }
}
