giftMoudle.controller('meCtrl', ['$scope', '$ionicModal', function($scope, $ionicModal){
	console.log('me页面控制器。。。。');
	$scope.isRemmber = false;
	$scope.remmberAction = function(){
		$scope.isRemmber = !$scope.isRemmber ;
	}
	
	//创建注册页面
	$ionicModal.fromTemplateUrl('views/me/register.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	  })
	.then(function(modal) {//modal就是创建的模态模板页面
	    $scope.modal = modal;
	  });
	  
	  $scope.user = {
	  	username: 'zhangsan',
	  	psd: '123456',
	  	confirmPsd: '123456'
	  };
	
	$scope.regAction = function(){
		//需要弹出新的注册的页面
		$scope.modal.show();//显示
	}
	
	$scope.cancelAction = function(){
		$scope.modal.hide();//隐藏
//		$scope.modal.remove();//销毁（销毁后需要重新创建才能展示）
	}
	
	$scope.completeAction = function(){
		console.log($scope.user);
		if($scope.user.psd === $scope.user.confirmPsd){
			$scope.modal.hide();
			$scope.name = $scope.user.username;
		}
		
	}
	
	
}])