'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope. slides=[
			{
				image:'/modules/images/business-leadership-3.png',
				active:true
			},
			{
				image:'/modules/images/images_slider2.jpg',
				active:false
			}
			//{
			//	image:'http://www.blackliontech.com/wp-content/uploads/EasyRotatorStorage/user-content/erc_28_1393893679/content/assets/cloud-rotator2-0.jpg',
			//	active:false
			//},
			//{
			//	image:'http://www.blackliontech.com/wp-content/uploads/EasyRotatorStorage/user-content/erc_28_1393893679/content/assets/cloud-rotator3-0.jpg',
			//	active:false
			//},
			//{
			//	image:'http://www.blackliontech.com/wp-content/uploads/EasyRotatorStorage/user-content/erc_28_1393893679/content/assets/cloud-rotator4-0.jpg',
			//	active:false
			//}
		]
	}
]);
