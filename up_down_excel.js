$("#down-btn").on("click",function(e){
	var country=$("#country").val();
	console.log(country);
	$("#form_download").attr("action","/download/"+country);
});