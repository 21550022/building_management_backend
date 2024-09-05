export class CreateBuildingLocationDto {
  locationName: string;
  locationNumber: string;
  area: number;
  parentLocationId?: number;
  buildingId: number;
}
