angular.module('App', [])
    .service('infoPromo', function () {
        var property = 'First';

        return {
            getPromo: function () {
                return property;
            },
            setPromo: function(value) {
                property = value;
            }
        };
    });