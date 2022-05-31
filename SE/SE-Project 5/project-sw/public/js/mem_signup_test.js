QUnit.test( "mem_signUp", function( assert ) {
    const result = mem_signUp(123456,123456)
    assert.equal( result, 1, "Passed!" );
});


function mem_signUp(password, retype_password){

    if(password==retype_password){
        return 1;
    }
    else
        return 0;
}
