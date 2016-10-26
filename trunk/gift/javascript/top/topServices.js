giftSer.service('topServices', ['$http', 'global', function($http, global){
	
	this.getTopListData = function(listId, limit, offset, successCallback, errorCallback){
		$http.get(global.getGolbalPath()+'/data/top/top'+listId+'limit'+limit+"offset"+offset)
		.success(function(data){
			console.log(data)
			var newData = data.data.items.map(function(item, index){
				var newItem = {};
				newItem.id = item.data.id;
				newItem.imgUrl = item.data.cover_image_url;
				newItem.name = item.data.name;
				newItem.description = item.data.description;
				newItem.price = item.data.price;
				return newItem;
			})
			successCallback(newData);
		})
		.error(function(error){
			errorCallback(error);
		})
	}
}])