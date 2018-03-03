const userDao = require('../user-dao');

require('../../../config/db.config').then(function(){

    userDao.findUserByName('luozhidan', function(err, data){
        console.log(data)
    })
    
    // userDao.createUser({
    //     username: 'luozhidan',
    //     password: '123456'
    // }, function(data){
    //     console.log(data);
    // });
})



