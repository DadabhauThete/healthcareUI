export interface MemberData {
  personal: {
    patientID: number;
    firstName: string;
    middleName: string;
    lastname: string;
    gender: string;
    dateOfBirth: string;
    age: number;
    email: string;
    contactNo: string;
  };
  address: {
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
  };
  benfitPlanList: {
    data: [
      {
        patientInsuranceId: number;
        companyName: string;
        planName: string;
        insuranceType: string;
        term: number;
        isActive: number;
        startDate: string;
        endDate: string;
      }
    ];
  };
}
