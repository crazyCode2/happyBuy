giftSer.service('homeServices', ['$http', 'global', function($http, global){
	
	this.getHomeNavData = function(successCallback, errorCallback){
		$http.get(global.getGolbalPath()+'/data/home/homeNav.json')
		.success(function(data){
			//调用成功的回调方法
			//将请求的数据通过方法回传回去
			successCallback(data.data.channels);
		
			
		})
		.error(function(error){
			errorCallback(error.code);
		})
	}
	
	this.getBannerListData = function(successCallback, errorCallback){
		$http.get(global.getGolbalPath()+"/data/home/homeBanners.json")
		.success(function(data){
//			console.log(data.data.banners)
			var newData = data.data.banners.map(function(item, index){
				var newItem = {};
				newItem.id = item.id;
				newItem.imgUrl = item.image_url;
				return newItem;
			});
			successCallback(newData);
		})
		.error(function(error){
			errorCallback(error);
		})
	}
	
	this.getSecondBannerData = function(successCallback, errorCallback){
		$http.get(global.getGolbalPath()+'/data/home/homeSecondBanners')
		.success(function(data){
			var newData = data.data.secondary_banners.map(function(item, index){
				var newItem = {};
				newItem.id = item.id;
				newItem.imgUrl = item.image_url;
				return newItem;
			})
			successCallback(newData);
		})
		.error(function(error){
			errorCallback(error);
		})
	}
	
	this.getHomeListData = function(homeId, limit, offset, successCallback, errorCallback){
		//上下拉刷新
		//提供传入参数：count/limit offset/page
		$http.get(global.getGolbalPath()+'/data/home/home'+homeId+'limit'+limit+'offset'+offset)
		.success(function(data){
			var newData = data.data.items.map(function(item, index){
				var newItem = {};
				newItem.id = item.id;
				newItem.imgUrl = item.cover_image_url;
				newItem.likes = item.likes_count;
				newItem.title = item.title;
				return newItem;
			})
			successCallback(newData);
		})
		.error(function(error){
			errorCallback();
		})
	}
	
//	$http.get(global.getGolbalPath+'/data/home/homeNav.json')
//	.success(function(data){
//		
//	})
//	.error(function(error){
//		
//	})
}])