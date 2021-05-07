const HTTP = require('http');
const FS = require('fs');
const PATH = require('path');
const hello = require('./server_scripts/collect_html.js');

const PORT = 8080;

let pause = false;
let can_send = false;

// hello.hello_world();

let db_val = FS.readFileSync('public/db/valorant.json');
// console.log(JSON.parse(db_val));

HTTP.createServer(function(req,res){
    
    // let my_url = new URL(`http://localhost:${PORT}${req.url}`);

    // console.log(req.url);

    if(req.url == '' || req.url == '/'){
        // let html = FS.readFileSync('index.html');
        let html = hello.return_html();
        // console.log('html :',html);

        res.writeHead(200, {
            'Content-Type': 'HTML',
            'charset': 'utf-8'
        });
        res.write(html);
        res.end();

        // setTimeout(()=>{
            
        // },500);
    }else{
        let splited_url = req.url.split(PATH.sep);
        let type = PATH.extname(PATH.basename(req.url));

        // splited_url = clear_arr_from_empty(splited_url);

        if(splited_url.indexOf('public')){
            let my_url = 'public';
            // console.log(splited_url);

            pause = true;

            let temp  = clearArrFromEmptyAndspecif(splited_url,splited_url[0]);   
            // let temp = splited_url;
            FileIsExist(temp,my_url);

                let a = setInterval(() => {
                    if(pause){
                        // console.log('pause');
                    }else{
                        clearInterval(a);
                        if(can_send){
                            // console.log('succes send',req.url.replace('/',''));
    
                            let file = FS.readFileSync(req.url.replace('/',''));
                            // console.log(file);
                            let time = 5000;
    
                            let b = setInterval(() => {
                                if(file){
                                    clearInterval(b);
                                    res.writeHead(200, {
                                        'Content-Type': `${whatIsAType(type)}`
                                    });
            
                                    res.write(file);
            
                                    res.end();
                                }else{
                                    if(time == 0){
                                        clearInterval(b);
                                        res.writeHead(404, {
                                            'TIME_OUT': 'REALY 5s',
                                            
                                        });
                                        res.end();
                                    }else{
                                        time -= 100;
                                    }
                                }
                            }, 100);
                        }else{ 
                            res.writeHead(404, {
                                'FILE_NOT_FOUND': 'REALY',
                                'Content-Type': `NO-TYPE`
                            });
                            res.end();
                        }
                        
                    }
                }, 1);    

            }else{
            res.writeHead(404, {
                'OSHIBKA': 'SOSITE'
            });
            res.end();
        }

        // res.writeHead(404, {
        //     'OSHIBKA': 'SOSITE'
        // });
        // res.end();
        
        
        
    }

}).listen(PORT);

console.log(`server run at http://localhost:${PORT}`);

function whatIsAType(str){
    
    if(str == '.ico'){
        output = 'image/x-icon';
    }
    else if(str == '.png'){
        output = 'image/png';
    }
    else if(str == '.jpg' || str == '.jpeg'){
        output = 'image/jpeg';
    }
    else if(str == '.css'){
        output = 'text/css';
    }
    else if(str == '.js'){
        output = 'text/javascript';
    }
    else if(str == '.html'){
        output = 'text/html';
    }
    return output;
}
function clearArrFromEmptyAndspecif(arr,str){
    let temp_arr = [];
    for(let i = 0; i < arr.length;i++){
        if(arr[i] != '' && arr[i] != str){
            temp_arr.push(arr[i]);
        }
    }
    return temp_arr;
}

function ExistFileDir(path,url){
    // console.log('\nExistFileDir checking');
    // console.log('ExistFileDir',path,url);

    let a = FS.readdirSync(path);  
    // console.log('ExistFileDir',a);
    // console.log('ExistFileDir',a.indexOf(url));
    return a.indexOf(url);
}

function FileIsExist(arr_path,url){
    // console.log('\nFileIsExist',arr_path,url);
    arr_path = clearArrFromEmptyAndspecif(arr_path,arr_path[0]);

    // console.log('FileIsExist',arr_path);

    // console.log('FileIsExist','url' , url);

    let temp = ExistFileDir(url,arr_path[0]);

    // console.log(`FileIsExist ExistFileDir ${temp} ${url} ${arr_path[0]}`);

    let b = setInterval(() => {
        if(temp != -1){
            clearInterval(b);
            // console.log('FileIsExist here',arr_path,url,temp);
            
    
            if(arr_path.length > 1){
                // console.log('FileIsExist loop',arr_path,url,temp);
                url += `/${arr_path[0]}`;
                return FileIsExist(arr_path,url);
            }else{
                // console.log('FileIsExist send',arr_path,url,temp);
                can_send = true;
                pause = false;
            }
        }else if(temp == -1){
            clearInterval(b);
            // console.log('FileIsExist error',arr_path,url,temp);
            // console.log('FileIsExist','error','-1');
            

            can_send = false;
            pause = false;
        }else{
            clearInterval(b);
            // console.log('FileIsExist error',url,temp);
            // console.log('FileIsExist','error');

            can_send = false;
            pause = false;
        }
    }, 1);
}