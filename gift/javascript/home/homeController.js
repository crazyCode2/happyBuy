giftMoudle.controller('homeCtrl', ['$scope', 'homeServices', '$ionicSlideBoxDelegate', '$ionicScrollDelegate', '$timeout', '$ionicPopup', function($scope, homeServices, $ionicSlideBoxDelegate, $ionicScrollDelegate, $timeout, $ionicPopup){

	$timeout(function(){
		//控制banner可以滑动
		document.getElementById('allBanner').addEventListener('touchstart', function(ev){
			$ionicSlideBoxDelegate.$getByHandle('home-box').enableSlide(false);
		}, false);
		document.getElementById('allBanner').addEventListener('touchend', function(ev){
			$ionicSlideBoxDelegate.$getByHandle('home-box').enableSlide(true);
		}, false);
		document.getElementById('allBanner').addEventListener('touchcancel', function(ev){
			$ionicSlideBoxDelegate.$getByHandle('home-box').enableSlide(true);
		}, false);
	}, 100);
	
	$scope.selectSlide = 0;
	$scope.limit = 20;
	$scope.offsetArr = [ ];
	$scope.canLoadMore = true;
	//初始化列表数据源
	$scope.allListData = [ ];
	
	//导航点击事件
	$scope.navAction = function(index, id){
		$scope.selectSlide = index;
		$ionicSlideBoxDelegate.$getByHandle('home-box').slide(index);
	}
	
	//请求频道数据
	homeServices.getHomeNavData(
		function (data){
			//成功
			$scope.navData = data;
			//进行列表数据请求条件的初始化
			$scope.listId = $scope.navData[0].id;
			for(var i = 0; i < $scope.navData.length; i++){
				$scope.allListData.push([ ]);
				$scope.offsetArr.push(0);
			}
			console.log($scope.offsetArr);
			requestList('init');//初始请求
		},
		showError
	);
	
	function requestBanner(){
		//请求banner数据
		homeServices.getBannerListData(
			function (data){
				$scope.banners = data;
				//刷新轮播图
				$ionicSlideBoxDelegate.$getByHandle('banner').update();
			},
			showError
		);
		
		//请求second banner 数据
		homeServices.getSecondBannerData(
			function(data){
	//			console.log(data)
				$scope.secBanners = data;
			},
			showError
		)
	}
	requestBanner();//初始请求
	
	//请求列表数据
	function requestList(flag){
		homeServices.getHomeListData(
			$scope.listId, $scope.limit, $scope.offsetArr[$scope.selectSlide],
			function(data){
				if(flag == 'refresh'){
					$scope.$broadcast('scroll.refreshComplete');
					//先清空对应页面的数据源
					$scope.allListData[$scope.selectSlide] = [];
				}else if(flag == 'loadMore'){
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}
				//从17个数据中取出对应的数组，将请求回来的数据追加到后面
				$scope.allListData[$scope.selectSlide] = $scope.allListData[$scope.selectSlide].concat(data);
			},
			function(){
				if(flag == 'refresh'){
					$scope.$broadcast('scroll.refreshComplete');
					$scope.listData = [];
				}else if(flag == 'loadMore'){
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.canLoadMore = false;
					$timeout(function(){
						$scope.canLoadMore = true;
					}, 500);
//					console.log($scope.loadMorePosition)
//					$ionicScrollDelegate.scrollTo(0, $scope.loadMorePosition-100, true);
				}
				showError(400, null);
			}
		);
	}
	
	
	function showError(code, mes){
		//处理网络请求出现错误的方法
		//200  300
		//400+ 客户端错误   500+ 服务器错误
		//200 
		var message = '';
		switch (code){
			case 200:
				message = mes;
				break;
			case 400:
				message = '客户端错误';
				break;
			case 500:
				message = '服务端错误';
				break;
		}
		$ionicPopup.alert({
			title: '错误提示',
			cssClass:'home-alert',
			template: '<p>'+message+'</p>',
			okText: '确定',
			okType: 'button-positive'
		});
		
	}
	
	$scope.refresh = function(){
		//刷新列表
		$scope.offsetArr[$scope.selectSlide] = 0;
		requestList('refresh');
		//刷新banner
		requestBanner();
	}
	
	$scope.loadMore = function(){
		console.log('加载更多。。。。');
		//得到content滚动的偏移量，防止加载更多失败，才能关闭请求
//		$scope.loadMorePosition =  $ionicScrollDelegate.getScrollPosition().top;
		//加载下一条列表，先改变请求条件，在发送请求
		$scope.offsetArr[$scope.selectSlide]  = $scope.allListData[$scope.selectSlide].length ;
		requestList('loadMore');
		console.log($scope.offsetArr)
	}
	
	//list翻页的事件
	$scope.listChangeAction = function(index){
		console.log(index)
		//控制页面的显示
		$scope.selectSlide = index;
		//改变列表的id，重新请求数据
		$scope.listId = $scope.navData[index].id;
		console.log($scope.listId);
		//请求数据(如果下一页没有数据的情况下)
		if($scope.allListData[index].length == 0){
			requestList('init');
		}
	}
}])