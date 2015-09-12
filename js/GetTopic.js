
angular.module('GetTopic',[]).service('GetTopic', ['panelList', function(panelList){

    return function(panelID) {

        var panel = panelList[panelID];
        if (panel != null) {
            var topic = panel.topic;
            return topic;
        } else {
            return "NO-TOPIC";
        }
    }
}]);


