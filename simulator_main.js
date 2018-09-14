$(document).ready(function () {

  var my_ip="http://192.168.4.49:8282";
  
  var return_data=[];
  var filter_data=[];

  var country=localStorage.getItem("country");
  
var SEa = {
       "Services sector": "SERa",
       "other industries": "OTa",
       "Chemicals": "CHa",
       "Non Ferrous": "NFa",
       "White Appliances": "HWHa",
       "Iron and Steel":"ISa" ,
       "Building Materials":"BMa" ,
       "Paper and Pulp":"PPa" ,
       "Heating and Cooling":"HOUa" ,
       "Agriculture": "AGRa",
       "Other transport": "OTRa",
       "Freight transport": "FTRa",
       "Food Industry":"FDa" ,
       "Passenger transport": "PTRa" ,
       "Lighting": "HLHa",
       "refineries":"REFa" ,
       "Black Appliances": "HBLa",
       "Equipment goods": "EGa",
       "Non energy uses":"NEa" ,
       "Bunkers Navigation": "BUNa"
   } ;

   var USa = {
       "Black appliances":"D_Black" ,
       "Specific Electricity":"I_ElecSp" ,
       "Steam uses":"I_Steam" ,
       "Transport of passengers navigation":"P_Nav" ,
       "Freight transport trucks":"F_Tru" ,
       "White appliances":"D_White" ,
       "Bunkers Navigation":"B_Nav" ,
       "Electric appliances services":"D_ElecServ" ,    
       "Freight other transport and pipeline":"F_OTR" ,
       "Motors and pumping":"D_Motor" ,
       "Freight transport rail":"F_Rai" ,
       "Lighting":"D_Light" ,
       "Furnaces and Kilns":"I_Furn" ,
       "Public transport of passengers road":"P_Bus" ,
       "Raw Material":"I_Raw" ,
       "Thermal Processing":"I_ThProc" ,
       "Freight transport navigation":"F_Nav" ,
       "Grrenhouses and heat uses agriculture":"D_Green" ,
       "Private transport of passengers cars and motos":"P_Car" ,
       "Heating and Cooling":"D_HeatCool" ,
       "Other heat uses":"D_OthHeat" ,
       "Public transport of passengers rail":"P_Rai" ,
       "Total":"TOTUS" ,
       "Public transport of passengers metro and tram":"P_Met" ,
       "Public transport of passengers aviation":"P_Avi" ,
       "Low Enthalpy Heat":"I_Heat" ,
       "Electric Processing":"I_ElProc"
   } ;

  $(".btn.btn-default").on("click",function(){
      $(".btn.btn-default.clicked").removeClass('clicked');
      $(this).toggleClass('clicked');     
      var div=$(this).attr("rel");
      $("#"+div).show().siblings("div").hide();
  });
 
  $(".btn.btn-default[rel='Macroeconomics']").on("click",function(){
    $("#Macropa").empty();
    $("#Macro").empty();
    $("#Driverpa").empty();
    Macroeconomics().then(function(done){
      return_data.push(done);
/*      filter_data.push(return_data[0]);
      var names=Object.keys(filter_data[0]);
      var keys=Object.keys(filter_data[0]["Driverpa"][0]); 
      for (var i = 0; i < filter_data[0]["Driverpa"].length; i++) {  
        for (var j = 0; j < keys.length-1; j++) {
          filter_data[0]["Driverpa"][i]['(' + country + ',' + SEa[filter_data[0]["Driverpa"][i][keys[keys.length-1]]] + ',' + keys[j] + ')' ] = filter_data[0]["Driverpa"][i][keys[j]];
        }
      }
      console.log(filter_data); */
      });
  });

  $(".btn.btn-default[rel='Services']").on("click",function(){
    $("#Servicesel").empty();
    $("#Usefulserv_inputs").empty();
    $("#Usefulserv").empty();
    $("#ProcessUEI_inputs").empty();
    $("#ProcessUEI").empty();
    Services().then(function(done){
      return_data.push(done);
      });
  });

  $(".btn.btn-default[rel='Useful']").on("click",function(){
    $("#ProcessUShares").empty();
    Useful().then(function(done){
      return_data.push(done);
      });
  });

  $(".btn.btn-default[rel='Final_eff']").on("click",function(){
    $("#ProcessFEIpa").empty();
    $("#ProcessFEI").empty();
    Final_eff().then(function(done){
      return_data.push(done);
      });
  });

  $(".btn.btn-default[rel='Fuel_Mix']").on("click",function(){
    $("#EnergySh").empty();
    Fuel_Mix().then(function(done){
      return_data.push(done);
      });
  });
  
  $(".btn.btn-default[rel='Power']").on("click",function(){
    $("#LOSrate").empty();
    $("#TOPGhelratio").empty();
    $("#PG_Effic").empty();
    $("#TIPGshares").empty();
    $("#CENPGSEC").empty();
    $("#CENPGshares").empty();
    Power().then(function(done){
      console.log(done);
      return_data.push(done);
      });
  });

  $(".btn.btn-default[rel='Boilers']").on("click",function(){
    $("#TOBOIRatio").empty();
    $("#BOI_Effic").empty();
    $("#TIBOIshares").empty();
    $("#DH_Effic").empty();
    $("#TIDHshares").empty();
    Boilers().then(function(done){
      return_data.push(done);
      });
  });
  
  $(".btn.btn-default[rel='Energy_Branch']").on("click",function(){
    $("#CENOTHSEC").empty();
    $("#CENOTHshares").empty();
    $("#CENRFSEC").empty();
    $("#CENRFshares").empty();
    $("#TIOTHratio").empty();
    $("#TIOTHshares").empty();
    $("#TIRFratio").empty();
    $("#TIRFshares").empty();
    $("#TOOTHrate").empty();
    $("#TORFrate").empty();
    Energy_Branch().then(function(done){
      return_data.push(done);
      });
  });

  $(".btn.btn-default[rel='Primary']").on("click",function(){
    $("#PPRODratio").empty();
    $("#NIMPratio").empty();
    $("#CSratio").empty();
    Primary().then(function(done){
      return_data.push(done);
      });
  });

  $(".btn.btn-default[rel='Clean_Gas']").on("click",function(){
    $("#CleanGas").empty();
    Clean_Gas().then(function(done){
      return_data.push(done);
      });
   });

  $("#run_model").on("click",function(){
    var my_return_data=JSON.stringify(return_data);
    $('#wait').show();
    $.post( my_ip+"/results", {data:my_return_data,country:country}).done(function(data){
      re_data=JSON.stringify(data);
      localStorage.setItem("VarTableData",re_data);
    $('#wait').hide();
      window.location="simulator_outputs.html";
    });
    return false;
  });

  var table_constractor = function(data,div_id){
    var Headers=Object.keys(data[0]);
    Headers.unshift(Headers.pop());

    var container1 = document.getElementById(div_id);
    var tmpData;
    
    var hot1 = new Handsontable(container1, {
        data: data,
        colHeaders: true,
        colHeaders:Headers,
        columns: [
        {data:Headers[0],type:"text",readOnly: true},
        {data:Headers[1],readOnly: true,type:"numeric", format:"0,0.00%"},
        {data:Headers[2],type:"numeric", format:"0,0.00%"},
        {data:Headers[3],type:"numeric", format:"0,0.00%"},
        {data:Headers[4],type:"numeric", format:"0,0.00%"},
        {data:Headers[5],type:"numeric", format:"0,0.00%"},
        {data:Headers[6],type:"numeric", format:"0,0.00%"},
        {data:Headers[7],type:"numeric", format:"0,0.00%"},
        {data:Headers[8],type:"numeric", format:"0,0.00%"},
        ],
        colWidths:[140,70,70,70,70,70,70,70,70],
        afterChange: function () {
          tmpData = JSON.parse(JSON.stringify(data));
        },
        observeChanges:true   
      });
    return [hot1,tmpData];   
  }
  
  var table_constractor_abs = function(data,div_id){
    var Headers=Object.keys(data[0]);
    Headers.unshift(Headers.pop());
    var container1 = document.getElementById(div_id);
    var tmpData;
  
    var hot2 = new Handsontable(container1, {
        data: data,
        colHeaders: true,
        colHeaders:Headers,
        columns: [
        {data:Headers[0],type:"text",readOnly: true},
        {data:Headers[1],readOnly: true,type:"numeric", format:"0,0.00"},
        {data:Headers[2],type:"numeric", format:"0,0.00"},
        {data:Headers[3],type:"numeric", format:"0,0.00"},
        {data:Headers[4],type:"numeric", format:"0,0.00"},
        {data:Headers[5],type:"numeric", format:"0,0.00"},
        {data:Headers[6],type:"numeric", format:"0,0.00"},
        {data:Headers[7],type:"numeric", format:"0,0.00"},
        {data:Headers[8],type:"numeric", format:"0,0.00"},
        ],
        colWidths:[140,70,70,70,70,70,70,70,70],
        afterChange: function () {
          tmpData = JSON.parse(JSON.stringify(data));       
        },
        observeChanges:true       
      });
    return [hot2,tmpData];   
  }

  var table_constractor_3d = function(data,div_id){
    var Headers=Object.keys(data[0]);
    Headers.unshift(Headers.pop());
    Headers.unshift(Headers.pop());
    var container1 = document.getElementById(div_id);
    var tmpData;
  
    var hot2 = new Handsontable(container1, {
        data: data,
        colHeaders: true,
        colHeaders:Headers,
        columns: [
        {data:Headers[0],type:"text",readOnly: true},
        {data:Headers[1],type:"text",readOnly: true},
        {data:Headers[2],readOnly: true,type:"numeric", format:"0,0.00%"},
        {data:Headers[3],type:"numeric", format:"0,0.00%"},
        {data:Headers[4],type:"numeric", format:"0,0.00%"},
        {data:Headers[5],type:"numeric", format:"0,0.00%"},
        {data:Headers[6],type:"numeric", format:"0,0.00%"},
        {data:Headers[7],type:"numeric", format:"0,0.00%"},
        {data:Headers[8],type:"numeric", format:"0,0.00%"},
        {data:Headers[9],type:"numeric", format:"0,0.00%"},
        ],
        colWidths:[80,80,70,70,70,70,70,70,70,70],
        afterChange: function () {
          tmpData = JSON.parse(JSON.stringify(data));       
        },
        observeChanges:true           
      });
    return [hot2,tmpData];   
  }

  var table_constractor_abs_3d = function(data,div_id){
    var Headers=Object.keys(data[0]);
    Headers.unshift(Headers.pop());
    Headers.unshift(Headers.pop());
    var container1 = document.getElementById(div_id);
    var tmpData;
  
    var hot2 = new Handsontable(container1, {
        data: data,
        colHeaders: true,
        colHeaders:Headers,
        columns: [
        {data:Headers[0],type:"text",readOnly: true},
        {data:Headers[1],type:"text",readOnly: true},
        {data:Headers[2],readOnly: true,type:"numeric", format:"0,0.00"},
        {data:Headers[3],type:"numeric", format:"0,0.00"},
        {data:Headers[4],type:"numeric", format:"0,0.00"},
        {data:Headers[5],type:"numeric", format:"0,0.00"},
        {data:Headers[6],type:"numeric", format:"0,0.00"},
        {data:Headers[7],type:"numeric", format:"0,0.00"},
        {data:Headers[8],type:"numeric", format:"0,0.00"},
        {data:Headers[9],type:"numeric", format:"0,0.00"},
        ],
        colWidths:[80,80,70,70,70,70,70,70,70,70],
        afterChange: function () {
          tmpData = JSON.parse(JSON.stringify(data));       
        },
        observeChanges:true           
      });
    return [hot2,tmpData];   
  }

  var table_constractor_4d = function(data,div_id){
    var Headers=Object.keys(data[0]);
    Headers.unshift(Headers.pop());
    Headers.unshift(Headers.pop());
    Headers.unshift(Headers.pop());
    var container1 = document.getElementById(div_id);
    var tmpData;
  
    var hot1 = new Handsontable(container1, {
        data: data,
        colHeaders: true,
        colHeaders:Headers,
        columns: [
        {data:Headers[0],type:"text",readOnly: true},
        {data:Headers[1],type:"text",readOnly: true},
        {data:Headers[2],type:"text",readOnly: true},
        {data:Headers[3],readOnly: true,type:"numeric", format:"0,0.00%"},
        {data:Headers[4],type:"numeric", format:"0,0.00%"},
        {data:Headers[5],type:"numeric", format:"0,0.00%"},
        {data:Headers[6],type:"numeric", format:"0,0.00%"},
        {data:Headers[7],type:"numeric", format:"0,0.00%"},
        {data:Headers[8],type:"numeric", format:"0,0.00%"},
        {data:Headers[9],type:"numeric", format:"0,0.00%"},
        {data:Headers[10],type:"numeric", format:"0,0.00%"},
        ],
        colWidths:[80,80,80,70,70,70,70,70,70,70,70],
        afterChange: function () {
          tmpData = JSON.parse(JSON.stringify(data));       
        },
        observeChanges:true           
      });
    return [hot1,tmpData];   
  }

  var table_constractor_abs_4d = function(data,div_id){
    console.log(data);
    var Headers=Object.keys(data[0]);
    Headers.unshift(Headers.pop());
    Headers.unshift(Headers.pop());
    Headers.unshift(Headers.pop());
    var container1 = document.getElementById(div_id);
    var tmpData;
  
    var hot2 = new Handsontable(container1, {
        data: data,
        colHeaders: true,
        colHeaders:Headers,
        columns: [
        {data:Headers[0],type:"text",readOnly: true},
        {data:Headers[1],type:"text",readOnly: true},
        {data:Headers[2],type:"text",readOnly: true},
        {data:Headers[3],readOnly: true,type:"numeric", format:"0,0.00"},
        {data:Headers[4],type:"numeric", format:"0,0.00"},
        {data:Headers[5],type:"numeric", format:"0,0.00"},
        {data:Headers[6],type:"numeric", format:"0,0.00"},
        {data:Headers[7],type:"numeric", format:"0,0.00"},
        {data:Headers[8],type:"numeric", format:"0,0.00"},
        {data:Headers[9],type:"numeric", format:"0,0.00"},
        {data:Headers[10],type:"numeric", format:"0,0.00"},
        ],
        colWidths:[80,80,80,70,70,70,70,70,70,70,70],
        afterChange: function () {
          tmpData = JSON.parse(JSON.stringify(data));       
        },
        observeChanges:true           
      });
    return [hot2,tmpData];   
  }

  var response_data=JSON.parse(localStorage.getItem("InputParameterData"));
  
  Macroeconomics = function(){
  var data_lst={};
  var macroeconomics = response_data["macroeconomics"];
  var data_Macropa=macroeconomics["Macropa"];
  var data_Macro=macroeconomics["Macro"];
  var data_Driverpa=macroeconomics["Driverpa"];

  table_constractor(data_Macropa,"Macropa");  // 1o constraction Macropa           
  var tableMacropa_return_data;              // orizw ti metavliti twn data pou tha epistrefw

  var tableMacro=table_constractor_abs(data_Macro,"Macro");  //edw orizw metavliti tableMacro giati alliws dn kanei uppdate times                               //dinw kanonika to id
  var tableMacro_return_data;                                // orizw ti metavliti twn data pou tha epistrefw
  
  var tableDriverpa=table_constractor(data_Driverpa,"Driverpa");
  var tableDriverpa_return_data;
  var timer;
  var promise= new Promise(function(resolve, reject) {
  $('#Macropa tr td').on("DOMSubtreeModified", function(){ 
    if (timer) clearTimeout(timer);  
        timer = setTimeout(function(){
          var tableMacropa=table_constractor(data_Macropa,"Macropa_hide");   //kalw ena aorato Macropa table event gia na kanw uppdate 
          tableMacropa_return_data =tableMacropa[1];                          // ta values pou epistrefei
          var temp_array=[];                                              // dimiourgw temp array me ta data tou Macro meta tin allagi
          tableMacropa_return_data.filter(function(d,i){  
          var row = {};
          var years=["2015","2020","2025","2030","2035","2040","2045","2050"];

          for (var j = 0; j < years.length-1; j++) {
            row[years[0]]=data_Macro[i][years[0]];
            row[years[j+1]]=row[years[j]]*(1+d[years[j+1]])**5;
          };
          temp_array.push(row);                                           //populate!  
          });

          for (var i = 0; i < data_Macro.length; i++) {
            for (var j = 0; j < Object.keys(temp_array[0]).length; j++) {        //allazw ta original data tou Macro
              data_Macro[i][Object.keys(temp_array[0])[j]]=temp_array[i][Object.keys(temp_array[0])[j]];   
            };      
          };
          tableMacro_return_data =data_Macro;

          for (var i = 0; i < data_Driverpa.length; i++) {
            for (var j = 0; j < Object.keys(temp_array[0]).length; j++) {
              if (i===0 || i===1 || i===2 ) {
                data_Driverpa[i][Object.keys(temp_array[0])[j]]=data_Macropa[2][Object.keys(temp_array[0])[j]];
              }
              else if (i>2 && i <= 14) {
                data_Driverpa[i][Object.keys(temp_array[0])[j]]=data_Macropa[i][Object.keys(temp_array[0])[j]];
              }
              else {
                data_Driverpa[i][Object.keys(temp_array[0])[j]]=data_Macropa[1][Object.keys(temp_array[0])[j]];
              }
            }
          }

          tableDriverpa_return_data=data_Driverpa;
          
          data_lst["Driverpa"]=tableDriverpa_return_data;
          data_lst["Macropa"]=tableMacropa_return_data;     //edw exw telika tis times pou tha stelnw sto backend
          data_lst["Macro"]=tableMacro_return_data;
         resolve(data_lst); 
        });
      }); 
    });
   return promise;  
  }

  Services = function() { 
  var data_lst={};

  var services = response_data["services"];
  var data_Servicesel=services["Servicesel"];
  var data_Usefulserv_inputs=services["Usefulserv_inputs"];
  var data_Usefulserv=services["Usefulserv"];
  var data_ProcessUEI_inputs=services["ProcessUEI_inputs"];
  var data_ProcessUEI=services["ProcessUEI"];

  table_constractor_abs(data_Servicesel,"Servicesel");  
  var tableServicesel_id="Servicesel";             
  var tableServicesel_return_data;  

  table_constractor_abs(data_Usefulserv_inputs,"Usefulserv_inputs");  
  var tableUsefulserv_inputs_id="Usefulserv_inputs";             
  var tableUsefulserv_inputs_return_data;

  table_constractor_abs(data_ProcessUEI_inputs,"ProcessUEI_inputs");  
  var tableProcessUEI_inputs_id="ProcessUEI_inputs";             
  var tableProcessUEI_inputs_return_data;              

  var tableUsefulserv=table_constractor_abs(data_Usefulserv,"Usefulserv");  
  var tableUsefulserv_id="Usefulserv";                                 
  var tableUsefulserv_return_data;                                
  
  var tableProcessUEI=table_constractor_abs(data_ProcessUEI,"ProcessUEI");
  var tableProcessUEI_id="ProcessUEI";
  var tableProcessUEI_return_data;
  
  var timer;
  var timer2;
  var timer3;
  var  promise = new Promise(function(resolve, reject) {
  
  $('#Servicesel tr td').on("DOMSubtreeModified", function(){
    if (timer3) clearTimeout(timer3);
        timer3 = setTimeout(function() { 
          var tableServicesel=table_constractor_3d(data_Servicesel,"Servicesel_hide");   
          tableServicesel_return_data =tableServicesel[1];                         
          data_lst["Servicesel"]=tableServicesel_return_data;
          resolve(data_lst);     
      });
  });

  $('#Usefulserv_inputs tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableUsefulserv_inputs=table_constractor(data_Usefulserv_inputs,"Usefulserv_inputs_hide");   //kalw ena aorato Macropa table event gia na kanw uppdate 
          tableUsefulserv_inputs_return_data =tableUsefulserv_inputs[1];                          // ta values pou epistrefei
          var temp_array=[];                                              // dimiourgw temp array me ta data tou Macro meta tin allagi
          tableUsefulserv_inputs_return_data.filter(function(d,i){  
          var row = {};
          var years=["2015","2020","2025","2030","2035","2040","2045","2050"];

          for (var j = 0; j < years.length-1; j++) {
            row[years[0]]=data_Usefulserv[i][years[0]];
            row[years[j+1]]=row[years[0]]*d[years[j+1]];
          };
          temp_array.push(row);                                           //populate!  
          });

          for (var i = 0; i < data_Usefulserv.length; i++) {
            for (var j = 0; j < Object.keys(temp_array[0]).length; j++) {        //allazw ta original data tou Macro
              data_Usefulserv[i][Object.keys(temp_array[0])[j]]=temp_array[i][Object.keys(temp_array[0])[j]];   
            };      
          };
          tableUsefulserv_return_data=data_Usefulserv;

          data_lst["Usefulserv_inputs"]=tableUsefulserv_inputs_return_data;    
          data_lst["Usefulserv"]=tableUsefulserv_return_data;
        resolve(data_lst); 
      });
  });

  $('#ProcessUEI_inputs tr td').on("DOMSubtreeModified", function(){
    if (timer2) clearTimeout(timer2);
        timer2 = setTimeout(function() { 
          var tableProcessUEI_inputs=table_constractor(data_ProcessUEI_inputs,"ProcessUEI_inputs_hide");   
          tableProcessUEI_inputs_return_data =tableProcessUEI_inputs[1];                          
          var temp_array=[];                                              
          tableProcessUEI_inputs_return_data.filter(function(d,i){  
          var row = {};
          var years=["2015","2020","2025","2030","2035","2040","2045","2050"];

          for (var j = 0; j < years.length-1; j++) {
            row[years[0]]=data_ProcessUEI[i][years[0]];
            row[years[j+1]]=row[years[0]]/d[years[j+1]];
          };
          temp_array.push(row);                                           
          });

          for (var i = 0; i < data_ProcessUEI.length; i++) {
            for (var j = 0; j < Object.keys(temp_array[0]).length; j++) {        
              data_ProcessUEI[i][Object.keys(temp_array[0])[j]]=temp_array[i][Object.keys(temp_array[0])[j]];   
            };      
          };
          tableProcessUEI_return_data=data_ProcessUEI;

          data_lst["ProcessUEI_inputs"]=tableProcessUEI_inputs_return_data;     
          data_lst["ProcessUEI"]=tableProcessUEI_return_data;
          resolve(data_lst); 
        });
      });
    });
   return promise;
  }

  Useful = function(){
  var data_lst={};
  var useful = response_data["useful"];
  var data_ProcessUShares=useful["ProcessUShares"];
  console.log(data_ProcessUShares);
  for (var i = 0; i < data_ProcessUShares.length; i++) {
    data_ProcessUShares[i]["Usa"]=data_ProcessUShares[i]["Unnamed: 1"];
    delete data_ProcessUShares[i]["Unnamed: 1"];
  };
  table_constractor_3d(data_ProcessUShares,"ProcessUShares");
  var tableProcessUShares_id="ProcessUShares";             
  var tableProcessUShares_return_data;              
  
  var timer;
  var  promise = new Promise(function(resolve, reject) {
  $('#ProcessUShares tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableProcessUShares=table_constractor_3d(data_ProcessUShares,"ProcessUShares_hide");   
          tableProcessUShares_return_data =tableProcessUShares[1];                         
          data_lst["ProcessUShares"]=tableProcessUShares_return_data;
          resolve(data_lst);     
        });
      });
    }); 
    return promise;
  }

  Final_eff = function(){
  var data_lst={};
  var final_eff = response_data["final_eff"];
  var data_ProcessFEIpa=final_eff["ProcessFEIpa"];
  var data_ProcessFEI=final_eff["ProcessFEI"];

  table_constractor_3d(data_ProcessFEIpa,"ProcessFEIpa");  
  var tableProcessFEIpa_id="ProcessFEIpa";             
  var tableProcessFEIpa_return_data;              

  var tableProcessFEI=table_constractor_abs_3d(data_ProcessFEI,"ProcessFEI"); 
  var tableProcessFEI_id="ProcessFEI";                                
  var tableProcessFEI_return_data;                              

  var timer;
  var promise = new Promise(function(resolve, reject) {
  $('#ProcessFEIpa tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableProcessFEIpa=table_constractor_3d(data_ProcessFEIpa,"ProcessFEIpa_hide");   
          tableProcessFEIpa_return_data =tableProcessFEIpa[1];                          
          var temp_array=[];                                              
          tableProcessFEIpa_return_data.filter(function(d,i){  
          var row = {};
          var years=["2015","2020","2025","2030","2035","2040","2045","2050"];

          for (var j = 0; j < years.length-1; j++) {
            row[years[0]]=data_ProcessFEI[i][years[0]];
            row[years[j+1]]=row[years[j]]*(1+d[years[j+1]])**5;
          };
          temp_array.push(row);                                           
          });

          for (var i = 0; i < data_ProcessFEI.length; i++) {
            for (var j = 0; j < Object.keys(temp_array[0]).length; j++) {       
              data_ProcessFEI[i][Object.keys(temp_array[0])[j]]=temp_array[i][Object.keys(temp_array[0])[j]];   
            };      
          };
          tableProcessFEI_return_data =data_ProcessFEI;

          data_lst["ProcessFEIpa"]=tableProcessFEIpa_return_data;     
          data_lst["ProcessFEI"]=tableProcessFEI_return_data;
          resolve(data_lst); 
        });
      });
    });
    return promise;
  }

  Fuel_Mix = function(){
  var data_lst={};
  var fuel_mix = response_data["fuel_mix"];
  var data_EnergySh=fuel_mix["EnergySh"];
  table_constractor_4d(data_EnergySh,"EnergySh");
  var tableEnergySh_id="EnergySh";             
  var tableEnergySh_return_data;              
  
  var timer;
  var  promise = new Promise(function(resolve, reject) {
  $('#EnergySh tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableEnergySh=table_constractor_4d(data_EnergySh,"EnergySh_hide");   
          tableEnergySh_return_data =tableEnergySh[1];                         
          data_lst["EnergySh"]=tableEnergySh_return_data;
          resolve(data_lst);     
        });
      });
    }); 
    return promise;
  }

  Power = function(){
  var data_lst={};
  var power = response_data["power"];
  var data_LOSrate=power["LOSrate"];
  table_constractor(data_LOSrate,"LOSrate");
  var tableLOSrate_id="LOSrate";             
  var tableLOSrate_return_data;
  var data_TOPGhelratio=power["TOPGhelratio"];
  table_constractor_abs(data_TOPGhelratio,"TOPGhelratio");
  var tableTOPGhelratio_id="TOPGhelratio";             
  var tableTOPGhelratio_return_data;
  var data_PG_Effic=power["PG_Effic"];
  table_constractor(data_PG_Effic,"PG_Effic");
  var tablePG_Effic_id="PG_Effic";             
  var tablePG_Effic_return_data;              
  var data_TIPGshares=power["TIPGshares"];
  table_constractor(data_TIPGshares,"TIPGshares");
  var tableTIPGshares_id="TIPGshares";             
  var tableTIPGshares_return_data; 
  var data_CENPGSEC=power["CENPGSEC"];
  table_constractor(data_CENPGSEC,"CENPGSEC");
  var tableCENPGSEC_id="CENPGSEC";             
  var tableCENPGSEC_return_data;
  var data_CENPGshares=power["CENPGshares"];
  table_constractor(data_CENPGshares,"CENPGshares");
  var tableCENPGshares_id="CENPGshares";             
  var tableCENPGshares_return_data;

  var timer;
  var  promise = new Promise(function(resolve, reject) {
  $('#LOSrate tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableLOSrate=table_constractor(data_LOSrate,"LOSrate_hide");   
          tableLOSrate_return_data =tableLOSrate[1];                         
          data_lst["LOSrate"]=tableLOSrate_return_data;
          resolve(data_lst);     
        });
      });
  $('#TOPGhelratio tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableTOPGhelratio=table_constractor_abs(data_TOPGhelratio,"TOPGhelratio_hide");   
          tableTOPGhelratio_return_data =tableTOPGhelratio[1];                         
          data_lst["TOPGhelratio"]=tableTOPGhelratio_return_data;
          resolve(data_lst);     
        });
      });
  $('#PG_Effic tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tablePG_Effic=table_constractor(data_PG_Effic,"PG_Effic_hide");   
          tablePG_Effic_return_data =tablePG_Effic[1];
          var temp_array=[];                                              
          tablePG_Effic_return_data.filter(function(d,i){  
          var row = {};
          var years=["2015","2020","2025","2030","2035","2040","2045","2050"];
          for (var j = 0; j < years.length-1; j++) {
            row["fua"]=d["Average electric efficiency of power generation per fuel type"];
            row[years[j+1]]=((d[years[j+1]]/d[years[j]])**(-5)) - 1;
          };
          temp_array.push(row);                                           
          });               
          data_lst["PG_Effic"]=tablePG_Effic_return_data;
          data_lst["pgefficpa"]=temp_array;    
          resolve(data_lst);     
        });
      });
  $('#TIPGshares tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableTIPGshares=table_constractor(data_TIPGshares,"TIPGshares_hide");   
          tableTIPGshares_return_data =tableTIPGshares[1];                         
          data_lst["TIPGshares"]=tableTIPGshares_return_data;
          resolve(data_lst);     
        });
      });
  $('#CENPGSEC tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableCENPGSEC=table_constractor(data_CENPGSEC,"CENPGSEC_hide");   
          tableCENPGSEC_return_data =tableCENPGSEC[1];                         
          data_lst["CENPGSEC"]=tableCENPGSEC_return_data;
          resolve(data_lst);     
        });
      });
  $('#CENPGshares tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableCENPGshares=table_constractor(data_CENPGshares,"CENPGshares_hide");   
          tableCENPGshares_return_data =tableCENPGshares[1];                         
          data_lst["CENPGshares"]=tableCENPGshares_return_data;
          resolve(data_lst);     
        });
      });
    });
    return promise;
  }

  Boilers = function(){
  var data_lst={};
  var boilers = response_data["boilers"];
  console.log(boilers);
  var data_TOBOIRatio=boilers["TOBOIRatio"];
  table_constractor(data_TOBOIRatio,"TOBOIRatio");
  var tableTOBOIRatio_id="TOBOIRatio";             
  var tableTOBOIRatio_return_data;
  var data_BOI_Effic=boilers["BOI_Effic"];
  table_constractor(data_BOI_Effic,"BOI_Effic");
  var tableBOI_Effic_id="BOI_Effic";             
  var tableBOI_Effic_return_data;
  var data_TIBOIshares=boilers["TIBOIshares"];
  table_constractor(data_TIBOIshares,"TIBOIshares");
  var tableTIBOIshares_id="TIBOIshares";             
  var tableTIBOIshares_return_data;              
  var data_DH_Effic=boilers["DH_Effic"];
  table_constractor(data_DH_Effic,"DH_Effic");
  var tableDH_Effic_id="DH_Effic";             
  var tableDH_Effic_return_data; 
  var data_TIDHshares=boilers["TIDHshares"];
  table_constractor(data_TIDHshares,"TIDHshares");
  var tableTIDHshares_id="TIDHshares";             
  var tableTIDHshares_return_data;

  var timer;
  var  promise = new Promise(function(resolve, reject) {
  $('#TOBOIRatio tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableTOBOIRatio=table_constractor(data_TOBOIRatio,"TOBOIRatio_hide");   
          tableTOBOIRatio_return_data =tableTOBOIRatio[1];                         
          data_lst["TOBOIRatio"]=tableTOBOIRatio_return_data;
          resolve(data_lst);     
        });
      });
  $('#BOI_Effic tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableBOI_Effic=table_constractor(data_BOI_Effic,"BOI_Effic_hide");   
          tableBOI_Effic_return_data =tableBOI_Effic[1];                         
          
          var temp_array=[];                                              
          tableBOI_Effic_return_data.filter(function(d,i){  
          var row = {};
          var years=["2015","2020","2025","2030","2035","2040","2045","2050"];

          for (var j = 0; j < years.length-1; j++) {
            row["fua"]=d["Average efficiency of industrial boilers per fuel type"];
            row[years[j+1]]=((d[years[j+1]]/d[years[j]])**(-5)) - 1;
          };
          temp_array.push(row);                                           
          });
          data_lst["BOI_Effic"]=tableBOI_Effic_return_data;
          data_lst["boiefficpa"]=temp_array;
          resolve(data_lst);     
        });
      });
  $('#TIBOIshares tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableTIBOIshares=table_constractor(data_TIBOIshares,"TIBOIshares_hide");   
          tableTIBOIshares_return_data =tableTIBOIshares[1];                         
          data_lst["TIBOIshares"]=tableTIBOIshares_return_data;
          resolve(data_lst);     
        });
      });
  $('#DH_Effic tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableDH_Effic=table_constractor(data_DH_Effic,"DH_Effic_hide");   
          tableDH_Effic_return_data =tableDH_Effic[1];
          var temp_array=[];                                              
          tableDH_Effic_return_data.filter(function(d,i){  
          var row = {};
          var years=["2015","2020","2025","2030","2035","2040","2045","2050"];

          for (var j = 0; j < years.length-1; j++) {
            row["fua"]=d["Shares of production per fuel type in industrial boilers (%)"];
            row[years[j+1]]=((d[years[j+1]]/d[years[j]])**(-5)) - 1;
          };
          temp_array.push(row);                                           
          });                         
          data_lst["DH_Effic"]=tableDH_Effic_return_data;
          data_lst["dhefficpa"]=temp_array;
          resolve(data_lst);     
        });
      });
  $('#TIDHshares tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableTIDHshares=table_constractor(data_TIDHshares,"TIDHshares_hide");   
          tableTIDHshares_return_data =tableTIDHshares[1];                         
          data_lst["TIDHshares"]=tableTIDHshares_return_data;
          resolve(data_lst);     
        });
      });
    });
    return promise;
  }

  Energy_Branch = function(){
  var data_lst={};
  var energy_branch = response_data["energy_branch"];
  var data_CENOTHSEC=energy_branch["CENOTHSEC"];
  table_constractor(data_CENOTHSEC,"CENOTHSEC");
  var tableCENOTHSEC_id="CENOTHSEC";             
  var tableCENOTHSEC_return_data;
  var data_CENOTHshares=energy_branch["CENOTHshares"];
  table_constractor(data_CENOTHshares,"CENOTHshares");
  var tableCENOTHshares_id="CENOTHshares";             
  var tableCENOTHshares_return_data;
  var data_CENRFSEC=energy_branch["CENRFSEC"];
  table_constractor(data_CENRFSEC,"CENRFSEC");
  var tableCENRFSEC_id="CENRFSEC";             
  var tableCENRFSEC_return_data;              
  var data_CENRFshares=energy_branch["CENRFshares"];
  table_constractor(data_CENRFshares,"CENRFshares");
  var tableCENRFshares_id="CENRFshares";             
  var tableCENRFshares_return_data; 
  var data_TIOTHratio=energy_branch["TIOTHratio"];
  table_constractor_abs(data_TIOTHratio,"TIOTHratio");
  var tableTIOTHratio_id="TIOTHratio";             
  var tableTIOTHratio_return_data;
  var data_TIOTHshares=energy_branch["TIOTHshares"];
  table_constractor(data_TIOTHshares,"TIOTHshares");
  var tableTIOTHshares_id="TIOTHshares";             
  var tableTIOTHshares_return_data;
  var data_TIRFratio=energy_branch["TIRFratio"];
  table_constractor_abs(data_TIRFratio,"TIRFratio");
  var tableTIRFratio_id="TIRFratio";             
  var tableTIRFratio_return_data;
  var data_TIRFshares=energy_branch["TIRFshares"];
  table_constractor(data_TIRFshares,"TIRFshares");
  var tableTIRFshares_id="TIRFshares";             
  var tableTIRFshares_return_data;
  var data_TOOTHrate=energy_branch["TOOTHrate"];
  table_constractor_abs(data_TOOTHrate,"TOOTHrate");
  var tableTOOTHrate_id="TOOTHrate";             
  var tableTOOTHrate_return_data;
  var data_TORFrate=energy_branch["TORFrate"];
  table_constractor_abs(data_TORFrate,"TORFrate");
  var tableTORFrate_id="TORFrate";             
  var tableTORFrate_return_data;

  var timer;
  var  promise = new Promise(function(resolve, reject) {
  $('#CENOTHSEC tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableCENOTHSEC=table_constractor(data_CENOTHSEC,"CENOTHSEC_hide");   
          tableCENOTHSEC_return_data =tableCENOTHSEC[1];                         
          data_lst["CENOTHSEC"]=tableCENOTHSEC_return_data;
          resolve(data_lst);     
        });
      });
  $('#CENOTHshares tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableCENOTHshares=table_constractor(data_CENOTHshares,"CENOTHshares_hide");   
          tableCENOTHshares_return_data =tableCENOTHshares[1];                         
          data_lst["CENOTHshares"]=tableCENOTHshares_return_data;
          resolve(data_lst);     
        });
      });
  $('#CENRFSEC tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableCENRFSEC=table_constractor(data_CENRFSEC,"CENRFSEC_hide");   
          tableCENRFSEC_return_data =tableCENRFSEC[1];                         
          data_lst["CENRFSEC"]=tableCENRFSEC_return_data;
          resolve(data_lst);     
        });
      });
  $('#CENRFshares tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableCENRFshares=table_constractor(data_CENRFshares,"CENRFshares_hide");   
          tableCENRFshares_return_data =tableCENRFshares[1];                         
          data_lst["CENRFshares"]=tableCENRFshares_return_data;
          resolve(data_lst);     
        });
      });
  $('#TIOTHratio tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableTIOTHratio=table_constractor_abs(data_TIOTHratio,"TIOTHratio_hide");   
          tableTIOTHratio_return_data =tableTIOTHratio[1];                         
          data_lst["TIOTHratio"]=tableTIOTHratio_return_data;
          resolve(data_lst);     
        });
      });
  $('#TIOTHshares tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableTIOTHshares=table_constractor(data_TIOTHshares,"TIOTHshares_hide");   
          tableTIOTHshares_return_data =tableTIOTHshares[1];                         
          data_lst["TIOTHshares"]=tableTIOTHshares_return_data;
          resolve(data_lst);     
        });
      });
  $('#TIRFratio tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableTIRFratio=table_constractor_abs(data_TIRFratio,"TIRFratio_hide");   
          tableTIRFratio_return_data =tableTIRFratio[1];                         
          data_lst["TIRFratio"]=tableTIRFratio_return_data;
          resolve(data_lst);     
        });
      });
    $('#TIRFshares tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableTIRFshares=table_constractor(data_TIRFshares,"TIRFshares_hide");   
          tableTIRFshares_return_data =tableTIRFshares[1];                         
          data_lst["TIRFshares"]=tableTIRFshares_return_data;
          resolve(data_lst);     
        });
      });
    $('#TOOTHrate tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableTOOTHrate=table_constractor_abs(data_TOOTHrate,"TOOTHrate_hide");   
          tableTOOTHrate_return_data =tableTOOTHrate[1];                         
          data_lst["TOOTHrate"]=tableTOOTHrate_return_data;
          resolve(data_lst);     
        });
      });
    $('#TORFrate tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableTORFrate=table_constractor_abs(data_TORFrate,"TORFrate_hide");   
          tableTORFrate_return_data =tableTORFrate[1];                         
          data_lst["TORFrate"]=tableTORFrate_return_data;
          resolve(data_lst);     
        });
      });
    });
    return promise;
  }

  Primary = function(){
  var data_lst={};
  var primary = response_data["primary"];
  var data_PPRODratio=primary["PPRODratio"];
  table_constractor_abs(data_PPRODratio,"PPRODratio");
  var tablePPRODratio_id="PPRODratio";             
  var tablePPRODratio_return_data;
  var data_NIMPratio=primary["NIMPratio"];
  table_constractor_abs(data_NIMPratio,"NIMPratio");
  var tableNIMPratio_id="NIMPratio";             
  var tableNIMPratio_return_data;
  var data_CSratio=primary["CSratio"];
  table_constractor_abs(data_CSratio,"CSratio");
  var tableCSratio_id="CSratio";             
  var tableCSratio_return_data;              


  var timer;
  var  promise = new Promise(function(resolve, reject) {
  $('#PPRODratio tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tablePPRODratio=table_constractor_abs(data_PPRODratio,"PPRODratio_hide");   
          tablePPRODratio_return_data =tablePPRODratio[1];                         
          data_lst["PPRODratio"]=tablePPRODratio_return_data;
          resolve(data_lst);     
        });
      });
  $('#NIMPratio tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableNIMPratio=table_constractor_abs(data_NIMPratio,"NIMPratio_hide");   
          tableNIMPratio_return_data =tableNIMPratio[1];                         
          data_lst["NIMPratio"]=tableNIMPratio_return_data;
          resolve(data_lst);     
        });
      });
  $('#CSratio tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableCSratio=table_constractor_abs(data_CSratio,"CSratio_hide");   
          tableCSratio_return_data =tableCSratio[1];                         
          data_lst["CSratio"]=tableCSratio_return_data;
          resolve(data_lst);     
        });
      });
    });
    return promise;
  }

  Clean_Gas = function(){
  var data_lst={};
  var clean_gas = response_data["clean_gas"];
  var data_CleanGas=clean_gas["CleanGas"];
  table_constractor(data_CleanGas,"CleanGas");
  var tableCleanGas_id="CleanGas";             
  var tableCleanGas_return_data;              
  
  var timer;
  var  promise = new Promise(function(resolve, reject) {
  $('#CleanGas tr td').on("DOMSubtreeModified", function(){
    if (timer) clearTimeout(timer);
        timer = setTimeout(function() { 
          var tableCleanGas=table_constractor(data_CleanGas,"CleanGas_hide");   
          tableCleanGas_return_data =tableCleanGas[1];                         
          data_lst["CleanGas"]=tableCleanGas_return_data;
          resolve(data_lst);     
        });
      });
    }); 
    return promise;
  }

});
  