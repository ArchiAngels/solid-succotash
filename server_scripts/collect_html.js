exports.return_html = function (){
    const FS = require('fs');

    let balls = FS.readFileSync('public/templates/balls.html');
    let header = FS.readFileSync('public/templates/navigator_top.html');
    let main = FS.readFileSync('public/templates/main_window.html');

    // let css_files = ``;
    // let js_files = ``;

    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Valora'nt</title>

        <link rel="shortcut icon" href="public/img/i3.ico" type="image/x-icon">

        ${get_files_from('public/css','css')}

    </head>
    <body>

        ${balls}
        ${header}
        ${main}
        
        ${get_files_from('public/scritps','script')}
    </body>
    </html>`;
    
    return html;

    function get_files_from(where,type){
        // <link rel="stylesheet" href="public/css/fonts.css"></link>
        // <script src="public/scritps/nav_script.js"></script>

        let all_css = 'public/compiled/all.css';

        if(type == 'css'){
        
            FS.writeFileSync(all_css,'',(err)=>{
                console.log('err',err);
            })
        }

        let output_html = '';

        let files = FS.readdirSync(where);

        for(let i =0; i < files.length; i++){

            if(type == 'script'){
                output_html += `<script src="${where}/${files[i]}"></script>`;
            }else if(type == 'css'){
                FS.appendFileSync(all_css,FS.readFileSync(`${where}/${files[i]}`),(err)=>{
                    console.log('err',err);
                })
            }


        }

        if(type == 'css'){
            output_html = `<link rel="stylesheet" href="${all_css}"></link>`;
        }

        



        return output_html;
    }
}