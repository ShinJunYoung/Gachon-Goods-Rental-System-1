/**
 * @brief : check the user is whether sign-in or not
 * @details : access to firebase admin or member file to check if the user data is valid and if it's valid, change sign-in state into "on"
 * @param : log id, user email, input email
 */


firebase.auth().onAuthStateChanged(function(user){
  if(user){
    var log = document.getElementById("log-memu");
    log.innerHTML = "내 정보 / 로그아웃";
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



/**
 * @brief : check whether the user is valid to sign-in
 * @details : by checking input user email and user password, distribute the user is valid
 * @param : user email, user password
 */

function login(){
  var userEmail=document.getElementById("userEmail").value;
  var userPass=document.getElementById("userPass").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function(){
    alertify.alert("로그인 성공!");
    setTimeout(function(){window.location.href = 'index.html';},1000);
  }).catch(function(error){
    alertify.alert("로그인 실패! 다시 입력해주세요");
  });
}




/**
 * @brief : check user to sign-out
 * @details : permit user to logout if there's no error
 * @param : none
 */

function logout(){
  firebase.auth().signOut().then(function(){
    alertify.alert("로그아웃 완료!");
    setTimeout(function(){     window.location.href = 'index.html';},1000);
  }, function(error){
    alertify.alert("로그아웃 실패! 다시 시도해주세요");
  });
}






/**
 * @brief : receive administrator user's input and permit to sign up on site
 * @details : if received administrator user's inputs have no error to sign up, send those information to firebase for sign up
 * @param : username, email, password, retype_password, address, phone_num, birthday, hospital_name, area
 */


function aut_signUp(){
  var username=document.getElementById("username").value;
  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;
  var retype_password=document.getElementById("retype_password").value;
  var phone_num=document.getElementById("phone_num").value;
  if(username.length>=1 && phone_num.length>=1 &&
      password==retype_password){
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
      var rootRef = firebase.database().ref('User/Admin/');
      rootRef.push({
        username:username,
        email:email,
        password:password,
        phone_num:phone_num,
      });
      alertify.alert("회원가입 완료! 로그인 해주세요");
      setTimeout(function(){
        firebase.auth().signOut();
        window.location.href = 'log_in.html';},2000);

    }).catch(function(error){
      if(password.toString().length <=5){
        alertify.alert("회원가입 실패! 최소 6자리 이상 문자를 입력해주세요");
      }
      else {
        alertify.alert("회원가입 실패! 다른 이메일을 입력해주세요");
      }
    });
  }
  else{
    if(password!=retype_password){
      alertify.alert("회원가입 실패! 비밀번호가 일치하지 않습니다");
    }
    else{
      alertify.alert("회원가입 실패! 다시 시도해주세요");
    }
  }

}








/**
 * @brief : receive member user's input and permit to sign up on site
 * @details : if received member user's inputs have no error to sign up, send those information to firebase for sign up
 * @param : username, email, password, retype_password, address, phone_num, birthday
 */


function mem_signUp(){
  var username=document.getElementById("username").value;
  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;
  var retype_password=document.getElementById("retype_password").value;
  var phone_num=document.getElementById("phone_num").value;

  if(username.length>=1 && phone_num.length>=1 &&
      email.length>=1 && password==retype_password){
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
      var rootRef = firebase.database().ref('User/Member/');
      rootRef.push({
        username:username,
        email:email,
        password:password,
        phone_num:phone_num,
      });
      alertify.alert("회원가입 완료! 로그인 해주세요");
      setTimeout(function(){
        firebase.auth().signOut();
        window.location.href = 'log_in.html';},2000);
    }).catch(function(error){
      if(password.toString().length <=5){
        alertify.alert("회원가입 실패! 최소 6자리 이상 문자를 입력해주세요");
      }
      else {
        alertify.alert("회원가입 실패! 다른 이메일을 입력해주세요");
      }
    });
  }
  else{
    if(password!=retype_password){
      alertify.alert("회원가입 실패! 비밀번호가 일치하지 않습니다");
    }
    else{
      alertify.alert("회원가입 실패! 다시 시도해주세요");
    }
  }

}





/**
 * @brief : check user's sign-in state to block using other functions if he's not in sign-in state
 * @details : by checking user's sign-in state, block other functions if the user is not the registered user to prevent illegal user
 * @param : each html id, user state
 */

function log(id){

  html = document.getElementById(id);
  if(html.innerHTML == "Goods Information"){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        html.setAttribute("href","goods_info.html");
      } else {
        alertify.alert("로그인을 해주세요.");
        setTimeout(function(){window.location.href = 'log_in.html';},1500);

      }
    });
  }
  else if(html.innerHTML == "장비 예약"){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        html.setAttribute("href","reservation.html");
      } else {
        alertify.alert("로그인을 해주세요.");
        setTimeout(function(){window.location.href = 'log_in.html';},1500);
      }
    });
  }
  else if(html.innerHTML == "예약 확인"){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        html.setAttribute("href","reservation_info.html");
      } else {
        alertify.alert("로그인을 해주세요.");
        setTimeout(function(){window.location.href = 'log_in.html';},1500);
      }
    });
  }
}







