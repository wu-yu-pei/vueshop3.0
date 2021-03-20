import Mock from 'mockjs';
Mock.mock("/api/news","get",{
    "data|10":[
        {
            "id|+1":1,
            "title|+1":[Mock.Random.cword(8,20),Mock.Random.cword(8,20),Mock.Random.cword(8,20),Mock.Random.cword(8,20),Mock.Random.cword(8,20),Mock.Random.cword(8,20)],
            "image|+1":[Mock.Random.image("200x100",Mock.Random.color()),Mock.Random.image("200x100",Mock.Random.color()),Mock.Random.image("200x100",Mock.Random.color()),Mock.Random.image("200x100",Mock.Random.color()),Mock.Random.image("200x100",Mock.Random.color()),Mock.Random.image("200x100",Mock.Random.color())],
            "date|+1":[Mock.Random.date("yyyy-MM-dd"),Mock.Random.date("yyyy-MM-dd"),Mock.Random.date("yyyy-MM-dd"),Mock.Random.date("yyyy-MM-dd"),Mock.Random.date("yyyy-MM-dd"),Mock.Random.date("yyyy-MM-dd")]
        }
    ]
});

Mock.mock("/api/user/login","post",function (opts) {
    console.log(opts);
    // return {
    //     status:200,
    //     message:"登录成功"
    // }
    return Mock.mock({
        status:200,
        message:"@cword(8,20)"
    })
})