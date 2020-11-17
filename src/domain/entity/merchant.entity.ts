export class Merchant {
  constructor(
    public shopNameTH: string,
    public categoryName: string,
    public subcategoryName: string,
    public coverImageId: string,
    public facilities: string[],
    public priceLevel: number,
    public isOpen: boolean | undefined,
    public highlightText: string,
    public recommendedItems: string[],
    public addressProvinceName: string,
    public addressDistrictName: string
  ) {}
}
