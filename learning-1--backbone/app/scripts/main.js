import "babel-polyfill"

import currentPlanet from './current-planet/controller.js'
import planetsList from './planets-list/controller.js'

if (NODE_ENV == "dev") {
	console.log('NODE_ENV', NODE_ENV)
}

// экспорт в глобальную область видимости
// exports.test = test;
