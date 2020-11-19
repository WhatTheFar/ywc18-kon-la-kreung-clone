import { computed, ref, Ref, ComputedRef } from 'vue';
import { Merchant } from '../domain/entity/merchant.entity';
import { PriceRange } from '../domain/usecase/search/price';

export class SearchPageViewModel {
  private static instance?: SearchPageViewModel;
  public static getInstance(): SearchPageViewModel {
    if (this.instance == undefined) {
      this.instance = new SearchPageViewModel();
    }
    return this.instance;
  }

  public readonly searchTopic = computed(() => {
    if (this.selectedCategory.value == 'ALL') {
      return 'ทั้งหมด';
    } else if (this.selectedSubcategory.value == 'ALL') {
      return `${this.selectedCategory.value} ทั้งหมด`;
    } else {
      return `${this.selectedCategory.value} ${this.selectedSubcategory.value}`;
    }
  });

  public readonly categories: Ref<string[]> = ref([]);
  public readonly selectedCategory: Ref<string> = ref('ALL');

  public readonly subcategories: Ref<string[]> = ref([]);
  public readonly selectedSubcategory: Ref<string> = ref('ALL');
  public readonly showSubcategories = computed(() => {
    switch (this.selectedCategory.value) {
      case undefined:
      case 'ALL':
        return false;
      default:
        return true;
    }
  });

  public readonly provinces: Ref<string[]> = ref([]);
  public readonly selectedLocation: Ref<string> = ref('ALL');

  public readonly priceRanges: Ref<Array<[string, PriceRange]>> = ref([]);
  public readonly priceRangeSelected: Ref<number | 'ALL'> = ref('ALL');
  public readonly minPrice: Ref<number | undefined> = ref();
  public readonly maxPrice: Ref<number | undefined> = ref();
  public readonly showPriceRangeSelector = computed(() => {
    return this.selectedCategory.value == 'ร้านอาหารและเครื่องดื่ม';
  });

  public readonly merchants: Ref<Merchant[]> = ref([]);
  public readonly loadingMerchants: Ref<boolean> = ref(true);
  public readonly showMerchants = computed(() => {
    return this.merchants.value != undefined && this.merchants.value.length > 0;
  });
}
