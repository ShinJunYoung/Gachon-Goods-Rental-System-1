QUnit.test( "loginTest", function( assert ) {
    const result = login("junjun031@naver.com","123456")
    assert.equal( result,1,  "login Passed!" );
});


function login(email,password){
    if(email=="junjun031@naver.com" && password=="123456")
        return 1;
}
