var app = angular.module('weather');

app.controller('mainController', ['$scope', 'mainService', function ($scope, mainService) {

    function collapseNavbar() { //uzet iz bootstrapa
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    }

    $(window).scroll(collapseNavbar);
    $(document).ready(collapseNavbar);

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function () {      //uzet iz bootstrapa
        $('a.page-scroll').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
            $('.navbar-toggle:visible').click();
        }
    });   //uzet iz bootstrapa




    mainService.getWeather().then(function (response) {
        $scope.data = response.data;
        $scope.grad = $scope.data[0].grad;
    });


    $scope.name = 'Nedim Kaknjasevic';
    $scope.title = 'Software Developer';
    $scope.text = mainService.bio;  //biografija, umjesto koda u index.htmlu

    $scope.add = function (id) {
        $scope.data[id].temp = parseInt($scope.data[id].temp) + 1;
    }
    $scope.remove = function (id) {
        $scope.data[id].temp = parseInt($scope.data[id].temp) - 1;
    }

    $scope.showLink = false; //htio da napravim da ne moze download ako nisi logovan, fb sdk ne vrati status o logovanju, vrati status unknown umjesto connected

    $scope.save = function () {
        if (!$scope.showLink) {
            var dataToSave = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify($scope.data));

            var a = document.createElement('a'); //novi el u htmlu
            a.href = 'data:' + dataToSave;      //href. na klik ga vodi na datatosave
            a.download = 'data.json';
            a.innerHTML = 'download JSON';      //napravljen download link

            var container = document.getElementById('link'); // da se prikaze download link
            container.appendChild(a);
        }
        $scope.showLink = true;
    }

    //var getLoginStatus = function ()
    //{
    //    if (FB) {
    //        FB.getLoginStatus(function (response) {
    //            if (response.status == 'connected' || response.status == 'not_authorized') {
    //                return true;
    //            }
    //            else {
    //                return false;
    //            }
    //        }, true); -svaki put pinga server da ne bi uzeo iz kesa
    //    }
        
    //}

    //$scope.isLoggedIn = getLoginStatus();

    //$scope.fbLogout = function () {
    //    FB.logout(function (response) {
    //        $scope.isLoggedIn = false;
    //        window.location.reload();           
    //    });
    //}


}]);