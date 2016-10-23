giftSer.service('categoryServices', ['$http', 'global', function($http, global){
	//请求列表信息
	this.getSingleTree = function(sueecssCallback, errorCallback){
		$http.get(global.getGolbalPath()+'/data/category/tree')
		.success(function(data){
			var titles = [ ];
			var lists = [ ];
			angular.forEach(data.data.categories, function(item, index){
				titles.push(item.name);
				lists.push(item.subcategories);
			})
			console.log(titles);
			console.log(lists);
			sueecssCallback(titles, lists);
		})
		.error(function(error){
			errorCallback(error);
		})
	}
}])