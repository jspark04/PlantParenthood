export class DeviceModel {

  constructor(
    public DeviceID: number,
    public CareInfoID: number,
    public DeviceName: string,
    public DeviceType: string,
    public CreatedDate: Date,
    public BatteryLevel: number
  ) {}


}
