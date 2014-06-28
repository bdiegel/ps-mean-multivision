angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('mvNotifier', function(mvToastr){
	return {
		notify: function(msg) {
			console.log('in notify');
			mvToastr.success(msg);
			console.log(msg);
		}
	};
});