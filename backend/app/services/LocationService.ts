import LocationInterface from "../repository/LocationRepository/LocationInterface";
import ServiceType from "../types/ServiceType";

class LocationService {
  constructor(private locationRepository: LocationInterface) {}

  async dataCountry(): Promise<ServiceType> {
    const countries = await this.locationRepository.dataCountry(null);

    const returnData: ServiceType = {
      status: true,
      response: "get",
      data: countries,
    };

    return returnData;
  }

  async dataState(): Promise<ServiceType> {
    const states = await this.locationRepository.dataState(null);

    const returnData: ServiceType = {
      status: true,
      response: "get",
      data: states,
    };

    return returnData;
  }

  async dataCity(): Promise<ServiceType> {
    const cities = await this.locationRepository.dataCity(null);

    const returnData: ServiceType = {
      status: true,
      response: "get",
      data: cities,
    };

    return returnData;
  }

  async dataStateByCountryId(countryId: number): Promise<ServiceType> {
    const states = await this.locationRepository.dataStateByCountryId(countryId);

    const returnData: ServiceType = {
      status: true,
      response: "get",
      data: states,
    };

    return returnData;
  }

  async dataCityByStateId(stateId: number): Promise<ServiceType> {
    const states = await this.locationRepository.dataCityByStateId(stateId);

    const returnData: ServiceType = {
      status: true,
      response: "get",
      data: states,
    };

    return returnData;
  }

  async dataTimezoneByCountryId(countryId: number): Promise<ServiceType> {
    const country = await this.locationRepository.detailCountry(countryId);

    const returnData: ServiceType = {
      status: true,
      response: "get",
      data: JSON.parse(country.timezones),
    };

    return returnData;
  }

}

export default LocationService;
