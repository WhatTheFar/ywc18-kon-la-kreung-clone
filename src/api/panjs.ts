import axios from 'axios';

export interface Category {
  name: string;
  subcategories: string[];
}

export interface Merchant {
  shopNameTH: string;
  categoryName: string;
  subcategoryName: string;
  coverImageId: string;
  facilities: string[];
  priceLevel: number;
  isOpen: string;
  highlightText: string;
  recommendedItems: string[];
  addressProvinceName: string;
  addressDistrictName: string;
}

export interface YWC18 {
  categories: Category[];
  provinces: string[];
  priceRange: string[];
  merchants: Merchant[];
}

export class PanJsAPI {
  public async getYWC18(): Promise<YWC18> {
    const resp = await axios.get('https://panjs.com/ywc18.json');
    return resp.data;
  }
}

