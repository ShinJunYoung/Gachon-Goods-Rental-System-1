
    QUnit.test( "logout", function( assert ) {
  const result = logout()
  assert.equal( result, 1, "Passed!" );
});
QUnit.test( "aut_signUp", function( assert ) {
  const result = aut_signUp()
  assert.equal( result, 1, "Passed!" );
});
QUnit.test( "mem_signUp", function( assert ) {
  const result = mem_signUp()
  assert.equal( result, 1, "Passed!" );
});
QUnit.test( "aut_modify", function( assert ) {
  const result = aut_modify()
  assert.equal( result, 1, "Passed!" );
});
QUnit.test( "mem_modify", function( assert ) {
  const result = mem_modify()
  assert.equal( result, 1, "Passed!" );
});
QUnit.test( "mem_withdraw", function( assert ) {
  const result = mem_withdraw()
  assert.equal( result, 1, "Passed!" );
});
QUnit.test( "auth_withdraw", function( assert ) {
  const result = auth_withdraw()
  assert.equal( result, 1, "Passed!" );
});

firebase.auth().onAuthStateChanged(function(user){
  if(user){
    var log = document.getElementById("log-memu");
    log.innerHTML = "My Page/Sign-out";
    log.setAttribute("href","index.html");
    var ref = firebase.database().ref("User/Admin/");
    ref.on("value", function (snapshot) {
        snapshot.forEach(function (data) {
          if(data.val().email == firebase.auth().currentUser.email){
              log.setAttribute("href","MyPageAdmin.html");
          }
      });
    });
    ref = firebase.database().ref('User/Member/');
    ref.on("value", function (snapshot) {
        snapshot.forEach(function (data) {
          if(data.val().email == firebase.auth().currentUser.email){
              log.setAttribute("href","MyPageMember.html");
          }
      });
    });
  }
});




function logout(){
  firebase.auth().signOut().then(function(){

  }, function(error){

  });
  return 1;
}






function log(id){

  html = document.getElementById(id);

  if(html.innerHTML == "Reservation"){
    firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
           html.setAttribute("href","reservation.html");
         } else {
           alertify.alert("Please Log-in to use the service.");
           setTimeout(function(){window.location.href = 'log_in.html';},1500);
         }
    });
  }
  else if(html.innerHTML == "Reservation Information"){
    firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
           html.setAttribute("href","reservation_info.html");
         } else {
           alertify.alert("Please Log-in to use the service.");
           setTimeout(function(){window.location.href = 'log_in.html';},1500);
         }
    });
  }
}

function home(){
  window.location.href = 'index.html';
}

function aut_modify(){
  var username="여준구";
  var email="yjk5591@naver.com";
  var password="201635824";
  var address="경기도 수원시";
  var phone_num="01062205593";
  var birthday="19960804";
  var hospital_name="축덕동물병원";
  var area="수원시";
  var ref = firebase.database().ref("User/Admin/");
  ref.on("value", function (snapshot) {
      snapshot.forEach(function (data) {
        if(data.val().email == firebase.auth().currentUser.email){
          var buf = "yjk5591@naver.com";
          var key = "MA341957+34";
          var rootRef = firebase.database().ref('User/Admin/' + key + '/');

            var user = "MA341957+34";
            if(password != data.val().password || email != data.val().email){
              user.updatePassword(password).then(function() {
                user.updateEmail(email).then(function() {
                }).catch(function(error){
                  user.updatePassword(data.val().password).then(function(){

                  }).catch(function(error){
                  });
                });
              }).catch(function(error) {

                });
            }


            rootRef.update({
              username:username,
              email:email,
              password:password,
              address:address,
              phone_num:phone_num,
              birthday:birthday,
              hospital_name :hospital_name,
              area:area
            });


          }
      });
    });
    return 1;

  }



function auth_withdraw(){
  alertify.confirm("Are you sure you want to delete your account?", function(e){
  if(e){
    alertify.alert("Delete Success!");
  var ref = firebase.database().ref('User/Admin/');
  ref.on("value", function (snapshot) {
      snapshot.forEach(function (data) {
        if(data.val().email == firebase.auth().currentUser.email){
          var key = data.key;
          var rootRef = firebase.database().ref('User/Admin/' + key + '/');

          var user = firebase.auth().currentUser;
          user.delete().then(function() {
          }).catch(function(error) {
          });

        }
    });
  });
  }
  else{
  }
  })
  return 1;
}
