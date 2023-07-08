require('./bootstrap');

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import toastr from 'toastr';
window.toastr = toastr;

require('./ajax');