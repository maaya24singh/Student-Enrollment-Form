var jdbcBaseURL = "http://api.login2explore.com:5577";
var jdbcIRL= "/api/irl";
var jdbcIML = "/api/iml";
var empDBname = "Student";
var empRelationName = "Student-Form";
var token = '90932484|-31949274341795912|90949535';

function saveRecNo2LS(jsonObj){
  var lvData = JSON.parse(jsonObj.data);
  localStorage.setItem('recno', lvData.rec_no);
}

function getEmpAsJsonObj(){
  var stdIDvar = document.getElementById('stdRollno').value;
  var jsonStr = {
      rollno: stdIDvar,
  };
  return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);

    var data = JSON.parse(jsonObj.data).record;
    $("#stdName").val(data.name);
    $("#stdClass").val(data.class);
    $("#stdDOB").val(data.dob);
    $("#stdAddress").val(data.address);
    $("#stdEnrollDate").val(data.enrollDate);

}
function validateAndGetFormData() {
      var stdIdVar = document.getElementById("stdRollno").value;
        if (stdIdVar === "") {
        alert("Employee ID Required Value");
        document.getElementById("stdRollno").focus();
        return "";
      }
      var stdNameVar = document.getElementById("stdName").value;
        if (stdNameVar === "") {
        alert("Employee Name is Required Value");
        document.getElementById("stdName").focus();
        return "";
      }
      var stdClassVar = document.getElementById("stdClass").value;
        if (stdClassVar === "") {
        alert("Salary is Required Value");
        document.getElementById("stdClass").focus();
        return "";
      }
      var stdDOBVar = document.getElementById("stdDOB").value;
        if (stdDOBVar === "") {
        alert("HRA is Required Value");
        document.getElementById("stdDOB").focus();
        return "";
      }
      var stdAddVar = document.getElementById("stdAddress").value;
        if (stdAddVar === "") {
        alert("DA is Required Value");
        document.getElementById("stdAddress").focus();
        return "";
      }
      var stdEnrollVar = document.getElementById("stdEnrollDate").value;
        if (stdEnrollVar === "") {
        alert("Deduction is Required Value");
        document.getElementById("stdEnrollDate").focus();
        return "";
      }
      var jsonStrObj = {
        rollno: stdIdVar,
        name: stdNameVar,
        class: stdClassVar,
        dob:stdDOBVar,
        address:stdAddVar,
        enrollDate:stdEnrollVar,
        };
        return JSON.stringify(jsonStrObj);
}
// This method is used to create PUT Json request.
/*function createPUTRequest(connToken, jsonObj, dbName, relName) {
      var putRequest = "{\n"
      + "\"token\" : \""
      + connToken
      + "\","
      + "\"dbName\": \""
      + dbName
      + "\",\n" + "\"cmd\" : \"PUT\",\n"
      + "\"rel\" : \""
      + relName + "\","
      + "\"jsonStr\": \n"
      + jsonObj
      + "\n"
      + "}";
      return putRequest;
}
function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
      var url = dbBaseUrl + apiEndPointUrl;
      var jsonObj;
      $.post(url, reqString, function (result) {
           jsonObj = JSON.parse(result);
      }).fail(function (result) {
          var dataJsonObj = result.responseText;
          jsonObj = JSON.parse(dataJsonObj);
      });

      return jsonObj;
}*/
function getEmp(){
   var empIDJsonObj = getEmpAsJsonObj();
   console.log(empIDJsonObj);
   var getRequest = createGET_BY_KEYRequest(token, empDBname, empRelationName, empIDJsonObj);
   console.log(getRequest);
   jQuery.ajaxSetup({async: false});
   var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jdbcBaseURL, jdbcIRL);
   jQuery.ajaxSetup({async: true});
   if(resJsonObj.status === 400){
     document.getElementById("save").disabled = false;
     document.getElementById("reset").disabled = false;
     document.getElementById("stdName").focus();
     /*$("#save").prop('disabled',false);
     $("#reset").prop('disabled',false);
     $("#empName").focus();*/
   }else if(resJsonObj.status === 200){
      document.getElementById("stdRollno").disabled = true;
      fillData(resJsonObj);

      document.getElementById("change").disabled = false;
      document.getElementById("reset").disabled = false;
      document.getElementById("stdName").focus();
      /*$("#save").prop('disabled',false);
      $("#reset").prop('disabled',false);
      $("#empName").focus();*/
   }

}
function resetForm() {
      $("#stdRollno").val("");
      $("#stdName").val("");
      $("#stdClass").val("");
      $("#stdClass").val("");
      $("#stdDOB").val("");
      $("#stdAddress").val("");
      $("#stdEnrollDate").val("");
      $("#stdRollno").prop('disabled', false);
      document.getElementById("save").disabled = true;
      document.getElementById("change").disabled = true;
      document.getElementById("reset").disabled = true;
      $("#stdRollno").focus();
}

function saveData(){
  var jsonStr = validateAndGetFormData();
  if (jsonStr === "") {
      return;
  }
  var putReqStr = createPUTRequest(token, jsonStr, empDBname, empRelationName);
  alert(putReqStr);
  jQuery.ajaxSetup({async: false});
  var resultObj = executeCommandAtGivenBaseUrl(putReqStr, jdbcBaseURL, jdbcIML);
  alert(JSON.stringify(resultObj));
  jQuery.ajaxSetup({async: true});
  resetForm();
  $("#stdRollno").focus();
}

function changeData(){
   document.getElementById("change").disabled = true;
   jsonChg = validateAndGetFormData();
   var updateReq = createUPDATERecordRequest(token, jsonChg, empDBname, empRelationName, localStorage.getItem('recno'));
   jQuery.ajaxSetup({async: false});
   var resJsonObj = executeCommandAtGivenBaseUrl(updateReq, jdbcBaseURL, jdbcIML);
   jQuery.ajaxSetup({async: true});
   console.log(resJsonObj);
   resetForm();
   $("#stdRollno").focus();
}
