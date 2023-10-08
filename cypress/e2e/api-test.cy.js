describe('API testing for openweathermap', function () {
    const appid = "eb8a70f875f4e4baabc1399cec36e4b6";
    const units = "Metric"
    it('GET Latitude and Longitude of a City', function () {
        cy.fixture('City').its('data')
            .then(city => {
                city.forEach((city) => {
                    const name = city.name
                    const lat = city.lat
                    const lon = city.lon
                    const country = city.country

                    cy.request({
                        method: 'GET',
                        url: "https://api.openweathermap.org/geo/1.0/direct",
                        qs: {
                            "q": name,
                            "limit": "1",
                            "units": units,
                            "appid": appid
                        }
                    }).then((response) => {
                        expect(response.status).to.equal(200)
                        expect(response.body[0].name).to.equal(name)
                        expect(response.body[0].lat).not.to.lessThan(-90)
                        expect(response.body[0].lat).not.to.greaterThan(90)
                        expect(response.body[0].lon).not.to.lessThan(-180)
                        expect(response.body[0].lon).not.to.greaterThan(180)
                        expect(response.body[0].country).to.equal(country)
                        expect(response.body[0].local_names).to.not.be.null
                    })
                })
            })
    })


    it('GET Weather Forecast of a Location', function () {
        cy.fixture('City').its('data')
            .then(city => {
                city.forEach((city) => {
                    const name = city.name
                    const lat = city.lat
                    const lon = city.lon
                    const country = city.country

                    cy.request({
                        method: 'GET',
                        url: "https://api.openweathermap.org/data/2.5/weather",
                        qs: {
                            "lat": lat,
                            "lon": lon,
                            "units": units,
                            "appid": appid
                        }
                    }).then((response) => {
                        expect(response.status).to.equal(200)

                        expect(response.body.coord.lon).not.to.lessThan(-180)
                        expect(response.body.coord.lon).not.to.greaterThan(180)
                        expect(response.body.coord.lat).not.to.lessThan(-90)
                        expect(response.body.coord.lat).not.to.greaterThan(90)  

                        expect(response.body.weather[0].id).to.not.be.null 
                        expect(response.body.weather[0].main).to.not.be.null  
                        expect(response.body.weather[0].description).to.not.be.null  
                        expect(response.body.weather[0].icon).to.not.be.null  

                        expect(response.body.base).to.not.be.null

                        expect(response.body.main.temp).to.not.be.null
                        expect(response.body.main.feels_like).to.not.be.null
                        expect(response.body.main.temp_min).to.not.be.null
                        expect(response.body.main.temp_max).to.not.be.null
                        expect(response.body.main.pressure).to.not.be.null
                        expect(response.body.main.humidity).to.not.be.null
                        expect(response.body.main.sea_level).to.not.be.null
                        expect(response.body.main.grnd_level).to.not.be.null

                        expect(response.body.visibility).to.not.be.null

                        expect(response.body.wind.speed).to.not.be.null
                        expect(response.body.wind.deg).to.not.be.null
                        expect(response.body.wind.gust).to.not.be.null

                        expect(response.body.clouds.all).to.not.be.null

                        expect(response.body.dt).to.not.be.null

                        expect(response.body.sys.type).to.not.be.null
                        expect(response.body.sys.id).to.not.be.null
                        expect(response.body.sys.country).to.equal(country)
                        expect(response.body.sys.sunrise).to.not.be.null
                        expect(response.body.sys.sunset).to.not.be.null

                        expect(response.body.timezone).to.not.be.null
                        expect(response.body.id).to.not.be.null
                        expect(response.body.name).to.equal(name)
                        expect(response.body.cod).to.not.be.null
                    })
                    
                })   
            })
    })

})