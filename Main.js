//All Variables

var EmailSubReminder1;
var EmailContentReminder;
var EmailSubReminder2;
var EmailContentReminder2;
var EmailSubReminder3;
var EmailContentReminder3;
var EmailSubEscalation1;
var EmailContentEscalation1;
var EmailSubEscalation2;
var EmailContentEscalation2;
var EmailSubEscalation3;
var EmailContentEscalation3;
var empIDColName;
var empIDColNum;
var empNameColName;
var empNameColNum;
var empEmailIDColName;
var empEmailIDColNum;
var managerNameColName;
var managerNameColNum;
var managerEmailIDColName;
var managerEmailIDColNum;
var joiningDateColName;
var joiningDateColNum;
var delivColName;
var delivColNum;
var respColName;
var respColNum;
var joiningDateColName;
var joiningDateColNum;
var reminder1ColName;
var reminder1ColNum;
var reminder2ColName;
var reminder2ColNum;
var reminder3ColName;
var reminder3ColNum;
var escalation1ColName;
var escalation1ColNum;
var escalation2ColName;
var escalation2ColNum;
var escalation3ColName;
var escalation3ColNum;
var regularMail;
//shows a drop down menu
function onOpen() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var menu = [
        { name: "Step: SendMail", functionName: "sendEmails" },
        { name: "Step: Check Responses", functionName: "checkResponses" },
        { name: "Step: Reminder Check", functionName: "escalationStatusCheck" },
        { name: "Step: Get Summary", functionName: "getSummary" }
    ];

    ss.addMenu("➪ FeedEx", menu);
}

//Sends Summary Emails at the End of the Day
function getSummary() {
    var MySpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet4 = MySpreadSheet.getSheetByName("Settings");
    var data4 = sheet4.getRange(2, 1, sheet4.getLastRow(), 100).getValues();
     var summaryEmail = data4[11][1];
  //Logger.log(reminderCC);
    var todayDate = Utilities.formatDate(new Date(), "GMT", "dd-MM-yyyy");
    var MySpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet1 = MySpreadSheet.getSheetByName("Logs");
    sheet1.appendRow([new Date(), "GET SUMMARY"]);
    var sheet = MySpreadSheet.getSheetByName("Summary");
    var data = sheet.getRange(2, 1, sheet.getLastRow(), 4).getValues();
    var array1 = [];
    var array2 = [];
    var array3 = [];
    for (var row = 0; row < data.length; row++) {

        var data2 = new Date(data[row][0]); 
        var data3 = Utilities.formatDate(data2, "GMT", "dd-MM-yyyy");
        var todayDate = Utilities.formatDate(new Date(), "GMT", "dd-MM-yyyy");
        Logger.log(todayDate);
        
      var nwdate= new Date(data2);
      nwdate.setDate(nwdate.getDate()+1);
      
      nwdate = Utilities.formatDate(nwdate, "GMT", "dd-MM-yyyy");
      Logger.log(nwdate);
      var todayParts = todayDate.split('-');
      var parts = data3.split('-');
      parts[0]++;
      var str = "Summary Of Emails Sent On : " + todayDate + "\n";
       if (todayDate===nwdate ) {
            Logger.log("hey");
            array1.push(data[row][1].toString());
            array2.push(data[row][2].toString());
            array3.push(data[row][3].toString());
        }
    }
    if (array1.length > 0) {
        for (var i = 0; i < array1.length; i++) {
            str = str + "\nEmployee Name : " + array1[i] + "\nManager Name : " + array2[i] + "\nMail Type : " + array3[i] + "\n";
        }
        Logger.log(str);
       GmailApp.sendEmail(summaryEmail, "FeedEx Email Summary", str);
    }
}

