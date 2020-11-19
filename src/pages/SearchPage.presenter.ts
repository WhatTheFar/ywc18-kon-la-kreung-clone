import { SearchPageViewModel } from './SearchPage.viewmodel';
import { Merchant } from '/@/domain/entity/merchant.entity';
import { PriceRange } from '/@/domain/usecase/search/price';
import { SearchOutput } from '/@/domain/usecase/search/search.interactor';

export class SearchPagePresenter implements SearchOutput {
  constructor(private readonly vm: SearchPageViewModel) {}

  public setCategories(categories: string[]): void {
    this.vm.categories.value = categories;
  }

  public setSubcategories(subcategories: string[]): void {
    this.vm.subcategories.value = subcategories;
  }

  public setProvinces(provinces: string[]): void {
    this.vm.provinces.value = provinces.sort();
  }

  public setPriceRangeTexts(priceRages: [string, PriceRange][]): void {
    this.vm.priceRanges.value = priceRages;
  }

  public setSearchedMerchants(merchants: Merchant[]): void {
    this.vm.merchants.value = merchants;
  }

  public setMerchantLoading(loading: boolean): void {
    this.vm.loadingMerchants.value = loading;
  }
}
