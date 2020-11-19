<template>
  <a
    href="https://search-merchant.xn--42caj4e6bk1f5b1j.com/shop/8769a75ff1f88cb78ec4bf826fb8b77c"
  >
    <div
      class="lg:flex"
      style="background-color: white; border: 1px solid rgb(201, 225, 233)"
    >
      <!-- TODO: handle undefined coverImageId -->
      <div
        id="coverImageId"
        class="w-full lg:max-w-xs"
        :style="{
          minHeight: '14rem',
          backgroundColor: 'rgb(236, 236, 236)',
          backgroundImage: `url(${coverImageId})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          borderRadius: '2px',
        }"
      ></div>
      <div class="p-4 flex-1">
        <!-- START: shopNameTH -->
        <div class="text-black text-xl font-semibold">
          <div class="flex justify-between">
            <div class="flex items-center">
              {{ shopNameTH }}
              <div v-if="isOpen" class="ml-4">
                <a-tag color="#1bc300"> เปิด </a-tag>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <!-- END: shopNameTH -->

        <!-- START: subcategory -->
        <div class="flex font-sm flex-wrap" style="color: rgb(153, 153, 153)">
          <div>{{ subcategoryName }}</div>
          <div class="mx-3">|</div>
          <div>{{ priceRangeText }}</div>
          <div class="mx-3">|</div>
          <div>{{ addressDistrictName }} {{ addressProvinceName }}</div>
        </div>
        <!-- END: subcategory -->

        <a-divider />

        <div class="flex font-base mb-2" style="color: rgb(153, 153, 153)">
          <span v-html="highlightText"></span>
        </div>
        <div
          class="flex font-base flex-wrap items-center mb-2"
          style="color: rgb(153, 153, 153)"
        >
          <div class="mr-2 font-medium" style="color: rgb(68, 68, 68)">สินค้าแนะนำ:</div>
          {{ recommendedItems.join(',') }}
        </div>
        <div class="flex font-base flex-wrap mb-4 mt-4" style="color: rgb(153, 153, 153)">
          <template v-for="faci in facilities" :key="faci">
            <ParkingIcon v-if="faci == 'ที่จอดรถ'" />
            <PetIcon v-if="faci == 'สามารถนำสัตว์เลี้ยงเข้าได้'" />
          </template>
        </div>
      </div></div
  ></a>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
import DOMPurify from 'dompurify';

import { Merchant } from '/@/domain/entity/merchant.entity';
import { SearchPageViewModel } from './SearchPage.viewmodel';

import ParkingIcon from './faci/ParkingIcon.vue';
import PetIcon from './faci/PetIcon.vue';

export default defineComponent({
  components: { ParkingIcon, PetIcon },
  props: {
    merchant: Merchant,
  },
  setup: (props) => {
    // TODO: fix no-setup-props-destructure
    // eslint-disable-next-line vue/no-setup-props-destructure
    const merchant = props.merchant;
    if (merchant != undefined) {
      const vm = SearchPageViewModel.getInstance();
      const priceRangeText = vm.priceRanges.value[merchant.priceLevel - 1][0];
      return {
        ...toRefs(merchant),
        priceRangeText,
        // override merchant's keys
        highlightText: ref(DOMPurify.sanitize(merchant.highlightText)),
      };
    }
    return {};
  },
});
</script>

<style scoped>
@media (min-width: 1024px) {
  #coverImageId {
    width: 250px !important;
    margin: 5px;
  }
}
</style>
