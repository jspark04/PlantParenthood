/**
 * Created by John on 5/1/2017.
 */
export class SensorModel {

  constructor(
    public SensorDataID: number,
    public CareInfoID: number,
    public CreatedDate: Date,
    public SoilMoisture: number,
    public Light: number,
    public Temperature: number,
    public Humidity: number,
    public LightSumDay: number,
    public SoilMoistureCondition: number,
    public LightCondition: number,
    public TemperatureCondition: number,
    public HumidityCondition: number,
    public LightSumDayCondition: number
  ) {}


}
