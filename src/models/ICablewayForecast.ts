interface ICablewayForecast {
  id: string | null;
  scenario: string;
  power: number;
  fromDate: string;
  toDate: string;
  fromTime: string;
  toTime: string;
}

export default ICablewayForecast;
