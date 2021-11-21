export const WEATHER_RESPONSE_MOCK = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [9.58, 60.1, 496]
    },
    properties: {
      meta: {
        updated_at: "2021-11-20T12:00:48Z",
        units: {
        air_pressure_at_sea_level: "hPa",
        air_temperature: "celsius",
        cloud_area_fraction: "%",
        precipitation_amount: "mm",
        relative_humidity: "%",
        wind_from_direction: "degrees",
        wind_speed: "m/s"
        }
      },
      timeseries: [
        {
        time: "2021-11-20T12:00:00Z",
        data: {
          instant: {
            details: {
              air_pressure_at_sea_level: 1004.4,
              air_temperature: 2.9,
              cloud_area_fraction: 99.6,
              relative_humidity: 74.9,
              wind_from_direction: 123.6,
              wind_speed: 1.5
            }
          },
          next_12_hours: {
            summary: { symbol_code: "cloudy" }
          },
          next_1_hours: {
            summary: { symbol_code: "cloudy" },
            details: { precipitation_amount: 0 }
          },
          next_6_hours: {
          summary: { symbol_code: "cloudy" },
          details: { precipitation_amount: 0 }
          }
        }
      }
    ]
  }
}
