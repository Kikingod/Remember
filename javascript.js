function come_back(){
let doctile = document.title;
window.addEventListener('blur', () =>{
    document.title = '😞'
})
window.addEventListener('focus', () => {
    document.title = doctile
})}
come_back()
var score_list = [0]


function before(){
    let buttons = document.getElementById('back_button')
    buttons.remove();
    let button_start = document.createElement('button')
    let button_info = document.createElement('button')
    let title = document.createElement('h1')
    title.id = 'title'
    title.textContent = 'Remember'
    document.body.appendChild(title)
    button_start.id = "play_button"
    button_start.textContent = 'Play'
    button_start.onclick = printmessage
    document.body.appendChild(button_start)
    button_info.id = "info"
    button_info.textContent = 'Info'
    button_info.onclick = info_out
    document.body.appendChild(button_info)
    let div = document.createElement('div')
    div.id = "table-container"
    document.body.appendChild(div)
}


async function printmessage(){
    document.getElementById('play_button').remove();
    document.getElementById("score_text").remove();
    document.getElementById('info').remove();
    document.getElementById('title').remove()
    var tableContainer = document.getElementById('table-container');
    var body = document.body;
    var table = document.createElement('table');
    let index = 0
    for (var i = 0; i < 3; i++) {
        var row = document.createElement('tr');
        for (var j = 0; j < 3; j++) {
            var cell = document.createElement('td');
            const button = document.createElement('button');
            button.textContent = '';
            button.id = `button_id${index}` 
            index++
            button.className = 'jaj'
            cell.appendChild(button);
            row.appendChild(cell);
        table.appendChild(row);
    }
    body.appendChild(table);
    }
    tableContainer.appendChild(table);

    main(1, 2)
}

function text(level){
    var level_text = document.createElement('h1')
    level_text.id = 'level_text'
    level_text.textContent = `Level:${level}`
    document.body.appendChild(level_text);
    
}

async function main(level,hearts){
    if(hearts < 0){
        after_delete()
        console.log(score_list)
        score_text(level, score_list)
        return
    }
    text(level)
    await delay(1000)
    let x = random(level)
    change_color(x);
    await delay(level*1115+100)
    get_id(x, level, hearts);

}


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));

  }
  
  async function change_color(myArray) {
    for (const element of myArray) {
        let button = document.getElementById(`button_id${element}`);
        await delay(400); 
        button.style.backgroundColor = 'Blue';
        await delay(750);
        button.style.backgroundColor = 'White'
    }
  }


function random(level){
    let list_indexes = [];
    for(let x = 0; x < level ;x++){
    let random_num = Math.floor(Math.random() * 9);
    list_indexes.push(random_num);
    }
    return list_indexes
}
function get_id(list, level, hearts) {
    var buttons = document.querySelectorAll('.jaj');
    var clickCount = 0;
    function buttonClickHandler(event) {
        var clickedButton = event.target;
        var buttonId = clickedButton.id;
        if (buttonId === `button_id${list[clickCount]}`) {
            clickCount++;
            change(`button_id${list[clickCount - 1]}`, 'Green');
            if (clickCount === list.length) {
                clickCount = 0;
                main(level+1, hearts)
                let text2 = document.getElementById('level_text')
                text2.remove();
                removeEventListeners(); }}
         else {
            change(`button_id${list[clickCount]}`, 'Red');
            clickCount = 0;
            main(level, hearts - 1);
            let text2 = document.getElementById('level_text')
            text2.remove();
            removeEventListeners();}
    }
    function removeEventListeners() {
        buttons.forEach(button => button.removeEventListener("click", buttonClickHandler));
    }
    buttons.forEach(button => button.addEventListener("click", buttonClickHandler));
    
  }

async function change(id, color){
    let button = document.getElementById(id);
    button.style.backgroundColor = color;
    await delay(500);
    button.style.backgroundColor = 'White';}


function after_delete(){
    let buttons = document.getElementById('table-container');
    buttons.remove();
    let button = document.createElement('button');
    button.id = 'back_button'
    button.textContent = 'Home'
    button.onclick = before
    document.body.appendChild(button);

}
    


async function info_out(){
    document.getElementById('info_text').innerHTML = 'Made by borec kikin'
    await delay(1000)
    document.getElementById('info_text').innerHTML = ''
}
function score_text(level, list){
    list.push(level)
    let text = document.createElement('h2')
    text.id = "score_text"
    text.textContent = `Max score:${Math.max(...list)}`
    document.body.appendChild(text)
}
