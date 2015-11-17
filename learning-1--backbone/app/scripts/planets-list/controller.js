import $ from 'jQuery'
import Backbone from 'Backbone'
import arrows from './arrows.js'
import step from './step.js'
import {col, colView} from './collection.js'


step.init(col, arrows).make();
arrows.init(col, step.make.bind(step), step.stop.bind(step));
