/*
SOURCE OF DATA - 2019 DOE High School Directory
https://data.cityofnewyork.us/Education/2019-DOE-High-School-Directory/uq7m-95z8
*/

//anchor
$('.js-anchor-link').click(function(e){
  e.preventDefault();
  var target = $($(this).attr('href'));
  if(target.length){
    var scrollTo = target.offset().top;
    $('body, html').animate({scrollTop: scrollTo+'px'}, 800);
  }
});

function submitF() {
var n = 0; //count number of schools shown
  
  var list = document.getElementById("myList"); //removes all previous results
   while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
   }


// request variable assign a new XMLHttpRequest object to it
var request = new XMLHttpRequest();

//open request based upon url
request.open('GET', 'https://data.cityofnewyork.us/resource/uq7m-95z8.json', true);

   //ASSIGN INPUT VALUES TO VARIABLES =========================================================================================================================================================================
 var bor =  document.getElementById("selectBorough").value; //borough
  var borbool = false; // bool of school borough
  
  var un = document.getElementById("n").value.toUpperCase().trim();//neighborhood
  var nbool = false; // bool for neighborhood
  
  
  var uinter = document.getElementById("i").value.toUpperCase().trim();//interest
  var interbool = false; // bool for interest
  
  
  var de = document.getElementById("de").value;//dilpoma endorsement
  var debool; // bool of dilpoma endorsement
  
  var ell = document.getElementById("ell").value; //ell variable
  var ellbool = false; //bool of ell
  
  var lang = document.getElementById("lang").value; //language variable
  var langbool = false; //bool of lang
  
  var ss =  document.getElementById("ss").value; //shared space
  var ssbool =false;//shared space bool
  
  var ua =  document.getElementById("ap").value.toUpperCase().trim(); //AP classes
  var apbool = false;//shared space bool
  
     var max = parseFloat(document.getElementById("max").value.trim()); //max value
      var min = parseFloat(document.getElementById("min").value.trim()); //min value
  
  var uc = document.getElementById("club").value.toUpperCase().trim();//club
  var cbool = false;
  
  
  var st = document.getElementById("typeS").value;//sport type
  var us = document.getElementById("sport").value.toUpperCase().trim();//sport
  var sbool = false;
 
  /*
  var utrain = document.getElementById("train").value.toUpperCase().trim();//train type
  var trainbool = false; // bool for train
  
  var ubus = document.getElementById("bus").value.toUpperCase().trim();//bus type
  var busbool = false; // bool for bus
  */
  
