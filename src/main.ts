import { createApp } from 'vue';

import App from './App.vue';
import './index.css';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'

import { router } from '/@/router';

createApp(App).use(Antd).use(router).mount('#app');
