import arrows from './arrows.js'
import watcher from './watcher.js'
import step from './step.js'
import {col, colView} from './collection.js'


step.init(col).make();
arrows.init(col);
watcher.init(col);