//Get Email Content and subject
function getEmails() {

    var MySpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = MySpreadSheet.getSheetByName("Email_Content");
    var data = sheet.getRange(2, 1, sheet.getLastRow(), 100).getValues();
    for (var row = 0; row < data.length; row++) {
        for (var i = 0; i < 7; i++) {
            switch (data[row][i]) {
                case ("1st_Reminder"):
                    EmailSubReminder1 = data[row][i + 1];
                    EmailContentReminder1 = data[row][i + 2];
                    break;

                case ("2nd_Reminder"):
                    EmailSubReminder2 = data[row][i + 1];
                    EmailContentReminder2 = data[row][i + 2];
                    break;

                case ("3rd_Reminder"):
                    EmailSubReminder3 = data[row][i + 1];
                    EmailContentReminder3 = data[row][i + 2];
                    break;

                case ("1st_Escalation"):
                    EmailSubEscalation1 = data[row][i + 1];
                    EmailContentEscalation1 = data[row][i + 2];
                    break;

                case ("2nd_Escalation"):
                    EmailSubEscalation2 = data[row][i + 1];
                    EmailContentEscalation2 = data[row][i + 2];
                    break;

                case ("3rd_Escalation"):
                    EmailSubEscalation3 = data[row][i + 1];
                    EmailContentEscalation3 = data[row][i + 2];
                    break;

            }

        }
    }
    Logger.log(EmailSubEscalation1);
}

function getColoumnName() {
    var MySpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = MySpreadSheet.getSheetByName("Employee_List");
    var data = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues();
    for (var row = 0; row < data.length; row++) {
        for (var i = 0; i < 24; i++) {

            function getChar(i) {
                var ss = SpreadsheetApp.getActiveSpreadsheet();
                var sheet = ss.getSheets()[0];
                var range1 = sheet.getRange(1, i + 1);
                var num1 = range1.getColumn();
                var temp, letter = '';
                while (num1 > 0) {
                    temp = (num1 - 1) % 26;
                    letter = String.fromCharCode(temp + 65) + letter;
                    num1 = (num1 - temp - 1) / 26;
                }
                return letter;
            }
            switch (data[row][i].toString()) {

                case ("Emp_ID"):
                    empIDColName = getChar(i);
                    empIDColNum = i;
                    Logger.log(empIDColNum);
                    Logger.log(empIDColName);
                    break;

                case ("Emp_Name"):
                    empNameColName = getChar(i);
                    empNameColNum = i;
                    break;

                case ("Emp_Email_ID"):
                    empEmailIDColName = getChar(i);
                    empEmailIDColNum = i;
                    break;

                case ("Manager_Name"):
                    managerNameColName = getChar(i);
                    managerNameColNum = i;
                    break;

                case ("Manager_Email_ID"):
                    managerEmailIDColName = getChar(i);
                    managerEmailIDColNum = i;
                    break;

                case ("Joining_Date"):
                    joiningDateColName = getChar(i);
                    joiningDateColNum = i;
                    break;

                case ("Delivery_Status"):
                    delivColName = getChar(i);
                    delivColNum = i;
                    break;

                case ("Response_Status"):
                    respColName = getChar(i);
                    respColNum = i;
                    break;

                case ("Joining_Date"):
                    joiningDateColName = getChar(i);
                    joiningDateColNum = i;
                    break;

                case ("1st_Reminder"):
                    reminder1ColName = getChar(i);
                    reminder1ColNum = i;
                    break;

                case ("2nd_Reminder"):
                    reminder2ColName = getChar(i);
                    reminder2ColNum = i;
                    break;

                case ("3rd_Reminder"):
                    reminder3ColName = getChar(i);
                    reminder3ColNum = i;
                    break;

                case ("1st_Escalation"):
                    escalation1ColName = getChar(i);
                    escalation1ColNum = i;
                    break;

                case ("2nd_Escalation"):
                    escalation2ColName = getChar(i);
                    escalation2ColNum = i;
                    break;

                case ("3rd_Escalation"):
                    escalation3ColName = getChar(i);
                    escalation3ColNum = i;
                    Logger.log(escalation3ColName);
                    Logger.log(escalation3ColNum);
                    break;

            }
        }
    }
}

