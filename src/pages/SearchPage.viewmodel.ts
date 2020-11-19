import { computed, ref, Ref, ComputedRef } from 'vue';
import { Merchant } from '../domain/entity/merchant.entity';
import { PriceRange } from '../domain/usecase/search/price';

export class SearchPageViewModel {
  public readonly categories: Ref<string[]> = ref([]);
  public readonly selectedCategory: Ref<string> = ref('ALL');

  public readonly subcategories: Ref<string[]> = ref([]);
  public readonly selectedSubcategory: Ref<string> = ref('ALL');
  public readonly showSubcategories = computed(() => {
    return this.subcategories.value != undefined && this.subcategories.value.length > 0;
  });

  public readonly priceRanges: Ref<Array<[string, PriceRange]>> = ref([]);
  public readonly minPrice: Ref<number | undefined> = ref();
  public readonly mixPrice: Ref<number | undefined> = ref();

  public readonly merchants: Ref<Merchant[]> = ref([]);
  public readonly showMerchants = computed(() => {
    return this.merchants.value != undefined && this.merchants.value.length > 0;
  });
}
