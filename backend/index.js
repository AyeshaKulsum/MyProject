'use strict'
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Hapi=require('@hapi/hapi')
const Boom = require('@hapi/boom');
const Inert = require('inert');
const Vision = require('vision');

let tasks=[
    {text:'Task One'},
    {text:'Task Two'},
    {text:'Task Three'},
];
const pre1 = function (request, h) {

    return new Date().getUTCDate();
};

const pre2 = function (request, h) {
    return new Date().getMonth();
};

const pre3 = function (request, h) {

    return new Date().getUTCFullYear();
};

const preTotal = function (request, h) {

    return request.pre.date + '-' + request.pre.month+'-' + request.pre.year;
};

const port = process.env.PORT || 8000;

const init = async() =>{
    console.log(process.env)
    console.log(process.env.PORT)
const server = Hapi.server({
    port,
   host:'localhost',
   routes: {
       //CORS by default false we can enable while creating server or route directly with or without properties
    cors: {
        origin: ['*'], // an array of origins or 'ignore'
        headers: ['Authorization'], // an array of strings - 'Access-Control-Allow-Headers'
        exposedHeaders: ['Accept'], // an array of exposed headers - 'Access-Control-Expose-Headers',
        additionalExposedHeaders: ['Accept'], // an array of additional exposed headers
        maxAge: 60,
        credentials: true // boolean - 'Access-Control-Allow-Credentials'
    }
}
})
await server.register([Inert.plugin, Vision.plugin]);
server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views'
  })
    //ON REQUEST 
    // server.ext('onRequest', function (request, h) {
    //     console.log(`onRequest:${request.method.toUpperCase()}:${request.path}/${request.params}`)
    //     request.setUrl('/test');
    //     console.log(`onRequest:${request.method.toUpperCase()}:${request.path}/${request.params}`)
    //     return h.continue;
    // });

        //PRE
    server.route({
        method:'GET',
        path:'/pre',
        options: {
            pre: [
                [
                    // m1 and m2 executed in parallel
                    { method: pre1, assign: 'date' },
                    { method: pre2, assign: 'month' },
                    { method: pre3, assign: 'year' },

                ],
                { method: preTotal, assign: 'FinalDate' },
            ],
            handler: function (request, h) {
                console.log(request.pre)
                return `Welcome login date ${request.pre.FinalDate}!\n`;
            }
        }
    })
    
    //Home route
    // server.route({
    //     method:'GET',
    //     path:'/',
    //     handler:(request,h)=>{
    //         // reply('Hello World')
    //         h.view('index',{
    //             name:'Ayesha'
    //         })
    //     }
    // });

    //DYNAMIC ROUTE
    server.route({
        method:'GET',
        path:'/user/{name}',
        handler:(request,reply)=>{
           return 'Hello, '+request.params.name;
        }
    });

    //THROW ERROR
    server.route({
        method:'GET',
        path:'/error',
        handler:(request,h)=>{
           throw Boom.forbidden('User does not have permission')
        }
    });

    //TASKS GET ROUTE 

    server.route({
        method:'GET',
        path:'/tasks',
        handler:{
        view: {
            template: 'tasks',
            context: {
                title: 'Tasks',
                tasks:tasks
            }
        }
    }      
    });

    //POST TASKS
    server.route({
        method:'POST',
        path:'/tasks',
        handler:(request,h)=>{
           let newTask =  {text:request.payload.text}
            tasks.push(newTask)
            return h.redirect('/tasks');
        }
    })

    //DELETE TASKS
    server.route({
        method:'DELETE',
        path:'/tasks',
        handler:(request,h)=>{
            console.log(request.query.text)
            return tasks.filter(task=>task.text!==request.query.text);
        }
    })

    //UPDATE TASK 
    server.route({
        method:'PUT',
        path:'/tasks',
        handler:(request,h)=>{
            let updateTask={"text":request.payload.text}
            let index = tasks.map((task) => task.text).indexOf(request.query.text);
            if (index > -1) {
                tasks.splice(index, 1);
                tasks.push(updateTask)
            }
            return tasks
        }
    })

       

    //STATIC ROUTES
   
    server.route({
        method:'GET',
        path:'/about',
        handler:{
            file:'./public/about.html'
        }
    });

    server.route({
        method:'GET',
        path:'/image',
        handler:{
            file:'./public/image1.jpg'
        }
    });


    //vision templates
    server.route({
        method:'GET',
        path:'/home',
        handler:{
            // reply('Hello World')
            view: {
                template: 'index',
                context: {
                    title: 'Homepage',
                    message: 'Welcome',
                    name:'Ayesha'
                }
            }
        }
    });

    // server.register(Vision,err=>{
    //     if(err){
    //         throw err;
    //     }

    //     server.views({
    //         engines:{
    //             html:require('handlebars')
    //         },
    //         path:__dirname+'/views'
    //     })
    // })
    //start server 
    await server.start((err)=>{
        if(err)
        {
            throw err;
        }
        console.log(`server started at: ${server.info.uri}`)
    });
    console.log(`Server started on: ${server.info.uri}`)
}

process.on('unhandledRejection',(err)=>{
    console.log(err);
    process.exit(1);
})
init();