const axios = require('axios');

const fetchWeatherData = async (location, startDate, endDate, apiKey) => {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;
  const response = await axios.get(url);
  return response.data;
};

describe('Weather API Real Call Test', () => {
  const apiKey = '3B6ULCXBXPLJDDUGDYPG4LVU2'; // Replace with your own API key

  it('should return weather data for a valid location', async () => {
    const location = 'Riyadh';
    const startDate = '2023-10-01';
    const endDate = '2023-10-02';

    const response = await fetchWeatherData(location, startDate, endDate, apiKey);

    console.log(response); // Debugging: See the actual API response

    expect(response).toHaveProperty('resolvedAddress');
    expect(response.resolvedAddress).toContain('الرياض, السعودية'); // Ensure response contains correct location
    expect(response).toHaveProperty('days');
    expect(response.days.length).toBeGreaterThan(0);
  });

  it('should return an error for an invalid location', async () => {
    const invalidLocation = 'InvalidLocation';
    const startDate = '2023-10-01';
    const endDate = '2023-10-02';

    await expect(fetchWeatherData(invalidLocation, startDate, endDate, apiKey))
      .rejects.toThrow();
  });
});