function escalationStatusCheck() {
    var todayDate = Utilities.formatDate(new Date(), "GMT", "dd-MM-yyyy");
    var MySpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet2 = MySpreadSheet.getSheetByName("Logs");
    sheet2.appendRow([new Date(), "ESCALATION CHECK"]);
    var sheet4 = MySpreadSheet.getSheetByName("Settings");
    var data4 = sheet4.getRange(2, 1, sheet4.getLastRow(), 100).getValues();
    var reminderCC = data4[8][1];
    var escalationCC = data4[9][1];
     //Logger.log(reminderCC);
    var MySpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet1 = MySpreadSheet.getSheetByName("Summary");
    getEmails();
    getColoumnName();
    var MySpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = MySpreadSheet.getSheetByName("Employee_List");
    var sheet3=MySpreadSheet.getSheetByName("Email_Content");
    var data3=sheet3.getRange(2, 1, sheet3.getLastRow(), 100).getValues();
    var data = sheet.getRange(2, 1, sheet.getLastRow(), 100).getValues();
     
    var todayDate = Utilities.formatDate(new Date(), "GMT", "MM/dd/yyyy");
     
    for (var row = 0; row < data.length; row++) {
        var schedule = data[row][joiningDateColNum];
        var diff = [];
        var respStatus = data[row][respColNum];
        var delivStatus = data[row][delivColNum];
        var empName = data[row][empNameColNum].toString();
        var empID = data[row][empIDColNum];
        var managerName = data[row][managerNameColNum];
        var managerEmailID = data[row][managerEmailIDColNum];
        var managerURL = "http://goo.gl/forms/w2o1oIOHEj";
        var dueDate = data[row][17];
        //var SubjectForEmp;
         if(dueDate!==undefined&&empName!=="" ){
        var perDate = Utilities.formatDate(new Date(dueDate.setDate(dueDate.getDate()+30)), "GMT", "MM-yyyy");
        var oldDate = Utilities.formatDate(new Date(dueDate.setDate(dueDate.getDate()-150)), "GMT", "MM-yyyy");
           
//        Logger.log(perDate);
//        Logger.log(oldDate);
      }
    //  Logger.log(SubjectForEmp);
     // var RegularSubjectForEmp = data3[0][1]+empName+" From " + oldDate + " to "+ perDate ;
      var Reminder1SubjectForEmp = data3[1][1]+empName+" From " + oldDate + " to "+ perDate ;
      var Reminder2SubjectForEmp = data3[2][1]+empName+" From " + oldDate + " to "+ perDate ;
      var Reminder3SubjectForEmp = data3[3][1]+empName+" From " + oldDate + " to "+ perDate ;
      var Escalation1SubjectForEmp = data3[4][1]+empName+" From " + oldDate + " to "+ perDate ;
      var Escalation2SubjectForEmp = data3[5][1]+empName+" From " + oldDate + " to "+ perDate ;
      var Escalation3SubjectForEmp = data3[6][1]+empName+" From " + oldDate + " to "+ perDate ;
        if (respStatus === "Response Not Received" && delivStatus === "Delivered") {
            var time = (new Date().getTime()) / 3600000;
           
            
           // diff = (time - schedule.getTime()) / 3600000;
          EmailContentReminder1 = data3[1][2]+' '+managerName+', \n\n';
          EmailContentReminder1 = EmailContentReminder1+data3[1][3]+empName +data3[1][4]+data3[1][5]+'\n\n\n'+managerURL+'\n\n'+data3[1][6]+'\n'+data3[1][7]+'\n'+data3[1][8]+'\n'+data3[1][9]+'\n'+data3[1][10]+'\n'+data3[1][11];
          
          EmailContentReminder2 = data3[2][2]+' '+managerName+', \n\n';
          EmailContentReminder2 = EmailContentReminder2+data3[2][3]+empName +data3[2][4]+data3[2][5]+'\n\n\n'+managerURL+'\n\n'+data3[2][6]+'\n'+data3[2][7]+'\n'+data3[2][8]+'\n'+data3[2][9]+'\n'+data3[2][10]+'\n'+data3[2][11];
          //Logger.log(reminder2Mail);  
          
          EmailContentReminder3 = data3[3][2]+' '+managerName+', \n\n';
          EmailContentReminder3 = EmailContentReminder3+data3[3][3]+empName +data3[3][4]+data3[3][5]+'\n\n\n'+managerURL+'\n\n'+data3[3][6]+'\n'+data3[3][7]+'\n'+data3[3][8]+'\n'+data3[3][9]+'\n'+data3[3][10]+'\n'+data3[3][11];        // Logger.log(reminder3Mail);
          
          EmailContentEscalation1 = data3[4][2]+' '+managerName+', \n\n';
          EmailContentEscalation1 = EmailContentEscalation1+data3[4][3]+empName +data3[4][4]+data3[4][5]+'\n\n\n'+managerURL+'\n\n'+data3[4][6]+'\n'+data3[4][7]+'\n'+data3[4][8]+'\n'+data3[4][9]+'\n'+data3[4][10]+'\n'+data3[4][11];
         // Logger.log(escalation1Mail);          
          
          EmailContentEscalation2 = data3[5][2]+' '+managerName+', \n\n';
          EmailContentEscalation2 = EmailContentEscalation2+data3[5][3]+empName+data3[5][4]+data3[5][5]+'\n\n\n'+managerURL+'\n\n'+data3[5][6]+'\n'+data3[5][7]+'\n'+data3[5][8]+'\n'+data3[5][9]+'\n'+data3[5][10]+'\n'+data3[5][11];
          //Logger.log(escalation1Mail);          
          
          EmailContentEscalation3 = data3[6][2]+' '+managerName+', \n\n';
          EmailContentEscalation3 = EmailContentEscalation3+data3[6][3]+empName+data3[6][4]+data3[6][5]+'\n\n\n'+managerURL+'\n\n'+data3[6][6]+'\n'+data3[6][7]+'\n'+data3[6][8]+'\n'+data3[6][9]+'\n'+data3[6][10]+'\n'+data3[6][11];
          
          //captures and formats the dates for reminder and escalation mails
          var Reminder1 = (data[row][reminder1ColNum]);
          Reminder1 = Utilities.formatDate(new Date(Reminder1.setDate(Reminder1.getDate()+1)), "GMT", "dd-MM-yyyy");
          var Reminder2 = (data[row][reminder2ColNum]);
          Reminder2 = Utilities.formatDate(new Date(Reminder2.setDate(Reminder2.getDate()+1)), "GMT", "dd-MM-yyyy");
          var Reminder3 = (data[row][reminder3ColNum]);
          Reminder3 = Utilities.formatDate(new Date(Reminder3.setDate(Reminder3.getDate()+1)), "GMT", "dd-MM-yyyy");
          var Escalation1 = (data[row][escalation1ColNum]);
          Escalation1 = Utilities.formatDate(new Date(Escalation1.setDate(Escalation1.getDate()+1)), "GMT", "dd-MM-yyyy");
          var Escalation2 = (data[row][escalation2ColNum]);
          Escalation2 = Utilities.formatDate(new Date(Escalation2.setDate(Escalation2.getDate()+1)), "GMT", "dd-MM-yyyy");
          var Escalation3 = (data[row][escalation3ColNum]);
          Escalation3 = Utilities.formatDate(new Date(Escalation3.setDate(Escalation3.getDate()+1)), "GMT", "dd-MM-yyyy");
          
          var timeNow =  Utilities.formatDate(new Date(), "GMT", "dd-MM-yyyy");
         
          //compares dates and sends the reminder and escalation mails on a specific day
          if (timeNow === Escalation3) {
            GmailApp.sendEmail(managerEmailID, Escalation3SubjectForEmp, EmailContentEscalation3,{cc:escalationCC});
            sheet1.appendRow([todayDate, empName, managerName, "3rd Escalation Mail"]);
          } else if (timeNow === Escalation2) {
            GmailApp.sendEmail(managerEmailID, Escalation2SubjectForEmp, EmailContentEscalation2,{cc:escalationCC});
            sheet1.appendRow([todayDate, empName, managerName, "2nd Escalation Mail"]);
          } else if (timeNow === Escalation1) {
            GmailApp.sendEmail(managerEmailID, Escalation1SubjectForEmp, EmailContentEscalation1,{cc:escalationCC});
            sheet1.appendRow([todayDate, empName, managerName, "1st Escalation Mail"]);
          } else if (timeNow === Reminder3) {
            GmailApp.sendEmail(managerEmailID,  Reminder3SubjectForEmp, EmailContentReminder3,{cc:reminderCC});
            sheet1.appendRow([todayDate, empName, managerName, "3rd Reminder Mail"]);
          } else if (timeNow === Reminder2) {
            GmailApp.sendEmail(managerEmailID,  Reminder2SubjectForEmp, EmailContentReminder2,{cc:reminderCC});
            sheet1.appendRow([todayDate, empName, managerName, "2nd Reminder Mail"]);
          } else if (timeNow === Reminder1) {
            GmailApp.sendEmail(managerEmailID,  Reminder1SubjectForEmp, EmailContentReminder1,{cc:reminderCC});
            sheet1.appendRow([todayDate, empName, managerName, "1st Reminder Mail"]);
          }
        }
    }
}

