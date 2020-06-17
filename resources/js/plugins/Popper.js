// import Vue from 'vue'
import { createPopper } from '@popperjs/core';

// Vue.use(createPopper);
Vue.prototype.$createPopper = createPopper

export default createPopper;
