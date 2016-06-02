export class MainController {
  constructor (toastr) {
    'ngInject';

    this.toastr = toastr;
  }

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }
}
