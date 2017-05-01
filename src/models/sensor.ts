/**
 * Created by John on 5/1/2017.
 */
export class SensorModel {

  constructor(
    public SensorDataID: number,
    public CareInfoID: number,
    public CreatedDate: string,
    public SoilMoisture: number,
    public Light: number,
    public Temperature: number,
    public Humidity: number,
  ) {}


}
