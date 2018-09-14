var my_ip="http://192.168.4.49:8002";

 var SEa = {
        "SERa": "services",
        "OTa": "other industries",
        "CHa": "chemicals",
        "NFa": "non ferrous",
        "HWHa": "residential white appliances",
        "ISa": "iron and steel",
        "BMa": "building materials",
        "PPa": "paper and pulp",
        "HOUa": "residential heating and cooling",
        "AGRa": "agriculture",
        "OTRa": "other transport and pipeline",
        "FTRa": "freight transport",
        "FDa": "food drink and tobacco",
        "PTRa": "passenger transport",
        "HLHa": "residebtial lighting",
        "REFa": "refineries",
        "HBLa": "residential black appliances",
        "EGa": "equipment goods",
        "NEa": "non energy industry",
        "BUNa": "bunkers"
    } ;
    var USa = {
        "D_Black": "Black appliances",
        "I_ElecSp": "Specific Electricity",
        "I_Steam": "Steam uses",
        "P_Nav": "Transport of passengers navigation",
        "F_Tru": "Freight transport trucks",
        "D_White": "White appliances",
        "B_Nav": "Bunkers Navigation",
        "D_ElecServ": "Electric appliances services",
        "F_OTR": "Freight other transport and pipeline",
        "D_Motor": "Motors and pumping",
        "F_Rai": "Freight transport rail",
        "D_Light": "Lighting",
        "I_Furn": "Furnaces and Kilns",
        "P_Bus": "Public transport of passengers road",
        "I_Raw": "Raw Material",
        "I_ThProc": "Thermal Processing",
        "F_Nav": "Freight transport navigation",
        "D_Green": "Grrenhouses and heat uses agriculture",
        "P_Car": "Private transport of passengers cars and motos",
        "D_HeatCool": "Heating and Cooling",
        "D_OthHeat": "Other heat uses",
        "P_Rai": "Public transport of passengers rail",
        "TOTUS": "Total",
        "P_Met": "Public transport of passengers metro and tram",
        "P_Avi": "Public transport of passengers aviation",
        "I_Heat": "Low Enthalpy Heat",
        "I_ElProc": "Electric Processing"
    };


var select_var;


$(".start").on("click",function(){
  $("#output_table").empty();
  var run_scenario=localStorage.getItem('VarTableData'); 
  var re_data=$.parseJSON(run_scenario);
  var table_data=$.parseJSON(re_data);

  var var_data;
  select_var = $("#variable_lst").val();
  var_data=table_data[select_var]; 
    if(select_var==="venergy"){
      for (var i = 0; i < var_data.length; i++) {
      var_data[i]["SEa"]=SEa[var_data[i]["SEa"]];
      var_data[i]["USa"]=USa[var_data[i]["USa"]];
     }
      table_constractor_abs_4d(var_data,"output_table");
    }
    else if(select_var==="vprocess" || select_var==="vprocessfei"){
      for (var i = 0; i < var_data.length; i++) {
        var_data[i]["SEa"]=SEa[var_data[i]["SEa"]];
        var_data[i]["USa"]=USa[var_data[i]["USa"]];
      }
    	table_constractor_abs_3d(var_data,"output_table");
    }
    else if(select_var==="vfinal"){
      for (var i = 0; i < var_data.length; i++) {
        var_data[i]["SEa"]=SEa[var_data[i]["SEa"]];
     }
    table_constractor_abs_3d(var_data,"output_table");
    }
    else if(select_var==="vdriver"|| select_var==="vservices" || select_var==="vuseful"){
      for (var i = 0; i < var_data.length; i++) {
        var_data[i]["SEa"]=SEa[var_data[i]["SEa"]];
      }
      table_constractor_abs(var_data,"output_table");
    }
    else {
    	table_constractor_abs(var_data,"output_table");
    }
    return false;
  });

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
      {data:Headers[2],readOnly: true,type:"numeric", format:"0,0.00"},
      {data:Headers[3],readOnly: true,type:"numeric", format:"0,0.00"},
      {data:Headers[4],readOnly: true,type:"numeric", format:"0,0.00"},
      {data:Headers[5],readOnly: true,type:"numeric", format:"0,0.00"},
      {data:Headers[6],readOnly: true,type:"numeric", format:"0,0.00"},
      {data:Headers[7],readOnly: true,type:"numeric", format:"0,0.00"},
      {data:Headers[8],readOnly: true,type:"numeric", format:"0,0.00"},
      ],
      colWidths:[140,100,100,100,100,100,100,100,100]
    });
  return hot2;   
}

var table_constractor_abs_3d = function(data,div_id){
  var Headers=Object.keys(data[0]);
  console.log(Headers);
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
      {data:Headers[3],readOnly: true,type:"numeric", format:"0,0.00"},
      {data:Headers[4],readOnly: true,type:"numeric", format:"0,0.00"},
      {data:Headers[5],readOnly: true,type:"numeric", format:"0,0.00"},
      {data:Headers[6],readOnly: true,type:"numeric", format:"0,0.00"},
      {data:Headers[7],readOnly: true,type:"numeric", format:"0,0.00"},
      {data:Headers[8],readOnly: true,type:"numeric", format:"0,0.00"},
      {data:Headers[9],readOnly: true,type:"numeric", format:"0,0.00"},
      ],
      colWidths:[80,80,70,70,70,70,70,70,70,70]          
    });
  return hot2;   
}

var table_constractor_abs_4d = function(data,div_id){
  console.log(data);
  var Headers=Object.keys(data[0]);

  Headers.unshift(Headers.splice(9,1));
  Headers.unshift(Headers.splice(9,1));
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
      {data:Headers[4],readOnly: true,type:"numeric", format:"0,0.00"},
      {data:Headers[5],readOnly: true,type:"numeric", format:"0,0.00"},
      {data:Headers[6],readOnly: true,type:"numeric", format:"0,0.00"},
      {data:Headers[7],readOnly: true,type:"numeric", format:"0,0.00"},
      {data:Headers[8],readOnly: true,type:"numeric", format:"0,0.00"},
      {data:Headers[9],readOnly: true,type:"numeric", format:"0,0.00"},
      {data:Headers[10],readOnly: true,type:"numeric", format:"0,0.00"},
      ],
      colWidths:[80,80,80,70,70,70,70,70,70,70,70] 
    });
  return hot2;   
}