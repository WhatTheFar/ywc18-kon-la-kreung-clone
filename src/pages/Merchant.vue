<template>
  <a
    href="https://search-merchant.xn--42caj4e6bk1f5b1j.com/shop/8769a75ff1f88cb78ec4bf826fb8b77c"
  >
    <div
      class="lg:flex"
      style="background-color: white; border: 1px solid rgb(201, 225, 233)"
    >
      <!-- TODO: coverImageId -->
      <div
        class="w-full lg:max-w-xs"
        src="https://search-merchant.xn--42caj4e6bk1f5b1j.com/img/upload/395acd16-d5f0-45d5-8ec4-c7d7f6e141bc/medium"
        style="
          min-height: 14rem;
          background-color: rgb(236, 236, 236);
          background-image: url(https://search-merchant.xn--42caj4e6bk1f5b1j.com/img/upload/395acd16-d5f0-45d5-8ec4-c7d7f6e141bc/medium);
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
          border-radius: 2px;
        "
      ></div>
      <div class="p-4 flex-1">
        <!-- START: shopNameTH -->
        <div class="text-black text-xl font-semibold">
          <div class="flex justify-between">
            <div class="flex items-center">
              <!-- TODO: shopNameTH -->
              ร้านคุณแหม่มของฝากประจวบ
              <!-- TODO: toggle if isOpen -->
              <div class="ml-4">
                <a-tag color="#1bc300"> เปิด </a-tag>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <!-- END: shopNameTH -->

        <!-- START: subcategory -->
        <div class="flex font-sm flex-wrap" style="color: rgb(153, 153, 153)">
          <!-- TODO: subcategoryName -->
          <div>ผลิตภัณฑ์ของใช้/ของตกแต่ง/ของที่ระลึก</div>
          <div class="mx-3">|</div>
          <!-- TODO: priceLevel -->
          <div>ช่วงราคา 25 - 500 บาท</div>
          <div class="mx-3">|</div>
          <!-- TODO: addressDistrictName addressProvinceName -->
          <div>เมืองประจวบคีรีขันธ์ ประจวบคีรีขันธ์</div>
        </div>
        <!-- END: subcategory -->

        <!-- START: divider -->
        <div
          style="
            width: 65%;
            height: 1px;
            background-color: rgb(238, 238, 238);
            margin: 18px 0px;
          "
        />
        <!-- END: divider -->

        <div class="flex font-base mb-2" style="color: rgb(153, 153, 153)">
          <!-- TODO: highlightText -->
          ชีสเชค ระพีพัฒน์ แครกเกอร์ จักรพรรดิ และบิสกิตรสชาติต่างๆ
          ไส้แยมสับประรดสูตรไม่เพิ่มน้ำตาล ภายใต้การผลิตโดย ร้านคุณแหม่ม และสินค้าต่างๆ
          ที่มีให้เลือก ที่เน้นเพื่อสุขภาพ ไม่เพิ่มน้ำตาล ไม่หวาน มีแต่กลมกล่อม
        </div>
        <div
          class="flex font-base flex-wrap items-center mb-2"
          style="color: rgb(153, 153, 153)"
        >
          <!-- TODO: recommendedItems -->
          <div class="mr-2 font-medium" style="color: rgb(68, 68, 68)">สินค้าแนะนำ:</div>
          <div class="mr-1">ชีสเชคระพีพัฒน์,</div>
          <div class="mr-1">แครกเกอร์จักรพรรดิ,</div>
          <div class="mr-1">สับประรดกวนไม่มีน้ำตาล</div>
        </div>
        <div class="flex font-base flex-wrap mb-4 mt-4" style="color: rgb(153, 153, 153)">
          <ParkingIcon />
        </div>
      </div></div
  ></a>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

import { Merchant } from '/@/domain/entity/merchant.entity';

import ParkingIcon from './faci/ParkingIcon.vue';
import PetIcon from './faci/PetIcon.vue';

export default defineComponent<{ merchant: Merchant }>({
  components: { ParkingIcon, PetIcon },
});
</script>