// load it
request.onload = function () {
  
 var data = JSON.parse(this.response); // Begin accessing JSON data here
var  str_data = JSON.stringify(data);
  
  
  //MAKE SURE THAT THE INPUTS ARE CORRECT ========================================================================================================================================================
 if(un.length == 0 || uinter.length == 0 || ua.length == 0 || max.length == 0 || min.length == 0 || uc.length == 0 || us.length == 0) //if any texboxes are empty
  alert("Please make sure to fill eveything in the textboxes");
  
  
  else if(typeof max != "number" && typeof min != "number") //check if min/max inputs are values
  alert("Please input whole numbers in the max/min textbox");
  
  else if(max%1 != 0 || min%1 != 0) //if max or min are whole numbers or not
  alert("Please input whole numbers for max and/or min");
    
 else if(max > 5838) //if max is too large
   alert("You exceeded the maximum value. Please try to input the maximum value again.");
  
  else if(max < min) // if min is greater than max
    alert("The minimum value is shouldn't be greater than the maximum value. Please try to input the maximum or minimum value again.");
  
  else if(min <= -1 ) //if min is a negative number
    alert("The minimum value can't be a negative value.");
  
  else if(min < 135) //if min is too low
    alert("The minimum value is too low. Please try to input the minimum value again.");
    
  
  else{ //if all inputs are valid, then do search======================================================================================================================================
 data.forEach((school) => { //go through all schools
   

   
      //SET BOOLS BASED UPON BETWEEN SELECTION/ INPUTS AND CURRENT GIVEN SCHOOL============================================================================================================== 
   if(bor == "all") //check if select all is in for borough selection input
     borbool = true;
   else
     borbool = (school.boro == bor);
   
   
   
      //set bool for neighborhood
   if(un == "ANY" ) //set bool for neighborhood for NONE
   nbool = true;
   else
     nbool = (un == school.neighborhood.toUpperCase() );
   
   
   
   
//set bool for career interest
   if(uinter == "ANY" ) //set bool for neighborhood for NONE
   interbool = true;
   else if( CheckUndefined_Search(school.interest1, uinter) ) //check if school interest1 exist, then check if interest keyword can be found in interest1
     interbool = true;
   else if( CheckUndefined_Search(school.interest2, uinter) ) //check if school interest2 exist, then check if interest keyword can be found in interest2
     interbool = true;
   else if( CheckUndefined_Search(school.interest3, uinter) ) //check if school interest3 exist, then check if interest keyword can be found in interest3
     interbool = true;
   else if( CheckUndefined_Search(school.interest4, uinter) ) //check if school interest4 exist, then check if interest keyword can be found in interest4
     interbool = true;
   else if( CheckUndefined_Search(school.interest5, uinter) ) //check if school interest5 exist, then check if interest keyword can be found in interest5
     interbool = true;
   else if( CheckUndefined_Search(school.interest6, uinter) ) //check if school interest6 exist, then check if interest keyword can be found in interest6
     interbool = true;
   else if( CheckUndefined_Search(school.interest7, uinter) ) //check if school interest7 exist, then check if interest keyword can be found in interest7
     interbool = true;
   else if( CheckUndefined_Search(school.interest8, uinter) ) //check if school interest8 exist, then check if interest keyword can be found in interest8
     interbool = true;
   else if( CheckUndefined_Search(school.interest9, uinter) ) //check if school interest9 exist, then check if interest keyword can be found in interest9
     interbool = true;
   else if( CheckUndefined_Search(school.interest10, uinter) ) //check if school interest10 exist, then check if interest keyword can be found in interest10
     interbool = true;
   else
     interbool = false;
   
   
   
   var cde = school.diplomaendorsements; //current diploma endorement data
    if(de == "dm") //doesn't matter
     debool = true;
    else if(de == "none" && cde == undefined) //set bool for dilpoma endorsement for none
     debool = true;
    else if(de == "Arts, CTE, Math, Science" && cde != undefined)
     debool = true;
    else if(de == "Math, Science" && cde != undefined)
     debool = ( cde.search("Math") != -1 && cde.search("Science") != -1 ); 
    else if(de == "Arts, Math, Science" && cde != undefined)
     debool = ( cde.search("Math") != -1 && cde.search("Science") != -1 && cde.search("Arts") != -1 ); 
    else if(de == "Arts, CTE" && cde != undefined)
     debool = ( cde.search("Arts") != -1 && cde.search("CTE") != -1 ); 
    else if(de == "CTE, Math, Science" && cde != undefined)
     debool = ( cde.search("Math") != -1 && cde.search("Science") != -1 && cde.search("CTE") != -1 ); 
    else if(de == "Math" && cde != undefined) 
     debool = ( cde.search(de)  != -1); 
    else if(de == "CTE" && cde != undefined) 
     debool = ( cde.search("CTE")  != -1);
    else if(de == "Science" && cde != undefined) 
     debool = ( cde.search("Science")  != -1);
    else if(de == "Arts" && cde != undefined) 
     debool = ( cde.search("Arts")  != -1);
    else
      debool = false;
   

  
   //set ELL bool
   ellbool = selectionF(school.ell_programs, ell);
   
   
   //Language Classes set bool
   langbool = selectionF(school.language_classes, lang);
   
    
 if(ss == "yes")  // assign bool based upon shared school input
  ssbool = (school.shared_space == "Yes"); //yes
  else if (ss == "no")
  ssbool = (school.shared_space == "No");  //no
   else 
   ssbool = true; //doesn't matter
    
   
   
   
      // assign bool based upon AP input
   apbool = textF(school.advancedplacement_courses, ua);
   
   
   
   
    var ts = parseFloat(school.total_students);  //convert current school total students into integer and store in variable
   
   
   
   
   //set bool for club for NONE
   cbool = textF(school.extracurricular_activities, uc);

   
   
   
      if(us == "ANY" && st == "Any") //set bool for sports for NONE
   sbool = true;
   else if(school.psal_sports_boys != undefined && st == "boys"){
   var ucbs = school.psal_sports_boys.toUpperCase();
     sbool = (ucbs.search(us) != -1);   
   }
   else if(school.psal_sports_girls != undefined && st == "girls"){
     var ucgs = school.psal_sports_girls.toUpperCase();
     sbool = (ucgs.search(us) != -1);   
   }
   else if(school.psal_sports_coed != undefined && st == "coed"){
     var uccoeds = school.psal_sports_coed.toUpperCase();
     sbool = (uccoeds.search(us) != -1);   
   }
   else if(school.psal_sports_boys != undefined && st == "any" && school.psal_sports_boys.toUpperCase().search(us) != -1){
     sbool = true;
   }
   else if(school.psal_sports_girls != undefined && st == "any" && school.psal_sports_girls.toUpperCase().search(us) != -1){
     sbool = true;
   }
   else if(school.psal_sports_coed != undefined && st == "any" && school.psal_sports_coed.toUpperCase().search(us) != -1){
     sbool = true;
   }
   else if(school.school_sports != undefined && st == "any" && school.school_sports.toUpperCase().search(us) != -1){
     sbool = true;
   }
  else
    sbool = false; //when current school sports is undefined
   
   
   /*
   
   //set bool for train
      if(utrain == "ANY" ) //set bool for trian for NONE
   trainbool = true;
   else if(school.subway != undefined){ //make shure current school train is defined
   var uctrain = school.subway.toUpperCase(); // make current train uppercase
     trainbool = (uctrain.search(utrain) != -1); 
   }
  else
    trainbool = false; //when current school train is undefined
   
   
   
   
      //set bool for bus
      if(ubus == "ANY" ) //set bool for bus for NONE
   busbool = true;
   else if(school.ubs != undefined){ //make shure current school bus is defined
   var ucbus = school.subway.toUpperCase(); // make current bus uppercase
     busbool = (ucbus.search(ubus) != -1); 
   }
  else
     busbool = false; //when current school bus is undefined
   */
   
   
 
  if(borbool && nbool && interbool && debool && ellbool && langbool && ssbool && apbool  && ts <= max && ts >= min && cbool && sbool ){ //conditions based upon inputs =============================================

    
  var x = document.createElement("DETAILS");
  document.getElementById("myList").appendChild(x); //reference where to add in list

        //school name
  var sn = document.createElement("SUMMARY");
  sn.className = "btn btn-outline-primary";
  sn.innerHTML = school.school_name;
  
    
           //school location box
  var slb = document.createElement("DETAILS");
    //school location label
  var sll = document.createElement("SUMMARY");
    sll.className = "btn btn-outline-info";
  sll.innerHTML = "Location";
    //school location content
    var slc = document.createElement("P");

    var cn =  CheckUndefined(school.campus_name); //check campus name

  slc.innerHTML = "<b>Address:</b> " + school.primary_address_line_1 + " "+ school.city + " "+school.state_code+ " "+school.zip 
    + "<br><b>Neighborhood: </b>" + school.neighborhood 
    + "<br><b>Campus:</b> "+ cn;

    
        //school info box
  var sib = document.createElement("DETAILS");
    //school info label
  var sil = document.createElement("SUMMARY");
    sil.className = "btn btn-outline-info";
  sil.innerHTML = "Info";
    //school info content
    var sic = document.createElement("P");
    
    var program_list = "";  //create list of programs in string
    program_list += addonlist(school.program1, school.prgdesc1, school.interest1);
    program_list += addonlist(school.program2, school.prgdesc2, school.interest2);
    program_list += addonlist(school.program3, school.prgdesc3, school.interest3);
    program_list += addonlist(school.program4, school.prgdesc4, school.interest4);
    program_list += addonlist(school.program5, school.prgdesc5, school.interest5);
    program_list += addonlist(school.program6, school.prgdesc6, school.interest6);
    program_list += addonlist(school.program7, school.prgdesc7, school.interest7);
    program_list += addonlist(school.program8, school.prgdesc8, school.interest8);
    program_list += addonlist(school.program9, school.prgdesc9, school.interest9);
    program_list += addonlist(school.program10, school.prgdesc10, school.interest10);
    if(program_list == "")
      program_list = "n/a";
    
    var ac_op = "";  //academic opportunity
    ac_op += addao(school.academicopportunities1);
    ac_op += addao(school.academicopportunities2);
    ac_op += addao(school.academicopportunities3);
    ac_op += addao(school.academicopportunities4);
    ac_op += addao(school.academicopportunities5);
    if(ac_op == "")
      ac_op = "n/a";
   
   var other_pro =  CheckUndefined(school.addtl_info1); // check other additional info
    var d_e = CheckUndefined(school.diplomaendorsements); // check diploma endorement
    var apc = CheckUndefined(school.advancedplacement_courses); // check ap classes
    var language = CheckUndefined(school.language_classes); //check language classes
    var extra_act = CheckUndefined(school.extracurricular_activities); //check extracurricular_activities
    
    //content of info of school
  sic.innerHTML = "<b>Overview:</b> " + school.overview_paragraph
    + "<br><br><b>Total Students: </b>" + school.total_students 
    + "<br><br><b>Programs: </b>" + program_list
    + "<br><br><b>Academic Opportunities: </b>" + ac_op
    + "<br><br><b>Extracurricular_Activities: </b>" + extra_act
    + "<br><br><b>Other Programs/ Events: </b>" + other_pro
    + "<br><br><b>Diploma Endorsements: </b>" + d_e 
    + "<br><br><b>AP Classes: </b>" + apc 
    + "<br><br><b>Language Classes: </b>" + language
    + "<br><br><b>ELL: </b>" + school.ell_programs
    + "<br><br><b>Start Time: </b>" + school.start_time
    + "<br><br><b>End Time: </b>" + school.end_time
    + "<br><br><b>Website: </b>" + school.website;
    
    
    
    
               //sport box
  var ssb = document.createElement("DETAILS");
    //school sport label
  var ssl = document.createElement("SUMMARY");
    ssl.className = "btn btn-outline-info";
  ssl.innerHTML = "Sports";
    //school sport content
    var ssc = document.createElement("P");
    
    var school_sport = CheckUndefined(school.school_sports); //school sport
    var boys_sport = CheckUndefined(school.psal_sports_boys); //boys sport
    var girls_sport = CheckUndefined(school.psal_sports_girls); //girls sport
    var coed_sport = CheckUndefined(school.psal_sports_coed); //coed sport
    
  ssc.innerHTML = "<b>School Sport:</b> " + school_sport 
    + "<br><b>Boys Sport:</b> " + boys_sport
    + "<br><b>Girls Sport:</b> " + girls_sport
    + "<br><b>Coed Sport:</b> " + coed_sport;
    
    
    
                   //required box
  var srb = document.createElement("DETAILS");
    //school required label
  var srl = document.createElement("SUMMARY");
    srl.className = "btn btn-outline-info";
  srl.innerHTML = "Required";
    //school required content
    var src = document.createElement("P");
   
    var require_list = ""; //list of requirements
    require_list += Addrl(school.requirement1_1,school.requirement1_2,school.requirement1_3,school.requirement1_4,school.requirement1_5,school.requirement1_6,school.requirement1_7,school.requirement1_8,
                          school.requirement1_9,school.requirement1_10);
    require_list += Addrl(school.requirement2_1,school.requirement2_2,school.requirement2_3,school.requirement2_4,school.requirement2_5,school.requirement2_6,school.requirement2_7,school.requirement2_8,
                          school.requirement2_9,school.requirement2_10);
    require_list += Addrl(school.requirement3_1,school.requirement3_2,school.requirement3_3,school.requirement3_4,school.requirement3_5,school.requirement3_6,school.requirement3_7,school.requirement3_8,
                          school.requirement3_9,school.requirement3_10);
    require_list += Addrl(school.requirement4_1,school.requirement4_2,school.requirement4_3,school.requirement4_4,school.requirement4_5,school.requirement4_6,school.requirement4_7,school.requirement4_8,
                          school.requirement4_9,school.requirement4_10);
    require_list += Addrl(school.requirement5_1,school.requirement5_2,school.requirement5_3,school.requirement5_4,school.requirement5_5,school.requirement5_6,school.requirement5_7,school.requirement5_8,
                          school.requirement5_9,school.requirement5_10);
    require_list += Addrl(school.requirement6_1,school.requirement6_2,school.requirement6_3,school.requirement6_4,school.requirement6_5,school.requirement6_6,school.requirement6_7,school.requirement6_8,
                          school.requirement6_9,school.requirement6_10);
    require_list += Addrl(school.requirement7_1,school.requirement7_2,school.requirement7_3,school.requirement7_4,school.requirement7_5,school.requirement7_6,school.requirement7_7,school.requirement7_8,
                          school.requirement7_9,school.requirement7_10);
    require_list += Addrl(school.requirement8_1,school.requirement8_2,school.requirement8_3,school.requirement8_4,school.requirement8_5,school.requirement8_6,school.requirement8_7,school.requirement8_8,
                          school.requirement8_9,school.requirement8_10);
    require_list += Addrl(school.requirement9_1,school.requirement9_2,school.requirement9_3,school.requirement9_4,school.requirement9_5,school.requirement9_6,school.requirement9_7,school.requirement9_8,
                          school.requirement9_9,school.requirement9_10);
    require_list += Addrl(school.requirement10_1,school.requirement10_2,school.requirement10_3,school.requirement10_4,school.requirement10_5,
                          school.requirement10_6,school.requirement10_7,school.requirement10_8,school.requirement10_9,school.requirement10_10);
    require_list += Addrl(school.requirement11_1,school.requirement11_2,school.requirement11_3,school.requirement11_4,school.requirement11_5,
                          school.requirement11_6,school.requirement11_7,school.requirement11_8,school.requirement11_9,school.requirement11_10);
    require_list += Addrl(school.requirement12_1,school.requirement12_2,school.requirement12_3,school.requirement12_4,school.requirement12_5,
                          school.requirement12_6,school.requirement12_7,school.requirement12_8,school.requirement12_9,school.requirement12_10);
    if(require_list == "") //if there are no requirements
      require_list = "n/a";
    
    var eligibility_list = Addrl(school.eligibility1,school.eligibility2,school.eligibility3,school.eligibility4,school.eligibility5,school.eligibility6,
                                 school.eligibility7,school.eligibility8,school.eligibility9,school.eligibility10);
    if(eligibility_list == "") //if there are no requirements
      eligibility_list = "n/a";
    
    var audition_list = Addrl(school.auditioninformation1, school.auditioninformation2, school.auditioninformation3, school.auditioninformation4, school.auditioninformation5, school.auditioninformation6, 
                              school.auditioninformation7, school.auditioninformation8, school.auditioninformation9, school.auditioninformation10);
    if(audition_list == "") //if there are no audition
      audition_list = "n/a";
    
    var adminp_list = "";
    adminp_list += Addrl(school.admissionspriority11, school.admissionspriority12, school.admissionspriority13, school.admissionspriority14, school.admissionspriority15, school.admissionspriority16, school.admissionspriority17, 
                        school.admissionspriority18, school.admissionspriority19, school.admissionspriority110);
    adminp_list += Addrl(school.admissionspriority21, school.admissionspriority22, school.admissionspriority23, school.admissionspriority24, school.admissionspriority25, school.admissionspriority26, school.admissionspriority27, 
                        school.admissionspriority28, school.admissionspriority29, school.admissionspriority210);
    adminp_list += Addrl(school.admissionspriority31, school.admissionspriority32, school.admissionspriority33, school.admissionspriority34, school.admissionspriority35, school.admissionspriority36, school.admissionspriority37, 
                        school.admissionspriority38, school.admissionspriority39, school.admissionspriority310);
    adminp_list += Addrl(school.admissionspriority41, school.admissionspriority42, school.admissionspriority43, school.admissionspriority44, school.admissionspriority45, school.admissionspriority46, school.admissionspriority47, 
                        school.admissionspriority48, school.admissionspriority49, school.admissionspriority410);
    adminp_list += Addrl(school.admissionspriority51, school.admissionspriority52, school.admissionspriority53, school.admissionspriority54, school.admissionspriority55, school.admissionspriority56, school.admissionspriority57, 
                        school.admissionspriority58, school.admissionspriority59, school.admissionspriority510);
    adminp_list += Addrl(school.admissionspriority61, school.admissionspriority62, school.admissionspriority63, school.admissionspriority64, school.admissionspriority65, school.admissionspriority66, school.admissionspriority67, 
                        school.admissionspriority68, school.admissionspriority69, school.admissionspriority610);
    adminp_list += Addrl(school.admissionspriority71, school.admissionspriority72, school.admissionspriority73, school.admissionspriority74, school.admissionspriority75, school.admissionspriority76, school.admissionspriority77, 
                        school.admissionspriority78, school.admissionspriority79, school.admissionspriority710);
    if(adminp_list == "") //if there are no audition
      adminp_list = "n/a";
    
  src.innerHTML = "<b>Requirements:</b> " + require_list
    + "<br><br><b>Eligibility:</b> " + eligibility_list
    + "<br><br><b>Audition:</b> " + audition_list
    + "<br><br><b>Admission Priority:</b> " + adminp_list;
    
    
    
    
    
             //school stats box
  var s_stats_b = document.createElement("DETAILS");
    //school stats label
  var s_stats_l = document.createElement("SUMMARY");
    s_stats_l.className = "btn btn-outline-info";
  s_stats_l.innerHTML = "Stats";
    //school stats content
    var s_stats_c = document.createElement("P");
    
    
    var grad_rate = CheckUndefinedNum(school.graduation_rate);
    var att_rate = CheckUndefinedNum(school.attendance_rate);
    var cc_rate = CheckUndefinedNum(school.college_career_rate);

  s_stats_c.innerHTML = "<b>Graduation Rate:</b> " + grad_rate
    + "<br><b>Attendance Rate:</b> " + att_rate
    + "<br><b>College Career Rate:</b> " + cc_rate;
    
    
    
               //school contact box
  var s_cont_b = document.createElement("DETAILS");
    //school stats label
  var s_cont_l = document.createElement("SUMMARY");
    s_cont_l.className = "btn btn-outline-info";
  s_cont_l.innerHTML = "Contact";
    //school stats content
    var s_cont_c = document.createElement("P");

  s_cont_c.innerHTML = "<b>Phone Number:</b> " + school.phone_number
    + "<br><b>Fax Number:</b> " + school.fax_number
    + "<br><b>School Email:</b> " + school.school_email;
    
    
    
    
    
    var y = document.createElement("BR"); //create a break or go to next line
  document.getElementById("myList").appendChild(y); 
        
    x.append(sn);
  
    
    x.append(slb); //add location
    slb.append(sll);
    slb.append(slc);
    
    
    x.append(sib); //add info
    sib.append(sil);
    sib.append(sic);
    
    x.append(ssb); //add sports
    ssb.append(ssl);
    ssb.append(ssc);
    
    x.append(srb); //add require
    srb.append(srl);
    srb.append(src);
    
    x.append(s_stats_b); //add stats
    s_stats_b.append(s_stats_l);
    s_stats_b.append(s_stats_c);
    
    x.append(s_cont_b); //add contact
    s_cont_b.append(s_cont_l);
    s_cont_b.append(s_cont_c);
   
  n++; //update number of school results
      } //close if
    }) //close forEach
  } //close else
  
  if(n == 0)
    alert("Sorry, there are no schools shown based upon yor preference. Please try again");


} //close function for request.onload


