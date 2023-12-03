import { Request, Response } from 'express';
import LocationService from "../services/LocationService";
import ServiceType from "../types/ServiceType"
import ReturnResponse from '../traits/ReturnResponse';

class LocationController {
  private locationService: LocationService;

  constructor(locationService: LocationService) {
    this.locationService = locationService;
  }

  async getDataCountry(req: Request, res: Response): Promise<any> {
    try {
      const country: ServiceType = await this.locationService.dataCountry();
  
      let response;
      if (country.status) {
        response = ReturnResponse.success(country.response, country.data);
      } else {
        response = ReturnResponse.errorServer(country.data);
      }
      
      return res.status(response.response_code).json(response);
      
    } catch (error: any) {
      const response = ReturnResponse.errorServer( error.message)
      return res.status(response.response_code).json(response);
    }
  }

  async getDataState(req: Request, res: Response): Promise<any> {
    try {
      const states: ServiceType = await this.locationService.dataState();
  
      let response;
      if (states.status) {
        response = ReturnResponse.success(states.response, states.data);
      } else {
        response = ReturnResponse.errorServer(states.data);
      }
      
      return res.status(response.response_code).json(response);
      
    } catch (error: any) {
      const response = ReturnResponse.errorServer( error.message)
      return res.status(response.response_code).json(response);
    }
  }

  async getDataCity(req: Request, res: Response): Promise<any> {
    try {
      const cities: ServiceType = await this.locationService.dataCity();
  
      let response;
      if (cities.status) {
        response = ReturnResponse.success(cities.response, cities.data);
      } else {
        response = ReturnResponse.errorServer(cities.data);
      }
      
      return res.status(response.response_code).json(response);
      
    } catch (error: any) {
      const response = ReturnResponse.errorServer( error.message)
      return res.status(response.response_code).json(response);
    }
  }

  async getDataStateByCountryId(req: Request, res: Response): Promise<any> {
    const countryId: number = parseInt(req.params.countryId)

    try {
      const states: ServiceType = await this.locationService.dataStateByCountryId(countryId);
  
      let response;
      if (states.status) {
        response = ReturnResponse.success(states.response, states.data);
      } else {
        response = ReturnResponse.errorServer(states.data);
      }
      
      return res.status(response.response_code).json(response);
      
    } catch (error: any) {
      const response = ReturnResponse.errorServer( error.message)
      return res.status(response.response_code).json(response);
    }
  }

  async getDataCityByStateId(req: Request, res: Response): Promise<any> {
    const stateId: number = parseInt(req.params.stateId)

    try {
      
      const states: ServiceType = await this.locationService.dataCityByStateId(stateId);
  
      let response;
      if (states.status) {
        response = ReturnResponse.success(states.response, states.data);
      } else {
        response = ReturnResponse.errorServer(states.data);
      }
      
      return res.status(response.response_code).json(response);
      
    } catch (error: any) {
      const response = ReturnResponse.errorServer( error.message)
      return res.status(response.response_code).json(response);
    }
  }

  async dataTimezoneByCountryId(req: Request, res: Response): Promise<any> {
    const countryId: number = parseInt(req.params.countryId)

    try {
      const states: ServiceType = await this.locationService.dataTimezoneByCountryId(countryId);
  
      let response;
      if (states.status) {
        response = ReturnResponse.success(states.response, states.data);
      } else {
        response = ReturnResponse.errorServer(states.data);
      }
      
      return res.status(response.response_code).json(response);
      
    } catch (error: any) {
      const response = ReturnResponse.errorServer( error.message)
      return res.status(response.response_code).json(response);
    }
  }

}

export default LocationController;