/**
 * @brief : function to send main page
 * @details : a simple function to send user to main page
 * @param : none
 */

function home(){
  window.location.href = 'index.html';
}





/**
 * @brief : function for administrator users to modify their information
 * @details : if sign-in user use this function, show every information they typed and permit them to modify their information if they want. Access to firebase and replace old data into new modified data
 * @param : username, email, password, retype_password, address, phone_num, birthday, hospital_name, area, current user email, user's key value, current user's password
 */

function aut_modify(){
  var username=document.getElementById("username").value;
  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;
  var address=document.getElementById("address").value;
  var phone_num=document.getElementById("phone_num").value;
  var birthday=document.getElementById("birthday").value;
  var hospital_name=document.getElementById("hospital_name").value;
  var area=document.getElementById("area").value;
  var ref = firebase.database().ref("User/Admin/");
  ref.on("value", function (snapshot) {
    snapshot.forEach(function (data) {
      if(data.val().email == firebase.auth().currentUser.email){
        var buf = data.val().email;
        var key = data.key;
        var rootRef = firebase.database().ref('User/Admin/' + key + '/');

        var user = firebase.auth().currentUser;
        if(password != data.val().password || email != data.val().email){
          user.updatePassword(password).then(function() {
            user.updateEmail(email).then(function() {
            }).catch(function(error){
              user.updatePassword(data.val().password).then(function(){
                alertify.alert("Please enter different E-mail.");
                return;
              }).catch(function(error){
              });
            });
          }).catch(function(error) {
            alertify.alert("Please enter the more long password!");
            return;
          });
        }

        alertify.alert("Modify complete!");
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
        setTimeout(function(){if(email != buf){
          alertify.alert("Changed your E-mail. Please reLogin!");
          firebase.auth().signOut();
        }},2000);
        setTimeout(function(){window.location.href = 'index.html';},4000);

      }
    });
  });

}












/**
 * @brief : function for member users to modify their information
 * @details : if sign-in user use this function, show every information they typed and permit them to modify their information if they want. Access to firebase and replace old data into new modified data
 * @param : username, email, password, retype_password, address, phone_num, birthday, current user email, user's key value, current user's password
 */


function mem_modify(){
  var username=document.getElementById("username").value;
  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;
  var address=document.getElementById("address").value;
  var phone_num=document.getElementById("phone_num").value;
  var birthday=document.getElementById("birthday").value;

  ref = firebase.database().ref('User/Member/');
  ref.on("value", function (snapshot) {
    snapshot.forEach(function (data) {
      if(data.val().email == firebase.auth().currentUser.email){
        var buf = data.val().email;
        var key = data.key;
        var rootRef = firebase.database().ref('User/Member/' + key + '/');

        var user = firebase.auth().currentUser;
        if(password != data.val().password || email != data.val().email){
          user.updatePassword(password).then(function() {
            user.updateEmail(email).then(function() {
            }).catch(function(error){
              user.updatePassword(data.val().password).then(function(){
                alertify.alert("Please enter different E-mail.");
                return;
              }).catch(function(error){
              });
            });
          }).catch(function(error) {
            alertify.alert("Please enter the more long password!");
            return;
          });
        }

        alertify.alert("Modify complete!");
        rootRef.update({
          username:username,
          email:email,
          password:password,
          address:address,
          phone_num:phone_num,
          birthday:birthday
        });
        setTimeout(function(){if(email != buf){
          alertify.alert("Changed your E-mail. Please reLogin!");
          firebase.auth().signOut();
        }},2000);
        setTimeout(function(){window.location.href = 'index.html';},4000);

      }
    });
  });

}


function mem_withdraw(){
  alertify.confirm("Are you sure you want to delete your account?", function(e){
    if(e){
      alertify.alert("Delete Success!");
      var ref = firebase.database().ref('User/Member/');
      ref.on("value", function (snapshot) {
        snapshot.forEach(function (data) {
          if(data.val().email == firebase.auth().currentUser.email){
            var key = data.key;
            var rootRef = firebase.database().ref('User/Member/' + key + '/');

            var user = firebase.auth().currentUser;
            user.delete().then(function() {
              rootRef.remove();
              window.location.href = 'index.html';
            }).catch(function(error) {
              alertify.alert("Delete fail!");
            });

          }
        });
      });
    }
    else{
      return ;
    }
  })
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
              rootRef.remove();


              window.location.href = 'index.html';
            }).catch(function(error) {
              alertify.alert("Delete fail!");
            });

          }
        });
      });
    }
    else{
      alertify.alert("Cancel!");
    }
  })
}