declare module '*.vue' {
  // eslint-disable-next-line import/named
  import { DefineComponent } from 'vue';
  const component: DefineComponent<object, object, unknown>;
  export default component;
}