function checkResponses() {
    var date = new Date();
    var todayDate = Utilities.formatDate(new Date(), "GMT", "dd-MM-yyyy");
    getEmails();
    getColoumnName();
    var MySpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet1 = MySpreadSheet.getSheetByName("Logs");
    sheet1.appendRow([date, "CHECK RESPONSES"]);

    var ss1 = SpreadsheetApp.openByUrl(
        'https://docs.google.com/spreadsheets/d/1uASRESIVv6PxfBrICicRrjaQq5X8j_JpZVV8MEAUI-Y/edit#gid=2115900990').getActiveSheet();
    var data1 = ss1.getRange(2, 1, ss1.getLastRow(), 100).getValues();
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    var datas = sheet.getRange(2, 1, sheet.getLastRow(), 100).getValues();
    for (var row = 0; row < datas.length; row++) {
        for (var row1 = 0; row1 < data1.length; row1++) {
            var EmpName = datas[row][empNameColNum].toString().toLowerCase();
            var ManagerName = datas[row][managerNameColNum];
         //   Logger.log(EmpName);
             var EmpName1 = data1[row1][1].toString().toLowerCase();
            
            var delivStatus = datas[row][delivColNum];
            var respStatus = datas[row][respColNum];
//            Logger.log(EmpName1);
            if (EmpName1 === EmpName && delivStatus === "Delivered") {
                ss.getRange(respColName + (row + 2)).setValue("Response Received");
               // sendResponseReceivedMail();  
              break;
              
            }  
          if (EmpName1 !== EmpName && EmpName1 !== "" && delivStatus === "Delivered") {
                ss.getRange(respColName + (row + 2)).setValue("Response Not Received");
              
            }
        }
    }
  
}




