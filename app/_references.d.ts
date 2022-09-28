declare const assert: Chai.AssertStatic;
declare const sinonSandbox: sinon.SinonSandbox;
declare const sin: sinon.SinonStatic;


// For tests, remove from globals ASAP.
declare const angular: any;
declare const $controller: any;
declare const $compile: ng.ICompileService;
declare const $urlMatcherFactory: any;
declare const $state: any;
declare const $rootScope: any;
declare const sinonSandbox: any;
declare const $timeout: any;
declare const $templateCache: any;
declare const $translate: any;
declare const $mdDialog: any;
declare const $filter: any;
declare const $httpBackend: ng.IHttpBackendService;
declare const $window: any;
declare const expect: Chai.ExpectStatic;

interface Window {
  sinonSandbox: sinon.SinonSandbox;
  $: JQueryStatic;
  FormData: any;
  _walkmeConfig: any;
  walkme_vars: {
    users: Array<{
      id: string | number;
      firstname: string;
      lastname: string;
      email: string;
      client: Array<{
        customerId: string | number;
        customername: string;
        clientId: string | number;
      }>;
    }>;
  };
  embedded_svc: any;
  fakeGrid: any;
}

interface Injector {
  get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T): T;
}

interface JQuery {
  tooltip: any;
  removeResize: (handler: Function) => void;
  context: any;
  modal: any;
  daterangepicker: (options: any, callback: Function) => void;
}

interface Document {
  selection: any;
}