request.send() //sends request to server
  

}//close function result
  



function CheckUndefined(cureent_school_col){  //check if the data is undefined or not 
    if(cureent_school_col == undefined )
      return("n/a");
    else
     return(cureent_school_col);
}

function CheckUndefinedNum(cureent_school_col){  //check if the data is undefined or not for number rate
    if(cureent_school_col == undefined || cureent_school_col == "N/A")
      return("n/a");
    else
     return(cureent_school_col * 100 + "%");
}



function CheckUndefined_Search(cureent_school_col, input){ //check if th data is undefined and if input can be searched
  if(cureent_school_col != undefined && cureent_school_col.toUpperCase().search(input) != -1)
    return true;
  else
    return false;
}



function selectionF(cureent_school_col, input){  // for selection in setting the bool
if(input == "any")
     return true;
   else 
     return (cureent_school_col.search(input) != -1);
}



function textF(cureent_school_col, input){ // for text in setting the bool
  if(input == "ANY" ) //set bool for input for NONE
   return true;
   else if(cureent_school_col != undefined) //make shure current school etry is defined
     return (cureent_school_col.toUpperCase().search(input) != -1); 
  else
    return false; //when current entry is undefined
}



function addonlist(program, prgdesc, interest){  //add to list based upon condition for program
  
  var result = "";
  
  if(program != undefined)
        result = "<br>" + program + ": " + prgdesc
          + "<br>For students interested in: " + interest + "<br>";
  
  return result;
}


function addao(current_ao){ //add to list based upon condition for academic opportunity
  var result = "";
  if(current_ao != undefined)
        result = "<br>" + current_ao+ "<br>";
  return result;
}




function Addrl(r1,r2,r3,r4,r5,r6,r7,r8,r9,r10){  //adding requirements if they exist or the are new
  
  if(r1 != undefined) return r1 + "| "; else return ""; 
  if(r2 != undefined) return r2 + "| "; else return ""; 
  if(r3 != undefined) return r3 + "| "; else return ""; 
  if(r4 != undefined) return r4 + "| "; else return ""; 
  if(r5 != undefined) return r5 + "| "; else return ""; 
  if(r6 != undefined) return r6 + "| "; else return ""; 
  if(r7 != undefined) return r7 + "| "; else return ""; 
  if(r8 != undefined) return r8 + "| "; else return ""; 
  if(r9 != undefined) return r9 + "| "; else return ""; 
  if(r10 != undefined) return r10 + "| "; else return ""; 
  
}