import { PanJsAPI, YWC18 } from '../api/panjs';
import { Merchant } from '../domain/entity/merchant.entity';
import {
  MerchantFilter,
  SearchGateway,
} from '../domain/usecase/search/search.interactor';

export class SearchDataGateway implements SearchGateway {
  private ywc18?: Promise<YWC18>;

  constructor(private readonly panJsApi: PanJsAPI) {}

  private async getYWC18(): Promise<YWC18> {
    if (this.ywc18 == undefined) {
      this.ywc18 = this.panJsApi.getYWC18();
    }
    return this.ywc18;
  }

  public async getCategories(): Promise<string[]> {
    const ywc18 = await this.getYWC18();
    return ywc18.categories.map((e) => e.name);
  }

  public async getSubCategories(category: string): Promise<string[]> {
    const ywc18 = await this.getYWC18();
    const categoryData = ywc18.categories.find((e) => e.name == category);
    if (categoryData == undefined) {
      return [];
    }
    return categoryData.subcategories;
  }

  public async getProvinces(): Promise<string[]> {
    const ywc18 = await this.getYWC18();
    return ywc18.provinces;
  }

  public async getPriceRangeTexts(): Promise<string[]> {
    const ywc18 = await this.getYWC18();
    return ywc18.priceRange;
  }

  private async subcategoryFilterFor(
    category: string | undefined,
    subcategory: string | undefined
  ): Promise<string[] | undefined> {
    if (category != undefined && subcategory == undefined) {
      return await this.getSubCategories(category);
    }
    return subcategory ? [subcategory] : undefined;
  }

  public async getMerchants(filter: MerchantFilter): Promise<Merchant[]> {
    const ywc18 = await this.getYWC18();
    const allMerchantsData = ywc18.merchants;

    const { category, subcategory, province, priceLevels } = filter;
    const subcategories = await this.subcategoryFilterFor(category, subcategory);

    return allMerchantsData
      .filter((m) => {
        if (subcategories != undefined && !subcategories.includes(m.subcategoryName)) {
          return false;
        }
        if (province != undefined && m.addressProvinceName != province) {
          return false;
        }
        if (priceLevels != undefined && priceLevels?.length != 0) {
          if (!priceLevels.includes(m.priceLevel)) {
            return false;
          }
        }
        return true;
      })
      .map((m) => {
        return new Merchant(
          m.shopNameTH,
          m.categoryName,
          m.subcategoryName,
          m.coverImageId,
          m.facilities,
          m.priceLevel,
          // TODO: extracts into testable func
          [m.isOpen].map((e) => {
            switch (e) {
              case 'Y':
                return true;
              case 'N':
              case 'N/A':
              default:
                return false;
            }
          })[0],
          m.highlightText,
          m.recommendedItems,
          m.addressProvinceName,
          m.addressDistrictName
        );
      });
  }
}
