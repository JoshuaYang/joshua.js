/**
 * @author Joshua
 * @date 2014/5/22
 */

define(['joshua/util/Class'], function(Class){
	// constructor method
	var Scheme = Class.extend({});

	// get url params
	Scheme.getUrlParams = function(){
		var search = window.location.search; 

		// make dictionary
        var tmparray = search.substr(1,search.length).split('&');
        var paramsArray = new Array;

        if( tmparray != null){
            for(var i = 0; i < tmparray.length; ++i){ 
            	// split with = , except ==
                var reg = /[=|^==]/;
                var set1 = tmparray[i].replace(reg, '&');
                var tmpStr2 = set1.split('&');
                var array = new Array;

                array[tmpStr2[0]] = tmpStr2[1];
                paramsArray.push(array);
            } 
        } 

        return paramsArray; 
	}

	// get url params value by key
	Scheme.getParamValue = function(key){
		var paramsArray = Scheme.getUrlParams();

        if(paramsArray != null){ 
            for(var i = 0; i < paramsArray.length; ++i){ 
                for(var j in paramsArray[i]){
                    if( j == key ) {
                        return paramsArray[i][j];
                    }
                }
            }
        }

        return null;
	}

	return Scheme;
});