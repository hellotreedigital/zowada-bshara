import { WEATHER_API_KEY } from "@env";
import axios from "axios";

export const weeklyWeather = async (lat, lon) => {
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;

  try {
    const res = await axios.get(url);
    return res;
  } catch (error) {}
};
