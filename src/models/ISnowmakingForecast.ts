interface ISnowmakingForecast {
  id: string | null;
  scenario: string;
  power: number;
  from: string;
  to: string;
}

export default ISnowmakingForecast;
