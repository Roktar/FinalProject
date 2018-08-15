$("#header").load("header.html");
var studyName = document.querySelectorAll(".studyName");
let stdno = location.href.split("?")[1].split("=")[1];

$(document).ready(function() {
	
	$(".groupInfoUpdate").click(function(){
		location.href =  "groupInfoUpdate.html?no="+stdno;
	});
	
    $.get("json/auth/loginstat", {}, res=> {
    	var memno = res.no;
    }).done(function(data){
    	/* 스터디 정보 */
    	$.getJSON("json/studyInfo/" + stdno, function(data) {
            $(studyName).text(data.name);
            $(fInformation).text(data.information);
            $('.maxPeople').text(data.maxPeople);
        }); 
    	
    	/* 리더정보 가져오기 */
    	 $.getJSON("json/joinedMember/leaderList", {no: stdno}, data =>{
      		  console.log(data);
      		 console.log(data.member.name);
      		$('.leaderName').text(data.member.name);
      		$(leaderpfp).attr('src', 'files/' + data.member.photo + '_350x350.jpg');
          });
    	 
    	 
    	  /* 멤버정보가져오기 */
         $.getJSON("json/joinedMember/listMember", {no: stdno}, data =>{
      		  console.log(data);
      		  let memberInfo = $('.memberInfo');
      		  
      		  for (var item of data) {
      			  $('<div class="col-4">'+
                    '<div class="row eachMember">'+
                       '<div class="col-sm">'+
                            '<div class="member-img"><img src="files/'+ item.member.photo +'_350x350.jpg" alt="profile"></div>'+
                        '</div>'+
                        '<div class="col-sm memberProfile">'+
                            (item.grade == 1 ?'<span class="memberClass">회원</span>' : '<span class="memberClass">리더</span>')+
                            '<span class="memberName">'+ item.member.name +'</span>'+
                        '</div>'+
                        '<div class="col-sm message">'+
                            '<a href="message.html">'+
                                '<img src="img/message.png" alt="..." class="message" onclick="">'+
                            '</a>'+
                        '</div>'+
                    '</div>'+
                '</div>').appendTo(memberInfo);
      		  }
      		
          }); 
         
         
         /* 멤버 카운트 */
         $.getJSON("json/joinedMember/count", {no : stdno}, data => {
      	   		$('.memberCount').text(data);
      	   		
         });

         /* 타임라인 */
         $.getJSON("json/schedule/listdetail/" + stdno, (data) => {
      	   console.log(data);
 	   		$('.scheduleLocationDetail').text(data[0].placeAddress);
 	   		$('.scheduleTilte').text(data[0].title);
 	   		$('.scheduleTopics').text(data[0].title);
 	   	    $('.scheduleTimelineDetail').text(data[0].content);
 	   	
    });
          
    	 
    	 
    	 
    });
    // 가입요청하기 기능
    $(".acceptRequest").click(function(memno, stdno){
	    $.get("json/auth/loginstat", {}, res=> {
	    	memno = res.no;
	    }).done(function(data){
	    	console.log("memNo :"+ memNo);
		    console.log("no :" + stdno);
	        var consoleMsg = '가입요청';
	        var _msg = '가입 요청을 하시겠습니까??';
	        
	        if (confirm(_msg)) {
	        	if(memno == undefined){
	        		swal({
	  				  type: 'error',
	  				  title:  '로그인 후 이용하실 수 있습니다.'
	  				})
	        	} else{
	        		
	        		
	        		
		            $.ajax({
		                url : "/FinalProject/json/awaitingMember/add",
		                method : "POST",
		                data : {'memNo' : memno, 'no' : stdno},
		                dataType : "json",
		                success : function(data) {console.log(consoleMsg);}
		            })
	        	}
	        };
        });
	});
    
    
    
    
    
    
    

	$.get("json/auth/loginstat", {}, res=> {
		memNo = res.no;
	}).done(function(data){
	    console.log("memNo :"+ memNo);
	    console.log("no :" + stdno);
    	$.ajax({
    		url : "/FinalProject/json/joinedMember/gradeList",
    		method : "POST",
    		data : {'memNo': memNo, 'no' : stdno},
    		dataType : "json",
    		success : function(data) {
    			for(var item of data){
					console.log("item.grade : " + item.grade);
					switch(item.grade){
					case 0 :
						$("#grade0").css('display','block');
						$("#grade2").css('display','none');
						console.log("그룹관리");
						break;
					case 1 :
						$("#grade2").css('display','none');
						console.log("회원입니다");
						break;
					default :
						console.log("그룹가입");
						break;
					}
    			}
    		}
    	})
	})
});
