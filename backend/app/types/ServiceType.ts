interface ServiceType {
    status: boolean;
    response: string;
    data?: any[] | object;
    message?: string | null;
    errors?: any[] |string | null;
}
  
export default ServiceType;
  