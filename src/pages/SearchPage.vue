<template>
  <div>
    <div
      style="
        min-height: 100vh;
        background-image: url('@/images/result-bg.png');
        background-position: center center;
        background-size: cover;
        background-attachment: fixed;
      "
    >
      <div class="bg-white">
        <div class="relative bg-white z-20">
          <div
            class="flex justify-between items-center bg-white"
            style="max-width: 1280px; margin: 0 auto"
          >
            <div
              class="px-4 md:px-8 px-4 md:px-8"
              style="height: 60px; padding-top: 10px; padding-bottom: 10px"
            >
              <a href="/">
                <img
                  style="height: 40px; width: auto"
                  src="@/images/halfhalf-logo.png"
                  class="hidden md:block"
                />
                <img
                  style="height: 40px; width: auto"
                  src="@/images/halfhalf-logo-mini.png"
                  class="block md:hidden"
                />
              </a>
            </div>
            <div
              class="flex h-full ml-auto h-auto above-the-fold-input items-center rounded-lg overflow-hidden mr-4 md:mr-8"
              style="flex: 1; box-shadow: 0px 0px 1px black"
            >
              <div class="w-full sm:w-48 h-10 md:mt-0 hidden md:block">
                <a-select
                  ref="select"
                  v-model:value="selectedLocation"
                  class="w-full sm:w-48 h-10 h-10 md:h-10 text-sm"
                  style="border-radius: 0px; border: 0px"
                  :bordered="false"
                  @change="onLocationSelected"
                >
                  <a-select-option value="NEAR_ME">
                    <NearMeSelectOption />
                  </a-select-option>
                  <a-select-option value="ALL">
                    <AllLocationsSelectOption />
                  </a-select-option>
                  <a-select-option
                    v-for="province in provinces"
                    :key="province"
                    :value="province"
                  >
                    {{ province }}
                  </a-select-option>
                </a-select>
              </div>
              <div class="w-full sm:w-84 flex-1 h-10 md:border-l">
                <a-select
                  class="w-full md:mt-0 h-full text-sm md:text-sm border-0 flex items-center"
                  placeholder="ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป"
                  show-search
                  option-filter-prop="children"
                  :show-arrow="true"
                  :bordered="false"
                  @change="onSearchSelected"
                >
                  <!-- TODO: add suffixIcon -->
                  <!-- TODO: add select option's prefix icon -->
                  <a-select-option
                    v-for="category in categories"
                    :key="category"
                    :value="category"
                  >
                    {{ category }}
                  </a-select-option>
                </a-select>
              </div>
            </div>
            <img
              class="md:hidden mr-4 cursor-pointer"
              style="height: 20px; width: auto"
              src="@/images/filter.png"
            />
          </div>
          <div style="background-color: rgb(39, 57, 124)">
            <div
              class="flex justify-start px-4 md:px-8 py-3 z-10 overflow-x-auto"
              style="max-width: 1280px; margin: 0 auto"
            >
              <div class="text-white whitespace-no-wrap font-bold underline">
                <a href="/">หน้าแรก</a>
              </div>
              <div class="text-gray-300 mx-3">/</div>
              <div class="text-white whitespace-no-wrap pr-8">
                <div class="font-semibold">ค้นหา</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End top bar -->
      <div style="max-width: 1600px" class="w-full mx-auto relative">
        <div class="px-4 py-4 md:px-4 md:py-4">
          <div class="flex justify-between items-center mb-8">
            <div
              style="letter-spacing: -0.02em"
              class="break-word text-xl font-sans font-semibold mb-4"
            >
              ผลการค้นหา __CATEGORY__, __SEARCH_STRING__ ทั้งหมด
            </div>
          </div>
          <div class="flex items-start">
            <div
              class="hidden fixed md:relative md:mr-8 md:block border border-gray-500 rounded-sm"
              style="width: 22rem"
            >
              <div class="bg-white p-4">
                <div>
                  <div
                    style="letter-spacing: -0.02em"
                    class="mt-8 first:mt-0 break-word text-base font-sans font-semibold text-black"
                  >
                    ประเภทร้านค้า
                  </div>
                  <div class="mt-4 first:mt-0">
                    <a-radio-group
                      v-model:value="selectedCategory"
                      @change="onCategorySelected"
                    >
                      <a-radio :style="radioStyle" value="ALL">ทั้งหมด</a-radio>
                      <a-radio
                        v-for="category in categories"
                        :key="category"
                        :value="category"
                        :style="radioStyle"
                      >
                        {{ category }}
                      </a-radio>
                    </a-radio-group>
                  </div>
                  <div
                    style="letter-spacing: -0.02em"
                    class="mt-8 first:mt-0 break-word text-base font-sans font-semibold text-black"
                  >
                    จังหวัด/ใกล้ฉัน
                  </div>
                  <a-select
                    ref="select"
                    v-model:value="selectedLocation"
                    class="w-full mt-2"
                    @change="onLocationSelected"
                  >
                    <a-select-option value="NEAR_ME">
                      <NearMeSelectOption />
                    </a-select-option>
                    <a-select-option value="ALL">
                      <AllLocationsSelectOption />
                    </a-select-option>
                    <a-select-option
                      v-for="province in provinces"
                      :key="province"
                      :value="province"
                    >
                      {{ province }}
                    </a-select-option>
                  </a-select>
                  <template v-if="showPriceRangeSelector">
                    <div
                      class="mt-8 first:mt-0 break-word text-base font-sans font-semibold text-black"
                      style="letter-spacing: -0.02em"
                    >
                      ราคา
                    </div>
                    <a-select
                      ref="select"
                      v-model:value="priceRangeSelected"
                      class="w-full mt-2"
                      @change="onPriceLevelSelected"
                    >
                      <a-select-option value="ALL"> ทั้งหมด </a-select-option>
                      <a-select-option
                        v-for="(priceRange, index) in priceRanges"
                        :key="priceRange[0]"
                        :value="index"
                      >
                        {{ priceRange[0] }}
                      </a-select-option>
                    </a-select>
                  </template>
                  <template v-if="!showPriceRangeSelector">
                    <div
                      class="mt-8 first:mt-0 break-word text-base font-sans font-semibold text-black"
                      style="letter-spacing: -0.02em"
                    >
                      ช่วงราคาสินค้า (บาท)
                    </div>
                    <div class="w-full mt-2">
                      <div class="w-full flex">
                        <a-input-number
                          v-model:value="minPrice"
                          class="flex-1"
                          :min="0"
                          placeholder="ราคาต่ำสุด"
                        />
                        <div class="mx-2" style="border-right: 0px; padding-top: 4px">
                          -
                        </div>
                        <a-input-number
                          v-model:value="maxPrice"
                          class="flex-1"
                          :min="minPrice"
                          placeholder="ราคาสูงสุด"
                        />
                      </div>
                      <a-button
                        class="w-full mt-2"
                        type="primary"
                        ghost
                        @click="onPriceRangeClick"
                      >
                        ตกลง
                      </a-button>
                    </div>
                  </template>
                  <div v-if="showSubcategories" class="mt-8 first:mt-0">
                    <div
                      class="break-word text-base font-sans font-semibold text-black"
                      style="letter-spacing: -0.02em"
                    >
                      ประเภท{{ selectedCategory }}
                    </div>
                    <div class="mt-4 first:mt-0">
                      <a-radio-group
                        v-model:value="selectedSubcategory"
                        @change="onSubcategorySelected"
                      >
                        <a-radio :style="radioStyle" value="ALL">ทั้งหมด</a-radio>
                        <a-radio
                          v-for="subcategory in subcategories"
                          :key="subcategory"
                          :value="subcategory"
                          :style="radioStyle"
                        >
                          {{ subcategory }}
                        </a-radio>
                      </a-radio-group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-1">
              <template v-if="showMerchants">
                <div class="grid grid-cols-1 gap-2">
                  <Merchant
                    v-for="merchant in merchants"
                    :key="merchant.shopNameTH"
                    :merchant="merchant"
                  />
                </div>
              </template>
              <div class="flex justify-center">
                <a-button
                  class="mt-10 w-full max-w-sm block"
                  style="height: 50px; border-radius: 5px"
                >
                  <span>ดูเพิ่มเติม</span>
                </a-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';