//Sending mails to recipents on their respective appraisal dates

function sendEmails() {
    getColoumnName();
    var MySpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = MySpreadSheet.getSheetByName("Employee_List");
    var sheet2 = MySpreadSheet.getSheetByName("Settings");
    var data2 = sheet2.getRange(2, 1, sheet2.getLastRow(), 100).getValues();
    var regularCC = data2[7][1];
    var sheet1 = MySpreadSheet.getSheetByName("Email_Content");
    var data1 = sheet1.getRange(2, 1, sheet1.getLastRow(), 100).getValues();
    var data = sheet.getRange(2, 1, sheet.getLastRow(), 100).getValues();
    for (var row = 0; row < data.length; row++) {
        var dueDate = (data[row][17]);
        var empID = data[row][empIDColNum];
      
        var todayDate = Utilities.formatDate(new Date(), "GMT", "dd-MM-yyyy");
        var status = data[row][delivColNum];
        var ManagerID = data[row][managerEmailIDColNum];
        var ManagerName = data[row][managerNameColNum];
       // Logger.log(ManagerID);
        var managerURL = "http://goo.gl/forms/w2o1oIOHEj";
        var employeeURL = "http://goo.gl/forms/y9aH2IlSm9";
        var EmpName = data[row][empNameColNum];
      
      if(dueDate!==undefined&&EmpName!=="" ){
          var dueDate1 = Utilities.formatDate(new Date(dueDate.setDate(dueDate.getDate()+1)), "GMT", "dd-MM-yyyy");
      Logger.log(dueDate1);
      }
      
      var perDate;
  
      if(dueDate!==undefined&&EmpName!=="" ){
         perDate = Utilities.formatDate(new Date(dueDate.setDate(dueDate.getDate()+30)), "GMT", "MM-yyyy");
        var oldDate = Utilities.formatDate(new Date(dueDate.setDate(dueDate.getDate()-150)), "GMT", "MM-yyyy");

      }
        var EmpID = data[row][empEmailIDColNum];
      regularMail = data1[0][2]+' '+ManagerName+', \n\n';
      regularMail = regularMail+data1[0][3]+EmpName +'. '+data1[0][4]+EmpName+data1[0][5]+'\n\n\n'+data1[0][6]+'\n\n'+managerURL+'\n\n'+data1[0][7]+'\n'+data1[0][8]+'\n'+data1[0][9]+'\n'+data1[0][10]+'\n'+data1[0][11]+'\n'+data1[0][12];
  //    Logger.log(regularMail);
 
      var MessageForEmp = "Dear " + EmpName + "," + "\n\n" + "It is time to give your valuable feedback about your performance at Techchefs." + "\n" + "We, at TechChefs, collect performance feedback on our employees, every 6 months.This will help both yourself and TechChefs to improve and excel continously." + "\n\n" + "We request you to spare a few minutes for this.You can give your feedback by clicking on the link below :" + "\n\n\n" + employeeURL + "\n\n\n" + "Please Rate As Per Following:\n\n\n" + "1 : Doesnt Meet Expectations\n" + "2 : Sometimes Meet Expectations\n" + "3 : Consistently Meets Expectations\n" + "4 : Exceeds Expectaions\n" + "5 : Significantly Exceeds Expectations";
        var SubjectForEmp = data1[0][1]+EmpName + " From " + oldDate + " to "+ perDate;
     // Logger.log(SubjectForEmp);
        var SubjectForManager =  data1[0][1] + EmpName + " From " + oldDate + " to "+ perDate;
   //   Logger.log(SubjectForManager);
        if (status !== "Delivered" && todayDate===dueDate1 && EmpName !== "") {
   var delivStatus = dispatchDraft_(ManagerID, SubjectForManager,regularMail,regularCC, EmpID, SubjectForEmp, MessageForEmp, ManagerName, EmpName);
  sheet.getRange(delivColName + (row + 2)).setValue(delivStatus);
        }
    }
}


