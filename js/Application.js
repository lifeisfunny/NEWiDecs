var app = angular.module('angularApplication', ['angular.panels','GetTopic','ngMaterial']);
//Panel list
app.config(['panelsProvider', function (panelsProvider) {
    panelsProvider
        .add({
            id: 'test01',
            menuType: 'fullSetting',
            templateUrl: 'resources/iDecsSetting/setting.html',
            topic: '/thisDevice0',
            icon:'resources/iDecsSetting/setting.svg'
        })
        .add({
            id: 'test02',
            menuType: 'fullSetting',
            templateUrl: 'resources/pluginApp/SecurityPlugin/security.html',
            topic: '/thisDevice1',
            icon:'resources/pluginApp/SecurityPlugin/security.svg'
        })
        .add({
            id: 'test03',
            menuType: 'miniSetting',
            size: '315px',
            templateUrl: 'resources/pluginApp/something/something.html',
            topic: '/thisDevice2',
            icon:'resources/pluginApp/something/light1.svg'
        })
        .add({
            id: 'test04',
            menuType: 'miniSetting',
            templateUrl: 'resources/pluginApp/something2/something2.html',
            topic: '/thisDevice3',
            icon:'resources/pluginApp/something2/light2.svg'
        })
        .add({
            id: 'test05',
            menuType: 'fullSetting',
            templateUrl: 'resources/pluginApp/thermostat/thermostat.html',
            topic: '/thisDevice4',
            icon:'resources/pluginApp/thermostat/thermostat.svg'
        })
}]);

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('orange', {
            'default': '400', // by default use shade 400 from the pink palette for primary intentions
            'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
            'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
            'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
        })
        // If you specify less than all of the keys, it will inherit from the
        // default shades
        .accentPalette('red', {
            'default': '200' // use shade 200 for default, and keep all other shades the same
        });
    });
