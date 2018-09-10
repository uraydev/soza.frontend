import Vue from 'vue'
import CapitalizeFilter from '../filters/capitalize'
import UppercaseFilter from '../filters/uppercase'
import LowercaseFilter from '../filters/lowercase'
import DateFilter from '../filters/date'
import TimeFilter from '../filters/time'
import RoundFilter from '../filters/round'
import RenderFilter from '../filters/render'
import PointFilter from '../filters/point'
import NumberFilter from '../filters/number'
import FirstFilter from '../filters/first'
import LastFilter from '../filters/last'

// filters
Vue.filter('capitalize', CapitalizeFilter)
Vue.filter('uppercase', UppercaseFilter)
Vue.filter('lowercase', LowercaseFilter)
Vue.filter('date', DateFilter)
Vue.filter('time', TimeFilter)
Vue.filter('round', RoundFilter)
Vue.filter('render', RenderFilter)
Vue.filter('point', PointFilter)
Vue.filter('number', NumberFilter)
Vue.filter('first', FirstFilter)
Vue.filter('last', LastFilter)