function dispatchDraft_(ManagerID, SubjectForManager,regularMail,regularCC, EmpID, SubjectForEmp, MessageForEmp, ManagerName, EmpName) {

    try {

      GmailApp.sendEmail(ManagerID, SubjectForManager, regularMail,{cc:regularCC});
        var MySpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
        var sheet = MySpreadSheet.getSheetByName("Summary");
        var todayDate = Utilities.formatDate(new Date(), "GMT", "MM/dd/yyyy");
        GmailApp.sendEmail(EmpID, SubjectForEmp, MessageForEmp,{cc:regularCC});
        sheet.appendRow([todayDate, EmpName, ManagerName, "FeedBack Mail"]);
        return "Delivered";
        // MySpreadSheet.toast("Message is Delivered");
    } catch (e) {
        return e.toString();
    }
}

function sendResponseReceivedMail(){
   var MySpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
   var sheet = MySpreadSheet.getSheetByName("Settings");
   var data = sheet.getRange(2, 1, sheet.getLastRow(), 100).getValues();
    var ss1 = SpreadsheetApp.openByUrl(
        'https://docs.google.com/spreadsheets/d/1uASRESIVv6PxfBrICicRrjaQq5X8j_JpZVV8MEAUI-Y/edit#gid=2115900990').getActiveSheet();
      var data1= ss1.getRange(2, 1, ss1.getLastRow(), 100).getValues();
   Logger.log(data1[1][1]);
  var responseRecipient =  data[12][1];
   var link = "https://docs.google.com/spreadsheets/d/1uASRESIVv6PxfBrICicRrjaQq5X8j_JpZVV8MEAUI-Y/edit#gid=2115900990";
   var empLink = "https://docs.google.com/spreadsheets/d/16O_RAUs78sakrrS8wbOBm4S4UYdh7R0_0NDeYf7X8fI/edit#gid=470900488";
  var array1=[];
  for (var row = 0; row < data1.length; row++) {
        var date = new Date(data1[row][0]); 
        var data3 = Utilities.formatDate(date, "GMT", "dd-MM-yyyy");
        var todayDate = Utilities.formatDate(new Date(), "GMT", "dd-MM-yyyy");
        Logger.log(todayDate);
        Logger.log(data3);
    var str = "Managers' Responses received for the following Employees  on : " + todayDate + "\n";
    if(todayDate===data3){
    Logger.log("Today");
    array1.push(data1[row][1].toString());
    }
    //Logger.log(array1);
    if(array1.length>0){
      for (var i = 0; i < array1.length; i++) {
            str = str + "\nEmployee Name : " + array1[i] + "\n";
    }
  }
}
 Logger.log(str +"\n\n You can view the managers' responses for the employees in the link below \n\n"+link+"\n\n The Employees' Self Appraisal details can be viewed in the link below\n\n"+empLink);
    GmailApp.sendEmail(responseRecipient,"Summary of Feedback Responses Received for the Day ",str +"\n\n\n You can view the managers' responses for the employees in the link below \n\n"+link+"\n\n The Employees' Self Appraisal details can be viewed in the link below\n\n"+empLink);
}
