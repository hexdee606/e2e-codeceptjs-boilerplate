/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type page = typeof import('./src/pages/*_page.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, page: page }
  interface Methods extends Playwright, REST, GraphQL, FileSystem {}
  interface I extends ReturnType<steps_file>, WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
