import { Merchant } from '../../entity/merchant.entity';
import { priceLevelFor, PriceRange, priceRangeFor } from './price';

export interface MerchantFilter {
  category?: string;
  subcategory?: string;
  province?: string;
  priceLevels?: number[];
}

export interface SearchGateway {
  getCategories(): Promise<string[]>;
  getSubCategories(category: string): Promise<string[]>;
  getPriceRangeTexts(): Promise<string[]>;
  getMerchants(filter: MerchantFilter): Promise<Merchant[]>;
}

export interface SearchOutput {
  setCategories(cat: string[]): void;
  setSubcategories(sub: string[]): void;
  setPriceRangeTexts(priceRage: Array<[string, PriceRange]>): void;
  setSearchedMerchants(merchants: Merchant[]): void;
}

export interface SearchFilter {
  category: string;
  subcategory?: string;
  province?: string | 'NEAR_ME';
  priceRange?: PriceRange;
}

export class SearchInteractor {
  private priceLevelRanges: PriceRange[] | undefined;

  constructor(
    private readonly searchGateway: SearchGateway,
    private readonly output: SearchOutput
  ) {}

  public async loadCategories(): Promise<void> {
    const categories = await this.searchGateway.getCategories();
    this.output.setCategories(categories);
  }

  public async loadSubcetegories(category: string): Promise<void> {
    const subcategories = await this.searchGateway.getSubCategories(category);
    this.output.setSubcategories(subcategories);
  }

  public async loadPriceRanges(): Promise<void> {
    const priceRangeTexts = await this.searchGateway.getPriceRangeTexts();
    const priceLevelRanges = priceRangeTexts.map(priceRangeFor) as PriceRange[];
    const pair = zip(priceRangeTexts, priceLevelRanges);
    this.output.setPriceRangeTexts(pair);
    this.priceLevelRanges = priceLevelRanges;
  }

  private async priceLevelFilterFor(
    priceRange?: PriceRange
  ): Promise<number[] | undefined> {
    if (priceRange == undefined) {
      return undefined;
    }
    if (this.priceLevelRanges == undefined) {
      await this.loadPriceRanges();
      if (this.priceLevelRanges == undefined) {
        // this should not occur, since loadPriceRanges() should work.
        throw new Error("Can't load price range from data source");
      }
    }
    return priceLevelFor(priceRange, this.priceLevelRanges);
  }

  public async search(filter: SearchFilter): Promise<void> {
    const merchantFilter: MerchantFilter = {
      category: filter.category,
      subcategory: filter.subcategory,
      // TODO: handle 'NEAR_ME' option in province
      province: filter.province,
      priceLevels: await this.priceLevelFilterFor(filter.priceRange),
    };
    const merchants = await this.searchGateway.getMerchants(merchantFilter);
    this.output.setSearchedMerchants(merchants);
  }
}

function zip<T, U>(a: Array<T>, b: Array<U>): Array<[T, U]> {
  return a.map(function (e, i) {
    return [e, b[i]];
  });
}
