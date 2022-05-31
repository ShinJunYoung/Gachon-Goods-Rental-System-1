
function login(){
    var userEmail="junjun031@naver.com";
    var userPass="123456";

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function(){

    }).catch(function(error){

    });
    return 1;
}
