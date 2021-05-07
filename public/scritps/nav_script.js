// window.onload = ()=>{

    let inputs = document.getElementById('inv_check_box');
    let nav_bar = document.getElementById('NavBar');
    let class_name = ['flex','none','block'];
    console.log(inputs,nav_bar);

    function showNavBar(){
        console.log('1');
        nav_bar.style.display = class_name[0];
    }
    function clouseNavBar(){
        console.log('2');
        nav_bar.style.display = class_name[1];
    }
    function show_big_screen(){
        console.log('3');
        nav_bar.style.display = class_name[2];
    }
    inputs.onchange = ()=>{
        inputs.checked ? showNavBar() : clouseNavBar(); 
    }
    window.onresize = ()=>{
        if(window.innerWidth > 700){
            show_big_screen();
        }else{
            clouseNavBar();
        }
    }
    
// }



