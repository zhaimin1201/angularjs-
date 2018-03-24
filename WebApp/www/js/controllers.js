app.controller('tj', ['$scope', '$timeout', '$http', function($scope, $timeout, $http, services, $interval) {
	var list = [];
	var x = 1;     //传后台
	var y = true; //ng-if用
	$scope.list = list;
	// $http.get(url + "/dat").success(function(data) {
	// 	for(var i = 0; i < data.length; i++) {
	// 		list.push(data[i]);
	// 	}
  $http.get("http://sit.izhinengbao.com/restful/list.json?category=1").success(function(data) {
    console.log(data);
    for(var i = 0; i < data.length; i++) {
      list.push(data[i]);
    }
    $scope.toDetail=function (id) {
      sessionStorage.conId=id;
    }

	})
	//下拉刷新
	$scope.doRefresh = function() {
		$http.get(url + "/dat")
			.success(function(data) {
				list.splice(0, list.length)
				console.log(list)
				for(var i = 0; i < data.length; i++) {
					list.push(data[i]);
				}
				x = 1;
				y = true;
			})
			.finally(function() {
				$scope.$broadcast('scroll.refreshComplete');

			});

	};
//	上拉加载
	$scope.jiazai = function() {
		$http.get(url + '/datdown?x=' + x).success(function(data) {
			for(var i = 0; i < data.length; i++) {
				list.push(data[i]);
			}
			x++;
			$scope.$broadcast('scroll.infiniteScrollComplete');
			if(data.length == 0) {
				y = false
				alert("没了")
			}
		})
	};
	$scope.$on('stateChangeSuccess', function() {
		$scope.jiazai();
	});
	$scope.jieshu = function() {
		return y;
	}

}])

//登录
app.controller('login', ['$scope', '$timeout', '$http', function($scope, $timeout, $http, services, $interval) {

}])

app.controller('xs', ['$scope', '$timeout', '$http', function($scope, $timeout, $http, services, $interval) {
	var dataT = document.getElementById("xs").getAttribute("data-title");
	console.log(dataT)
	$http.get("http://sit.izhinengbao.com/restful/list.json?category=4").success(function(data) {
		$scope.list = data;
	})
	$scope.doRefresh = function() {
		$http.get(url + "/dat")
			.success(function(data) {
				$scope.list = data;
			})
			.finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
	};
}])
app.controller('sy', ['$scope', '$timeout', '$http', function($scope, $timeout, $http, services, $interval) {
	var dataT = document.getElementById("sy").getAttribute("data-title");
	console.log(dataT)
	$http.get("http://sit.izhinengbao.com/restful/list.json?category=1").success(function(data) {
		$scope.list = data;
	})
	$scope.doRefresh = function() {
		$http.get(url + "/dat")
			.success(function(data) {
				$scope.list = data;
			})
			.finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
	};
}])
app.controller('yd', ['$scope', '$timeout', '$http', function($scope, $timeout, $http, services, $interval) {
    //考研
	var dataT = document.getElementById("yd").getAttribute("data-title");
	console.log(dataT)
	$http.get("http://sit.izhinengbao.com/restful/list.json?category=2").success(function(data) {
	  console.log(data);
	  console.log(data[0].createTime);

		$scope.list = data;
	})
	$scope.doRefresh = function() {
		$http.get(url + "/dat")
			.success(function(data) {
				$scope.list = data;
			})
			.finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
	};
}])
app.controller('qd', ['$scope', '$timeout', '$http', function($scope, $timeout, $http, services, $interval) {
	var dataT = document.getElementById("qd").getAttribute("data-title");
	console.log(dataT)
	$http.get("http://sit.izhinengbao.com/restful/list.json?category=3").success(function(data) {
		$scope.list = data;
	})
	$scope.doRefresh = function() {
		$http.get(url + "/dat")
			.success(function(data) {
				$scope.list = data;
			})
			.finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
	};
}])

app.controller('ccon', ['$scope', '$http', function($scope, $http) {
	$scope.sy = function() {
		window.location.href = "#/tab/sy";
	}
	$scope.qd = function() {
		window.location.href = "#/tab/qd";
	}
	$scope.yd = function() {
		window.location.href = "#/tab/yd";
	}
	$scope.xw = function() {
		window.location.href = "#/tab/xs";
	}
}])
app.controller('controlName', ['$ionicHistory', '$scope', '$http', '$location', function($ionicHistory, $scope, $http, $location) {
    //详情
  console.log(sessionStorage.conId);
	var searchObject = $location.search();
	$http.get("http://sit.izhinengbao.com/restful/detail.json?newsItemId=" + sessionStorage.conId).success(function(data) {
	  console.log(data)
		$scope.det = data;
	})
	$scope.gou = function() {
		$ionicHistory.goBack(); //返回上一页
	}

}])
app.controller('bac', ['$ionicHistory', '$scope', '$http', '$location', function($ionicHistory, $scope, $http, $location) {
	$scope.gou = function() {
		$ionicHistory.goBack(); //返回上一页
	}
}])
app.controller('search', ['$scope', '$http', '$location', function($scope, $http, $location) {
	$http.get("http://sit.izhinengbao.com/restful/list?category=1&key=" + $location.search().TAG).success(function(data) {
	  console.log(data)
		$scope.list = data;
	})
}])
