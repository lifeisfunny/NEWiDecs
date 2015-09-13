

(function ( angular ) {

	var module = angular.module( "angular.panels", [] );

	module.constant("panelList", {});
	module.provider("panels", ["panelList", function (panelList) {

		//add panels in configs
		this.add = function (panel) {

			//add panel
			if (panel && panel.id ) {
				panelList[panel.id] = panel;
			}
			//for chaining
			return this;
		};

		//factory
		this.$get = ['$parse', function ($parse) {
			//document body selector
			var documentBody = angular.element(document.body);
			
			//panels factory
			var panelsFactory = {
				//current opened panel's id
				opened: undefined,


				//panel open method
				open: function (id) {
					//add body overflow hiden attribute
					documentBody.addClass('overflow-hidden');
					//close other panels
					panelsFactory.opened && panelsFactory.close(panelsFactory.opened);

					//check panel
					if (id && panelList[id]) {
						var panel = panelList[id];
						var panelElement = panel.element;
						var panelScope = panelElement.scope();


						//set panel style
						panelElement.attr('style', panelsFactory.style(panel, true));
					}

					//open panel
					panelsFactory.opened = id;
				},

				//panel close method
				close: function () {
					//remove body overflow hiden attribute
					documentBody.removeClass('overflow-hidden');
					
					//check opened panel
					if (panelsFactory.opened && panelList[panelsFactory.opened]) {
						var panel = panelList[panelsFactory.opened];
						var panelElement = panel.element;
						var panelScope = panelElement.scope();


						//remove panel style
						panelElement.attr('style', panelsFactory.style(panel, false));

					}

					//close panel
					panelsFactory.opened = undefined;
				},

				//panel style
				style: function (panel, open) {
					switch (panel.menuType) {
						case "miniSetting":
							return "top:" + (open ? "50%;" : "100%;") ;

						case "fullSetting":
							return "left:" + (open ? "0;" : "-1100px;") ;

					}
				}
			};

			return panelsFactory; 
		}];
	}]);

	//panels directive
	module.directive('panels', ['$http', '$compile', 'panels', 'panelList', function ($http, $compile, panels, panelList) {

		return {
			//attribute
			restrict: 'A',
			
			//isolate
			scope: {
			},

			//shares data between factory and controller
			controller: ('appPanelDisplay',['$scope',function ($scope) {

				$scope.panels = panels;

			}]),


			link: function ( scope, element, attrs ) {

				//add panel
				angular.forEach(panelList, function(panel, key) {
						//get template
						$http.get(panel.templateUrl).success(function (template) {

							//panel template
							var template = '<md-content  style="' + panels.style(panel) + '" class="panels panel-' + panel.menuType + '" data-ng-class="{open : panels.opened==\'' + panel.id + '\'}">' + template + '</md-content>';
							//compile template
							var compiled = $compile(template)(scope);
							//add compiled template
							element.append(compiled);
							//save selector
							panelList[key].element = angular.element(compiled);
						});


							if (panel.menuType === "fullSetting") {
								console.log('adding full button');
								angular.element(document.getElementById('iconBar')).append($compile('<div style="background:url('+panel.icon+') no-repeat center center" class="fullSizeButton" data-ng-click="panels.open(\''+panel.id+'\')">')(scope));

							} else {
								console.log('adding half button');
								angular.element(document.getElementById('roomSpace')).append($compile('<div style="background:url('+panel.icon+') no-repeat center center" class="halfSizeButton" data-ng-click="panels.open(\''+panel.id+'\')">')(scope));
							}

				});

				//add dim
				element.append($compile('<div class="dimming" data-ng-class="{open : panels.opened}" data-ng-click="panels.close();"></div>')(scope));
			}
		}
	}]);
	//app icon creater



})(angular);
