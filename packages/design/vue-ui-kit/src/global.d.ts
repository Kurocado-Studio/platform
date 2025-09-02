/* eslint import/named: "off" */

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<object, object, unknown>;
  export default component;
}
