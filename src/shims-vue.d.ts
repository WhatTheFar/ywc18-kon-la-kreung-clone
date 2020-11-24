declare module '*.vue' {
  import Vue from 'vue';
  const component: Vue.Component;
  export default component;
}

declare module '*.png' {
  const path: string;
  export default path;
}
