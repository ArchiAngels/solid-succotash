let cards_items = document.getElementById('cards_items');
let darkscene = document.getElementById('darkscene');

cards_items.addEventListener('click',(e)=>{
    console.log(e.target,e.target.tagName,e.target.getAttribute('nr_of_list'));
    let nr_of_list = e.target.getAttribute('nr_of_list');
    if(e.target.tagName != 'UL'){
        changeDisplay();
        paste_img_text_darkscene(nr_of_list);
    }
    

})
darkscene.addEventListener('click',(e)=>{
    console.log(e.target,e.target.getAttribute('scene_'));
    if(e.target.getAttribute('scene_') == 'true'){
        changeDisplay();
    }
})

function changeDisplay(){
    if(cards_items.style.display != 'none'){
        cards_items.style.display = 'none';
        darkscene.style.display = 'block';
    }else{
        cards_items.style.display = 'block';
        darkscene.style.display = 'none';
    }
}
function paste_img_text_darkscene(nr){
    console.log(nr);
    nr = parseInt(nr);
    console.log(nr);
    console.log(cards_items.children[nr]);
}