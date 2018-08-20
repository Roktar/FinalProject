var list_group = $('.memberbox');
var i = 1;

$(document).ready(function() {
	var no = location.href.split("?")[1].split("=")[1];
	$("#header").load(serverRoot + "/header.html");
	
	$("#groupInfoUpdate").attr("href", "groupInfoUpdate.html?no="+no);
	$("#groupMemberUpdate").attr("href", "groupMemberUpdate.html?no="+no);
	$("#groupRequestUpdate").attr("href", "groupRequestUpdate.html?no="+no);
	$("#groupSurveylist").attr("href", "surveylist.html?no="+no);
	$("#groupSurveyInsert").attr("href", "survey-enroll.html?no="+no);
	
	$.get(serverRoot + "/json/auth/loginstat", (data) => {
       if(typeof(data) == "string") {
    	   swal({
				  type: 'error',
				  title:  '권한이 없습니다.'
				})
           location.href="index.html";
       }
       myNo = data.no;
    });  
	
	list();
});

function list(){
	var no = location.href.split("?")[1].split("=")[1];
	$.ajax({
		url: "/FinalProject/json/joinedMember/list/?no=" + no,
		method : "post",
		data:{},
		dataType:"json",
		success: function(data){
			
			console.log("list");
			let list_group = $('.memberbox');
	        
	        for(var item of data) {
	            $('<tr>' +
	            		'<form>'+
	                    '<td>'+item.member.name+'</td>'+
	                    '<td>'+item.member.email+'</td>'+
	                    '<td>'+item.registedDate+'</td>'+
	            '<td>'+
	            '<button class="btn btn-secondary btn-sm" onclick="dep('+item.memNo+');">추방</button>'+
	            '</td>'+
	            '</form>'+
	            '</tr>').appendTo(list_group);
	            
	            i++;
	        };
		}
	});
};

function dep(memno, no) {
	var no = location.href.split("?")[1].split("=")[1];
	console.log("memno : " + memno);
	console.log("no : " + no);
	
	const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-primary oBtn',
        cancelButtonClass: 'btn btn-secondary cBtn',
        buttonsStyling: false,
      })
      swalWithBootstrapButtons({
           title: '회원을 탈퇴시키겠습니까?',
           type: 'question',
           showCancelButton: true,
           confirmButtonText: '네',
           cancelButtonText: '아니요',
           reverseButtons: true
         }).then((result) => {
        	 if (result.value) {
		$.ajax({
			url: "/FinalProject/json/joinedMember/exclude",
			method: "POST",
			data:{'memNo':memno, 'no' : no},
			dataType: "json",
			success: function(data){
				if( data ) { 
					console.log(JSON.stringify(data));
					console.log("성공")
					$('.memberbox').empty();
					list();
				} else {
					console.log('업데이트 실패');
				}
			}
		});
         
             }  
           })
  }