import { PanJsAPI } from '/@/api/panjs';
import { SearchDataGateway } from '/@/gateway/search.gateway';
import { SearchInteractor } from '/@/domain/usecase/search/search.interactor';
import { SearchPageViewModel } from './SearchPage.viewmodel';
import { SearchPagePresenter } from './SearchPage.presenter';

import NearMeSelectOption from './select/NearMeSelectOption.vue';
import AllLocationsSelectOption from './select/AllLocationsSelectOption.vue';

import Merchant from './Merchant.vue';

export default defineComponent({
  components: { NearMeSelectOption, AllLocationsSelectOption, Merchant },
  setup: () => {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    const vm = SearchPageViewModel.getInstance();
    const presenter = new SearchPagePresenter(vm);
    const panJsApi = new PanJsAPI();
    const gateway = new SearchDataGateway(panJsApi);
    const interactor = new SearchInteractor(gateway, presenter);

    const searchMerchants = async () => {
      const sanitizeFilter = (text: string) => {
        return text == 'ALL' ? undefined : text;
      };
      await interactor.search({
        category: sanitizeFilter(vm.selectedCategory.value),
        subcategory: sanitizeFilter(vm.selectedSubcategory.value),
        province: sanitizeFilter(vm.selectedLocation.value),
        priceRange: [vm.minPrice.value || 0, vm.maxPrice.value],
      });
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onPriceRangeClick = async (e: MouseEvent) => {
      await searchMerchants();
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onPriceLevelSelected = async (e: Event) => {
      // TODO: extract logic to SearchInteractor
      if (vm.priceRangeSelected.value == 'ALL') {
        vm.minPrice.value = undefined;
        vm.minPrice.value = undefined;
      } else {
        const level = vm.priceRangeSelected.value;
        vm.minPrice.value = vm.priceRanges.value[level][1][0];
        vm.maxPrice.value = vm.priceRanges.value[level][1][1];
      }
      await searchMerchants();
    };

    const onCategorySelected = async (e: Event) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value = (e.target as any).value;
      vm.selectedSubcategory.value = 'ALL';
      await interactor.loadSubcategories(value);
      await searchMerchants();
    };

    const onSearchSelected = async (value: string) => {
      // TODO: extract logic to SearchInteractor
      vm.selectedCategory.value = value;
      await interactor.loadSubcategories(value);
      await searchMerchants();
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubcategorySelected = async (e: Event) => {
      await searchMerchants();
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onLocationSelected = async (e: Event) => {
      await searchMerchants();
    };

    interactor.loadCategories();
    interactor.loadProvinces();
    interactor.loadPriceRanges();
    searchMerchants();

    return {
      // CSS
      radioStyle,

      // ViewModel
      ...vm,

      // Controller
      onPriceRangeClick,
      onCategorySelected,
      onSearchSelected,
      onSubcategorySelected,
      onLocationSelected,
    };
  },
});
</script>
