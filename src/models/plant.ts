/**
 * Created by John on 5/1/2017.
 */
export class PlantModel {

  constructor(
    public CareInfoID: number,
    public PlantName: string,
    public SoilMoisture: number,
    public Light: number,
    public Temperature: number,
    public Humidity: number,
    public Owned: boolean,
    public Current: boolean,
    public ImageURL: string
  ) {}


}
