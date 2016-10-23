giftMoudle.controller('categoryCtrl', ['$scope', 'categoryServices', '$ionicScrollDelegate', function($scope, categoryServices, $ionicScrollDelegate){
	$scope.tmpUrl = 'views/category/singleTmp.html';	
	$scope.selectIndex = 1;
	$scope.titleIndex = 0;
	
	$scope.titleAction = function(index){
		$scope.selectIndex = index;
		if(index == 0){
			$scope.tmpUrl = 'views/category/tipsTmp.html';	
		}else if(index == 1){
			$scope.tmpUrl = 'views/category/singleTmp.html';	
		}
	}
	
	$scope.navAction = function(index){
		//改变title的样式
		$scope.titleIndex = index;
		//列表跳转到对应的位置
		console.log(index)
		var offset = 0;
		for(var i = 0; i < index; i++){
			offset += $scope.listHeightArr[i];
		}
		//避免由点击nav让list滚动带动listScrollAction方法执行
		$scope.canTriggle = false;
		$ionicScrollDelegate.$getByHandle('list').scrollTo(0, offset, false);
		//按钮置顶
		$ionicScrollDelegate.$getByHandle('nav').scrollTo(0, index*40, true);
	}
	
	$scope.listScrollAction = function(){
		//判断如果是有点击而触发的，就结束这个方法
		if(!$scope.canTriggle){
			$scope.canTriggle = true;
			return;
		}
		console.log('正在滚动...............');
		//得到当前的位置
		var top = $ionicScrollDelegate.$getByHandle('list').getScrollPosition().top;
		
		//根据当前的位置判断处在哪一个list列表中
		for(var i = 0; i < $scope.listHeightArr.length; i++){
			var min = 0;//最小
			for (var j = 0; j < i; j++) {
				min += $scope.listHeightArr[j];
			}
			var max = min + $scope.listHeightArr[i];//最大
//			console.log(min+'~'+max);
			if(top >= min && top < max){//判断如果是介于最小和最大之间，就是在这个列表中
				$scope.$apply(function(){
					$scope.titleIndex = i;   //让这个列表的title选中
				})
				$ionicScrollDelegate.$getByHandle('nav').scrollTo(0, i*40, true);
				break;
			}
			
		}
		
		
//		[350, 450, 450, 350, 450, 250, 350, 750, 350, 150, 250, 750, 350, 350, 350, 250, 250]
//		0~350                                    1
//		350~350+450                       2
//		350+450~350+450+450     3
//		.....
	}
	
	
	categoryServices.getSingleTree(
		function(titles, lists){
			$scope.titles = titles;
			$scope.lists = lists;
			//
			$scope.listHeightArr = lists.map(function(list, index){
				var count = Math.ceil(list.length/3);
				return count * 100 + 50;
			})
			$scope.listStyleArr = $scope.listHeightArr.map(function(item){
				return '{height: "'+item+'px"}';
			})
			console.log($scope.listHeightArr)
		}, 
		function(error){
			alert('网络错误');
		}
	);

}])