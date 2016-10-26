giftMoudle.controller('topCtrl', ['$scope', 'topServices', '$ionicSlideBoxDelegate', function($scope, topServices, $ionicSlideBoxDelegate){
	console.log('top页面控制器。。。。');
	$scope.allTitle = ['每日推荐', 'TOP100', '独立原创榜', '新星榜'];
	$scope.selectIndex = 0;
	$scope.allListData = [ ];
	$scope.listId = 0;
	$scope.limit = 20;
	$scope.offsetArr = [ ];
	for (var i = 0; i < $scope.allTitle.length; i++) {
		$scope.allListData.push([ ]);
		$scope.offsetArr.push(0);
	}
	
	$scope.$on('$ionicView.loaded', function(){
		$scope.itemWidth = (document.getElementById('app').offsetWidth-30)/2;
		$scope.itemHeight = $scope.itemWidth + 100;
		$scope.imgStyle = "{height:'"+$scope.itemWidth+"px'}";
	})

	
	$scope.topAction = function(index){
		$scope.selectIndex = index;
		$ionicSlideBoxDelegate.slide(index);
	}
	
	//请求列表数据
	function requestListData(){
		topServices.getTopListData(
			$scope.listId, $scope.limit, $scope.offsetArr[$scope.selectIndex],
			function(data){
				$scope.allListData[$scope.selectIndex] = data;
			},
			function(error){
				alert('网络错误');
			}
		)
	}
	//初始化第一页的列表数据
	requestListData();
	
	
	$scope.topPageChange = function(index){
		//判断下一个页面是否有数据，如果没则请求
		$scope.selectIndex = index;
		$scope.listId = index;
		if($scope.allListData[index].length == 0){
			requestListData()
		}
	}
	
	
	
}])